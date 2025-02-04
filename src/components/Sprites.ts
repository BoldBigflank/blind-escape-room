import { getCanvas, onKey, Sprite } from 'kontra'
import { GameModel } from './GameModel'
import { CompassDirection, Room } from '../data/map'
import { RedLightSprite } from '../sprites/RedLightGreenLight'

const ROOM_SIZE = 48
const ROOM_PADDING = 8

const RoomSprite = () => Sprite({
    width: ROOM_SIZE,
    height: ROOM_SIZE,
    color: 'blue',
    update(dt) {
        if (!this.gameModel) return
        this.color = this.gameModel.position === this.name ? "blue" : "white"
        this.advance(dt)
    },
    render() {
        if (!this.gameModel || this.width === undefined || this.height === undefined) return
        // Hide rooms that haven't been entered yet
        if (!this.gameModel.visitedRooms.includes(this.name)) return
        this.draw()
        if (this.gameModel.position === this.name) {
            let offsetX = this.width / 2 - 4, offsetY = this.height / 2 - 4
            if (this.gameModel.facing == 'n') offsetY = 0
            if (this.gameModel.facing == 's') offsetY = this.height - 8
            if (this.gameModel.facing == 'w') offsetX = 0
            if (this.gameModel.facing == 'e') offsetX = this.width - 8
            
            if (this.context) {
                this.context.save()
                this.context.fillStyle = 'green'
                this.context.fillRect(offsetX, offsetY, 8, 8)
                this.context.restore()

            }

        }
    },
    views: []
})

export const MapSprite = (gameModel: GameModel) => {
    const c = getCanvas()
    return Sprite({
        x: c.width / 2,
        y: c.height / 2,
        color: 'red',
        width: 128,
        height: 128,
        anchor: {x: 0.5, y: 0.5},
        puzzles: [
            RedLightSprite()
        ],
        lookInput(direction: CompassDirection){
            gameModel.lookAt(direction)
        },
        interactInput(idx: number) {
            gameModel.interact(idx)
        },
        update(dt) {
            if (!this.initialized) {
                const initializedRooms: string[] = []
                const traverseRoom = (currentRoom: Room| undefined, x: number, y: number) => {
                    if (!currentRoom) return
                    if (!initializedRooms.includes(currentRoom.name)) {
                        initializedRooms.push(currentRoom.name)
                        const r = RoomSprite()
                        r.gameModel = gameModel
                        r.name = currentRoom.name
                        r.x = x
                        r.y = y
                        this.addChild(r)
    
                        currentRoom.views.forEach((v) => {
                            if (v.interaction !== undefined) {
                                v.interaction.forEach((i) => {
                                    if (!i.action) return
                                    const [action, connectsTo] = i.action?.split('_')
                                    if (action != "moveTo") return
                                    let newX = x, newY = y
                                    if (v.direction === 'n'){
                                        newY -= (ROOM_SIZE + ROOM_PADDING)
                                    }
                                    if (v.direction === 's') {
                                        newY += (ROOM_SIZE + ROOM_PADDING)
                                    }
                                    if (v.direction === 'w') {
                                        newX -= (ROOM_SIZE + ROOM_PADDING)
                                    }
                                    if (v.direction === 'e') {
                                        newX += (ROOM_SIZE + ROOM_PADDING)
                                    }
                                    traverseRoom(gameModel.roomByName(connectsTo), newX, newY)
                                })
                            }
                        })
                    }
                }
                traverseRoom(gameModel.map.rooms[0], 0, 0)
            
                // Inspect
                onKey(['w', 'arrowup'], () => {
                    this.lookInput("n")
                })
                onKey(['a', 'arrowleft'], () => {
                    this.lookInput("w")
                })
                onKey(['s', 'arrowdown'], () => {
                    this.lookInput("s")
                })
                onKey(['d', 'arrowright'], () => {
                    this.lookInput("e")
                })
                onKey(['esc'], () => {
                    this.lookInput("")
                })
                // Interact
                onKey(['space', 'enter'], () => {
                    this.interactInput(0)
                    console.log('space')
                })
                onKey(['1'], () => {
                    this.interactInput(1)
                })
                onKey(['2'], () => {
                    this.interactInput(2)
                })
                onKey(['3'], () => {
                    this.interactInput(3)
                })
                this.initialized = true
            }
            this.currentPuzzle = this.puzzles.find((p:Sprite) => p.name === gameModel.currentPuzzle)
            this.advance(dt)
            if (this.currentPuzzle) this.currentPuzzle.update(dt)
        },
        render() {
            if (this.currentPuzzle) this.currentPuzzle.render()
            this.draw()
            if (!this.context) return
            this.context.save()
            this.context.fillStyle = "black"
            this.context.font = "12px mono"
            this.context.fillText(gameModel.puzzle, 13, 120)
            this.context.restore()
        }
    })
}