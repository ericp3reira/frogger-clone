//
// Enemy
//

// Enemies our player must avoid
var Enemy = function() {
  // Variables applied to each of our instances go here,
  // we've provided one for you to get started
  this.reset();
  // The image/sprite for our enemies, this uses
  // a helper we've provided to easily load images
  this.sprite = 'images/enemy-bug.png';
};

// Reset enemy position and speed
Enemy.prototype.reset = function() {
  //Randomize speed, limiting minimum (200) and maximum (600) speeds
  var randomSpeed = function() {
    var speed = (Math.random() * 400) + 200;
    return speed;
  };
  this.y = randomize('y');
  this.speed = randomSpeed();
  // Start position of the enemy,
  // giving some time before it appears
  this.x = -202;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
  // You should multiply any movement by the dt parameter
  // which will ensure the game runs at the same speed for
  // all computers
  if (this.x < 505) {
    this.x += this.speed * dt;
  } else {
    this.reset();
  }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//
// Player
//

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
  // TODO: Choose Player sprite
  this.sprite = 'images/char-boy.png';
  // Initial position
  this.reset();
  // Initial points
  this.points = 0;
};

Player.prototype.update = function(dt) {
  // Collision check with enemies
  var i, enemies = allEnemies.length;
  for (i = 0; i < enemies; i++) {
    if (this.collisionCheck(allEnemies[i])) {
      gameOver();
    }
  }
  // Check if gem is collected and add points
  if (this.collisionCheck(gem)) {
    this.addPoints(gem.type);
    gem.reset();
    // this.reset();
  // Check if player drowned in the water
  // without getting the gem
  } else if (this.y === -27) {
    gameOver();
  }
  // Show updated points
  showPoints(this.points);
};

Player.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(key) {
  // Position in pixels by key pressed.
  // Use if...else instead of switch for the performance.
  if (key === 'left' && this.x > 0) {
    this.x -= 101;
  } else if (key === 'right' && this.x < 402) {
    this.x += 101;
  } else if (key === 'up' && this.y > 0) {
    this.y -= 82;
  } else if (key === 'down' && this.y < 383) {
    this.y += 82;
  }
};

// Reset the player position if won or lose
Player.prototype.reset = function() {
  this.y = 383;
  this.x = 202;
};

// Collision check with any item (enemies or gem)
Player.prototype.collisionCheck = function(item) {
  if ((this.x - 50 < item.x) && (this.x > item.x - 70) && (this.y === item.y)) {
    return true;
  } else {
    return false;
  }
};

// Add points and show at the top of the canvas
Player.prototype.addPoints = function(gem) {
  if (gem === "blue") {
    this.points += 100;
  } else if (gem === "green") {
    this.points += 300;
  } else if (gem === "orange") {
    this.points += 600;
  }
};

//
// Gems
//

// Gems our player must get
var Gem = function() {
  this.reset();
};

Gem.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Gem.prototype.reset = function() {
  this.y = randomize('y');
  this.x = randomize('x');
  this.type = randomGem();
  // Randomize the available gem sprites
  this.sprite = 'images/gem-' + this.type + '.png';
};

//
// Game functionalities
//

// Randomize the position of x or y
var randomize = function(coor) {
  var pos;
  var perc = Math.floor(Math.random() * 10);
  // Randomize x-position using probability (around 20%)
  if (coor === "x") {
    if (perc < 2) {
      pos = 0;
    } else if (perc >= 2 && perc < 4) {
      pos = 101;
    } else if (perc >= 4 && perc < 6) {
      pos = 202;
    } else if (perc >= 6 && perc < 8) {
      pos = 303;
    } else {
      pos = 404;
    }
    return pos;
  // Randomize y-position using probability (around 33%)
  } else {
    if (perc < 3) {
      pos = 55;
    } else if (perc >= 3 && perc < 7) {
      pos = 137;
    } else {
      pos = 219;
    }
    return pos;
  }
};

// Show player's points
var showPoints = function(pts) {
  ctx.clearRect(0, 0, 505, 606);
  ctx.font = '20px serif';
  ctx.strokeText(pts, 10, 20);
};

// Randomize the available gems
// 60% blue, 30% green, 10% orange
var randomGem = function() {
  var sprite;
  var perc = Math.floor(Math.random() * 10);
  if (perc < 6) {
    sprite = 'blue';
  } else if (perc >= 6 && perc < 9) {
    sprite = 'green';
  } else {
    sprite = 'orange';
  }
  return sprite;
};

// TODO: show a "game over" message on screen,
// points and a "new game" button
var gameOver = function() {
  newGame();
};

// Redefine canvas and restart points
var newGame = function() {
  gem.reset();
  player.reset();
  player.points = 0;
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var enemyOne = new Enemy(), enemyTwo = new Enemy(), enemyThree = new Enemy();
var allEnemies = [enemyOne, enemyTwo, enemyThree];
var player = new Player();
var gem = new Gem();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
  var allowedKeys = {
      37: 'left',
      38: 'up',
      39: 'right',
      40: 'down'
  };

  player.handleInput(allowedKeys[e.keyCode]);
});
