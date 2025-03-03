// Each button flips two+ different positions
// Flipping the button plays the new state
import { emit, Sprite } from "kontra";
import { Solved } from "../data/sfx";
import { say } from "../data/utils";

const spriteProps = {
  solution: [3, 4, 2],
  state: [1, 1, 1],
  progress: 0,
};

const SpriteFunction = () =>
  Sprite({
    name: "animal",
    x: 160,
    y: 0,
    color: "red",
    props: {},
    update() {
      if (this.solved) return;
      if (!this.initialized) {
        // Set up the sounds
        this.props = { ...spriteProps };
        this.initialized = true;
      }
      this.advance();
    },
    onExit() {},
    onEnter() {},
    onInteract(index) {
      if (index === 0) {
        // Space bar
        say(`${this.props.state.join(", ")}.`, true, true);
        return;
      }
      this.props.state[index - 1] = (this.props.state[index - 1] % 5) + 1;
      if (this.props.state.every((v, i) => v === this.props.solution[i])) {
        Solved();
        emit("activate", "animalSolved");
      } else {
        say(`${this.props.state.join(", ")}.`, true, true);
      }
    },
    render() {
      if (!this.initialized) return;
      const ctx = this.context;
      if (!ctx) return;
      ctx.save();
      ctx.fillStyle = "grey";
      ctx.fillRect(10, 10, 460, 380);
      ctx.restore();
      ctx.save();
      ctx.fillStyle = "#000000";
      ctx.fillRect(50, 120, 380, 270);
      ctx.fillStyle = this.solved ? "#00cc00" : "#ffffff";
      ctx.font = "80px monospace";
      ctx.textBaseline = "top";
      ctx.fillText(this.props.state.join(" "), 125, 240);
      ctx.restore();
    },
  });

export const Generator = SpriteFunction;
