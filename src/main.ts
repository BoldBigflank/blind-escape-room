import './style.css'
import { initGame } from './components/game.ts'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <div id="intro">
      <div id="story">
        <h3>Story</h3>
        <p>You are a person. You are tasked with escaping the escape room.</p>
      </div>
      <div id="controls">
        <h3>Controls</h3>
        Use the keyboard and space bar to interact
      </div>
      <div class="logo">
        <button id="playButton">Play</button>
      </div>
    </div>
    <div class="card">
      <canvas id="renderCanvas" style="display:none;" width=640 height=480></canvas>
    </div>
  </div>
`

window.addEventListener('DOMContentLoaded', () => {
  const b = document.getElementById('playButton')
  if (!b) return
  b.onclick = () => {
    document.getElementById('intro')!.style.display = 'none'
    document.getElementById('renderCanvas')!.style.display = "block"
    initGame()
  }
})