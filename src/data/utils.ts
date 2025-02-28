export const say = (text: string | undefined, interrupting?: boolean) => {
  var msg = new SpeechSynthesisUtterance();
  msg.text = text || "hello world";
  if (interrupting) window.speechSynthesis.cancel();
  window.speechSynthesis.speak(msg);
};
