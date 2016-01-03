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

    //To check collisions between any enemy and the player
    this.checkCollisions();
    
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//Check collision of enemy objects with our player by checking their x and y corodinate positions
Enemy.prototype.checkCollisions = function() {
	if (
        player.y + 125 >= this.y + 90
        && player.x + 25 <= this.x + 90
        && player.y + 75 <= this.y + 125
        && player.x + 75 >= this.x + 10) {
        console.log('collision');
    	//upon collision update the position and score of the player
        player.x = 202.5;
        player.y = 400;
        player.score -= (3 * player.level);
        console.log('level => '+ player.level + ' score => '+ player.score);
    }
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

    // level: Level at which player moves to as the game proceeds
    this.level = 1;

    // score: Score attained by the player
    this.score = 0;
};

Player.prototype.update = function() {
	// To keep the player within the canvas
	if(this.x <= 0){
		this.x = 0;
	}
	if(this.y <= 0){
		this.y = 0;
	}
	if(this.x >= 404){
		this.x = 404;
	}
	if(this.y >= 400){
		this.y = 400;
	}
	//console.log(player.x + "--" + player.y);

	// To move the game to next level if the player has won
	if(this.hasWon()){
		moveToNextLevel(this.level);
	}
};

// Draw the player on the screen, required method for game
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Interpret the key pressed by the user and move the player accordingly
Player.prototype.handleInput = function(allowedKeys) {
	if (allowedKeys == 'left') {
        this.x -= this.speed;
    }
    if (allowedKeys == 'up') {
        this.y -= (this.speed - 20);
    }
    if (allowedKeys == 'right') {
        this.x += this.speed;
    }
    if (allowedKeys == 'down') {
        this.y += (this.speed - 20);
    }
    console.log('allowedKeys is: ' + allowedKeys);
};

// To Check if the Player has reached the water area
Player.prototype.hasWon = function() {
	var won = false;
	if(this.y == 0) {
		console.log('You Won');
		won = true;
		this.x = 202.5;
        this.y = 400;
        this.level += 1;
        this.score += ( 10 * (this.level-1));
        console.log('level => '+ this.level + ' score => '+ this.score);
	}

	return won;
};

// To move the game to the next level
var moveToNextLevel = function(level) {
	// Empty the existing array of enemies to create a fresh one for each level
	allEnemies.length = 0;

	for(var i = 0; i < level; i++){
		var enemy = new Enemy(0, yEnemyArr[Math.floor(Math.random() * 4)], Math.random() * 200);
		allEnemies.push(enemy);
	}
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