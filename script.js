var gameFunctions = {}; // Object containing game functions

gameFunctions.resetGame = function() {
    // Display alert message
    alert(document.querySelector("#player-name").innerHTML + ", sorry! You DIED!");

    // Reset robots and their positions
    for (var i = 0; i < robots.length; i++) {
        robots[i].style.top = "9vh";
        robotCurrentPositions[i] = 9;
    }

    // Reset player's position
    var playerTop = 60;
    var playerLeft = 50;
    spaceship.style.top = playerTop + "vh";
    spaceship.style.left = playerLeft + "vw";

    // Reset player's score
    document.querySelector("#player-score").innerHTML = 0;

    // Prompt for new player name
    document.querySelector("#player-name").innerHTML = prompt("Enter new player name:");
};

gameFunctions.handleKeyPress = function(event) {
    var spaceshipLeft = parseInt(spaceship.style.left);
    var spaceshipTop = parseInt(spaceship.style.top);

    // Check for collisions with robots
    for (var i = 0; i < robots.length; i++) {
        if ((parseInt(robots[i].style.left) + 5 > spaceshipLeft && spaceshipLeft > parseInt(robots[i].style.left)) || 
            ((spaceshipLeft + 5 > parseInt(robots[i].style.left)) && spaceshipLeft < parseInt(robots[i].style.left)) || 
            ((spaceshipLeft + 5 <= parseInt(robots[i].style.left) + 5) && spaceshipLeft >= parseInt(robots[i].style.left))) {
            if ((parseInt(robots[i].style.top) + 5 > spaceshipTop) && (spaceshipTop + 5 > parseInt(robots[i].style.top))) {
                gameFunctions.resetGame();
                return;
            }
        }
    }

    var key = event.key.toLowerCase();

    // Move player based on key press
    switch (key) {
        case 's':
            if (100 <= playerTop + 7) {
                gameFunctions.resetGame();
                return;
            }
            playerTop += 2;
            spaceship.style.top = playerTop + "vh";
            break;
        case 'w':
            if (playerTop <= 8) {
                gameFunctions.resetGame();
                return;
            }
            playerTop -= 2;
            spaceship.style.top = playerTop + "vh";
            break;
        case 'd':
            if (100 <= playerLeft + 6) {
                gameFunctions.resetGame();
                return;
            }
            playerLeft += 2;
            spaceship.style.left = playerLeft + "vw";
            break;
        case 'a':
            if (playerLeft <= 0) {
                gameFunctions.resetGame();
                return;
            }
            playerLeft -= 2;
            spaceship.style.left = playerLeft + "vw";
            break;
    }

    // Update robot positions and player score
    for (var i = 0; i < robots.length; i++) {
        robots[i].style.top = robotCurrentPositions[i] + "vh";
        robotCurrentPositions[i] += robotSpeeds[i];
        if (robotCurrentPositions[i] >= 94) {
            robotCurrentPositions[i] = 9;
            var speed = Math.random() * 7;
            if (speed < 1) {
                speed = 1;
            }
            robotSpeeds[i] = speed;
            document.querySelector("#player-score").innerHTML = parseInt(document.querySelector("#player-score").innerHTML) + 1;
        }
    }
};

// Initialize game
document.querySelector("#player-name").innerHTML = prompt("Enter your name:");

var playerTop = 60;
var playerLeft = 50;
var spaceship = document.querySelector("#player"); // Main spaceship

var robots = document.querySelectorAll(".robo>div");
var robotSpeeds = [];
for (var i = 0; i < robots.length; i++) {
    var speed = Math.pow(Math.random(), 2) * 7;
    if (speed < 1) {
        speed = 1;
    }
    robotSpeeds.push(speed);
}

var robotCurrentPositions = [];
for (var i = 0; i < robots.length; i++) {
    robotCurrentPositions.push(robotSpeeds[i] + 9);
}

// Add event listener for key press
window.addEventListener("keypress", gameFunctions.handleKeyPress, false);
