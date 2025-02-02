export type CompassDirection = "n"|"s"|"e"|"w"

export type View = {
    direction: CompassDirection
    action: string | undefined
    description: string
}

export type Room = {
    name: string
    intro?: string
    description: string
    views: View[]
}

export type Map = {
    title: string
    rooms: Room[]
}


export const map = {
    "title": "test",
    "rooms": [
        {
            "name": "lobby",
            "intro": "You have arrived. Use the arrow keys to look around. Use space bar to interact.",
            "description": "This is the lobby.",
            "views": [
                {
                    "direction": "n",
                    "description": "A door to the kitchen.",
                    "action": "moveTo_kitchen"
                },
                {
                    "direction": "e",
                    "description": "A flower with a delightful scent on a table."
                },
                {
                    "direction": "s",
                    "description": "A locked door to the outside."
                },
                {
                    "direction": "w",
                    "description": "A mirror, which isn't too helpful."
                }
            ]
        },
        {
            "name": "kitchen",
            "intro": "You walk into the kitchen",
            "description": "This is the kitchen.",
            "views": [
                {
                    "direction": "n",
                    "description": "Some pots and pans on a counter."
                },
                {
                    "direction": "e",
                    "description": "A gas stove."
                },
                {
                    "direction": "s",
                    "action": "moveTo_lobby",
                    "description": "There is a door to the lobby."
                },
                {
                    "direction": "w",
                    "description": "A large sink."
                }
            ]
        }
    ]
} as Map