export const say = (
  text: string | undefined,
  interrupting?: boolean,
  tts?: boolean,
) => {
  if (!text) return;

  // Use browser TTS
  if (tts) {
    var msg = new SpeechSynthesisUtterance();
    msg.text = text;
    if (interrupting) window.speechSynthesis.cancel();
    window.speechSynthesis.speak(msg);
  }

  // Allow the user's screen reader
  const log = document.getElementById("gameLog");
  if (!log) return;
  let div = document.createElement("div");
  div.textContent = text;
  log.append(div);
  // Tidy the div
  while (log.childNodes.length > 5 && log.firstChild) {
    log.removeChild(log.firstChild);
  }
};
