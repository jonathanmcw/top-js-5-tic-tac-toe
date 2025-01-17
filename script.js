// Factory method to create Player1 and Player2
function createUser(userName, num = 0) {
    const name = userName;
    const assignment = num;

    let score = 0;

    function giveScore() {
        return ++score;
    }

    return {name, assignment, giveScore};
}

// GameBoard
function createGameBoard(p1, p2) {
    const grid =   [[0,0,0],
                    [0,0,0],
                    [0,0,0]]; // x: 0,1,2 y: 0,1,2
    
    // TODO: ERROR check if p1, p2 have attribution of .name, or is a player
    const players = [ p1, p2 ] ;
    p1.assignment = 1;
    p2.assignment = -1;

    function playTurn( player, x, y ) {
        // TODO: ERR x, y range has to be 0, 1, 2
        grid[x][y] = player.assignment; 
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

    // Function to reset the game
    function reset() {
        console.log("Game reset");
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                grid[i][j] = 0;
                grid[j][i] = 0;
            }
        }
    }

    return {grid, players, playTurn, checkWinner, reset}
}

// Function to initialize the game
function initializeGame() {

    // Setting up the game board
    const player1 = createUser("JW");
    const player2 = createUser("AI");
    const board = createGameBoard(player1, player2);
    
    // Game loop
    let i = 0;
    
    outerLoop: while ( i < 9 ) {
        for ( let player of board.players ) {
            let [x, y] = prompt(`${player.name} it is ur turn to play, enter number "x-y"`).split('-');
            board.playTurn(player, x, y); // 0-0
            let winner = board.checkWinner(); 
            if (winner) {
                break outerLoop;
            };
            i++;
        }
    }

    board.reset();
    console.log("Game Over");
}

// Function to handle player move
// function handlePlayerMove(player, position) {
    // Simplest form - TTT, single player across the board
    // for 2 player, player one go make a selection, followed by 2nd player making their own     
//     console.log(`Player ${player} moved to position ${position}`);
// }

// Function to check for a winner
// function checkWinner() {
//     // At the end after each player has made a selection, check whether winning condition has been matched
//     // If any side makes connection ( could be a matrix, then the the )
//     console.log("Checking for a winner");
// }

// Initialize the game when the script loads
initializeGame();
