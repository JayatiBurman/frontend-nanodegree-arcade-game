// Enemies our player must avoid
var Enemy = function(x, y, speed) {
    // Variables applied to each of our instances go here,

    // The image/sprite for our enemies
    this.sprite = 'images/enemy-bug.png';
    // x: X position coordinate of the enemy
    this.x = x;
    // y: Y position coordinate of the enemy
    this.y = y;
    // speed: Speed with which the enemy moves
    this.speed = speed;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed * dt;

    // To contain the enemies within the canvas and send them back to left
    if ( this.x >= 505) {
    	this.x = 0;
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

var Player = function(x,y,speed) {
	// The image/sprite for our player
    this.sprite = 'images/char-boy.png';

    // x: X position coordinate of the player
    this.x = x;

    // y: Y position coordinate of the player
    this.y = y;

    // speed: Speed with which the player moves
    this.speed = speed;
};

Player.prototype.update = function() {
	if(player.x <= 0){
		player.x = 0;
	}
	if(player.y <= 0){
		player.y = 0;
	}
	if(player.x >= 404){
		player.x = 404;
	}
	if(player.y >= 400){
		player.y = 400;
	}
	//console.log(player.x + "--" + player.y);

	if(y = 0){
		ctx.textBaseline = "bottom";
		ctx.fillText('You Won !', canvas.width / 2, canvas.height - 10);
		ctx.strokeText('You Won !', canvas.width / 2, canvas.height - 10);
	}
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(allowedKeys) {
	if (allowedKeys == 'left') {
        player.x -= player.speed;
    }
    if (allowedKeys == 'up') {
        player.y -= (player.speed - 20);
    }
    if (allowedKeys == 'right') {
        player.x += player.speed;
    }
    if (allowedKeys == 'down') {
        player.y += (player.speed - 20);
    }
    console.log('allowedKeys is: ' + allowedKeys);
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [];
var player = new Player(202.5, 390, 100);
var yEnemyArr = [65, 145, 225, 305];
var enemy = new Enemy(0, yEnemyArr[Math.floor(Math.random() * 4)], Math.random() * 200);

allEnemies.push(enemy);


// This listens for key presses and sends the keys to your
// player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});