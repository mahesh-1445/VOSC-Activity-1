# Tic Tac Toe

A modern, responsive Tic-Tac-Toe web game featuring **vs Human** and **vs Computer (AI)** modes, built using HTML, CSS, and Vanilla JavaScript.

---

## 🎮 Features

- **Dual Game Modes**:
  - 👥 **vs Human**: Play locally turn-by-turn with a friend on the same device.
  - 🤖 **vs Computer**: Challenge an intelligent AI bot with dynamic thinking states.
- **3 AI Difficulty Levels**:
  - **Easy**: Makes casual and random moves.
  - **Medium**: Blocks threats, takes immediate winning chances, and strategizes key squares.
  - **Unbeatable**: Powered by the **Minimax Algorithm with Alpha-Beta Pruning**—mathematically impossible to defeat.
- **Live Scoreboard**:
  - Tracks match wins for Player X (or You), Player O (or Computer), and Ties/Draws.
  - Separate **Reset Scores** and **Restart Round** controls.
- **Visual Feedback & Animations**:
  - Dynamic status indicator with thinking pulse during AI calculations.
  - Winning 3-in-a-row combination highlighting with smooth pop animation.
  - Responsive, glassmorphic dark-theme UI tailored for mobile, tablet, and desktop screens.
- **Accessibility (a11y)**:
  - Aria roles, labels, live polite regions, and keyboard-navigable grid buttons.

---

## 🛠️ Technologies Used

- **HTML5**: Semantic markup, ARIA roles, and accessible grid controls.
- **CSS3**: Glassmorphism, CSS Grid, Flexbox, custom glowing variables, and keyframe animations.
- **JavaScript (ES6+)**: Event-driven architecture, Minimax AI algorithm, score state management.

---

## 📁 Project Structure

```text
VOSC Activity-1/
├── index.html    # Game layout, mode tabs, scoreboard, and board grid
├── style.css     # Glassmorphic dark styling, typography, and animations
├── script.js     # State management, turn logic, AI engine, and score tracking
└── README.md     # Project documentation
```

---

## 🚀 How to Run

### Method 1: Local HTTP Server (Recommended)
1. Open PowerShell or Terminal in the project directory:
   ```powershell
   python -m http.server 3000
   ```
2. Open your browser and navigate to:
   ```
   http://localhost:3000
   ```

### Method 2: Direct Browser Launch
Run in terminal or double-click `index.html`:
```powershell
start index.html
```

---

## 🕹️ How to Play

1. Choose your game mode using the top tabs:
   - **👥 vs Human**: Player X and Player O alternate turns.
   - **🤖 vs Computer**: You play as **X**, and the Computer plays as **O**.
2. If playing against the Computer, select your desired AI level (**Easy**, **Medium**, or **Unbeatable**).
3. Click any empty cell to place your symbol.
4. Align **3 symbols** horizontally, vertically, or diagonally to win!
5. Click **Restart Round** to play another match or **Reset Scores** to wipe the scoreboard.

---

## 👤 Author

Developed for **VOSC Activity-1**.
