import {
  keyPressed,
  Sprite,
  emit,
  getCanvas,
  clamp,
  gamepadPressed,
} from "kontra";
import * as Tone from "tone";
import { Ding, Solved, Wrong, toneLerp } from "../data/sfx";

const redLightProps = {
  state: "orange", // orange, red, green
  progress: 0,
  buffer: 10,
  target: 0,
  trouble: false,
};

export const RedLight = () => {
  const c = getCanvas();
  const s = Sprite({
    name: "redLight",
    x: c.width * 0.5,
    y: 0,
    width: 40,
    height: 100,
    color: "red",
    props: {},
    update(dt) {
      if (this.solved) return;
      if (!this.initialized) {
        this.props = { ...redLightProps };
        this.initialized = true;
        const vol = new Tone.Volume(-25).toDestination();
        this.props.osc = new Tone.Oscillator(440, "sine").connect(vol);
      }
      this.color = this.props.state;
      if (this.props.progress > 0) this.props.target += dt! * 8;
      if (
        keyPressed(["1"]) ||
        gamepadPressed("north") ||
        gamepadPressed("west") ||
        gamepadPressed("east")
      ) {
        this.props.osc.start();
        this.props.progress += dt! * 12;
      } else {
        this.props.progress -= dt! * 4;
      }
      this.props.progress = clamp(0, 100, this.props.progress);
      this.props.target = clamp(0, 100, this.props.target);
      const inTrouble = Math.abs(this.props.progress - this.props.target) > 4;
      this.props.osc.frequency.value = inTrouble
        ? 440
        : toneLerp(440, 880, this.props.progress / 100);
      if (this.props.trouble && !inTrouble) {
        this.props.osc.type = "sine";
        this.props.state = "white";
      } else if (!this.props.trouble && inTrouble) {
        this.props.osc.type = "square";
        this.props.state = "orange";
      }
      this.props.trouble = inTrouble;
      if (this.props.progress >= 100) {
        emit("activate", "potionSolved");
        this.solved = true;
        this.props.state = "green";
        this.props.osc.stop();
        Solved();
      }
      if (this.props.trouble) {
        this.props.buffer -= dt! * 5;
        if (this.props.buffer <= 0) {
          Wrong();
          // RESET THE GAME
          this.props = {
            ...this.props,
            ...redLightProps,
          };
          if (this.props.osc) this.props.osc.type = "sine";
          this.props.osc.stop();
        }
      }
      this.color = this.props.state;
      this.advance();
    },
    onExit() {
      this.props.osc.stop();
    },
    onEnter() {
      if (this.props.osc && !this.solved) this.props.osc.start();
    },
    render() {
      if (!this.initialized) return;
      this.draw();
      const ctx = this.context;
      if (!ctx) return;

      // Bulb
      ctx.save();
      ctx.beginPath();
      ctx.arc(this.width! * 0.5, this.height! + 0, 25, 0, 2 * Math.PI);
      ctx.fill();
      ctx.fillStyle = "red";
      ctx.beginPath();
      ctx.arc(this.width! * 0.5, this.height! + 0, 15, 0, 2 * Math.PI);
      ctx.fill();
      ctx.restore();

      // Progress bar
      const fillHeight = 0.8 * this.props.progress;
      ctx.save();
      ctx.fillStyle = "red";
      ctx.fillRect(
        10,
        this.height! - fillHeight - 10,
        this.width! - 20,
        fillHeight,
      );
      ctx.restore();

      // Target range
      const hightTarget = 0.8 * this.props.target + 4;
      ctx.save();
      ctx.fillStyle = "black";
      ctx.fillRect(10, this.height! - hightTarget - 10, 5, 8);
      ctx.restore();
    },
  });
  return s;
};
