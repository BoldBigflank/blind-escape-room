// Each button flips two+ different positions
// Flipping the button plays the new state
import * as Tone from "tone";
import { emit, Sprite } from "kontra";
import { Buzz, Solved } from "../data/sfx";

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
      if (this.solved) return;
      if (!this.initialized) {
        // Set up the sounds
        this.props = { ...spriteProps };
        this.initialized = true;
        const vol = new Tone.Volume(-25).toDestination();
        this.props.synth = new Tone.PolySynth(Tone.Synth)
          .toDestination()
          .connect(vol);
      }
      this.advance();
      // console.log(this.gameModel.position, this.gameModel.facing);
      const roomKey = `${this.gameModel.position}-${this.gameModel.facing}`;
      if (this.roomKey !== roomKey) {
        this.roomKey = roomKey;
      }
      if (!this.solved && this.props.progress === this.props.state.length) {
        Solved();
        emit("activate", "melodySolved");
        this.solved = true;
      }
    },
    onExit() {},
    onEnter() {},
    onInteract(index: number) {
      if (index === 0) return; //Ignore space bar
      console.log("interact", index);
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
            this.props.progress = 0;
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
        case "Hub-n":
          const now = Tone.now();
          this.props.synth.releaseAll();
          this.props.synth.triggerAttackRelease("G4", "8n", now);
          this.props.synth.triggerAttackRelease("C4", "8n", now + 0.4);
          this.props.synth.triggerAttackRelease("E4", "8n", now + 0.8);
          this.props.synth.triggerAttackRelease("C4", "8n", now + 1.2);
          this.props.synth.triggerAttackRelease("G4", "8n", now + 1.6);
          break;
        default:
          break;
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

export const Melody = SpriteFunction;
