// Enemies our player must avoid
var Enemy = function() {
  // Variables applied to each of our instances go here,
  // we've provided one for you to get started
  this.reset();
  // The image/sprite for our enemies, this uses
  // a helper we've provided to easily load images
  this.sprite = 'images/enemy-bug.png';
};

// Reset position and speed
Enemy.prototype.reset = function() {
  // Randomize y-position using probability (around 33%)
  var randomY = function() {
    var y;
    var position = Math.floor(Math.random() * 10);
    if (position < 4) {
      y = 55;
    } else if (position >= 4 && position < 8) {
      y = 137;
    } else {
      y = 219;
    }
    return y;
  };
  //Randomize speed, limiting minimum and maximum speeds
  var randomSpeed = function() {
    var speed = Math.random() * 1000;
    if (speed < 200) {
      speed = 200;
    } else if (speed > 600) {
      speed = 600;
    }
    return speed;
  };
  this.y = randomY();
  this.speed = randomSpeed();
  this.x = -101;
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

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
  // TODO Choose Player
  this.sprite = 'images/char-boy.png';
  // Initial position
  this.reset();
};

Player.prototype.update = function(dt) {
  // Collision check with enemies
  var i;
  var enemies = allEnemies.length;
  for (i = 0; i < enemies; i++) {
    if (this.collisionCheck(allEnemies[i])) {
        this.reset();
    }
  }
  // Check if gem is collected
  if (this.collisionCheck(gem)) {
    gem.reset();
    this.reset();
  // Check if player reached the
} else if (this.y === -27) {
    this.reset();
  }
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

// Collision check
Player.prototype.collisionCheck = function(item) {
  if ((this.x - 70 < item.x) && (this.x > item.x - 70) && (this.y === item.y)) {
    return true;
  }
};

var Gem = function() {
  this.reset();
};

Gem.prototype.update = function() {

};

Gem.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Gem.prototype.reset = function() {
  this.y = -27;
  // Randomize position using probability (around 33%)
  var randomX = function() {
    var x;
    var position = Math.floor(Math.random() * 10);
    if (position < 2) {
      x = 0;
    } else if (position >= 2 && position < 4) {
      x = 101;
    } else if (position >= 4 && position < 6) {
      x = 202;
    } else if (position >= 6 && position < 8) {
      x = 303;
    } else {
      x = 404;
    }
    return x;
  };
  this.x = randomX();
  var randomGemSprite = function() {
    var sprite;
    var perc = Math.floor(Math.random() * 10);
    if (perc < 4) {
      sprite = 'blue';
    } else if (perc >= 4 && perc < 7) {
      sprite = 'green';
    } else {
      sprite = 'orange';
    }
    return 'images/gem-' + sprite + '.png';
  };
  this.sprite = randomGemSprite();
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
