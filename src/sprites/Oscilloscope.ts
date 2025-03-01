// hitting space plays the solution for 1s,
// hitting buttons changes the pitch, wave type, and volume
import { emit, keyPressed, Sprite } from "kontra";
import { Solved } from "../data/sfx";
import * as Tone from "tone";

const spriteProps = {
  solution: ["F4", "triangle", 25],
  state: ["C4", "sine", 10],
};
const options: any[][] = [
  ["C4", "D4", "E4", "F4", "G4"],
  ["triangle", "sine", "square"],
  [10, 15, 25, 35, 45],
];

const SpriteFunction = () =>
  Sprite({
    name: "oscilloscope",
    x: 150,
    y: 0,
    width: 100,
    height: 100,
    color: "red",
    props: {},
    update() {
      if (this.solved) return;
      if (!this.initialized) {
        // Set up the sounds
        this.props = { ...spriteProps };
        const vol = new Tone.Volume(-25).toDestination();
        this.props.oscSolution = new Tone.Oscillator(
          this.props.solution[0],
          this.props.solution[1],
        ).connect(vol);
        this.props.oscSolution
          .set({
            frequency: this.props.solution[0],
            type: this.props.solution[1],
            volume: this.props.solution[2],
          })
          .start(0, 0)
          .stop("+1");
        this.props.osc = new Tone.Oscillator(440, "sine").connect(vol);
        this.props.osc
          .set({
            frequency: this.props.state[0],
            type: this.props.state[1],
            volume: this.props.state[2],
          })
          .start("+1");

        this.initialized = true;
      }
      if (keyPressed(["space"])) {
        // Interaction
      }
      this.advance();
    },
    onExit() {
      if (this.solved) return;
      this.props.osc.stop();
      this.props.oscSolution.stop();
    },
    onEnter() {
      if (this.solved) return;
      if (this.props.osc && !this.solved) {
        this.props.oscSolution.start(0, 0).stop("+1");
        this.props.osc.start("+1");
      }
    },
    onInteract(index) {
      if (!this.gameModel.state.animalSolved) return;
      if (this.solved) return;
      if (index === 0) {
        console.log("switching");
        this.props.oscSolution.start(0, 0).stop("+1");
        this.props.osc.stop().start("+1");
        return;
      }
      const optionIndex = index - 1;
      const selectedOption = this.props.state[optionIndex];
      console.log(selectedOption);
      const selectedIndex = options[optionIndex].indexOf(selectedOption);
      const newSelectedIndex =
        (selectedIndex + 1) % options[optionIndex].length;
      this.props.state[optionIndex] = options[optionIndex][newSelectedIndex];
      if (this.props.state.every((v, i) => v === this.props.solution[i])) {
        this.props.osc.stop();
        this.props.oscSolution.stop();
        Solved();
        emit("activate", "cpuSolved");
        this.solved = true;
      } else {
        // Update the oscilloscope
        this.props.osc.set({
          frequency: this.props.state[0],
          type: this.props.state[1],
          volume: this.props.state[2],
        });
      }
    },

    render() {
      if (!this.initialized) return;
      if (!this.gameModel || !this.gameModel.state.animalSolved) return;
      const ctx = this.context;
      if (!ctx) return;

      // Background
      ctx.save();
      ctx.fillStyle = "grey";
      ctx.fillRect(10, 10, 460, 460);
      ctx.restore();
    },
  });

export const Oscilloscope = SpriteFunction;
