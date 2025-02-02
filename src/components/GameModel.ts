import { map, Map, Room, View, CompassDirection } from '../data/map.ts'
import { say } from '../data/utils.ts'

export class GameModel {
    map: Map
    position: string | undefined
    facing: CompassDirection | ""
    visitedRooms: string[]

    constructor() {
        this.map = map
        this.facing = ""
        this.visitedRooms = []
        this.moveTo(this.map.rooms[0].name)
    }

    public get currentRoom(): Room | undefined {
        return this.map.rooms.find((r) => r.name === this.position)
    }

    public get currentView(): View | undefined {
        return this.currentRoom?.views.find((v) => v.direction == this.facing)
    }

    roomByName(name: string) {
        return this.map.rooms.find(r => r.name === name)
    }

    moveTo(name: string) {
        this.position = name
        this.facing = ""
        if (!this.visitedRooms.includes(this.position)) {
            say(this.currentRoom?.intro)
            this.visitedRooms.push(this.position)
        } else {
            this.inspect()
        }
    }

    lookAt(direction: CompassDirection) {
        this.facing = direction
        this.inspect()
    }

    inspect() {
        if (this.facing === "") 
            say(this.currentRoom?.description)
        else
            say(this.currentView?.description)
    }

    interact(index: number) {
        if (!this.currentView) {
            this.inspect()
            return
        }
        switch (index) {
            case 0:
                if (this.currentView?.action) {
                    this.action(this.currentView.action)
                }
                break
            default:
                break
        }
    }

    action(command: string) {
        const [action, param] = command.split('_')
        switch (action) {
            case 'moveTo':
                this.moveTo(param)
                break
            default:
                break
        }
    }
}