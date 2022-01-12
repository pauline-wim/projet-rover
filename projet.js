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
    console.log(`y: ${rover.y}, x: ${rover.x}`)
}

turnLeft(rover);
turnLeft(rover);
moveForward(rover);
turnLeft(rover);
turnLeft(rover);
moveForward(rover);



// turnRight(rover);
// moveForward(rover);
// turnLeft(rover);
// turnLeft(rover);
// moveForward(rover);

grid[rover.x][rover.y] = rover.direction;

console.table(grid);