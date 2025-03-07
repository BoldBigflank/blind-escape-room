// Each button flips two+ different positions
// Flipping the button plays the new state
import * as Tone from "tone";
import { emit, Sprite } from "kontra";
import { Buzz, Solved } from "../data/sfx";
import { getSharedSynth } from "../data/utils";

const spriteProps = {
  state: [2, 0, 1, 0, 2],
  progress: 0,
};

const SpriteFunction = () =>
  Sprite({
    name: "melody",
    x: 160,
    y: 0,
    color: "red",
    props: {},
    update() {
      if (!this.initialized) {
        // Set up the sounds
        this.props = { ...spriteProps };
        this.props.synth = getSharedSynth();
        this.initialized = true;
      }
      const roomKey = `${this.gameModel.position}-${this.gameModel.facing}`;
      if (this.roomKey !== roomKey) {
        this.roomKey = roomKey;
      }
      if (this.gameModel.state.melodySolved) {
        this.solved = true;
      }
      if (this.solved) return;
      this.advance();
      if (!this.solved && this.props.progress === this.props.state.length) {
        Solved();
        emit("activate", "melodySolved");
        this.solved = true;
      }
    },
    onExit() {},
    onEnter() {
      if (this.update) this.update();
      if (!this.gameModel.state.potionSolved) return;
      if (this.roomKey !== "Hub-n") return;
      if (this.gameModel.state.melodySolved) return;
      const now = Tone.now();
      this.props.synth.releaseAll();
      this.props.synth.triggerAttackRelease("G4", "8n", now + 2);
      this.props.synth.triggerAttackRelease("C4", "8n", now + 2.4);
      this.props.synth.triggerAttackRelease("E4", "8n", now + 2.8);
      this.props.synth.triggerAttackRelease("C4", "8n", now + 3.2);
      this.props.synth.triggerAttackRelease("G4", "8n", now + 3.6);
    },
    onInteract(index: number) {
      if (index === 0) return; //Ignore space bar
      if (!this.gameModel.state["potionSolved"]) {
        Buzz();
        return;
      }

      switch (this.roomKey) {
        case "Start-n":
          this.props.synth.triggerAttackRelease("G4", "8n");
          if (this.props.state[this.props.progress] === 2) {
            this.props.progress += 1;
          } else {
            this.props.progress = 1; // It's correct for position 0
          }
          break;
        case "Start-w":
          this.props.synth.triggerAttackRelease("E4", "8n");
          if (this.props.state[this.props.progress] === 1) {
            this.props.progress += 1;
          } else {
            this.props.progress = 0;
          }
          break;
        case "Start-s":
          this.props.synth.triggerAttackRelease("C4", "8n");
          if (this.props.state[this.props.progress] === 0) {
            this.props.progress += 1;
          } else {
            this.props.progress = 0;
          }
          break;
        default:
          break;
      }
    },
    render() {
      if (!this.initialized) return;
      const ctx = this.context;
      if (!ctx) return;

      if (this.roomKey === "Hub-n") {
        ctx.save();
        ctx.fillStyle = this.gameModel.state.melodySolved
          ? "#3fe43f"
          : "#e43f3f";
        ctx.fillRect(195, 115, 90, 30);
        ctx.restore();
      }
    },
  });

export const Melody = SpriteFunction;
