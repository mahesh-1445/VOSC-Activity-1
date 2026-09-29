// DOM Elements
const cells = document.querySelectorAll(".cell");
const statusText = document.getElementById("status");
const resetButton = document.getElementById("reset");
const resetScoresButton = document.getElementById("reset-scores");

const modeHumanBtn = document.getElementById("mode-human");
const modeComputerBtn = document.getElementById("mode-computer");
const difficultyPanel = document.getElementById("difficulty-panel");
const diffButtons = document.querySelectorAll(".diff-btn");

const labelX = document.getElementById("label-x");
const labelO = document.getElementById("label-o");
const scoreXEl = document.getElementById("score-x");
const scoreOEl = document.getElementById("score-o");
const scoreDrawEl = document.getElementById("score-draw");

// Game State
let gameMode = "human"; // "human" | "computer"
let aiDifficulty = "hard"; // "easy" | "medium" | "hard"
let currentPlayer = "X";
let gameActive = true;
let isAiThinking = false;
let board = ["", "", "", "", "", "", "", "", ""];
let aiTimeoutId = null;

const scores = {
    x: 0,
    o: 0,
    draws: 0
};

// Winning Combinations
const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

// Initialize Game
init();

function init() {
    setupEventListeners();
    updatePlayerLabels();
    updateStatusDisplay();
}

function setupEventListeners() {
    // Cell clicks
    cells.forEach((cell, index) => {
        cell.addEventListener("click", () => handleCellClick(index));
    });

    // Mode toggles
    modeHumanBtn.addEventListener("click", () => switchMode("human"));
    modeComputerBtn.addEventListener("click", () => switchMode("computer"));

    // Difficulty buttons
    diffButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            diffButtons.forEach(b => {
                b.classList.remove("active");
                b.setAttribute("aria-checked", "false");
            });
            btn.classList.add("active");
            btn.setAttribute("aria-checked", "true");
            aiDifficulty = btn.dataset.difficulty;
            resetRound();
        });
    });

    // Reset buttons
    resetButton.addEventListener("click", resetRound);
    resetScoresButton.addEventListener("click", resetAllScores);
}

// Switch between vs Human and vs Computer
function switchMode(newMode) {
    if (gameMode === newMode) return;

    gameMode = newMode;

    if (newMode === "human") {
        modeHumanBtn.classList.add("active");
        modeHumanBtn.setAttribute("aria-selected", "true");
        modeComputerBtn.classList.remove("active");
        modeComputerBtn.setAttribute("aria-selected", "false");
        difficultyPanel.classList.add("hidden");
    } else {
        modeComputerBtn.classList.add("active");
        modeComputerBtn.setAttribute("aria-selected", "true");
        modeHumanBtn.classList.remove("active");
        modeHumanBtn.setAttribute("aria-selected", "false");
        difficultyPanel.classList.remove("hidden");
    }

    updatePlayerLabels();
    resetAllScores();
}

function updatePlayerLabels() {
    if (gameMode === "human") {
        labelX.textContent = "Player X";
        labelO.textContent = "Player O";
    } else {
        labelX.textContent = "You (X)";
        labelO.textContent = "Computer (O)";
    }
}

// Cell Click Handler
function handleCellClick(index) {
    if (board[index] !== "" || !gameActive || isAiThinking) {
        return;
    }

    makeMove(index, currentPlayer);

    const winnerInfo = checkWinner(board);

    if (winnerInfo) {
        handleGameOver(winnerInfo);
        return;
    }

    if (isBoardFull(board)) {
        handleDraw();
        return;
    }

    // Switch turn
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    updateStatusDisplay();

    // Trigger AI move if in computer mode
    if (gameMode === "computer" && currentPlayer === "O" && gameActive) {
        triggerAiMove();
    }
}

// Make a move on the board
function makeMove(index, player) {
    board[index] = player;
    const cell = cells[index];
    cell.textContent = player;
    cell.classList.add(player.toLowerCase());
}

// Trigger AI turn with realistic thinking delay
function triggerAiMove() {
    isAiThinking = true;
    statusText.innerHTML = '<span class="thinking-pulse">🤖 Computer is thinking...</span>';

    clearTimeout(aiTimeoutId);
    aiTimeoutId = setTimeout(() => {
        if (!gameActive || gameMode !== "computer") {
            isAiThinking = false;
            return;
        }

        const bestMoveIndex = getBestAiMove();
        if (bestMoveIndex !== -1 && bestMoveIndex !== undefined) {
            makeMove(bestMoveIndex, "O");

            const winnerInfo = checkWinner(board);
            if (winnerInfo) {
                handleGameOver(winnerInfo);
            } else if (isBoardFull(board)) {
                handleDraw();
            } else {
                currentPlayer = "X";
                updateStatusDisplay();
            }
        }
        isAiThinking = false;
    }, 450);
}

// AI Move Selector based on difficulty
function getBestAiMove() {
    const emptyIndices = getEmptyIndices(board);
    if (emptyIndices.length === 0) return -1;

    if (aiDifficulty === "easy") {
        // Random move
        const randomIndex = Math.floor(Math.random() * emptyIndices.length);
        return emptyIndices[randomIndex];
    }

    if (aiDifficulty === "medium") {
        // 1. Can AI win immediately?
        for (const idx of emptyIndices) {
            board[idx] = "O";
            if (checkWinner(board)) {
                board[idx] = "";
                return idx;
            }
            board[idx] = "";
        }

        // 2. Can player win immediately? Block them
        for (const idx of emptyIndices) {
            board[idx] = "X";
            if (checkWinner(board)) {
                board[idx] = "";
                return idx;
            }
            board[idx] = "";
        }

        // 3. Take center if free
        if (board[4] === "") return 4;

        // 4. Take random corner
        const corners = [0, 2, 6, 8].filter(c => board[c] === "");
        if (corners.length > 0 && Math.random() > 0.3) {
            return corners[Math.floor(Math.random() * corners.length)];
        }

        // 5. Random move
        return emptyIndices[Math.floor(Math.random() * emptyIndices.length)];
    }

    // Unbeatable - Minimax Algorithm
    return findMinimaxMove(board);
}

// Minimax Algorithm for Unbeatable AI
function findMinimaxMove(currentBoard) {
    let bestScore = -Infinity;
    let bestMove = -1;
    const emptyIndices = getEmptyIndices(currentBoard);

    // If first move for AI and center is free, center is best
    if (emptyIndices.length === 8 && currentBoard[4] === "") {
        return 4;
    }

    for (const idx of emptyIndices) {
        currentBoard[idx] = "O";
        const score = minimax(currentBoard, 0, false, -Infinity, Infinity);
        currentBoard[idx] = "";

        if (score > bestScore) {
            bestScore = score;
            bestMove = idx;
        }
    }

    return bestMove;
}

function minimax(boardState, depth, isMaximizing, alpha, beta) {
    const winResult = checkWinner(boardState);

    if (winResult) {
        return winResult.player === "O" ? 10 - depth : depth - 10;
    }

    if (isBoardFull(boardState)) {
        return 0;
    }

    const availableMoves = getEmptyIndices(boardState);

    if (isMaximizing) {
        let maxEval = -Infinity;
        for (const idx of availableMoves) {
            boardState[idx] = "O";
            const evaluation = minimax(boardState, depth + 1, false, alpha, beta);
            boardState[idx] = "";
            maxEval = Math.max(maxEval, evaluation);
            alpha = Math.max(alpha, evaluation);
            if (beta <= alpha) break;
        }
        return maxEval;
    } else {
        let minEval = Infinity;
        for (const idx of availableMoves) {
            boardState[idx] = "X";
            const evaluation = minimax(boardState, depth + 1, true, alpha, beta);
            boardState[idx] = "";
            minEval = Math.min(minEval, evaluation);
            beta = Math.min(beta, evaluation);
            if (beta <= alpha) break;
        }
        return minEval;
    }
}

// Helpers
function getEmptyIndices(boardState) {
    const indices = [];
    for (let i = 0; i < boardState.length; i++) {
        if (boardState[i] === "") indices.push(i);
    }
    return indices;
}

function isBoardFull(boardState) {
    return !boardState.includes("");
}

function checkWinner(boardState) {
    for (const combo of winningCombinations) {
        const [a, b, c] = combo;
        if (
            boardState[a] !== "" &&
            boardState[a] === boardState[b] &&
            boardState[b] === boardState[c]
        ) {
            return { player: boardState[a], combination: combo };
        }
    }
    return null;
}

function handleGameOver(winnerInfo) {
    gameActive = false;
    const { player, combination } = winnerInfo;

    combination.forEach(idx => cells[idx].classList.add("winner"));

    if (player === "X") {
        scores.x++;
        scoreXEl.textContent = scores.x;
        statusText.textContent = gameMode === "human" ? "🎉 Player X wins!" : "🎉 You won!";
    } else {
        scores.o++;
        scoreOEl.textContent = scores.o;
        statusText.textContent = gameMode === "human" ? "🎉 Player O wins!" : "🤖 Computer wins!";
    }
}

function handleDraw() {
    gameActive = false;
    scores.draws++;
    scoreDrawEl.textContent = scores.draws;
    statusText.textContent = "🤝 It's a draw!";
}

function updateStatusDisplay() {
    if (!gameActive) return;

    if (gameMode === "human") {
        statusText.textContent = `Player ${currentPlayer}'s turn`;
    } else {
        statusText.textContent = currentPlayer === "X" ? "Your turn (X)" : "Computer's turn (O)";
    }
}

// Reset Game Round
function resetRound() {
    clearTimeout(aiTimeoutId);
    isAiThinking = false;
    currentPlayer = "X";
    gameActive = true;
    board = ["", "", "", "", "", "", "", "", ""];

    cells.forEach(cell => {
        cell.textContent = "";
        cell.className = "cell";
    });

    updateStatusDisplay();
}

// Reset Scoreboard
function resetAllScores() {
    scores.x = 0;
    scores.o = 0;
    scores.draws = 0;
    scoreXEl.textContent = "0";
    scoreOEl.textContent = "0";
    scoreDrawEl.textContent = "0";
    resetRound();
}