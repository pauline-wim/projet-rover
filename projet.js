const prompt = require("prompt");

prompt.start();

const grid = [
	[" ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
	[" ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
	[" ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
	[" ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
	[" ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
	[" ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
	[" ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
	[" ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
	[" ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
	[" ", " ", " ", " ", " ", " ", " ", " ", " ", " "]
];

const rover = {
    direction: "N",
    x: 0,
    y: 0,
    travelLog: [],
}

function turnLeft(rover) {
    switch (rover.direction) {
        case "N":
            rover.direction = "W";
            break;
        case "S":
            rover.direction = "E";
            break;
        case "E":
            rover.direction = "N";
            break;
        case "W":
            rover.direction = "S";
            break;   
    }
}

function turnRight(rover) {
    switch (rover.direction) {
        case "N":
            rover.direction = "E";
            break;
        case "S":
            rover.direction = "W";
            break;
        case "E":
            rover.direction = "S";
            break;
        case "W":
            rover.direction = "N";
            break;   
    }
}

function moveForward(rover) {
    rover.travelLog.push({y: rover.y, x: rover.x});
    // clear the trace from previous tour
    grid[rover.y][rover.x] = ' ';
    switch (rover.direction) {
        case "N":
            rover.y -= 1;
            break;
        case "S":
            rover.y += 1;
            break;
        case "E":
            rover.x += 1;
            break;
        case "W":
            rover.x -= 1;
            break;
    }
    console.log(`y: ${rover.y}, x: ${rover.x}`);
}

function pilotRover(str) {
    str.split("").map((command) => { 
        switch (command) {
            case "l":
                turnLeft(rover);
                break;
            case "r":
                turnRight(rover);
                break;
            case "f":
                moveForward(rover);
                break;
        };
    })
}

function play() {
    prompt.get({
        name: "command", 
        description: "Enter a command",
        pattern: /^[lrf]+$/,
        message: "Rover only understands following commands: 'l\[left\]', 'r\[ight\]', 'f\[orward\]'"},
        function(err, res) {
            if (err) {
                console.log(err);
                return 1;
            }
            pilotRover(res.command);
            grid[rover.y][rover.x] = rover.direction;
            console.table(grid);
            play();
        });
}

play();