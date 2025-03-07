import { getStoreItem } from "kontra";
import * as Tone from "tone";

// Create a standard volume for all synths
const standardVolume = new Tone.Volume(-25).toDestination();

// Get or create a shared PolySynth
let sharedSynth: Tone.PolySynth | null = null;

export const getSharedSynth = () => {
  if (!sharedSynth) {
    sharedSynth = new Tone.PolySynth(Tone.Synth)
      .toDestination()
      .connect(standardVolume);
  }
  return sharedSynth;
};

export const createOscillator = (
  frequency: number | string = 440,
  type: Tone.ToneOscillatorType = "sine",
) => {
  return new Tone.Oscillator(frequency, type).connect(standardVolume);
};

export const say = (text: string | undefined, interrupting?: boolean) => {
  if (!text) return;
  const tts = getStoreItem("dr-swan-lab-tts") === 1;
  // Use browser TTS
  if (tts) {
    var msg = new SpeechSynthesisUtterance();
    msg.text = text;
    if (interrupting) window.speechSynthesis.cancel();
    window.speechSynthesis.speak(msg);
  }

  // Allow the user's screen reader
  const log = document.getElementById("gameLog");
  if (!log) return;
  let div = document.createElement("div");
  div.textContent = text;
  log.append(div);
  // Tidy the div
  while (log.childNodes.length > 5 && log.firstChild) {
    log.removeChild(log.firstChild);
  }
};

export const hexColorLerp = (color1: string, color2: string, t: number) => {
  const r1 = parseInt(color1.slice(1, 3), 16);
  const g1 = parseInt(color1.slice(3, 5), 16);
  const b1 = parseInt(color1.slice(5, 7), 16);
  const r2 = parseInt(color2.slice(1, 3), 16);
  const g2 = parseInt(color2.slice(3, 5), 16);
  const b2 = parseInt(color2.slice(5, 7), 16);
  return `#${(((r1 + (r2 - r1) * t) << 16) | ((g1 + (g2 - g1) * t) << 8) | (b1 + (b2 - b1) * t)).toString(16).padStart(6, "0")}`;
};
