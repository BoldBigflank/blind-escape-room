import './style.css'
import { initGame } from './components/game.ts'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <div class="card">
      <canvas width=640 height=480></canvas>
    </div>
  </div>
`

initGame()