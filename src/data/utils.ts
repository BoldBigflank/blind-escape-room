export const say = (text: string | undefined, interrupting?: boolean) => {
  var msg = new SpeechSynthesisUtterance();
  if (!text) return;
  msg.text = text;
  if (interrupting) window.speechSynthesis.cancel();
  window.speechSynthesis.speak(msg);
};
