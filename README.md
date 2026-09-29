# Tic Tac Toe

A modern, responsive two-player Tic Tac Toe web game built using HTML, CSS, and Vanilla JavaScript.

---

## 🎮 Features

- **Two-Player Mode**: Interactive turns alternating between Player X and Player O.
- **Real-Time Status**: Displays current turn, winner announcements, and draw alerts.
- **Winning Combinations Detection**: Automatically detects horizontal, vertical, and diagonal wins.
- **Winning Highlight**: Visually highlights the winning 3-in-a-row line with smooth animations.
- **Draw Detection**: Accurately detects a tie when all 9 grid cells are filled with no winner.
- **Instant Restart**: Reset button resets the grid and state seamlessly without reloading the page.
- **Modern & Responsive UI**: Clean glassmorphism styling that looks great on mobile, tablet, and desktop screens.

---

## 🛠️ Technologies Used

- **HTML5**: Semantic markup and accessibility attributes.
- **CSS3**: Responsive flexbox and grid layouts, gradients, animations, and glassmorphic styling.
- **JavaScript (ES6+)**: Event-driven game logic, turn management, and win-condition algorithms.

---

## 📁 Project Structure

```text
VOSC Activity-1/
├── index.html    # Game structure and layout
├── style.css     # Styling, color palette, and animations
├── script.js     # Game logic, state tracking, and event handlers
└── README.md     # Project documentation
```

---

## 🚀 How to Run

### Method 1: Local HTTP Server (Recommended)
1. Open a terminal in the project directory:
   ```powershell
   python -m http.server 3000
   ```
2. Open your web browser and navigate to:
   ```
   http://localhost:3000
   ```

### Method 2: Direct Browser Launch
- Double-click `index.html` or run:
  ```powershell
  start index.html
  ```

---

## 🕹️ How to Play

1. **Player X** always takes the first move.
2. Players alternate turns clicking any available empty cell.
3. The first player to align **3 symbols in a row, column, or diagonal** wins the match.
4. If all 9 cells are filled without a winning sequence, the match ends in a **draw**.
5. Click **Restart Game** at any time to begin a new round.

---

## 👤 Author

Developed for **VOSC Activity-1**.
