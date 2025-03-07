import { keyPressed, Sprite, emit, clamp, gamepadPressed } from "kontra";
import { Solved, Wrong, toneLerp } from "../data/sfx";
import { hexColorLerp, say, createOscillator } from "../data/utils";

const redLightProps = {
  state: "white", // orange, red, green
  progress: 0,
  ignoreInput: 1,
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
      if (!this.initialized) {
        this.props = { ...redLightProps };
        this.initialized = true;
        this.props.osc = createOscillator(440, "sine");
      }
      if (this.gameModel.state.potionSolved) {
        this.solved = true;
      }
      if (this.solved) return;
      if (this.props.progress > 0) this.props.target += dt! * 8;
      this.props.ignoreInput = Math.max(0, this.props.ignoreInput - dt!);
      if (
        !this.props.ignoreInput &&
        (keyPressed(["1"]) ||
          gamepadPressed("north") ||
          gamepadPressed("west") ||
          gamepadPressed("east"))
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
          if (this.props.progress < this.props.target) {
            say("Not fast enough!", true);
          } else if (this.props.progress > this.props.target) {
            say("Too much heat!", true);
          }
          // RESET THE GAME
          this.props = {
            ...this.props,
            ...redLightProps,
            waitForKeyUp: true,
          };
          if (this.props.osc) this.props.osc.type = "sine";
          this.props.osc.stop();
        }
      }
      this.advance();
    },
    onExit() {
      if (this.props.osc) this.props.osc.stop();
    },
    onEnter() {
      if (this.update) this.update(0);
    },
    render() {
      if (!this.initialized) return;
      if (this.solved) return;
      const ctx = this.context;
      if (!ctx) return;
      const outlineColor = hexColorLerp(
        "#e4923f",
        "#ffffff",
        this.props.buffer / redLightProps.buffer,
      );
      // Tube
      ctx.save();
      ctx.fillStyle = outlineColor;
      ctx.fillRect(340, 50, 40, 210);
      ctx.restore();

      // Bulb
      ctx.save();
      ctx.fillStyle = outlineColor;
      ctx.beginPath();
      ctx.arc(360, 260, 25, 0, 2 * Math.PI);
      ctx.fill();
      ctx.fillStyle = "#e43f3f";
      ctx.beginPath();
      ctx.arc(360, 260, 15, 0, 2 * Math.PI);
      ctx.fill();
      ctx.restore();

      // Progress bar
      const fillHeight = -2 * this.props.progress;
      ctx.save();
      ctx.fillStyle = "#e43f3f";
      ctx.fillRect(350, 260, 20, fillHeight);
      ctx.restore();

      // Target range
      const hightTarget = 2 * this.props.target + 10;
      ctx.save();
      ctx.fillStyle = "#000000";
      ctx.fillRect(345, 260 - hightTarget, 5, 20);
      ctx.restore();
    },
  });
  return s;
};
