import { keyPressed, Sprite, emit } from "kontra";

const rlglProps = {
    state: 'green', // red, yellow
    progress: 0
}

export const RedLightSprite = () => {
    const s = Sprite({
        name: 'redLight',
        x: 150,
        y: 0,
        width: 100,
        height: 100,
        color: 'red',
        update(dt) {
            if (this.solved) return
            if (!this.initialized) {
                this.props = {...rlglProps}
                this.initialized = true
            }
            this.color = this.props.state
            if (keyPressed(['space'])) {
                this.props.progress += dt * 10
                if (this.props.progress >= 10) {
                    emit('activate', 'redLight')
                    this.solved = true
                }
            }
            this.advance()
        },
        render() {
            if (!this.initialized) return
            this.draw()
            const ctx = this.context
            if (!ctx) return
            ctx.save()
            ctx.fillStyle = "white"
            ctx.fillRect(10, this.height - this.props.progress - 10, this.width - 20, this.props.progress)
            ctx.restore()
        }
    })
    return s
}