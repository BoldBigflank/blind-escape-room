import { keyPressed, Sprite, emit } from "kontra";
import * as Tone from "tone";
import { toneLerp } from "../data/sfx";

const rlglProps = {
    state: 'green', // red, yellow
    progress: 0
}

export const RedLight = () => {
    const s = Sprite({
        name: 'redLight',
        x: 150,
        y: 0,
        width: 100,
        height: 100,
        color: 'red',
        props: {},
        update(dt) {
            if (this.solved) return
            if (!this.initialized) {
                this.props = {...rlglProps}
                this.initialized = true
                const vol = new Tone.Volume(-25).toDestination()
                this.props.osc = new Tone.Oscillator(440, "sine").connect(vol).start();
            }
            this.color = this.props.state
            if (keyPressed(['space'])) {
                this.props.progress += dt! * 10
                this.props.osc.frequency.value = toneLerp(440, 880, this.props.progress / 100)
                if (this.props.progress >= 100) {
                    emit('activate', 'potionPuzzle')
                    this.solved = true
                    this.props.osc.stop()
                }
            }
            this.advance()
        },
        onExit() {
            this.props.osc.stop()
        },
        onEnter() {
            if (this.props.osc && !this.solved) this.props.osc.start()
        },
        render() {
            if (!this.initialized) return
            this.draw()
            const ctx = this.context
            if (!ctx) return
            ctx.save()
            ctx.fillStyle = "white"
            const fillHeight = 0.8 * this.props.progress
            ctx.fillRect(10, this.height! - fillHeight - 10, this.width! - 20, fillHeight)
            ctx.restore()
        }
    })
    return s
}