import { keyPressed, Sprite, emit, clamp, gamepadPressed } from "kontra";
import * as Tone from "tone";
import { Solved, Wrong, toneLerp } from "../data/sfx";

const redLightProps = {
  state: "white", // orange, red, green
  progress: 0,
  buffer: 10,
  target: 0,
  trouble: false,
};

export const RedLight = () => {
  const s = Sprite({
    name: "redLight",
    x: 160,
    y: 0,
    color: "grey",
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
      if (this.update) this.update(0);
      if (this.props.osc && !this.solved) this.props.osc.start();
    },
    render() {
      if (!this.initialized) return;
      const ctx = this.context;
      if (!ctx) return;
      ctx.save();
      ctx.fillStyle = "grey";
      ctx.fillRect(10, 10, 460, 380);
      ctx.restore();

      // Tube
      ctx.save();
      ctx.fillStyle = this.color as string;
      ctx.fillRect(220, 80, 40, 210);
      ctx.restore();

      // Bulb
      ctx.save();
      ctx.fillStyle = this.color as string;
      ctx.beginPath();
      ctx.arc(240, 290, 25, 0, 2 * Math.PI);
      ctx.fill();
      ctx.fillStyle = "red";
      ctx.beginPath();
      ctx.arc(240, 290, 15, 0, 2 * Math.PI);
      ctx.fill();
      ctx.restore();

      // Progress bar
      const fillHeight = -2 * this.props.progress;
      ctx.save();
      ctx.fillStyle = "red";
      ctx.fillRect(227, 290, 26, fillHeight);
      ctx.restore();

      // Target range
      const hightTarget = 2 * this.props.target + 10;
      ctx.save();
      ctx.fillStyle = "black";
      ctx.fillRect(225, 290 - hightTarget, 5, 20);
      ctx.restore();
    },
  });
  return s;
};
