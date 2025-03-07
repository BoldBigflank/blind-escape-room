import * as Tone from "tone";
import { Sprite, emit, clamp } from "kontra";
import { Solved } from "../data/sfx";

const spriteProps = {
  state: [1, 1, 1, 1, 1],
  complete: [0, 0, 0],
  timeouts: {},
  buttons: [
    [
      { frequency: "C4", time: 0 },
      { frequency: "D4", time: 1 / 2 },
      { frequency: "F4", time: 3 / 2 },
      { frequency: "C5", time: 7 / 2 },
    ],
    [
      { frequency: "E4", time: 0 },
      { frequency: "G4", time: 2 / 2 },
      { frequency: "B4", time: 4 / 2 },
      { frequency: "C5", time: 5 / 2 },
    ],
    [
      { frequency: "A4", time: 0 },
      { frequency: "C5", time: 2 / 2 },
    ],
  ],
};

const SpriteFunction = () =>
  Sprite({
    name: "boot",
    x: 160,
    y: 0,
    color: "red",
    props: {},
    update(dt) {
      if (!this.initialized) {
        // Set up the sounds
        this.props = { ...spriteProps };

        const vol = new Tone.Volume(-25).toDestination();
        this.props.synth = new Tone.PolySynth(Tone.Synth)
          .toDestination()
          .connect(vol);
        this.initialized = true;
      }
      if (this.gameModel.state.bootSolved) {
        this.solved = true;
      }
      if (this.solved) return;
      if (!this.gameModel.state.animalSolved) return;
      this.advance();
      if (!this.solved && this.props.complete.every((c) => c > 0)) {
        Solved();
        emit("activate", "bootSolved");
        this.solved = true;
      }
      this.props.complete = this.props.complete.map((c) =>
        clamp(0, 1, c - 2 * dt!),
      );
    },
    playCombo(index: number) {
      this.props.buttons[index].forEach(({ frequency, time }, buttonIndex) => {
        this.props.synth.triggerAttackRelease(frequency, "8n", `+${time}`);
        if (buttonIndex === this.props.buttons[index].length - 1) {
          if (this.props.timeouts[index])
            clearTimeout(this.props.timeouts[index]);
          this.props.timeouts[index] = setTimeout(() => {
            this.props.complete[index] += 1;
          }, time * 1000);
        }
      });
    },
    onInteract(index) {
      if (index === 0) return;
      if (!this.gameModel.state.animalSolved) return;
      let buttonIndex = index - 1;
      this.playCombo(buttonIndex);
    },
    render() {
      if (!this.initialized) return;
      const ctx = this.context;
      if (!ctx) return;

      // Lights
      ctx.save();
      this.props.complete.forEach((value, index) => {
        ctx.fillStyle = value ? "#3fe43f" : "#e43f3f";
        ctx.fillRect(154 * 2 + 10, 54 * 2 + 10 + 60 * index, 24, 24);
      });
      ctx.restore();
    },
  });

export const Boot = SpriteFunction;
