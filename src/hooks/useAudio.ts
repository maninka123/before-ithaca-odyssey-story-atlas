import { useCallback, useEffect, useRef, useState } from "react";
export function useAudio(text: string) {
  const [speaking, setSpeaking] = useState(false),
    [sea, setSea] = useState(false);
  const audio = useRef<AudioContext | null>(null);
  const stop = useCallback(() => {
    window.speechSynthesis?.cancel();
    setSpeaking(false);
  }, []);
  useEffect(() => {
    stop();
    return stop;
  }, [text, stop]);
  useEffect(
    () => () => {
      void audio.current?.close();
    },
    [],
  );
  const narrate = () => {
    if (speaking) {
      stop();
      return;
    }
    if (!("speechSynthesis" in window)) return;
    const voice = new SpeechSynthesisUtterance(text);
    voice.lang = "en-GB";
    voice.rate = 0.87;
    voice.onend = () => setSpeaking(false);
    voice.onerror = () => setSpeaking(false);
    window.speechSynthesis.speak(voice);
    setSpeaking(true);
  };
  const toggleSea = async () => {
    if (sea) {
      await audio.current?.suspend();
      setSea(false);
      return;
    }
    try {
      if (!audio.current) {
        const ctx = new AudioContext();
        audio.current = ctx;
        const buffer = ctx.createBuffer(1, ctx.sampleRate * 8, ctx.sampleRate);
        const values = buffer.getChannelData(0);
        let brown = 0;
        for (let i = 0; i < values.length; i++) {
          brown = (brown + Math.random() * 0.04 - 0.02) / 1.02;
          values[i] =
            brown * 3 * (0.5 + 0.5 * Math.sin((i / ctx.sampleRate) * 0.7));
        }
        const noise = ctx.createBufferSource();
        noise.buffer = buffer;
        noise.loop = true;
        const filter = ctx.createBiquadFilter();
        filter.type = "lowpass";
        filter.frequency.value = 650;
        const gain = ctx.createGain();
        gain.gain.value = 0.18;
        noise.connect(filter).connect(gain).connect(ctx.destination);
        noise.start();
      }
      await audio.current.resume();
      setSea(true);
    } catch {
      setSea(false);
    }
  };
  return {
    speaking,
    sea,
    narrate,
    toggleSea,
    canNarrate: "speechSynthesis" in window,
  };
}
