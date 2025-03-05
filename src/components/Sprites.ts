import { load, onGamepad, onKey, Sprite } from "kontra";
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

const ImageSprite = (image) =>
  Sprite({
    x: 170,
    y: 10,
    anchor: { x: 0, y: 0 },
    image,
    render() {
      const ctx = this.context;
      if (!ctx) return;
      ctx.save();
      ctx.scale(2, 2);
      this.draw();
      ctx.restore();
    },
  });

const RoomSprite = () =>
  Sprite({
    width: ROOM_SIZE,
    height: ROOM_SIZE,
    update(dt) {
      if (!this.gameModel) return;
      this.color =
        this.gameModel.position === this.name ? "#3fe4e4" : "#808080";
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
          this.context.fillStyle = "white";
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
        const imageNames: string[] = [];
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
              // Find the images to load
              if (v.image !== undefined) {
                v.image.forEach((ic) => {
                  if (!imageNames.includes(ic.path)) {
                    imageNames.push(ic.path);
                  }
                });
              }
            });
          }
        };
        traverseRoom(gameModel.map.rooms[0], 0, 0);

        load(...imageNames.map((p) => p + ".png")).then((assets) => {
          this.assets = assets.map((image, index) => {
            return {
              image,
              path: imageNames[index],
            };
          });
          this.imageSprite = ImageSprite(
            this.assets.find((a) => a.path === gameModel.currentImage).image,
          );
          // this.addChild(this.imageSprite);
        });

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
      if (this.assets) {
        const currentImage = gameModel.currentImage;
        this.imageSprite.image = this.assets.find(
          (a) => a.path === currentImage,
        ).image;
        this.imageSprite.update();
      }
    },
    render() {
      const ctx = this.context;
      if (!ctx || !gameModel) return;

      // Draw main game area background
      ctx.save();
      ctx.fillStyle = "black";
      ctx.fillRect(160, 0, 480, 400);
      ctx.restore();

      // Draw message area
      ctx.save();
      ctx.fillStyle = "#303030";
      ctx.fillRect(0, 400, 640, 80);

      // Render message text if present
      if (gameModel.message !== undefined) {
        ctx.fillStyle = "white";
        ctx.textBaseline = "top";
        
        const maxWidth = 620; // Available width for text
        const maxHeight = 60; // Available height for text
        const words = gameModel.message.split(" ");
        const lines: string[] = [];
        let currentLine = words[0];

        // Try to fit all words in one line first
        for (let i = 1; i < words.length; i++) {
          const width = ctx.measureText(currentLine + " " + words[i]).width;
          if (width < maxWidth) {
            currentLine += " " + words[i];
          } else {
            // If we can't fit in one line, split into two lines
            lines.push(currentLine);
            currentLine = words[i];
            // Add remaining words to second line
            for (let j = i + 1; j < words.length; j++) {
              currentLine += " " + words[j];
            }
            break;
          }
        }
        if (lines.length === 0) {
          lines.push(currentLine);
        } else {
          lines.push(currentLine);
        }

        // Set font size based on number of lines
        let fontSize = 20; // Default size
        ctx.font = `${fontSize}px monospace`;
        
        // Check if single line fits at default size
        if (lines.length === 1) {
          const width = ctx.measureText(lines[0]).width;
          if (width > maxWidth) {
            // If single line doesn't fit, split into two lines
            const midPoint = Math.floor(words.length / 2);
            lines[0] = words.slice(0, midPoint).join(" ");
            lines[1] = words.slice(midPoint).join(" ");
          }
        }
        
        // Scale down if we have two lines
        if (lines.length > 1) {
          // Find the widest line
          const maxLineWidth = Math.max(...lines.map(line => 
            ctx.measureText(line).width
          ));
          
          // Calculate font size ratio to fit width
          if (maxLineWidth > maxWidth) {
            fontSize = Math.floor(fontSize * (maxWidth / maxLineWidth));
            // Ensure we don't go below minimum size
            fontSize = Math.max(fontSize, 12);
          }
        }

        // Set the calculated font size
        ctx.font = `${fontSize}px monospace`;

        // Render all lines
        lines.forEach((line, index) => {
          ctx.fillText(line, 10, 410 + (index * (maxHeight/lines.length)));
        });
      }
      ctx.restore();

      // Render game components
      if (this.imageSprite) this.imageSprite.render();
      if (this.currentPuzzle) this.currentPuzzle.render();
    },
  });
};
