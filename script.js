// Factory method to create Player1 and Player2
function createUser(userName, num = 0) {
    const name = userName;
    const assignment = num;
    const gender = "male";
    let score = 0;
    function giveScore() {
        return ++score;
    }
    return {name, gender, giveScore};
}

function createGameBoard(p1, p2) {
    const grid =   [[0,0,0],
                     [0,0,0],
                     [0,0,0]]; // x: 0,1,2 y: 0,1,2
    
    // const players = { p1:1, p2:-1};
    const players = { };

    // TODO: ERROR check if p1, p2 have attribution of .name, or is a player
    players[p1.name] = 1; // O
    players[p2.name] = -1; // X

    function playTurn( player, x, y ) {
        // TODO: ERR x, y range has to be 0, 1, 2
        grid[x][y] = players[player.name];
        console.log(`${player.name} has moved to ${x} ${y}`);
        return {grid}
        // ERROR: Player not in player list
    }

    function checkWinner() {
        let diag1Sum = 0;
        let diag2Sum = 0;
        // Check rows and columns
        for (let i = 0; i < 3; i++) {
            let rowSum = 0;
            let colSum = 0;
            for (let j = 0; j < 3; j++) {
                rowSum += grid[i][j];
                colSum += grid[j][i];
            }
            if (rowSum === 3 || colSum === 3) {
                console.log("Player 1 wins!");
                return p1.name;
            } else if (rowSum === -3 || colSum === -3) {
                console.log("Player 2 wins!");
                return p2.name;
            }
            diag1Sum += grid[i][i];
            diag2Sum += grid[i][2 - i];
        }

        if (diag1Sum === 3 || diag2Sum === 3) {
            console.log("Player 1 wins!");
            return p1.name;
        } else if (diag1Sum === -3 || diag2Sum === -3) {
            console.log("Player 2 wins!");
            return p2.name;
        } else {
            console.log("No winner yet.");
            return;
        }
    }

    function show() {
        for (let cell in grid) {
            console.log(cell);
        }
    }

    return {grid, players, playTurn, show, checkWinner}
}

// Function to initialize the game
function initializeGame() {
    // Welcome instructions and enable selection of playing mode - P to P / P to C 
    // Setting up the game board
    console.log("Welcome to Tic Tac Toe!");
    const player1 = createUser("JW");
    const player2 = createUser("AI");
    const board = createGameBoard(player1, player2);
    board.playTurn(player1, 0, 2);
    board.playTurn(player2, 0, 1);
    board.playTurn(player1, 1, 1);
    board.playTurn(player2, 1, 0);
    board.playTurn(player1, 2, 0);
    board.show();
    board.checkWinner();
}

// Function to handle player move
function handlePlayerMove(player, position) {
    // Simplest form - TTT, single player across the board
    // for 2 player, player one go make a selection, followed by 2nd player making their own 
    console.log(`Player ${player} moved to position ${position}`);
}

// Function to check for a winner
function checkWinner() {
    // At the end after each player has made a selection, check whether winning condition has been matched
    // If any side makes connection ( could be a matrix, then the the )
    console.log("Checking for a winner");
}

// Function to reset the game
function resetGame() {
    console.log("Game reset");
}

// Initialize the game when the script loads
initializeGame();

