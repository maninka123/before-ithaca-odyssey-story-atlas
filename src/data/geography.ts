export type Coastline = [number, number][][];

export async function loadCoastlines(signal: AbortSignal): Promise<Coastline> {
  const response = await fetch(
    `${import.meta.env.BASE_URL}geography/mediterranean.json`,
    { signal },
  );
  if (!response.ok) throw new Error("Coastline data unavailable");
  const data: unknown = await response.json();
  if (
    !Array.isArray(data) ||
    !data.length ||
    data.some(
      (ring) =>
        !Array.isArray(ring) ||
        ring.length < 3 ||
        ring.some(
          (point) =>
            !Array.isArray(point) ||
            point.length < 2 ||
            !Number.isFinite(point[0]) ||
            !Number.isFinite(point[1]),
        ),
    )
  ) {
    throw new Error("Invalid coastline data");
  }
  return data as Coastline;
}
