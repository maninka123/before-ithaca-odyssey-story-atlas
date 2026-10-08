import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Html, Line, OrbitControls } from "@react-three/drei";
import {
  BufferGeometry,
  Float32BufferAttribute,
  Shape,
  Vector3,
  type Mesh,
  type Group,
} from "three";
import { useEffect, useMemo, useRef, useState, type RefObject } from "react";
import { destinations, referencePlaces } from "../data/locations";
import { chapters } from "../data/chapters";
import { loadCoastlines } from "../data/geography";
import type { OrbitControls as OrbitControlsType } from "three-stdlib";
export type MapProps = {
  reference: boolean;
  selected: string;
  onSelect: (id: string) => void;
  completed: string[];
  motion: boolean;
  onUnavailable: () => void;
};
type Polygon = number[][];
const project = (p: number[]) => [(p[0] - 15) / 2.5, (p[1] - 36.5) / 2.5];
function inside(x: number, y: number, ring: number[][]) {
  let c = false;
  for (let i = 0, j = ring.length - 1; i < ring.length; j = i++) {
    const a = ring[i],
      b = ring[j];
    if (
      a[1] > y !== b[1] > y &&
      x < ((b[0] - a[0]) * (y - a[1])) / (b[1] - a[1]) + a[0]
    )
      c = !c;
  }
  return c;
}
function Relief({ polygon }: { polygon: Polygon }) {
  const { shape, geometry } = useMemo(() => {
    const ring = polygon.map(project),
      shape = new Shape();
    ring.forEach((p, i) =>
      i ? shape.lineTo(p[0], p[1]) : shape.moveTo(p[0], p[1]),
    );
    shape.closePath();
    const values: number[] = [];
    const step = 0.15;
    const x0 = Math.min(...ring.map((p) => p[0])),
      x1 = Math.max(...ring.map((p) => p[0])),
      y0 = Math.min(...ring.map((p) => p[1])),
      y1 = Math.max(...ring.map((p) => p[1]));
    const height = (x: number, y: number) =>
      0.12 +
      0.09 *
        (1 + Math.sin(x * 5.3 + y * 3.8)) *
        (1 + Math.cos(y * 6.1 - x * 2.7));
    for (let x = x0; x < x1; x += step)
      for (let y = y0; y < y1; y += step) {
        if (
          inside(x, y, ring) &&
          inside(x + step, y, ring) &&
          inside(x, y + step, ring) &&
          inside(x + step, y + step, ring)
        ) {
          for (const p of [
            [x, y],
            [x + step, y],
            [x, y + step],
            [x + step, y],
            [x + step, y + step],
            [x, y + step],
          ])
            values.push(p[0], p[1], height(p[0], p[1]));
        }
      }
    const geometry = new BufferGeometry();
    geometry.setAttribute("position", new Float32BufferAttribute(values, 3));
    geometry.computeVertexNormals();
    return { shape, geometry };
  }, [polygon]);
  useEffect(() => () => geometry.dispose(), [geometry]);
  return (
    <group rotation={[-Math.PI / 2, 0, 0]}>
      <mesh>
        <extrudeGeometry
          args={[
            shape,
            {
              depth: 0.09,
              bevelEnabled: true,
              bevelSegments: 1,
              steps: 1,
              bevelSize: 0.015,
              bevelThickness: 0.015,
            },
          ]}
        />
        <meshStandardMaterial color="#46685e" roughness={0.98} />
      </mesh>
      <mesh geometry={geometry}>
        <meshStandardMaterial color="#6d8973" roughness={1} />
      </mesh>
    </group>
  );
}
function Ocean({ motion }: { motion: boolean }) {
  const ref = useRef<Mesh>(null);
  useFrame(({ clock }) => {
    if (ref.current && motion)
      ref.current.position.y =
        -0.09 + Math.sin(clock.elapsedTime * 0.32) * 0.025;
  });
  return (
    <mesh ref={ref} rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.09, 0]}>
      <planeGeometry args={[24, 14, 1, 1]} />
      <meshStandardMaterial color="#123a45" roughness={0.55} metalness={0.2} />
    </mesh>
  );
}
function Ship({
  index,
  motion,
  portal,
}: {
  index: number;
  motion: boolean;
  portal: RefObject<HTMLDivElement>;
}) {
  const ref = useRef<Group>(null),
    current = useRef(index);
  const initialPosition = useRef<[number, number, number]>([
    destinations[index].position[0],
    0.6,
    destinations[index].position[1],
  ]);
  const { invalidate } = useThree();
  useEffect(() => {
    invalidate();
  }, [index, invalidate]);
  useFrame((_, delta) => {
    const difference = index - current.current;
    if (Math.abs(difference) > 0.01) {
      current.current = motion
        ? current.current +
          Math.sign(difference) * Math.min(Math.abs(difference), delta * 2)
        : index;
      invalidate();
    }
    const lower = Math.floor(current.current),
      upper = Math.min(lower + 1, destinations.length - 1),
      amount = current.current - lower;
    const a = destinations[lower].position,
      b = destinations[upper].position;
    ref.current?.position.set(
      a[0] + (b[0] - a[0]) * amount,
      0.6,
      a[1] + (b[1] - a[1]) * amount,
    );
  });
  return (
    <group ref={ref} position={initialPosition.current}>
      <Html portal={portal} center zIndexRange={[30, 0]}>
        <span
          className="ship-marker"
          aria-label={`Ship travelling to ${destinations[index].name}`}
        >
          <svg
            viewBox="0 0 30 30"
            width="25"
            height="25"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.4"
          >
            <path d="M4 22h22l-4 5H8zM15 3v17H5zM17 5l8 15h-8z" />
          </svg>
        </span>
      </Html>
    </group>
  );
}
function MapContent({
  reference,
  selected,
  onSelect,
  completed,
  motion,
  polygons,
  portal,
}: {
  polygons: Polygon[];
  portal: RefObject<HTMLDivElement>;
} & MapProps) {
  const controls = useRef<OrbitControlsType>(null),
    focus = useRef(false),
    lastSelection = useRef(selected);
  const { camera, invalidate } = useThree();
  const locations = reference
    ? referencePlaces.map((p, i) => ({
        id: p.name,
        name: p.name,
        chapter: p.chapter,
        position: [(p.lon - 15) / 2.5, -(p.lat - 36.5) / 2.5] as [
          number,
          number,
        ],
        known: true,
        index: i,
      }))
    : destinations.map((d, i) => ({ ...d, index: i }));
  const active = locations.find((d) => d.id === selected);
  const dest = useMemo(
    () =>
      new Vector3(
        (active?.position[0] ?? 0) * 0.3,
        0,
        (active?.position[1] ?? 0) * 0.25,
      ),
    [active?.position[0], active?.position[1]],
  );
  useEffect(() => {
    if (lastSelection.current !== selected) {
      focus.current = true;
      lastSelection.current = selected;
      invalidate();
    }
  }, [selected, reference, invalidate]);
  useFrame(() => {
    if (!focus.current || !controls.current) return;
    const target = controls.current.target;
    if (!motion) {
      target.copy(dest);
      camera.position.set(dest.x, 15, dest.z + 13);
      focus.current = false;
    } else {
      target.lerp(dest, 0.06);
      const cp = new Vector3(dest.x, 15, dest.z + 13);
      camera.position.lerp(cp, 0.04);
      if (camera.position.distanceTo(cp) < 0.05) focus.current = false;
      else invalidate();
    }
    controls.current.update();
  });
  const route = destinations.map(
    (d) => new Vector3(d.position[0], 0.22, d.position[1]),
  );
  const completedIndex = Math.max(
    0,
    ...destinations.map((d, i) => (completed.includes(d.chapter) ? i : 0)),
  );
  const shipIndex = active && !reference ? active.index : completedIndex;
  return (
    <>
      <color attach="background" args={["#0b232b"]} />
      <ambientLight intensity={1.1} />
      <directionalLight
        position={[-4, 12, -5]}
        intensity={1.8}
        color="#e2d6b4"
      />
      <Ocean motion={motion} />
      {polygons.map((polygon, i) => (
        <Relief polygon={polygon} key={i} />
      ))}
      <gridHelper
        args={[24, 24, "#20515b", "#1b444d"]}
        position={[0, -0.05, 0]}
      />
      {!reference ? (
        <>
          <Line
            points={route}
            color="#b6a681"
            lineWidth={1}
            dashed
            dashSize={0.17}
            gapSize={0.14}
            transparent
            opacity={0.5}
          />
          {destinations
            .slice(1)
            .map((d, i) =>
              completed.includes(destinations[i].chapter) &&
              completed.includes(d.chapter) ? (
                <Line
                  key={d.id}
                  points={[route[i], route[i + 1]]}
                  color="#e5c487"
                  lineWidth={2}
                />
              ) : null,
            )}
          <Ship index={shipIndex} motion={motion} portal={portal} />
        </>
      ) : null}
      {locations.map((d) => (
        <group key={d.id} position={[d.position[0], 0.16, d.position[1]]}>
          <mesh>
            <cylinderGeometry args={[0.07, 0.07, 0.12, 16]} />
            <meshStandardMaterial
              color={selected === d.id ? "#ffe2a2" : "#beaa7d"}
              emissive={selected === d.id ? "#7a5e2b" : "#000000"}
            />
          </mesh>
          <Html
            portal={portal}
            position={[0, 0.22, 0]}
            center
            zIndexRange={[40, 0]}
          >
            <button
              className={`map-marker ${reference ? "compact" : ""} ${selected === d.id ? "active" : ""}`}
              onClick={() => onSelect(d.id)}
              aria-label={`Select ${d.name}`}
              aria-pressed={selected === d.id}
            >
              <span>
                {reference
                  ? "•"
                  : String(
                      chapters.find((c) => c.id === d.chapter)!.number,
                    ).padStart(2, "0")}
              </span>
              <strong>{d.name}</strong>
            </button>
          </Html>
        </group>
      ))}
      <OrbitControls
        ref={controls}
        onStart={() => {
          focus.current = false;
        }}
        makeDefault
        minDistance={6}
        maxDistance={24}
        maxPolarAngle={Math.PI / 2.5}
        minPolarAngle={0.2}
        enableDamping={motion}
        enablePan
        maxAzimuthAngle={Math.PI / 3}
        minAzimuthAngle={-Math.PI / 3}
      />
    </>
  );
}
export default function WorldMap(props: MapProps) {
  const [polygons, setPolygons] = useState<Polygon[]>([]),
    [failed, setFailed] = useState(false);
  // This portal is attached before Canvas mounts its scene/Html layout effects.
  const portal = useRef<HTMLDivElement>(null!);
  useEffect(() => {
    if (failed) props.onUnavailable();
  }, [failed, props.onUnavailable]);
  useEffect(() => {
    const controller = new AbortController();
    loadCoastlines(controller.signal)
      .then(setPolygons)
      .catch((e) => {
        if (e.name !== "AbortError") setFailed(true);
      });
    return () => controller.abort();
  }, []);
  if (failed)
    return (
      <p className="map-loading">
        The 3D geography could not load. Choose 2D map above; all destinations
        remain available.
      </p>
    );
  if (!polygons.length)
    return <p className="map-loading">Preparing the Mediterranean…</p>;
  return (
    <div className="map-3d">
      <div className="map-label-portal" ref={portal} />
      <Canvas
        camera={{ position: [0, 15, 13], fov: 43 }}
        dpr={[1, 1.5]}
        frameloop={props.motion ? "always" : "demand"}
        gl={{ antialias: true, alpha: false, powerPreference: "low-power" }}
        fallback={
          <p>The interactive atlas requires WebGL. Use the 2D map instead.</p>
        }
      >
        <MapContent {...props} polygons={polygons} portal={portal} />
      </Canvas>
    </div>
  );
}
