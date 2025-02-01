export const say = (text: string | undefined) => {
    var msg = new SpeechSynthesisUtterance();
    msg.text = text || "hello world";
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(msg);
}