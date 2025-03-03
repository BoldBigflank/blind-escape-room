import "./style.css";
import { initGame } from "./components/game.ts";

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
  <div>
    <div id="intro">
      <div id="story">
        <h3>Story</h3>
        <p>You find yourself inside a mad scientist's laboratory.<br/>There must be a way out, but it is hidden behind some puzzles.</p>
      </div>
      <div id="controls">
        <h3>Controls</h3>
        Use the arrow keys to look in a compass direction (north, south, east, west).<br/>
        Use the space bar to move.<br/>
        Use number 1, 2, and 3 to interact with your current view.<br/>
        </div>
        <div id="preferences">
        <h3>Preferences</h3>
          <input type="checkbox" id="tts" name="tts" value="on">
          <label for="tts">Use browser TTS</label><br>
        </div>
      <div class="logo">
        <button id="playButton">Play</button>
      </div>
    </div>
    <div class="card" role="application">
      <canvas id="renderCanvas" style="display:none;" width=640 height=480 tabindex=0></canvas>
    </div>
    <div role="region" id="gameLog" class="visually-hidden" aria-live="assertive" aria-relevant="additions">
    </div>
  </div>
`;

window.addEventListener("DOMContentLoaded", () => {
  const ttsStorageKey = "dr-swan-lab-tts";
  // Checkbox localstorage
  const tts = localStorage.getItem(ttsStorageKey);
  const ttsElement = document.getElementById("tts") as HTMLInputElement;
  if (ttsElement) {
    if (tts === "true") ttsElement.checked = true;
    ttsElement.onclick = () => {
      localStorage.setItem(
        ttsStorageKey,
        ttsElement.checked ? "true" : "false",
      );
    };
  }

  //
  const b = document.getElementById("playButton");
  if (!b) return;
  b.onclick = () => {
    document.getElementById("intro")!.style.display = "none";
    document.getElementById("renderCanvas")!.style.display = "block";
    initGame();
  };
});
