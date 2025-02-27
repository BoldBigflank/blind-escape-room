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

const testMap = {
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

/* room template
{
    "name": "RoomName",
    "intro": "LongDescription",
    "description": "ShortDescription",
    "views":[{
        "direction": "n",
        "description": "ViewDescription",
        "interaction": [{
            "message": "DefaultInteraction"
        }]
    },{
        "direction": "e",
        "description": "ViewDescription",
        "interaction": [{
            "message": "DefaultInteraction"
        }]
    },{
        "direction": "s",
        "description": "ViewDescription",
        "interaction": [{
            "message": "DefaultInteraction"
        }]
    },{
        "direction": "w",
        "description": "ViewDescription",
        "interaction": [{
            "message": "DefaultInteraction"
        }]
    },]
},
 */

const LaboratoryMap = {
    "title": "laboratory",
    "rooms": [{
        "name": "Start",
        "intro": "Start",
        "description": "Start",
        "views":[{
            "direction": "n",
            "description": "Melody1",
            "interaction": [{
                "condition": "melodyPuzzle",
                "message": "The puzzle is complete"
            },{
                "message": "The melody is complete",
                "action": "activate_melodyPuzzle",
            }]
        },{
            "direction": "e",
            "description": "The door to the Hub",
            "interaction": [{
                "action": "moveTo_Hub",
            }]
        },{
            "direction": "s",
            "description": "Melody3",
            "interaction": [{
                "message": "DefaultInteraction"
            }]
        },{
            "direction": "w",
            "description": "Melody2",
            "interaction": [{
                "message": "DefaultInteraction"
            }]
        },]
    },{
        "name": "Hub",
        "intro": "Hub",
        "description": "Hub",
        "views":[{
            "direction": "n",
            "description": "The large door with an electronic lock.",
            "interaction": [{
                "condition": "melodyPuzzle",
                "message": "You walk through the open door.",
                "action": "moveTo_Animal1",
            },{
                "message": "The door won't budge."
            }]
        },{
            "direction": "e",
            "description": "A Computer",
            "interaction": [{
                "condition": "animalPuzzle",
                "message": "You sit at the computer.",
                "action": "moveTo_CPU",
            },{
                "message": "The computer is not powered."
            }]
        },{
            "direction": "s",
            "description": "A door to the Combo Room",
            "interaction": [{
                "condition": "cpuPuzzle",
                "action": "moveTo_Combo",
            },{
                "message": "The potion is here."
            }]
        },{
            "direction": "w",
            "description": "A door to the Start",
            "interaction": [{
                "action": "moveTo_Start",
            }]
        },]
    },{
        "name": "CPU",
        "intro": "CPU",
        "description": "CPU",
        "views":[{
            "direction": "n",
            "description": "Amplitude",
            "interaction": [{
                "condition": "cpuPuzzle",
                "message": "The waveform is synchronized."
            },{
                "action": "activate_cpuPuzzle",
                "message": "You synchronize the waveform"
            }]
        },{
            "direction": "e",
            "description": "Phase",
            "interaction": [{
                "message": "DefaultInteraction"
            }]
        },{
            "direction": "s",
            "description": "Frequency",
            "interaction": [{
                "message": "DefaultInteraction"
            }]
        },{
            "direction": "w",
            "description": "Exit the computer",
            "interaction": [{
                "action": "moveTo_Hub",
            }]
        },]
    },{
        "name": "Animal1",
        "intro": "Animal1",
        "description": "Animal1",
        "views":[{
            "direction": "n",
            "description": "The animal room continues",
            "interaction": [{
                "action": "moveTo_Animal2",
            }]
        },{
            "direction": "e",
            "description": "A sign showing wind, earth, and water",
            "interaction": [{
                "message": "DefaultInteraction"
            }]
        },{
            "direction": "s",
            "description": "A door to the Hub",
            "interaction": [{
                "action": "moveTo_Hub",
            }]
        },{
            "direction": "w",
            "description": "An eagle",
            "interaction": [{
                "message": "DefaultInteraction"
            }]
        },]
    },{
        "name": "Animal2",
        "intro": "Animal2",
        "description": "Animal2",
        "views":[{
            "direction": "n",
            "description": "A generator with a 3-button combination lock",
            "interaction": [{
                "condition": "animalPuzzle",
                "message": "The generator is on."
            },{
                "action": "activate_animalPuzzle",
                "message": "The generator kicks on."
            }]
        },{
            "direction": "e",
            "description": "A fish",
            "interaction": [{
                "message": "DefaultInteraction"
            }]
        },{
            "direction": "s",
            "description": "The animal room continues",
            "interaction": [{
                "action": "moveTo_Animal1",
            }]
        },{
            "direction": "w",
            "description": "A chimpanzee",
            "interaction": [{
                "message": "DefaultInteraction"
            }]
        },]
    },{
        "name": "Combo",
        "intro": "Combo",
        "description": "Combo",
        "views":[{
            "direction": "n",
            "description": "A door to the Hub",
            "interaction": [{
                "action": "moveTo_Hub",
            }]
        },{
            "direction": "e",
            "description": "A series of buttons",
            "interaction": [{
                "message": "DefaultInteraction"
            }]
        },{
            "direction": "s",
            "description": "A door",
            "interaction": [{
                "action": "moveTo_End",
            }]
        },{
            "direction": "w",
            "description": "A series of buttons",
            "interaction": [{
                "condition": "comboPuzzle",
                "message": "You have set the combination."
            },{
                "action": "activate_comboPuzzle",
                "message": "A door unlocks."
            }]
        },]
    },{
        "name": "End",
        "intro": "You made it to the end.",
        "description": "End",
        "views":[{
            "direction": "n",
            "description": "A door to the Combo room",
            "interaction": [{
                "action": "moveTo_Combo",
            }]
        },{
            "direction": "e",
            "description": "ViewDescription",
            "interaction": [{
                "message": "DefaultInteraction"
            }]
        },{
            "direction": "s",
            "description": "ViewDescription",
            "interaction": [{
                "message": "DefaultInteraction"
            }]
        },{
            "direction": "w",
            "description": "ViewDescription",
            "interaction": [{
                "message": "DefaultInteraction"
            }]
        },]
    },]
}

export const map = LaboratoryMap