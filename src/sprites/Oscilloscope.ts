// hitting space plays the solution for 1s,
// hitting buttons changes the pitch, wave type, and volume
import { emit, Sprite } from "kontra";
import { Solved } from "../data/sfx";
import { createOscillator } from "../data/utils";

const spriteProps = {
  solution: ["F4", "triangle", -6],
  state: ["C4", "sine", 0],
};
const options: any[][] = [
  ["C4", "D4", "E4", "F4", "G4"],
  ["triangle", "sine", "square"],
  [0, -3, -6, -9],
];

const SpriteFunction = () =>
  Sprite({
    name: "oscilloscope",
    x: 160,
    y: 0,
    props: {},
    update() {
      if (!this.initialized) {
        // Set up the sounds
        this.props = { ...spriteProps };
        this.props.oscSolution = createOscillator(
          this.props.solution[0],
          this.props.solution[1],
        );
        this.props.oscSolution
          .set({
            frequency: this.props.solution[0],
            type: this.props.solution[1],
            volume: this.props.solution[2],
          })
          .start(0, 0)
          .stop("+1");
        this.props.osc = createOscillator(440, "sine");
        this.props.osc
          .set({
            frequency: this.props.state[0],
            type: this.props.state[1],
            volume: this.props.state[2],
          })
          .start("+1");

        this.initialized = true;
      }
      if (this.gameModel.state.cpuSolved) {
        this.solved = true;
      }
      if (this.solved) return;
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
      if (this.solved) return;
      if (index === 0) {
        this.props.oscSolution.start(0, 0).stop("+1");
        this.props.osc.stop().start("+1");
        return;
      }
      const optionIndex = index - 1;
      const selectedOption = this.props.state[optionIndex];
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
      const ctx = this.context;
      if (!ctx) return;
    },
  });

export const Oscilloscope = SpriteFunction;
