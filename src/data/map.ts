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

const LaboratoryMap = {
  title: "laboratory",
  rooms: [
    {
      name: "Start",
      intro: "You wake up in a closet.",
      description: "The closet.",
      views: [
        {
          direction: "n" as CompassDirection,
          description: "A small button on the north wall.",
          puzzle: "melody",
          interaction: [
            {
              condition: "melodySolved",
              message: "The puzzle is complete",
            },
            {
              condition: "potionSolved",
              message: "Press 1 to play a tone.",
            },
            {
              message: "It doesn't seem to be working.",
            },
          ],
        },
        {
          direction: "e" as CompassDirection,
          description: "The door to the laboratory.",
          interaction: [
            {
              action: "moveTo_Hub",
            },
          ],
        },
        {
          direction: "s" as CompassDirection,
          description: "A small button on the south wall.",
          puzzle: "melody",
          interaction: [
            {
              condition: "melodySolved",
              message: "The puzzle is complete",
            },
            {
              condition: "potionSolved",
              message: "Press 1 to play a tone.",
            },
            {
              message: "It doesn't seem to be working.",
            },
          ],
        },
        {
          direction: "w" as CompassDirection,
          description: "A small button on the west wall.",
          puzzle: "melody",
          interaction: [
            {
              condition: "melodySolved",
              message: "The puzzle is complete",
            },
            {
              condition: "potionSolved",
              message: "Press 1 to play a tone.",
            },
            {
              message: "It doesn't seem to be working.",
            },
          ],
        },
      ],
    },
    {
      name: "Hub",
      intro:
        "The laboratory is brightly lit and furnished with everything a mad scientist could want.",
      description: "The laboratory.",
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
              message: "The door is very locked.",
            },
          ],
        },
        {
          direction: "e" as CompassDirection,
          description: "A computer sits silently on the wall.",
          puzzle: "boot",
          interaction: [
            {
              condition: "cpuSolved",
              message:
                "The oscilloscope is calibrated, a rumble is heard behind the desk nearby",
            },
            {
              condition: "bootSolved",
              action: "moveTo_CPU",
            },
            {
              condition: "animalSolved",
              message:
                "A label reading 'boot sequence' sits above three switches. Press 1, 2, and 3 to interact with the boot sequence.",
            },
            {
              message: "The computer is not powered.",
            },
          ],
        },
        {
          direction: "s" as CompassDirection,
          description: "A potion in front of a suspicious wall.",
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
                "A potion labeled Sensory Enhancer sits on a table. It has a warning that it must be slowly heated first. Hold 1 to add heat to the potion.",
            },
          ],
        },
        {
          direction: "w" as CompassDirection,
          description: "The closet door.",
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
      intro: "The computer shows two wavy lines that currently do not overlap.",
      description:
        "The computer shows an oscilloscope with two inputs. Press 1, 2, 3 to change the pitch, wave and amplitude. Hit space to hear the target wave.",
      views: [
        {
          direction: "n" as CompassDirection,
          description: "",
          puzzle: "oscilloscope",
          interaction: [
            {
              condition: "cpuSolved",
              message: "The waveform is synchronized.",
            },
          ],
        },
        {
          direction: "e" as CompassDirection,
          description: "",
          puzzle: "oscilloscope",
          interaction: [
            {
              condition: "cpuSolved",
              message: "The waveform is synchronized.",
            },
          ],
        },
        {
          direction: "s" as CompassDirection,
          puzzle: "oscilloscope",
          description: "",
          interaction: [
            {
              condition: "cpuSolved",
              message: "The waveform is synchronized.",
            },
          ],
        },
        {
          direction: "w" as CompassDirection,
          description: "Exit.",
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
          description: "A sign showing wind, earth, and water.",
          interaction: [
            {
              message: "A sign showing wind, earth, and water.",
            },
          ],
        },
        {
          direction: "s" as CompassDirection,
          description: "A door to the laboratory",
          interaction: [
            {
              action: "moveTo_Hub",
            },
          ],
        },
        {
          direction: "w" as CompassDirection,
          description: "An eagle says caw, caw, caw.",
          interaction: [],
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
          ],
        },
        {
          direction: "e" as CompassDirection,
          description: "A fish says blub blub.",
          interaction: [],
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
          interaction: [],
        },
      ],
    },
    {
      name: "Combo",
      intro:
        "An elevator with an electronic lock that won't run until all the switches are set high.",
      description: "The elevator.",
      views: [
        {
          direction: "n" as CompassDirection,
          description: "The elevator door.",
          interaction: [
            {
              condition: "comboSolved",
              action: "moveTo_End",
            },
            {
              action: "moveTo_Hub",
            },
          ],
        },
        {
          direction: "e" as CompassDirection,
          description: "Three buttons on the east wall.",
          puzzle: "combo",
          interaction: [
            {
              condition: "comboSolved",
              message:
                "You have set the combination. The elevator has started moving.",
            },
            {
              message:
                "Each button changes two switches. Press 1, 2, 3, to interact with each of three buttons.",
            },
          ],
        },
        {
          direction: "s" as CompassDirection,
          description: "The back of the elevator.",
          interaction: [
            {
              message:
                "There is a cute poster of a kitten hanging on a tree branch.",
            },
          ],
        },
        {
          direction: "w" as CompassDirection,
          description: "Three buttons on the west wall.",
          puzzle: "combo",
          interaction: [
            {
              condition: "comboSolved",
              message:
                "You have set the combination. The elevator has started moving.",
            },
            {
              message:
                "Each button changes two switches. Press 1, 2, 3, to interact with each of three buttons.",
            },
          ],
        },
      ],
    },
    {
      name: "End",
      intro: "The elevator door opens to the outside. You have escaped!",
      description: "The end.",
      views: [
        {
          direction: "n" as CompassDirection,
          description: "This game was made by Alex Swan.",
          interaction: [],
        },
        {
          direction: "e" as CompassDirection,
          description:
            "This game was made for the Games for Blind Gamers 4 Jam.",
          interaction: [],
        },
        {
          direction: "s" as CompassDirection,
          description: "Thank you for playing!",
          interaction: [],
        },
        {
          direction: "w" as CompassDirection,
          description: "You are free!",
          interaction: [],
        },
      ],
    },
  ],
};

export const map = LaboratoryMap;
