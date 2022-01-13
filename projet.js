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
            if (rover.y - 1 >= 0) {
                rover.y -= 1;   
            } else {
                console.log("Error, you can't go this way.");
            }
            break;
        case "S":
            if (rover.y + 1 <= 9) {
                rover.y += 1;
            } else {
                console.log("Error, you can't go this way.");
            }
            break;
        case "E":
            if (rover.x + 1 <= 9) {
                rover.x += 1;
            } else {
                console.log("Error, you can't go this way.");
            }
            break;
        case "W":
            if (rover.x - 1 >= 0) {
                rover.x -= 1;
            } else {
                console.log("Error, you can't go this way.");
            }
            break;
    }
    console.log(`y: ${rover.y}, x: ${rover.x}`);
}

// function moveBackward(rover) {
//     rover.travelLog.push({y: rover.y, x: rover.x});
//     // clear the trace from previous tour
//     grid[rover.y][rover.x] = ' ';
//     switch (rover.direction) {
//         case "N":
//             if (rover.y + 1 <= 9) {
//                 rover.y += 1;   
//             } else {
//                 console.log("Error, you can't go this way.");
//             }
//             break;
//         case "S":
//             if (rover.y - 1 >= 0) {
//                 rover.y -= 1;
//             } else {
//                 console.log("Error, you can't go this way.");
//             }
//             break;
//         case "E":
//             if (rover.x - 1 >= 0) {
//                 rover.x -= 1;
//             } else {
//                 console.log("Error, you can't go this way.");
//             }
//             break;
//         case "W":
//             if (rover.x + 1 <= 9) {
//                 rover.x += 1;
//             } else {
//                 console.log("Error, you can't go this way.");
//             }
//             break;
//     }
//     console.log(`y: ${rover.y}, x: ${rover.x}`);
// }

function turn180(rover) {
    turnLeft(rover);
    turnLeft(rover);
}

function moveBackward(rover) {
    turn180(rover);
    moveForward(rover);
    turn180(rover);
};

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
            case "b":
                moveBackward(rover);
                break;
        };
    })
}

function play() {
    console.log("GET READY TO MOVE YOUR ROVER. (command q to quit play)")
    prompt.get({
        name: "command", 
        description: "Enter a command",
        pattern: /^[lrfqb]+$/,
        message: "Rover only understands following commands: 'l\[left\]', 'r\[ight\]', 'f\[orward\]','b\[ackward\]', 'q\[uit\]'"},
        function(err, res) {
            if (err) {
                console.log(err);
                return 1;
            }
            if (res.command === "q") {
                return;
            }
            pilotRover(res.command);
            grid[rover.y][rover.x] = rover.direction;
            console.table(grid);
            play();
        });
}

play();