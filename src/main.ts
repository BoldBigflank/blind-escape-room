import "./style.css";
import { initGame } from "./components/game.ts";

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
  <div>
    <div id="intro">
      <div id="story">
        <h3>Story</h3>
        <p>You find yourself inside a mad scientist's laboratory. There must be a way out, but it is hidden behind some puzzles.</p>
      </div>
      <div id="controls">
        <h3>Controls</h3>
        Use the arrow keys to look in a compass direction (north, south, east, west).
        Use the space bar to move.
        Use number 1, 2, and 3 to interact with your current view.
      </div>
      <div class="logo">
        <button id="playButton">Play</button>
      </div>
    </div>
    <div class="card" role="application">
      <canvas id="renderCanvas" style="display:none;" width=640 height=480></canvas>
    </div>
  </div>
`;

window.addEventListener("DOMContentLoaded", () => {
  const b = document.getElementById("playButton");
  if (!b) return;
  b.onclick = () => {
    document.getElementById("intro")!.style.display = "none";
    document.getElementById("renderCanvas")!.style.display = "block";
    initGame();
  };
});
