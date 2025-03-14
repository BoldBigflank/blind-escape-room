import {
  map,
  Map,
  Room,
  View,
  Interaction,
  CompassDirection,
} from "../data/map.ts";
import { Blip } from "../data/sfx.ts";
import { say } from "../data/utils.ts";
import { on } from "kontra";

export class GameModel {
  map: Map;
  position: string | undefined;
  facing: CompassDirection | "";
  puzzle: "";
  visitedRooms: string[];
  state: Record<string, any>;
  message: string;

  constructor() {
    this.map = map;
    this.facing = "";
    this.puzzle = "";
    this.visitedRooms = [];
    this.state = {
      // potionSolved: true,
      // melodySolved: true,
      // animalSolved: true,
      // bootSolved: true,
      // cpuSolved: true,
      // comboSolved: true,
    };
    this.message = "";
    this.moveTo(this.map.rooms[0].name);
    on("activate", (variable: string) => {
      this.state[variable] = true;
      this.savePropsToLocalStorage();
    });
    this.loadPropsFromLocalStorage();
  }

  public get currentRoom(): Room | undefined {
    return this.map.rooms.find((r) => r.name === this.position);
  }

  public get currentView(): View | undefined {
    return this.currentRoom?.views.find((v) => v.direction == this.facing);
  }

  public get currentImage(): string {
    if (!this.currentView || !this.currentView.image) return "blank";
    for (let i = 0; i < this.currentView.image.length; i++) {
      const ic = this.currentView?.image[i];
      if (!ic) continue;
      if (!ic.condition) return ic.path;
      if (this.state[ic.condition]) return ic.path;
    }
    return "blank";
  }

  public get currentPuzzle(): string | undefined {
    return this.currentView?.puzzle;
  }

  roomByName(name: string) {
    return this.map.rooms.find((r) => r.name === name);
  }

  shareMessage(text: string | undefined, interrupting?: boolean) {
    if (!text) return;
    this.message = text;
    say(text, interrupting);
  }

  moveTo(name: string) {
    this.position = name;
    this.facing = "";
    if (!this.visitedRooms.includes(this.position)) {
      this.shareMessage(this.currentRoom?.intro);
      this.visitedRooms.push(this.position);
    } else {
      this.inspect();
    }
    if (this.currentRoom?.name === "End") {
      this.shareMessage("You have escaped the lab!", true);
      this.clearProps();
    }
  }

  lookAt(direction: CompassDirection) {
    const shouldInspect = this.facing !== direction;
    this.facing = direction;
    if (shouldInspect) this.inspect();
  }

  inspect() {
    if (this.facing === "")
      this.shareMessage(this.currentRoom?.description, true);
    else {
      this.shareMessage(this.currentView?.description, true);
    }
  }

  interact(index: number) {
    if (!this.currentView) {
      this.inspect();
      return;
    }
    switch (index) {
      case 0: // Space bar
        if (this.currentView?.interaction) {
          this.interaction(this.currentView.interaction);
        }
        break;
      default:
        break;
    }
  }

  interaction(options: Interaction[]) {
    for (let i = 0; i < options.length; i++) {
      const option = options[i];
      if (option.condition) {
        // Move past failed conditions
        if (!this.state[option.condition]) continue;
      }
      if (option.message) {
        this.shareMessage(option.message);
      }
      if (option.action) {
        this.action(option.action);
      }

      return;
    }
  }
  savePropsToLocalStorage() {
    localStorage.setItem(
      "dr-swan-lab-props",
      JSON.stringify({
        state: this.state,
        position: this.position,
        facing: this.facing,
        puzzle: this.puzzle,
        visitedRooms: this.visitedRooms,
      }),
    );
  }

  loadPropsFromLocalStorage() {
    const props = JSON.parse(localStorage.getItem("dr-swan-lab-props") || "{}");
    if (props.state) this.state = props.state;
    if (props.position) this.position = props.position;
    if (props.facing) this.facing = props.facing;
    if (props.puzzle) this.puzzle = props.puzzle;
    if (props.visitedRooms) this.visitedRooms = props.visitedRooms;
  }

  clearProps() {
    localStorage.removeItem("dr-swan-lab-props");
  }

  action(command: string) {
    const [action, param] = command.split("_");
    switch (action) {
      case "moveTo":
        Blip();
        this.moveTo(param);
        break;
      case "activate":
        Blip();
        this.state[param] = true;
        this.savePropsToLocalStorage();
        break;
      case "puzzle":
        // Let the puzzle handle the action
        break;
      default:
        break;
    }
  }
}
