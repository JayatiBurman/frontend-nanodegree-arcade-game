//----------------------ENEMY CLASS---------------------
//------------------------------------------------------
// Enemies our player must avoid
var Enemy = function(x, y, speed) {
    // Variables applied to each of our instances go here,

    // The image/sprite for our enemies
    this.sprite = 'images/enemy-bug.PNG';
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
		if(checkCollisions(this)){
    	//upon collision update the position and score of the player
    	currentCountDown = createCountDown((player.level + 1) * 10000);
        player.x = 202.5;
        player.y = 400;
        player.score -= (3 * player.level);
        player.lives -= 1;
    }
};

//---------------------PLAYER CLASS---------------------
//------------------------------------------------------
var Player = function(x,y,speed) {
	// The image/sprite for our player
    this.sprite = 'images/char-boy.PNG';

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

    // lives: Number of lives player has
    this.lives = 10;

    // won: Boolean to determine if the player has won the level
    this.won = false;
};

// To update the position and parameters of the Player
Player.prototype.update = function() {
	// To check if the timer is still on
	this.checkTime();

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

	if(this.lives == 0){
		 setTimeout(function() { window.location.reload(true); }, 0);
	}

	// To move the game to next level if the player has won
	if(this.hasWon()){
		moveToNextLevel(this.level);
		plusLife = new LifeHeart();
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
};

// To Check if the Player has reached the water area
Player.prototype.hasWon = function() {
	this.won = false;
	if(this.y == 0) {
		this.won = true;
		this.x = 202.5;
        this.y = 400;
        this.level += 1;
        this.score += ( 10 * (this.level-1));
	}

	return this.won;
};

// To restart the level if time expired
Player.prototype.checkTime = function() {
	if(currentCountDown() < 0){
        currentCountDown = createCountDown((this.level + 1) * 10000);
        this.x = 202.5;
        this.y = 400;
	}
};

// Draw the important data related to the game on Canvas
Player.prototype.renderStatus = function() {
    ctx.clearRect(0, 20 , 505 , 25);
    ctx.font = "18pt impact";
    // Draw scores on the top left
    ctx.fillText("Score: " + this.score, 0, 40);
    // Draw lives on the top right
    ctx.fillText("Lives: " + this.lives, 404, 40);
    // Draw Levels in middle during gaming session
    ctx.fillText("Level: " + this.level, 202, 40);
    // Draw timer at the bottom of the canvas
    ctx.fillText("Time Left: " + Math.floor((currentCountDown() % 36e5) / 6e4) + ":" + Math.floor((currentCountDown() % 6e4) / 1000), 0, 580);    
};

//------------------LIFEHEART CLASS---------------------
//------------------------------------------------------

var LifeHeart = function () {
	// To determine X position of the heart
	this.x = xArr[Math.floor(Math.random() * 5)];
	// To determine Y position of the heart
	this.y = yArr[Math.floor(Math.random() * 4)];
	// To create a random number based on which the heart will appear
	this.produceHeart = Math.floor(Math.random() * 10);
	// To create the modulus
	this.mod = 7;
	// The image/sprite for the heart
    this.sprite = 'images/heart.PNG';
};

//To control the number of lives created with increaisng levels
LifeHeart.prototype.update = function() {
	this.checkCollisions();

	if(this.level >= 8 && this.level <= 12){
		this.mod = 3;
	} else if(this.level <= 17){
		this.mod = 2;
	} else if(this.level > 17){
		this.mod = 1;
	}
};

// Method that checks if the player was able to get a heart and adds life
LifeHeart.prototype.checkCollisions = function () {
	if(checkCollisions(this)){
		player.lives +=1;
		this.x = 550;
		this.y = 650;
		this.produceHeart = 1;
	}
};

// To Draw the heart on the screen
LifeHeart.prototype.render = function() {
	if(this.produceHeart % this.mod == 0) {
		ctx.drawImage(Resources.get(this.sprite), this.x, this.y);	
	}
};

// To move the game to the next level
var moveToNextLevel = function(level) {
	currentCountDown = createCountDown((level + 1) * 10000);

	// Empty the existing array of enemies to create a fresh one for each level
	allEnemies.length = 0;

	for(var i = 0; i < level; i++){
		var enemy = new Enemy(0, yArr[Math.floor(Math.random() * 4)], Math.random() * 200);
		allEnemies.push(enemy);
	}
};

// To create a timer for game
var createCountDown = function(timeRemaining) {
	var startTime = Date.now();
    return function() {
       return timeRemaining - ( Date.now() - startTime );
    }
};

// Mehod to check collision of enemy and heart objects. Can be extended and used for other collectibles too.
var checkCollisions = function (anObject) {
	var hasCollided = false;
	if(anObject instanceof Enemy){
		if (
	        player.y + 125 >= anObject.y + 90
	        && player.x + 25 <= anObject.x + 90
	        && player.y + 75 <= anObject.y + 125
	        && player.x + 75 >= anObject.x + 10) {

				hasCollided = true;
		}
	} else if (anObject instanceof LifeHeart) {
			if(player.y - 5 >= anObject.y
			&& player.y - 15 <= anObject.y  
	        && player.x == anObject.x){

				hasCollided = true;
		}
	}

	return hasCollided;
};

// The player object
var player = new Player(202.5, 400, 100);
// Array to determine X position of objects
var xArr = [2.5,102.5,202.5,302.5,402.5];
// Array to determine Y position of objects
var yArr = [65, 145, 225, 305];
// Crete the array and objects for the game
var allEnemies = [];
var enemy = new Enemy(0, yArr[Math.floor(Math.random() * 4)], Math.random() * 200);
allEnemies.push(enemy);
// create countdown timer object to restrict timing
var currentCountDown = createCountDown(20000); // 20 seconds countdown for level 1
// To create a heart for gaining life;
var plusLife = new LifeHeart();


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