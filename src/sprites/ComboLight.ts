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
      if (this.solved) return;
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
      this.playCombo();
    },
    onInteract(index) {
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
      // Background
      ctx.save();
      ctx.fillStyle = "grey";
      ctx.fillRect(10, 10, 460, 380);
      ctx.restore();

      ctx.save();
      this.props.state.forEach((value, index) => {
        ctx.fillStyle = value ? "green" : "red";
        ctx.fillRect(21 + index * 92, 206, 69, 69);
      });
      ctx.restore();
    },
  });

export const ComboLight = SpriteFunction;
