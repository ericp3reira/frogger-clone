frontend-nanodegree-arcade-game
===============================

## Overview

This game is a project from [Udacity's Front-End Nanodegree](https://udacity.com/course/front-end-web-developer-nanodegree--nd001/). The original repository is [here](https://github.com/udacity/frontend-nanodegree-arcade-game).

All the assets and the engine were provided by Udacity. I had to develop `app.js` using object-oriented functions.

## How To Play

1. Download or clone this project and run `index.html`;
2. Try to collect all the gems you can while escaping from enemies. Beware of the water;
3. Blue gems give you 100 points, green 300 and orange 600 (don't miss it!);
4. If you lose all hearts, your points will be restarted.

## How It Works

Here are a brief explanation of the functions:

- **Enemy** - creates an enemy and its properties sprite, y-position and speed. It has three prototype functions:

  - `reset` - redefines the speed, row where it will run (both random) and starts 202 pixels left from the canvas (to have some time before it appears on the canvas);
  - `update` -  updates the enemy's position using the speed and multipling by dt (a time delta provided by `engine.js`);
  - `render` - draw the enemy on the screen using the sprite and a function provided by `resources.js`.


- **Player** - creates the player and its properties sprite, points, life points, x and y position. It has seven prototype functions:

  - `update` - if there's a collision with enemies or if he drowned, he loses a life point.If the player collected a gem, points will be rewarded;
  - `render` - draw the player sprite and its 'hearts;'
  - `handleInput` - checks the keys pressed, moving the player;
  - `reset` - resets position and points, if the player lost all life points;
  - `collisionCheck` - checks collisions with enemies and gem;
  - `addPoints` - adds points by type of gem collected;
  - `checkLifePoints` - checks if player has life points left.


- **Gem** - creates the gem object, with random type and x and y position:

  - `render` - draw the sprite defined for the gem;
  - `reset` - redefines the position and type of gem, randomically.


- **Game functionalities**:

  - `randomize` - gets the coordinate (x or y) and generate it randomically;
  - `showPoints` - draws the player points on the canvas.

## TO-DO

- Create a splash screen with a player selector;
- Create a game over screen with final points, high scores and new game button.
