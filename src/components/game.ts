import { init, Sprite, GameLoop, initGamepad, initKeys } from 'kontra'
import { MapSprite } from './Sprites';
import { GameModel } from './GameModel';
import { RedLightSprite } from '../sprites/RedLightGreenLight';

export const initGame = () => {
  initGamepad();
  initKeys();

  const gameModel = new GameModel() // Model/controller
  // let { canvas, context } = init()
  init()
  
  const sprites: Sprite[] = []
  const addPuzzleToSprites = (puzzle: Sprite) => {
    puzzle.hidden = true
    sprites.push(puzzle)
  }

  sprites.push(MapSprite(gameModel)) // View
  // addPuzzleToSprites(RedLightSprite())
  
  let loop = GameLoop({
    update: function(dt) {
      sprites.forEach((s) => s.update(dt))
    },
    render: function() {
      sprites.forEach((s) => s.render())
    }
  });
  
  loop.start();
}