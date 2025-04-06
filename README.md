1. Game Overview
Objective: Flip down all numbered tiles (1-9) by rolling dice and matching combinations

Core Mechanics:

Roll 2 dice (or 1 die when only tiles 7-9 remain)

Select tiles that sum to the dice total

Continue until no valid moves remain

Score is the sum of remaining tiles (goal is 0)

2. User Flows
Main Game Flow:

Start screen → Game board → Dice roll → Tile selection → Continue/End

Alternative Flows:

Unable to make a move → Game over

Perfect game (all tiles down) → Celebration

3. Wireframes
Main Screen:

Number tiles (1-9) in a row

Roll button

Dice display area

Score display

New game button

4. UI Components
Tiles: Interactive buttons (1-9) that change state when flipped

Dice: Visual representation of current roll

Score Display: Shows current sum of remaining tiles

Action Buttons: Roll, New Game

5. States
Tile states: Active (up) / Inactive (down)

Game states: Rolling, Selecting, Game Over