export type CompassDirection = "n" | "s" | "e" | "w";

export type Interaction = {
  condition?: string;
  message?: string;
  action?: string;
};

export type View = {
  direction: CompassDirection;
  interaction: Interaction[];
  description: string;
  puzzle?: string;
};

export type Room = {
  name: string;
  intro?: string;
  description: string;
  views: View[];
};

export type Map = {
  title: string;
  rooms: Room[];
};
/* 
const testMap = {
  title: "test",
  rooms: [
    {
      name: "lobby",
      intro:
        "You have arrived. Use the arrow keys to look around. Use space bar to interact.",
      description: "This is the lobby.",
      views: [
        {
          direction: "n" as CompassDirection,
          description: "A door to the kitchen.",
          interaction: [
            {
              condition: "kitchenDoor",
              message: "You walk through the open door.",
              action: "moveTo_kitchen",
            },
            {
              message: "It's locked!",
            },
          ],
        },
        {
          direction: "e" as CompassDirection,
          description: "A flower with a delightful scent on a table.",
          interaction: [
            {
              condition: "kitchenDoor",
              message: "The button is pressed. What door opened?",
            },
            {
              message: "You find a hidden button and press it. A door opens.",
              action: "activate_kitchenDoor",
            },
          ],
        },
        {
          direction: "s" as CompassDirection,
          description: "A locked door to the outside.",
        },
        {
          direction: "w" as CompassDirection,
          description: "A mirror, which isn't too helpful.",
        },
      ],
    },
    {
      name: "kitchen",
      intro: "You walk into the kitchen",
      description: "This is the kitchen.",
      views: [
        {
          direction: "n" as CompassDirection,
          description: "Some pots and pans on a counter.",
        },
        {
          direction: "e" as CompassDirection,
          description: "A gas stove.",
          puzzle: "redLight",
        },
        {
          direction: "s" as CompassDirection,
          interaction: [
            {
              action: "moveTo_lobby",
            },
          ],
          description: "There is a door to the lobby.",
        },
        {
          direction: "w" as CompassDirection,
          description: "A large sink.",
        },
      ],
    },
  ],
} as Map;
 */
const LaboratoryMap = {
  title: "laboratory",
  rooms: [
    {
      name: "Start",
      intro: "Start",
      description: "Start",
      views: [
        {
          direction: "n" as CompassDirection,
          description: "Melody1",
          puzzle: "melody",
          interaction: [
            {
              condition: "melodySolved",
              message: "The puzzle is complete",
            },
            {
              condition: "potionSolved",
              message: "You play a tune.",
              action: "activate_melodySolved",
            },
            {
              message: "There's no noticeable effect.",
            },
          ],
        },
        {
          direction: "e" as CompassDirection,
          description: "The door to the Hub",
          interaction: [
            {
              action: "moveTo_Hub",
            },
          ],
        },
        {
          direction: "s" as CompassDirection,
          description: "Melody3",
          puzzle: "melody",
          interaction: [
            {
              condition: "melodySolved",
              message: "The puzzle is complete",
            },
            {
              condition: "potionSolved",
              message: "You play a tune.",
              action: "activate_melodySolved",
            },
            {
              message: "There's no noticeable effect.",
            },
          ],
        },
        {
          direction: "w" as CompassDirection,
          description: "Melody2",
          puzzle: "melody",
          interaction: [
            {
              condition: "melodySolved",
              message: "The puzzle is complete",
            },
            {
              condition: "potionSolved",
              message: "You play a tune.",
              action: "activate_melodySolved",
            },
            {
              message: "There's no noticeable effect.",
            },
          ],
        },
      ],
    },
    {
      name: "Hub",
      intro: "Hub",
      description: "Hub",
      views: [
        {
          direction: "n" as CompassDirection,
          description: "The large door with an electronic lock.",
          puzzle: "melody",
          interaction: [
            {
              condition: "melodySolved",
              message: "You walk through the open door.",
              action: "moveTo_Animal1",
            },
            {
              message: "The door won't budge.",
            },
          ],
        },
        {
          direction: "e" as CompassDirection,
          description: "A Computer",
          interaction: [
            {
              condition: "animalSolved",
              message: "You sit at the computer.",
              action: "moveTo_CPU",
            },
            {
              message: "The computer is not powered.",
            },
          ],
        },
        {
          direction: "s" as CompassDirection,
          description: "A door to the Combo Room",
          puzzle: "redLight",
          interaction: [
            {
              condition: "cpuSolved",
              action: "moveTo_Combo",
            },
            {
              condition: "potionSolved",
              message: "The potion is consumed.",
            },
            {
              message:
                "A potion on a burner needs to be heated at the proper speed.",
            },
          ],
        },
        {
          direction: "w" as CompassDirection,
          description: "A door to the Start",
          interaction: [
            {
              action: "moveTo_Start",
            },
          ],
        },
      ],
    },
    {
      name: "CPU",
      intro: "CPU",
      description: "CPU",
      views: [
        {
          direction: "n" as CompassDirection,
          description: "Amplitude",
          interaction: [
            {
              condition: "cpuSolved",
              message: "The waveform is synchronized.",
            },
            {
              action: "activate_cpuSolved",
              message: "You synchronize the waveform",
            },
          ],
        },
        {
          direction: "e" as CompassDirection,
          description: "Phase",
          interaction: [
            {
              message: "DefaultInteraction",
            },
          ],
        },
        {
          direction: "s" as CompassDirection,
          description: "Frequency",
          interaction: [
            {
              message: "DefaultInteraction",
            },
          ],
        },
        {
          direction: "w" as CompassDirection,
          description: "Exit the computer",
          interaction: [
            {
              action: "moveTo_Hub",
            },
          ],
        },
      ],
    },
    {
      name: "Animal1",
      intro: "A long hallway with caged animals making noises.",
      description: "Caged animal room",
      views: [
        {
          direction: "n" as CompassDirection,
          description: "The animal room continues",
          interaction: [
            {
              action: "moveTo_Animal2",
            },
          ],
        },
        {
          direction: "e" as CompassDirection,
          description: "A sign showing wind, earth, and water",
          interaction: [
            {
              message: "DefaultInteraction",
            },
          ],
        },
        {
          direction: "s" as CompassDirection,
          description: "A door to the Hub",
          interaction: [
            {
              action: "moveTo_Hub",
            },
          ],
        },
        {
          direction: "w" as CompassDirection,
          description: "An eagle says caw, caw, caw.",
          interaction: [
            {
              message: "DefaultInteraction",
            },
          ],
        },
      ],
    },
    {
      name: "Animal2",
      intro: "Even more animals are caged here.",
      description: "The north side of the animal room.",
      views: [
        {
          direction: "n" as CompassDirection,
          description: "A generator with a 3-button combination lock",
          puzzle: "animal",
          interaction: [
            {
              condition: "animalSolved",
              message: "The generator is on.",
            },
            {
              action: "activate_animalSolved",
              message: "The generator kicks on.",
            },
          ],
        },
        {
          direction: "e" as CompassDirection,
          description: "A fish says blub.",
          interaction: [
            {
              message: "DefaultInteraction",
            },
          ],
        },
        {
          direction: "s" as CompassDirection,
          description: "The animal room continues",
          interaction: [
            {
              action: "moveTo_Animal1",
            },
          ],
        },
        {
          direction: "w" as CompassDirection,
          description: "A chimpanzee says ooh ooh eeh eeh.",
          interaction: [
            {
              message: "DefaultInteraction",
            },
          ],
        },
      ],
    },
    {
      name: "Combo",
      intro: "Combo",
      description: "Combo",
      views: [
        {
          direction: "n" as CompassDirection,
          description: "A door to the Hub",
          interaction: [
            {
              action: "moveTo_Hub",
            },
          ],
        },
        {
          direction: "e" as CompassDirection,
          description: "A series of buttons",
          interaction: [
            {
              message: "DefaultInteraction",
            },
          ],
        },
        {
          direction: "s" as CompassDirection,
          description: "A door",
          interaction: [
            {
              condition: "comboSolved",
              action: "moveTo_End",
            },
            {
              message: "The exit door.",
            },
          ],
        },
        {
          direction: "w" as CompassDirection,
          description: "A series of buttons",
          interaction: [
            {
              condition: "comboSolved",
              message: "You have set the combination.",
            },
            {
              action: "activate_comboSolved",
              message: "A door unlocks.",
            },
          ],
        },
      ],
    },
    {
      name: "End",
      intro: "You made it to the end.",
      description: "End",
      views: [
        {
          direction: "n" as CompassDirection,
          description: "A door to the Combo room",
          interaction: [
            {
              action: "moveTo_Combo",
            },
          ],
        },
        {
          direction: "e" as CompassDirection,
          description: "ViewDescription",
          interaction: [
            {
              message: "DefaultInteraction",
            },
          ],
        },
        {
          direction: "s" as CompassDirection,
          description: "ViewDescription",
          interaction: [
            {
              message: "DefaultInteraction",
            },
          ],
        },
        {
          direction: "w" as CompassDirection,
          description: "ViewDescription",
          interaction: [
            {
              message: "DefaultInteraction",
            },
          ],
        },
      ],
    },
  ],
};

export const map = LaboratoryMap;
