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
let randomPokemon;
let pokemonGrid = [];

axios.get('https://pokeapi.co/api/v2/pokemon/?limit=100/').then(function (res) {
    let pokemons = res.data.results.map((pokemon) => {
        return pokemon.name;
    });

    randomPokemon = pokemons[Math.floor(Math.random() * ((100 - 1) + 1))];

    // console.log(randomPokemon);

    for (let i = 0; i <= 9; i++) {
        pokemonGrid[i] = [];
        for (let j = 0; j <= 9; j++) {
            pokemonGrid[i][j] = pokemons.pop();
            // pokemonGrid[i].push(pokemons.pop());fun
        }
    };

    // grid = grid.map((row) => {
    //     return row.map((box) => {
    //         // console.log(pokemons[i]);
    //         return box = pokemons.pop();
    //         // return box = "a";
    //         });
    //     });
    // console.table(pokemonGrid);

    timer = setTimeout(() => {
        timeIsOver = true;
    }, 30000);

    play();
});

console.log("Chargement en cours...");

grid[rover.y][rover.x] = rover.direction;
console.table(grid);

function play() {
    console.log("GET READY TO MOVE YOUR ROVER. (command q to quit play)");
    console.log("Find the correct pokemon to win.");
    console.log(`Pokemon hidden in box: ${pokemonGrid[rover.y][rover.x]}`);
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
                return;
            };
            if (timeIsOver) {
                console.log("Time is over! You lost!");
                return console.log("GAME OVER");
            }
            // console.log("\nPokemon hidden in box:", pokemonGrid[rover.y][rover.x]);
            pilotRover(res.command);
            grid[rover.y][rover.x] = rover.direction;
            console.table(grid);
            if (pokemonGrid[rover.y][rover.x] === randomPokemon) {
                clearTimeout(timer);
                return console.log(`BRAVO! You found ${randomPokemon}.`);
            } else {
                play();
            };
        });
};

// play();