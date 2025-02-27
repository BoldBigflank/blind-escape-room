// Each button flips two+ different positions
// Flipping the button plays the new state
import { keyPressed, Sprite, emit } from "kontra";

const spriteProps = {
  state: [0, 1, 0, 1, 0],
  progress: 0,
};

const SpriteFunction = () =>
  Sprite({
    name: "comboLight",
    x: 150,
    y: 0,
    width: 100,
    height: 100,
    color: "red",
    props: {},
    update(dt) {
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
    render() {
      if (!this.initialized) return;
      this.draw();
      const ctx = this.context;
      if (!ctx) return;
      ctx.save();
      ctx.restore();
    },
  });

export const Melody = SpriteFunction;
