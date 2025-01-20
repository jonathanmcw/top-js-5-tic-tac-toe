// Factory method to create Player1 and Player2

document.addEventListener("DOMContentLoaded", () => {

    function createUser(userName, num = 0) {
        const name = userName;
        const assignment = num;
    
        let spositione = 0;
    
        function giveSpositione() {
            return ++spositione;
        }
    
        return {name, assignment, giveSpositione};
    }
    
    // GameBoard
    function createGameBoard(p1, p2) {
        const grid =   [[0,0,0],
                        [0,0,0],
                        [0,0,0]]; // x: 0,1,2 y: 0,1,2
        
        // Check if p1, p2 have attribution of .name, or is a player
        if (!p1.name || !p2.name) {
            throw new Error("Invalid players: Both players must have a name attribute.");
        }

        const players = [ p1, p2 ] ;
        p1.assignment = 1;

        function playTurn(player, position) {
            // Check if x, y range is within 0, 1, 2
            if (position.x >= 0 && position.x <= 2 && position.y >= 0 && position.y <= 2) {
                if (grid[position.x][position.y] === 0) {
                    grid[position.x][position.y] = player.assignment; 
                    console.log(`${player.name} has moved to ${position.x} ${position.y}`);
                    return {player, grid};
                } else {
                    console.error("Invalid move: position already occupied.");
                    return null;
                }
            } else {
                console.error("Invalid move: position out of range.");
                return null;
            }
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
    
    function createBoardDisplay(p1, p2) {
        const player1Display = document.getElementById("player-1-display");
        const player2Display = document.getElementById("player-2-display");
        const instructionDisplay = document.getElementById("instruction-display");
        const gameBoardCell = document.querySelectorAll(".cell");

        player1Display.textContent = p1.name;
        player2Display.textContent = p2.name;

        function getPlayerSelection(player, callback) {
            let symbol = player.assignment === 1 ? "O" : "X";
            instructionDisplay.textContent = `Turn: ${player.name}`;

            function handleClick(e) {
                if (e.target.textContent === "") {
                    e.target.textContent = symbol;
                    const position = { x: parseInt(e.target.dataset.x, 10), y: parseInt(e.target.dataset.y, 10) };
                    gameBoardCell.forEach(cell => cell.removeEventListener("click", handleClick));
                    callback(position);
                }
            }

            gameBoardCell.forEach((cell) => {
                cell.addEventListener("click", handleClick);
            });
        }

        function reset() {
            console.log("Board reset");
            gameBoardCell.forEach(cell => cell.textContent = "" );
        }

        return { instructionDisplay, getPlayerSelection, reset };
    }

    function gameLoop(players, board, boardView) {
        let winner;
        let currentPlayerIndex = 0;
        let currentTurnIndex = 0;

        board.reset();
        boardView.reset();
    
        function nextTurn() {
            if (winner) return;
    
            const currentPlayer = players[currentPlayerIndex];
            
            // Handle capturing player selection
            boardView.getPlayerSelection(currentPlayer, (position) => {

                // Handle board logic
                board.playTurn(currentPlayer, position);
                 
                winner = board.checkWinner();
                if (winner) {
                    alert(`${winner} win!`);
                    initializeGame();
                } else if ( currentTurnIndex < 8 ) {
                    currentPlayerIndex = (currentPlayerIndex + 1) % players.length;
                    currentTurnIndex ++;
                    nextTurn();
                } else {
                    alert(`Draw!`);
                    initializeGame();
                }
            });
        }
    
        nextTurn();
    }

    // Function to initialize the game
    function initializeGame() {

        // Set up player
        const player1 = createUser("Player 1");
        const player2 = createUser("Player 2");
        const players = [player1, player2];

        // Set up board, separating board logic and board display view
        const board = createGameBoard(player1, player2);        
        const boardView = createBoardDisplay(player1, player2);

        // Game loop goes here
        gameLoop(players, board, boardView);
    }
    
    initializeGame();

});

