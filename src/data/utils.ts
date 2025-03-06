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

  // Clear previous content and add new message
  log.innerHTML = '';
  let div = document.createElement("div");
  div.textContent = text;
  log.append(div);
};
