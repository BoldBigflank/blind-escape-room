# Blind Escape Room (Name TBD)

## Controls

### Keyboard
| Action | Key(s) |
| --- | --- |
| Look North | W/Up |
| Look West | A/Left |
| Look South | S/Down |
| Look East | D/Right |
| Look at the room | Esc |
| Focus on Object 1, 2, 3 | 1,2,3 |
| Interact | Space bar/Enter |

### Gamepad
| Action | Key(s) |
| --- | --- |
| Look North | Dpad Up |
| Look West | Dpad Left |
| Look South | Dpad Down |
| Look East | Dpad Right |
| Look at the room | Left Bumper |
| Focus on Object 1, 2, 3 | X, Y, B |
| Interact | A |


## Story Path
You wake up in a strange laboratory.

[POTION]There's a burner with a potion that needs to be cooked properly. When you have the proper setup, you have a potion that does [Allows you to hear buttons hum]
+
[MELODY]A Door hums a tune, and buttons around hum a tone. Press them in order to pass through [XXXXXXXXX]

[ANIMALS]You find a combination lock. Animals in cages tell you the combination, and a poster shows air/land/water in order. Upon entering, you are able to [start the power generator]
+
[COMPUTER]A computer mainframe needs to be booted properly. After hitting the three buttons at the proper time, an [oscilloscope appears on the screen].
+
[OSCILLOSCOPE]You see an Oscilloscope displaying a wavy line. After fixing the distortion, you [XXXXXXXXX]

[COMBOLIGHT]Buttons around the room toggle multiple lights/latches in an area. When all are set, then [XXXXXXXXX]

5 rooms

[MELODY-3]
[MELODY-4]
[POTION]
[INTRO-DOORWAY]

[^] Start
[MELODY-1]
[MELODY-2]
[MELODY-DOOR]

[^]
[ANIMALS-1]
[ANIMALS-2]
[ANIMALS-DOOR]

[^]
[COMBOLIGHT-3]
[COMBOLIGHT-DOOR]
    [^] End
[COMPUTER-DOOR]
    [^]
    [OSCILLOSCOPE]
    [COMBOLIGHT-1]

[^]
[ANIMALS-3]
[COMBOLIGHT-2]
[COMBOLIGHT-4]




## Notes
- Mobile Control - Use a gyro to face in a direction and tap to get information about what's in front of you
- Make clues/locks hum so they can be found
- puzzles
    - (A collection of caged animals) play animal noises, a lock has four animals, number of sounds is the code
    - Make actions make sounds in other areas (doors squeaking, locks clicking, etc)
        - Make some buttons toggle two different doors together, so you gotta press the right ones to get them all unlocked
    - Three buttons (assign to 1, 2, 3), which start playing ascending notes at different speeds. Hit the buttons at the correct time to hit the top note simultaneously. Or perhaps instead of different speeds, the three together play a scale when started at the right times.
    - Red light/green light - choose to move until the an audible drone moves onto you. Failing moves you back.
    - Maze/chase area - Follow a tone (louder forward)
    - Three/four identical buttons that need to be pressed in order. The button hums when it's its turn

One of the puzzles should make use of the compass directions, so it matters where the rooms go.