import * as Tone from "tone";
import { getSharedSynth } from "./utils";

const synth = getSharedSynth();

export const Wrong = () => synth.triggerAttackRelease("G3", "16n");
export const Blip = () => synth.triggerAttackRelease("C4", "16n");
export const Ding = () => synth.triggerAttackRelease("G4", "16n");
export const Solved = () => {
  const now = Tone.now();
  synth.releaseAll();
  synth.triggerAttackRelease("C4", "8n", now);
  synth.triggerAttackRelease("E4", "8n", now + 0.1);
  synth.triggerAttackRelease("G4", "8n", now + 0.2);
  synth.triggerAttackRelease("B4", "8n", now + 0.3);
  synth.triggerAttackRelease("C5", "8n", now + 0.4);
};

export const Buzz = () => synth.triggerAttackRelease("G2", "32n");

export const MelodyTune = () => {
  const now = Tone.now();
  synth.releaseAll();
  synth.triggerAttackRelease("G4", "8n", now);
  synth.triggerAttackRelease("C4", "8n", now + 0.4);
  synth.triggerAttackRelease("E4", "8n", now + 0.8);
  synth.triggerAttackRelease("C4", "8n", now + 1.2);
  synth.triggerAttackRelease("G4", "8n", now + 1.6);
};

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
