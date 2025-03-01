// Each button flips two+ different positions
// Flipping the button plays the new state
import { emit, keyPressed, Sprite } from "kontra";
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
      if (keyPressed(["space"])) {
        // Interaction
      }
      this.advance();
    },
    onExit() {
      // this.props.osc.stop();
    },
    onEnter() {
      // if (this.props.osc && !this.solved) this.props.osc.start();
    },
    onInteract(index) {
      if (index === 0) return;
      this.props.state[index - 1] = (this.props.state[index - 1] % 5) + 1;
      console.log(this.props.state);
      if (this.props.state.every((v, i) => v === this.props.solution[i])) {
        Solved();
        emit("activate", "animalSolved");
      } else {
        say(`${this.props.state.join(", ")}.`, true);
      }
    },
    render() {
      if (!this.initialized) return;
      const ctx = this.context;
      if (!ctx) return;
      ctx.save();
      ctx.fillStyle = "grey";
      ctx.fillRect(10, 10, 460, 460);
      ctx.restore();
    },
  });

export const Generator = SpriteFunction;
