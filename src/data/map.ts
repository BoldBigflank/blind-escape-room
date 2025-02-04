export type CompassDirection = "n"|"s"|"e"|"w"

export type Interaction = {
    condition?: string
    message?: string
    action?: string
}

export type View = {
    direction: CompassDirection
    interaction: Interaction[]
    description: string
    puzzle?: string
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
                    "interaction": [{
                        "condition": "kitchenDoor",
                        "message": "You walk through the open door.",
                        "action": "moveTo_kitchen"
                    },{
                        "message": "It's locked!"
                    }]
                },
                {
                    "direction": "e",
                    "description": "A flower with a delightful scent on a table.",
                    "interaction": [{
                        "condition": "kitchenDoor",
                        "message": "The button is pressed. What door opened?"
                    },{
                        "message": "You find a hidden button and press it. A door opens.",
                        "action":"activate_kitchenDoor"
                    }]
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
                    "description": "A gas stove.",
                    "puzzle": "redLight"
                },
                {
                    "direction": "s",
                    "interaction": [{
                        "action": "moveTo_lobby",
                    }],
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