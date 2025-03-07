import * as Tone from "tone";
import { Sprite, emit } from "kontra";
import { Solved } from "../data/sfx";

const spriteProps = {
  state: [1, 1, 1, 1, 1],

  buttons: [
    [3, 4],
    [1, 3],
    [2, 4],
    [0, 1],
    [1, 3],
    [0, 2],
  ],
};

const SpriteFunction = () =>
  Sprite({
    name: "combo",
    x: 160,
    y: 0,
    color: "red",
    props: {},
    update() {
      if (!this.initialized) {
        // Set up the sounds
        this.props = { ...spriteProps };

        const vol = new Tone.Volume(-25).toDestination();
        this.props.synth = new Tone.PolySynth(Tone.Synth)
          .toDestination()
          .connect(vol);

        [0, 2, 4].forEach((index) => {
          this.hitButton(index);
        });
        this.initialized = true;
      }
      if (this.gameModel.state.comboSolved) {
        this.props.state = [1, 1, 1, 1, 1];
        this.solved = true;
      }
      if (this.solved) return;
      this.advance();
      const roomKey = `${this.gameModel.position}-${this.gameModel.facing}`;
      if (this.roomKey !== roomKey) {
        this.roomKey = roomKey;
      }
    },
    hitButton(buttonIndex) {
      const switchIndexes = this.props.buttons[buttonIndex];
      switchIndexes.forEach((switchIndex) => {
        this.props.state[switchIndex] = this.props.state[switchIndex] ? 0 : 1;
      });
    },
    playCombo() {
      const now = Tone.now();
      this.props.synth.releaseAll();
      this.props.state.forEach((value, index) => {
        this.props.synth.triggerAttackRelease(
          value ? "A4" : "C4",
          "8n",
          now + index * 0.3,
        );
      });
    },
    onExit() {
      // this.props.osc.stop();
    },
    onEnter() {
      if (this.update) this.update();
      if (this.solved) return;
      this.playCombo();
    },
    onInteract(index) {
      if (this.solved) return;
      if (index === 0) return;
      let buttonIndex = index - 1;
      if (this.roomKey === "Combo-e") {
        buttonIndex += 3;
      }
      this.hitButton(buttonIndex);

      this.playCombo();

      if (!this.solved && this.props.state.every((v) => v === 1)) {
        Solved();
        emit("activate", "comboSolved");
        this.solved = true;
      }
    },
    render() {
      if (!this.initialized) return;
      const ctx = this.context;
      if (!ctx) return;
      ctx.save();
      this.props.state.forEach((value, index) => {
        ctx.fillStyle = value ? "#3fe43f" : "#e43f3f";
        ctx.beginPath();
        ctx.arc(35 * 2 + 10 + 80 * index, 65 * 2 + 10, 25, 0, 2 * Math.PI);
        ctx.fill();
      });
      ctx.restore();
    },
  });

export const ComboLight = SpriteFunction;
