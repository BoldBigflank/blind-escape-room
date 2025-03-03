import { onGamepad, onKey, Sprite } from "kontra";
import { GameModel } from "./GameModel";
import { CompassDirection, Room } from "../data/map";
import { RedLight } from "../sprites/RedLightGreenLight";
import { ComboLight } from "../sprites/ComboLight";
import { Generator } from "../sprites/Generator";
import { Oscilloscope } from "../sprites/Oscilloscope";
import { Melody } from "../sprites/Melody";
import { Boot } from "../sprites/Boot";

const ROOM_SIZE = 48;
const ROOM_PADDING = 8;
const MAP_OFFSET_X = 0;
const MAP_OFFSET_Y = 200;

const RoomSprite = () =>
  Sprite({
    width: ROOM_SIZE,
    height: ROOM_SIZE,
    color: "blue",
    update(dt) {
      if (!this.gameModel) return;
      this.color = this.gameModel.position === this.name ? "blue" : "white";
      this.advance(dt);
    },
    render() {
      if (
        !this.gameModel ||
        this.width === undefined ||
        this.height === undefined
      )
        return;
      // Hide rooms that haven't been entered yet
      if (!this.gameModel.visitedRooms.includes(this.name)) return;
      this.draw();
      if (this.gameModel.position === this.name) {
        let offsetX = this.width / 2 - 4,
          offsetY = this.height / 2 - 4;
        if (this.gameModel.facing == "n") offsetY = 0;
        if (this.gameModel.facing == "s") offsetY = this.height - 8;
        if (this.gameModel.facing == "w") offsetX = 0;
        if (this.gameModel.facing == "e") offsetX = this.width - 8;

        if (this.context) {
          this.context.save();
          this.context.fillStyle = "green";
          this.context.fillRect(offsetX, offsetY, 8, 8);
          this.context.restore();
        }
      }
    },
    views: [],
  });

export const MapSprite = (gameModel: GameModel) => {
  return Sprite({
    x: 0,
    y: 0,
    anchor: { x: 0.5, y: 0.5 },
    puzzles: [
      RedLight(),
      ComboLight(),
      Generator(),
      Oscilloscope(),
      Melody(),
      Boot(),
    ],
    lookInput(direction: CompassDirection) {
      gameModel.lookAt(direction);
    },
    interactInput(idx: number) {
      gameModel.interact(idx);
      if (this.currentPuzzle && this.currentPuzzle.onInteract)
        this.currentPuzzle.onInteract(idx);
    },
    update(dt) {
      if (!this.initialized) {
        const initializedRooms: string[] = [];
        const traverseRoom = (
          currentRoom: Room | undefined,
          x: number,
          y: number,
        ) => {
          if (!currentRoom) return;
          if (!initializedRooms.includes(currentRoom.name)) {
            initializedRooms.push(currentRoom.name);
            const r = RoomSprite();
            r.gameModel = gameModel;
            r.name = currentRoom.name;
            r.x = x + MAP_OFFSET_X;
            r.y = y + MAP_OFFSET_Y;
            this.addChild(r);

            currentRoom.views.forEach((v) => {
              if (v.interaction !== undefined) {
                v.interaction.forEach((i) => {
                  if (!i.action) return;
                  const [action, connectsTo] = i.action?.split("_");
                  if (action != "moveTo") return;
                  let newX = x,
                    newY = y;
                  if (v.direction === "n") {
                    newY -= ROOM_SIZE + ROOM_PADDING;
                  }
                  if (v.direction === "s") {
                    newY += ROOM_SIZE + ROOM_PADDING;
                  }
                  if (v.direction === "w") {
                    newX -= ROOM_SIZE + ROOM_PADDING;
                  }
                  if (v.direction === "e") {
                    newX += ROOM_SIZE + ROOM_PADDING;
                  }
                  traverseRoom(gameModel.roomByName(connectsTo), newX, newY);
                });
              }
            });
          }
        };
        traverseRoom(gameModel.map.rooms[0], 0, 0);

        // Inspect
        onKey(["w", "arrowup"], () => {
          this.lookInput("n");
        });
        onKey(["a", "arrowleft"], () => {
          this.lookInput("w");
        });
        onKey(["s", "arrowdown"], () => {
          this.lookInput("s");
        });
        onKey(["d", "arrowright"], () => {
          this.lookInput("e");
        });
        onKey(["esc"], () => {
          this.lookInput("");
        });
        // Interact
        onKey(["space", "enter"], () => {
          this.interactInput(0);
        });
        onKey(["1"], () => {
          this.interactInput(1);
        });
        onKey(["2"], () => {
          this.interactInput(2);
        });
        onKey(["3"], () => {
          this.interactInput(3);
        });

        onGamepad(["dpadup"], () => {
          this.lookInput("n");
        });
        onGamepad(["dpadright"], () => {
          this.lookInput("e");
        });
        onGamepad(["dpaddown"], () => {
          this.lookInput("s");
        });
        onGamepad(["dpadleft"], () => {
          this.lookInput("w");
        });

        onGamepad(["south"], () => {
          this.interactInput(0);
        });
        onGamepad(["west"], () => {
          this.interactInput(1);
        });
        onGamepad(["north"], () => {
          this.interactInput(2);
        });
        onGamepad(["east"], () => {
          this.interactInput(3);
        });

        this.initialized = true;
      }
      this.advance(dt);
      const currentPuzzle = this.puzzles.find(
        (p: Sprite) => p.name === gameModel.currentPuzzle,
      );
      if (this.currentPuzzle !== currentPuzzle) {
        if (this.currentPuzzle && this.currentPuzzle.onExit)
          this.currentPuzzle.onExit();
        this.currentPuzzle = currentPuzzle;
        if (this.currentPuzzle) {
          this.currentPuzzle.gameModel = gameModel;
          if (this.currentPuzzle.onEnter) this.currentPuzzle.onEnter();
        }
      }
      if (this.currentPuzzle) this.currentPuzzle.update(dt);
    },
    render() {
      if (!this.context) return;
      if (!gameModel) return;
      this.context.save();
      this.context.fillStyle = "black";
      this.context.fillRect(160, 0, 480, 400);
      this.context.restore();

      this.context.save();
      this.context.fillStyle = "#303030";
      this.context.fillRect(0, 400, 640, 80);
      this.context.fillStyle = "white";
      this.context.textBaseline = "top";
      if (gameModel.message !== undefined) {
        this.context.font = `${gameModel.message.length > 110 ? 18 : 24}px monospace`;
        if (this.context.measureText(gameModel.message).width < 600) {
          this.context.fillText(gameModel.message || "", 10, 410);
        } else {
          const breakpoint = gameModel.message
            .substring(0, Math.floor(gameModel.message.length / 2) + 1)
            .lastIndexOf(" ");
          this.context.fillText(
            gameModel.message.substring(0, breakpoint) || "",
            10,
            410,
          );
          this.context.fillText(
            gameModel.message.substring(breakpoint + 1) || "",
            10,
            444,
          );
        }
      }
      this.context.restore();

      if (this.currentPuzzle) this.currentPuzzle.render();
    },
  });
};
