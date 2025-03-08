export type CompassDirection = "n" | "s" | "e" | "w";

export type Interaction = {
  condition?: string;
  message?: string;
  action?: string;
};

export type ImageCondition = {
  path: string;
  condition?: string;
};

export type View = {
  direction: CompassDirection;
  interaction: Interaction[];
  image: ImageCondition[];
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
          description: "The north wall has a small button.",
          puzzle: "melody",
          image: [
            {
              condition: "potionSolved",
              path: "melody-button",
            },
            {
              path: "melody-button-blank",
            },
          ],
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
          image: [
            {
              path: "closet-door",
            },
          ],
          interaction: [
            {
              action: "moveTo_Hub",
            },
          ],
        },
        {
          direction: "s" as CompassDirection,
          description: "The south wall with a small button.",
          puzzle: "melody",
          image: [
            {
              condition: "potionSolved",
              path: "melody-button",
            },
            {
              path: "melody-button-blank",
            },
          ],
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
          description: "The west wall has a small button.",
          puzzle: "melody",
          image: [
            {
              condition: "potionSolved",
              path: "melody-button",
            },
            {
              path: "melody-button-blank",
            },
          ],
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
          image: [
            {
              condition: "potionSolved",
              path: "melody-door",
            },
            {
              path: "melody-door-blank",
            },
          ],
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
          image: [
            {
              condition: "cpuSolved",
              path: "cpu-active",
            },
            {
              condition: "animalSolved",
              path: "cpu-boot",
            },
            {
              path: "cpu-off",
            },
          ],
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
                "The label says 'boot sequence sync'. Press 1, 2, and 3 to interact with the boot sequence.",
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
          image: [
            {
              condition: "cpuSolved",
              path: "potion-elevator",
            },
            {
              condition: "potionSolved",
              path: "potion-complete",
            },
            {
              path: "potion-start",
            },
          ],
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
                "The label says: Sensory Enhancer potion. Hold 1 to add heat, stop to cool. Too fast or too slow will ruin the potion.",
            },
          ],
        },
        {
          direction: "w" as CompassDirection,
          description: "The closet door.",
          image: [
            {
              path: "closet-door",
            },
          ],
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
      description: "The computer shows two wavy lines.",
      intro:
        "The computer has three knobs and shows two waves. Press 1, 2, 3 to change the first wave. Hit space to hear the target wave.",
      views: [
        {
          direction: "n" as CompassDirection,
          description: "",
          puzzle: "oscilloscope",
          image: [
            {
              condition: "cpuSolved",
              path: "oscilloscope-solved",
            },
            {
              path: "oscilloscope",
            },
          ],
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
          image: [
            {
              condition: "cpuSolved",
              path: "oscilloscope-solved",
            },
            {
              path: "oscilloscope",
            },
          ],
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
          image: [
            {
              condition: "cpuSolved",
              path: "oscilloscope-solved",
            },
            {
              path: "oscilloscope",
            },
          ],
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
          image: [
            {
              path: "cpu-active",
            },
          ],
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
          image: [
            {
              path: "blank",
            },
          ],
          interaction: [
            {
              action: "moveTo_Animal2",
            },
          ],
        },
        {
          direction: "e" as CompassDirection,
          description: "A sign showing wind, earth, and water.",
          image: [
            {
              path: "animal-poster",
            },
          ],
          interaction: [
            {
              message: "A sign showing wind, earth, and water.",
            },
          ],
        },
        {
          direction: "s" as CompassDirection,
          description: "A door to the laboratory",
          image: [
            {
              path: "melody-door",
            },
          ],
          interaction: [
            {
              action: "moveTo_Hub",
            },
          ],
        },
        {
          direction: "w" as CompassDirection,
          description: "An eagle says caw, caw, caw.",
          image: [
            {
              path: "animal-eagle",
            },
          ],
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
          image: [
            {
              path: "generator",
            },
          ],
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
          image: [
            {
              path: "animal-fish",
            },
          ],
          interaction: [],
        },
        {
          direction: "s" as CompassDirection,
          description: "The animal room continues",
          image: [
            {
              path: "blank",
            },
          ],
          interaction: [
            {
              action: "moveTo_Animal1",
            },
          ],
        },
        {
          direction: "w" as CompassDirection,
          description: "A chimpanzee says ooh ooh eeh eeh.",
          image: [
            {
              path: "animal-chimp",
            },
          ],
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
          image: [
            {
              path: "combo-elevator",
            },
          ],
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
          description: "Three square buttons on the east wall.",
          puzzle: "combo",
          image: [
            {
              path: "combo-buttons",
            },
          ],
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
          image: [
            {
              path: "combo-poster",
            },
          ],
          interaction: [
            {
              message:
                "There is a cute poster of a kitten hanging on a tree branch.",
            },
          ],
        },
        {
          direction: "w" as CompassDirection,
          description: "Three circular buttons on the west wall.",
          puzzle: "combo",
          image: [
            {
              path: "combo-buttons2",
            },
          ],
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
          image: [
            {
              path: "end",
            },
          ],
          interaction: [],
        },
        {
          direction: "e" as CompassDirection,
          description:
            "This game was made for the Games for Blind Gamers 4 Jam.",
          image: [
            {
              path: "end",
            },
          ],
          interaction: [],
        },
        {
          direction: "s" as CompassDirection,
          description: "Thank you for playing!",
          image: [
            {
              path: "end",
            },
          ],
          interaction: [],
        },
        {
          direction: "w" as CompassDirection,
          description: "You are free!",
          image: [
            {
              path: "end",
            },
          ],
          interaction: [],
        },
      ],
    },
  ],
};

export const map = LaboratoryMap;
