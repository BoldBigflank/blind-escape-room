export type CompassDirection = "n"|"s"|"e"|"w"

export type View = {
    direction: CompassDirection
    connectsTo: string | null
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
            "intro": "You have arrived.",
            "description": "This is the lobby.",
            "views": [
                {
                    "direction": "n",
                    "connectsTo": "kitchen",
                    "description": "A door to the kitchen."
                },
                {
                    "direction": "e",
                    "connectsTo": null,
                    "description": "A flower with a delightful scent on a table."
                },
                {
                    "direction": "s",
                    "connectsTo": null,
                    "description": "A locked door to the outside."
                },
                {
                    "direction": "w",
                    "connectsTo": null,
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
                    "connectsTo": null,
                    "description": "Some pots and pans on a counter."
                },
                {
                    "direction": "e",
                    "connectsTo": null,
                    "description": "A gas stove."
                },
                {
                    "direction": "s",
                    "connectsTo": "lobby",
                    "description": "There is a door to the lobby."
                },
                {
                    "direction": "w",
                    "connectsTo": null,
                    "description": "A large sink."
                }
            ]
        }
    ]
} as Map