import * as Tone from "tone";

const synth = new Tone.Synth().toDestination();
export const Blip = () => synth.triggerAttackRelease("C4", "16n");

// const osc = new Tone.Oscillator(440, "sine").toDestination().start();
export const toneLerp = (start, end, interval) => {
  if (end < start) {
    return lerp(end, start, easeInQuad(1 - interval));
  }
  return lerp(start, end, easeInQuad(interval));
};

function lerp(start, end, interval) {
  return start + interval * (end - start);
}

function easeInQuad(x: number): number {
  return x * x;
}
