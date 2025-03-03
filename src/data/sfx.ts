import * as Tone from "tone";

const vol = new Tone.Volume(-25).toDestination();
const synth = new Tone.Synth().toDestination().connect(vol);
export const Wrong = () => synth.triggerAttackRelease("G3", "16n");
export const Blip = () => synth.triggerAttackRelease("C4", "16n");
export const Ding = () => synth.triggerAttackRelease("G4", "16n");
export const Solved = () => {
  const now = Tone.now();
  melodySynth.releaseAll();
  melodySynth.triggerAttackRelease("C4", "8n", now);
  melodySynth.triggerAttackRelease("E4", "8n", now + 0.1);
  melodySynth.triggerAttackRelease("G4", "8n", now + 0.2);
  melodySynth.triggerAttackRelease("B4", "8n", now + 0.3);
  melodySynth.triggerAttackRelease("C5", "8n", now + 0.4);
};

export const Buzz = () => synth.triggerAttackRelease("G2", "32n");

const melodySynth = new Tone.PolySynth(Tone.Synth).toDestination().connect(vol);
export const MelodyTune = () => {
  const now = Tone.now();
  melodySynth.releaseAll();
  melodySynth.triggerAttackRelease("G4", "8n", now);
  melodySynth.triggerAttackRelease("C4", "8n", now + 0.4);
  melodySynth.triggerAttackRelease("E4", "8n", now + 0.8);
  melodySynth.triggerAttackRelease("C4", "8n", now + 1.2);
  melodySynth.triggerAttackRelease("G4", "8n", now + 1.6);
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
