var ship;                           // ! DO NOT TOUCH ! Variable for the ship
var asteroids = [];                 // ! DO NOT TOUCH ! Array for the amount of Asteroids
var lasers = [];                    // ! DO NOT TOUCH ! Array for the amount Lasers
var isRight = false;                // ! DO NOT TOUCH ! Boolean for the Right function
var isLeft = false;                 // ! DO NOT TOUCH ! Boolean for the Left function
var isUp = false;                   // ! DO NOT TOUCH ! Boolean for the Forward function
var isShooting = false;             // ! DO NOT TOUCH ! Boolean for the Shooting function
var bg;                             // ! DO NOT TOUCH ! Variable for the picture in the background
var score = 0;                      // ! DO NOT TOUCH ! The same as "realscore", but with a lot of decimals
var realscore = score.toFixed(2);   // ! DO NOT TOUCH ! This variable is the one that shows the current score with two decimals on the screen
var multiplier = 0;                 // ! DO NOT TOUCH ! The variable that shows the amount of multiplier on the screen
var k = 0;                          // ! DO NOT TOUCH ! This is the variable 
var perlevel = 0;                   // ! DO NOT TOUCH ! The total amount of Astroids added every level. This value changes everytime the level changes.
var level = 1;                      // ! DO NOT TOUCH ! What level you are on
var times = 1;                      // ! DO NOT TOUCH ! The amount of times you hit an asteroid
var fps = 60;                       // ! DO NOT TOUCH ! The amount of times a function gets called per second
var strokes;                        // ! DO NOT TOUCH !
var aAmount = asteroids.length;     // ! DO NOT TOUCH !

var start = 5;                      // The amount of Asteroids that spawn at the start of the game.
var AddAsteroid = 10;               // How many Asteroids that spawn + the start variable
var perMultiplier = 0.10;           // How much the score multiplies every time an asteroid is destroyed
var addScore = 1;                   // The amount of points added each time an asteroid is destroyed
var shieldSekunder = 3;             // The amount of time you are shielded
var lives = 3;                      // The amount of lives you have

var shieldTime = fps * shieldSekunder;  // ! DO NOT TOUCH ! The shield
var addMultiplier = perMultiplier*100;  // ! DO NOT TOUCH ! The multiplier on the screen


// This is the setup function, which starts the game, by loading the ship and the asteroids at the start
function setup() {
    var canvas = createCanvas(windowWidth, windowHeight);
    canvas.parent(game)
    bg = loadImage('pictures/galaxy.jpg')
    ship = new Ship();
    
    // adds the starting asteroids
    while (k < start){
        k++;
        asteroids.push(new Asteroid());
    }
}


function draw() {
    // Makes the background be the picture
    background(bg);

    
    

    push();
    textSize(30);
    fill('Yellow'); 
    textAlign(LEFT);
    text('Score:' + ' ' + realscore, 10, 40)
    text('Multiplier:' + ' ' + multiplier + '%', 10, 80)
    text('Asteroids:' + ' ' + asteroids.length, 10, 120)
    text('Lives:' + ' ' + lives, 10, 160);
    text('Level:' + ' ' + level, 10, 200);
    pop();



    // Updates the scores all the time
    //document.getElementById("aAmount").innerHTML = aAmount;
    //document.getElementById("level").innerHTML = level;
    //document.getElementById("realscore").innerHTML = realscore;
    //document.getElementById("multiplier").innerHTML = multiplier;
    //document.getElementById("lives").innerHTML = lives;

    // If the amount of asteroids is equal to zero, then add another level and add asteroids based on the amount specified in the variables above
    if (lives > 0) {
        if (asteroids.length == 0) {
            perlevel += AddAsteroid;
            level++;
            ship.pos = createVector(width / 2, height / 2); 
            shieldTime = fps * shieldSekunder;
            while (asteroids.length < (start + perlevel)) {
                asteroids.push(new Asteroid());
            }
        }
    }

    // This is collision detection between the ship and the asteroids, and the movement of the asteroids
    for (var i = 0; i < asteroids.length; i++) {
        if (ship.hits(asteroids[i])) {
            if (shieldTime < 1) {
                ship.pos = createVector(width / 2, height / 2); 
                shieldTime = fps * shieldSekunder;
                lives--;
            }
        }
        asteroids[i].position();
        asteroids[i].update();
        asteroids[i].edges();
    }

    // This is the movement of the lasers and if the lasers go offscreen, it will remove the laser 
    for (var i = lasers.length-1; i >= 0; i--) {
        lasers[i].render();
        lasers[i].update();
        if (lasers[i].offscreen()) {
            lasers.splice(i, 1);

        } else {
            
            // This is collision detection between the lasers and the asteroids. 
            for (var j = asteroids.length- 1; j >= 0; j--) {
                if (lasers[i].hits(asteroids[j])) {

                    // If the radius of the asteroid that has been hit is above 20, then split into 2 smaller ones
                    if (asteroids[j].r > 20) {
                        var newAsteroids = asteroids[j].breakup();
                        asteroids = asteroids.concat(newAsteroids);
                        aAmount = asteroids.length;
                    }

                    // Updating the amount of asteroids
                    if (asteroids[j].r <= 20) {
                        aAmount = asteroids.length;
                    }
                    // Removes the asteroid if the radius is below 20 and adds score. This also removes the laser if an asteroid is hit
                    asteroids.splice(j, 1);
                    if (score >= 1) {
                        score = score + (addScore*(1+(perMultiplier*times)));
                        times = times + 1;
                        realscore = score.toFixed(2);
                        multiplier = multiplier + addMultiplier;
                    } else if (score < 0.9){
                        score = score + 1;
                        realscore = score.toFixed(2);
                        multiplier = multiplier + addMultiplier;
                    }
                    lasers.splice(i, 1);
                    break;
                }
            }
        } 
        

 }




    // Updates the ship's movement and turns
    if (lives > 0) {
        ship.render();
        ship.turn();
        ship.update();
        ship.edges();
        ship.movement();
    }

    if (lives < 1) {
        asteroids.length = 0;
        push();
        textSize(100);
        fill('red'); 
        textAlign(CENTER);
        text('Game Over', width/2, height/2);
        pop();
    }




    /* if (isShooting) {
            lasers.push(new Laser(ship.pos, ship.heading));
    } else {
        isShooting = false;
    }


    */
}
// A function to detect when a key is released
function keyReleased() {
    if (keyCode == 68) {
        isRight = false
    }
    if (keyCode == 65) {
        isLeft = false
    }
    if (keyCode == 87) {
        isUp = false
    }
    if (key == ' ') {
        isShooting = false
    }
}
// a function to detect if a key is pressed
function keyPressed() {
    if (keyCode == 68) {
        isRight = true
    }
    if (keyCode == 65) {
        isLeft = true
    }
    if (keyCode == 87) {
        isUp = true
    }
    if (key == ' ') {
        //isShooting = true¨
        lasers.push(new Laser(ship.pos, ship.heading));
    }
}

// The numbers mean W A S D
// W = 87
// A = 65
// S = 83
// D = 68
