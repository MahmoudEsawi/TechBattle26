# 🎮 Computer Society Tech Battle

A comprehensive web-based game platform for tech competitions, featuring multiple game modes, real-time scoring, sound effects, and celebration animations.

![Tech Battle](https://img.shields.io/badge/Tech-Battle-orange) ![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white) ![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white) ![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)

## 📋 Table of Contents

- [Features](#features)
- [Game Modes](#game-modes)
- [Installation](#installation)
- [Usage](#usage)
- [Keyboard Shortcuts](#keyboard-shortcuts)
- [Project Structure](#project-structure)
- [Technologies](#technologies)
- [Contributing](#contributing)
- [License](#license)

## ✨ Features

### 🎯 Core Features
- **Multi-Game Platform**: Family Feud, Timer, Buzzer Games, VAR, and Tournament Bracket
- **Real-Time Scoreboard**: Track scores for up to 6 teams with persistent storage
- **Sound Management**: Toggleable sound effects for correct/wrong answers and timer
- **Fullscreen Mode**: Perfect for presentations and large displays
- **Keyboard Controls**: Complete keyboard shortcut system for seamless gameplay
- **Celebration System**: Victory animations with confetti and fireworks
- **Game Descriptions**: Interactive game rules and instructions
- **Responsive Design**: Works on various screen sizes

### 🎨 Visual Features
- Modern UI with gradient backgrounds and glowing effects
- Animated card flips for answer reveals
- 3D X-mark for wrong answers
- Background pattern overlay
- Professional scoreboard with animations
- Celebration effects with confetti

## 🎮 Game Modes

### 1. Family Feud
- **Location**: `pages/familyFeud.html`
- **Description**: Answer-revealing game where teams compete to guess popular answers
- **Scoring**: Points based on answer position (100, 80, 60, 40, 20, 10)
- **Controls**: 
  - Press `1-6` to reveal answers
  - Press `X` for wrong answer
  - Press `C` to play correct sound

### 2. Timer
- **Location**: `pages/timer.html`
- **Description**: 30-second countdown timer with question display
- **Controls**:
  - Press `S` to start timer
  - Press `R` to reset timer
  - Press `N`/`P` for next/previous question

### 3. Buzzer Games
- **Location**: `pages/buzzer/BuzzerIndex.html`
- **Description**: Fast-paced head-to-head team competitions
- **Rounds**: 
  - Round 1: Teams A vs B, C vs D, E vs F
  - Round 2: Semi-finals
  - Round 3: Championship

### 4. VAR (Video Assistant Review)
- **Location**: `pages/var.html`
- **Description**: Video upload and review system for tournament decisions
- **Features**: Drag & drop video upload, playback controls

### 5. Tournament Bracket
- **Location**: `pages/tournament.html`
- **Description**: Interactive tournament bracket system
- **Structure**: Quarterfinals → Semifinals → Final

## 🚀 Installation

### Prerequisites
- A modern web browser (Chrome, Firefox, Safari, Edge)
- Web server (optional, for local testing)

### Quick Start

1. **Clone the repository**
   ```bash
   git clone https://github.com/MahmoudEsawi/TechBattle26.git
   cd TechBattle26
   ```

2. **Open in browser**
   - Simply open `index.html` in your web browser
   - Or use a local server:
     ```bash
     # Python 3
     python -m http.server 8000
     
     # Node.js (with http-server)
     npx http-server
     ```

3. **Access the website**
   - Open `http://localhost:8000` in your browser

## 📖 Usage

### Starting a Game

1. Navigate to the main page (`index.html`)
2. Click on one of the game mode buttons:
   - Family Feud
   - Timer
   - Buzzer
   - VAR
   - Tournament
3. Follow the game description popup (shown once per session)
4. Use keyboard shortcuts or on-screen controls to play

### Scoreboard

- **View**: Top-left corner on game pages
- **Reset**: Click "Reset Scores" button
- **Persistence**: Scores are saved in browser localStorage

### Sound Controls

- **Toggle**: Click "Sound ON/OFF" button (top-right)
- **Status**: Setting persists across sessions
- **Sounds**: Correct answer, wrong answer, timer tick, card flip

### Fullscreen Mode

- **Enter**: Click "Fullscreen" button or press `F11`
- **Exit**: Press `ESC` or click button again

## ⌨️ Keyboard Shortcuts

### Family Feud Games
| Key | Action |
|-----|--------|
| `1-6` | Reveal answer cards |
| `X` | Mark wrong answer |
| `C` | Play correct sound |

### Timer & Buzzer
| Key | Action |
|-----|--------|
| `S` | Start timer |
| `R` | Reset timer |
| `N` | Next question |
| `P` | Previous question |

### General
| Key | Action |
|-----|--------|
| `?` | Show keyboard shortcuts |
| `ESC` | Close overlays / Exit fullscreen |

For complete keyboard shortcuts, see [KEYBOARD_SHORTCUTS.md](KEYBOARD_SHORTCUTS.md)

## 📁 Project Structure

```
techbattle2/
├── index.html              # Main landing page
├── css/
│   └── style.css          # All styles and animations
├── js/
│   └── app.js             # Consolidated JavaScript (scoreboard, sounds, controls)
├── assets/
│   ├── images/            # Images and logos
│   └── sounds/            # Audio files
├── pages/
│   ├── games/             # Family Feud game rounds
│   │   ├── Game1.html
│   │   ├── Game2.html
│   │   ├── Game3.html
│   │   └── Game4.html
│   ├── buzzer/            # Buzzer game pages
│   ├── components/        # Reusable components
│   │   ├── navbar.html
│   │   └── gameControls.html
│   ├── familyFeud.html    # Family Feud entry page
│   ├── timer.html         # Timer page
│   ├── var.html           # VAR page
│   └── tournament.html    # Tournament bracket
├── README.md              # This file
├── ARCHITECTURE.md        # Project architecture documentation
├── KEYBOARD_SHORTCUTS.md  # Keyboard shortcuts guide
└── NEW_FEATURES.md        # Feature documentation
```

For detailed architecture information, see [ARCHITECTURE.md](ARCHITECTURE.md)

## 🛠️ Technologies

- **HTML5**: Structure and semantics
- **CSS3**: Styling, animations, and responsive design
- **JavaScript (ES6+)**: Game logic and interactivity
- **jQuery**: DOM manipulation (loaded via CDN)
- **Bootstrap 4**: UI components (selected pages)
- **Three.js**: 3D background effects (optional)
- **LocalStorage API**: Score persistence
- **Web Audio API**: Sound management

## 🎨 Customization

### Changing Colors
Edit CSS variables in `css/style.css`:
```css
:root {
    --primary-orange: #FF6B35;
    --gold: #FFD700;
    --bg-dark: #0A0A0A;
    /* ... */
}
```

### Adding New Game Modes
1. Create HTML file in `pages/` directory
2. Link to `css/style.css` and `js/app.js`
3. Add game description in `app.js` under `gameDescriptions`
4. Update navigation links

### Modifying Scoring
Edit `Scoreboard` class in `js/app.js`:
```javascript
this.pointsByPosition = {
    1: 100, 2: 80, 3: 60, 4: 40, 5: 20, 6: 10
};
```

## 🎉 Celebration System

Trigger celebration animations programmatically:
```javascript
// Simple celebration
celebrate();

// With winner name
celebrate("Team A");
```

## 📝 Browser Compatibility

- ✅ Chrome (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Edge (latest)

## 🐛 Known Issues

- Timer sound may require user interaction first (browser autoplay policy)
- Fullscreen requires user gesture (browser security)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👥 Credits

- **Developed for**: IEEE Computer Society Tech Battle
- **Repository**: [TechBattle26](https://github.com/MahmoudEsawi/TechBattle26)

## 📞 Support

For issues, questions, or suggestions:
- Open an issue on [GitHub](https://github.com/MahmoudEsawi/TechBattle26/issues)
- Check documentation in `ARCHITECTURE.md` and `KEYBOARD_SHORTCUTS.md`

---

**Enjoy the Tech Battle! 🎮🏆**
