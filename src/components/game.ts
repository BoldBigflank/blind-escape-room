import { init, Sprite, GameLoop, initGamepad, initKeys } from "kontra";
import { MapSprite } from "./Sprites";
import { GameModel } from "./GameModel";

export const initGame = () => {
  initGamepad();
  initKeys();

  const gameModel = new GameModel(); // Model/controller
  // let { canvas, context } = init()
  init();

  const sprites: Sprite[] = [];

  sprites.push(MapSprite(gameModel)); // View

  let loop = GameLoop({
    update: function (dt) {
      sprites.forEach((s) => s.update(dt));
    },
    render: function () {
      sprites.forEach((s) => s.render());
    },
  });

  loop.start();
  document.getElementById("renderCanvas")?.focus();
};
