const axios = require("axios");
const prompt = require("prompt");

prompt.start();

let timeIsOver = false;
let timer;

let grid = [
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
};

// MOVING FUNCTIONS - start here

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
    };
};

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
    };
};

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
            };
            break;
        case "S":
            if (rover.y + 1 <= 9) {
                rover.y += 1;
            } else {
                console.log("Error, you can't go this way.");
            };
            break;
        case "E":
            if (rover.x + 1 <= 9) {
                rover.x += 1;
            } else {
                console.log("Error, you can't go this way.");
            };
            break;
        case "W":
            if (rover.x - 1 >= 0) {
                rover.x -= 1;
            } else {
                console.log("Error, you can't go this way.");
            };
            break;
    };
    console.log(`y: ${rover.y}, x: ${rover.x}`);
};

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
//     };
//     console.log(`y: ${rover.y}, x: ${rover.x}`);
// };

function turn180(rover) {
    turnLeft(rover);
    turnLeft(rover);
};

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
    });
};

// MOVING FUNCTIONS - end here

let randomPokemon;
let pokemonGrid = [];

// fetching pokemons from API:
axios.get('https://pokeapi.co/api/v2/pokemon/?limit=100/').then((res) => {
    let pokemons = res.data.results.map((pokemon) => {
        return pokemon.name;
    });

    randomPokemon = pokemons[Math.floor(Math.random() * ((100 - 1) + 1))];

    // making a grid containing all downloaded pokemons:
    for (let i = 0; i <= 9; i++) {
        pokemonGrid[i] = [];
        for (let j = 0; j <= 9; j++) {
            pokemonGrid[i][j] = pokemons.pop();
        };
    };

    // other option for pokemon grid:
    // grid = grid.map((row) => {
    //     return row.map((box) => {
    //         return box = pokemons.pop();
    //         });
    //     });
    // console.table(pokemonGrid);

    // setting duration of game:
    timer = setTimeout(() => {
        timeIsOver = true;
    }, 30000);

    // starting game !
    play();

}).catch ((err) => {
    return console.log(err);
});

// Before we start - while API is downloading:
console.log("Chargement en cours...");


// GAME FUNCTION - start here
grid[rover.y][rover.x] = rover.direction;
console.table(grid);

function play() {
    // Directions before the game starts:
    console.log("GET READY TO MOVE YOUR ROVER. (command q to quit play)");
    console.log(`Find the pokemon ${randomPokemon} to win.`);
    // Pokemon in first box of grid is displayed:
    console.log(`Pokemon hidden in box: ${pokemonGrid[rover.y][rover.x]}`);
    // PROMPT to start asking the player for command lines
    prompt.get({
        name: "command", 
        description: "Enter a command",
        pattern: /^[lrfqb]+$/,
        message: "Rover only understands following commands: 'l\[left\]', 'r\[ight\]', 'f\[orward\]','b\[ackward\]', 'q\[uit\]'"},
        function(err, res) {
            if (err) {
                console.log(err);
                return 1;
            };
            if (res.command === "q") {
                clearTimeout(timer);
                return;
            };
            // Check if the game time is expired:
            if (timeIsOver) {
                console.log("Time is over! You lost!");
                return console.log("GAME OVER");
            }
            // Moving rover with functions created earlier:
            pilotRover(res.command);
            grid[rover.y][rover.x] = rover.direction;
            console.table(grid);
            // Checking if we found randomPokemon and clear TimeOut if found:
            if (pokemonGrid[rover.y][rover.x] === randomPokemon) {
                clearTimeout(timer);
                return console.log(`BRAVO! You found ${randomPokemon}.`);
            } else {
                play();
            };
        });
};
