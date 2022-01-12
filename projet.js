const prompt = require("prompt");

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
    switch (rover.direction) {
        case "N":
            rover.x -= 1;
            break;
        case "S":
            rover.x += 1;
            break;
        case "E":
            rover.y += 1;
            break;
        case "W":
            rover.y -= 1;
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

pilotRover("rff");

// turnRight(rover);
// moveForward(rover);
// turnLeft(rover);
// turnLeft(rover);
// moveForward(rover);

grid[rover.x][rover.y] = rover.direction;

console.table(grid);
console.table(rover.travelLog)