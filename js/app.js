// ============================================
// CONSOLIDATED TECH BATTLE APPLICATION
// Merged: scoreboard.js, soundManager.js, teamSelector.js, controls.js, script.js
// ============================================

// ============================================
// SCOREBOARD MANAGEMENT SYSTEM
// ============================================
class Scoreboard {
    constructor() {
        this.teams = {
            'Team A': 0,
            'Team B': 0,
            'Team C': 0,
            'Team D': 0,
            'Team E': 0,
            'Team F': 0
        };
        this.pointsByPosition = {
            1: 100, 2: 80, 3: 60, 4: 40, 5: 20, 6: 10
        };
        this.loadScores();
    }

    addScore(teamName, points) {
        if (this.teams.hasOwnProperty(teamName)) {
            this.teams[teamName] += points;
            this.saveScores();
            this.updateDisplay();
        }
    }

    addScoreByPosition(teamName, position) {
        const points = this.pointsByPosition[position] || 0;
        this.addScore(teamName, points);
        return points;
    }

    resetScores() {
        Object.keys(this.teams).forEach(team => {
            this.teams[team] = 0;
        });
        this.saveScores();
        this.updateDisplay();
    }

    saveScores() {
        localStorage.setItem('techBattleScores', JSON.stringify(this.teams));
    }

    loadScores() {
        const saved = localStorage.getItem('techBattleScores');
        if (saved) {
            this.teams = JSON.parse(saved);
        }
    }

    updateDisplay() {
        const scoreboard = document.getElementById('scoreboard-display');
        if (!scoreboard) return;

        const sortedTeams = Object.entries(this.teams)
            .sort((a, b) => b[1] - a[1])
            .map(([name, score]) => `
                <div class="scoreboard-item">
                    <span class="team-name">${name}</span>
                    <span class="team-score">${score}</span>
                </div>
            `).join('');

        scoreboard.innerHTML = sortedTeams;
    }

    getTeamScore(teamName) {
        return this.teams[teamName] || 0;
    }
}

// ============================================
// SOUND MANAGER SYSTEM
// ============================================
class SoundManager {
    constructor() {
        this.enabled = true;
        this.loadSetting();
        this.audioContext = null;
        this.initializeAudio();
    }

    initializeAudio() {
        try {
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
        } catch (e) {
            console.warn('Audio context not supported');
        }
    }

    toggle() {
        this.enabled = !this.enabled;
        this.saveSetting();
        this.updateUI();
    }

    saveSetting() {
        localStorage.setItem('soundEnabled', this.enabled);
    }

    loadSetting() {
        const saved = localStorage.getItem('soundEnabled');
        if (saved !== null) {
            this.enabled = saved === 'true';
        }
    }

    updateUI() {
        const btn = document.getElementById('sound-toggle');
        if (btn) {
            btn.textContent = this.enabled ? 'Sound ON' : 'Sound OFF';
            btn.style.opacity = this.enabled ? '1' : '0.5';
        }
    }

    play(sound) {
        if (!this.enabled || !sound) return;
        try {
            sound.currentTime = 0;
            sound.play().catch(e => console.log('Sound play prevented'));
        } catch (e) {
            console.log('Sound play error:', e);
        }
    }
}

// Initialize global instances
const scoreboard = new Scoreboard();
const soundManager = new SoundManager();
window.scoreboard = scoreboard;
window.soundManager = soundManager;

// Initialize scoreboard display on load
document.addEventListener('DOMContentLoaded', function() {
    if (window.scoreboard) {
        window.scoreboard.updateDisplay();
    }
    if (window.soundManager) {
        window.soundManager.updateUI();
    }
});

// ============================================
// KEYBOARD CONTROLS - Game Controls
// ============================================

// Sound file paths helper
function getBasePath() {
    const path = window.location.pathname;
    if (path.includes('/pages/games/') || path.includes('/pages/buzzer/')) {
        return '../../';
    } else if (path.includes('/pages/')) {
        return '../';
    }
    return './';
}

// Initialize audio sounds
const basePath = getBasePath();
const correctSound = new Audio(basePath + 'assets/sounds/correct_answer.mp3');
const wrongSound = new Audio(basePath + 'assets/sounds/wrong_answer.mp3');
const flipSound = new Audio(basePath + 'assets/sounds/flipcard.mp3');
const timerSound = new Audio(basePath + 'assets/sounds/EchoingClockTick.mp3');

// Store sounds in soundManager
if (window.soundManager) {
    window.soundManager.sounds = {
        correct: correctSound,
        wrong: wrongSound,
        flip: flipSound,
        timer: timerSound
    };
}

// Keyboard event handler
document.addEventListener('keydown', function(e) {
    const key = e.key;
    
    // Family Feud: Reveal answers (1-6)
    if (key >= '1' && key <= '6') {
        const buttonId = 'myButton' + key;
        const button = document.getElementById(buttonId);
        if (button && !button.classList.contains('flipped')) {
            button.classList.add('flipped');
            button.classList.add('test');
            
            // Play flip sound
            if (window.soundManager) {
                window.soundManager.play(flipSound);
            }
            
            // Add score based on position
            if (window.scoreboard) {
                const position = parseInt(key);
                const points = window.scoreboard.addScoreByPosition('Team A', position);
            }
            
            // Play correct sound after flip
            setTimeout(() => {
                if (window.soundManager) {
                    window.soundManager.play(correctSound);
                }
            }, 300);
        }
    }
    
    // Wrong answer (X key)
    if (key === 'x' || key === 'X') {
        if (window.soundManager) {
            window.soundManager.play(wrongSound);
        }
        
        // Show X mark
        const xContainer = document.getElementById('wrong-answer-image-container');
        if (xContainer) {
            xContainer.style.display = 'block';
            xContainer.innerHTML = '<div class="x-mark-3d"></div>';
            setTimeout(() => {
                xContainer.style.display = 'none';
                xContainer.innerHTML = '';
            }, 1000);
        }
    }
    
    // Play correct sound (C key)
    if (key === 'c' || key === 'C') {
        if (window.soundManager) {
            window.soundManager.play(correctSound);
        }
    }
    
    // Timer controls (S, R, N, P)
    if (key === 's' || key === 'S') {
        // Start timer - check if timer exists
        const secondsEl = document.getElementById('Seconds');
        if (secondsEl) {
            let seconds = parseInt(secondsEl.textContent) || 30;
            if (seconds <= 0) seconds = 30;
            
            // Play ticking sound
            if (window.soundManager && window.soundManager.enabled) {
                timerSound.loop = true;
                timerSound.play().catch(e => console.log('Timer sound prevented'));
            }
            
            const countdown = setInterval(() => {
                seconds--;
                if (secondsEl) {
                    secondsEl.textContent = seconds;
                    if (seconds <= 0) {
                        secondsEl.textContent = "Time's Up!";
                        secondsEl.style.color = '#FF0000';
                        clearInterval(countdown);
                        if (timerSound) {
                            timerSound.pause();
                            timerSound.currentTime = 0;
                        }
                    }
                } else {
                    clearInterval(countdown);
                }
            }, 1000);
        }
    }
    
    if (key === 'r' || key === 'R') {
        // Reset timer
        const secondsEl = document.getElementById('Seconds');
        if (secondsEl) {
            secondsEl.textContent = '30';
            secondsEl.style.color = '';
            if (timerSound) {
                timerSound.pause();
                timerSound.currentTime = 0;
            }
        }
    }
    
    // Question navigation (N, P) - for timer and buzzer pages
    if (key === 'n' || key === 'N') {
        // Next question logic would go here
        console.log('Next question');
    }
    
    if (key === 'p' || key === 'P') {
        // Previous question logic would go here
        console.log('Previous question');
    }
});

// ============================================
// GAME DESCRIPTION SYSTEM
// ============================================

const gameDescriptions = {
    'family-feud': {
        title: 'Family Feud',
        content: `
            <p>Welcome to <strong>Family Feud</strong> - the exciting answer-revealing game!</p>
            
            <h3>How to Play</h3>
            <ul>
                <li>Teams compete to guess the most popular answers</li>
                <li>Press number keys <span class="key">1-6</span> to reveal answers</li>
                <li>Each revealed answer gives points based on position (1st = 100pts, 2nd = 80pts, etc.)</li>
                <li>Press <span class="key">X</span> to mark a wrong answer</li>
                <li>Press <span class="key">C</span> to play correct sound</li>
            </ul>
            
            <h3>Scoring</h3>
            <ul>
                <li>1st answer revealed: <strong>100 points</strong></li>
                <li>2nd answer revealed: <strong>80 points</strong></li>
                <li>3rd answer revealed: <strong>60 points</strong></li>
                <li>4th answer revealed: <strong>40 points</strong></li>
                <li>5th answer revealed: <strong>20 points</strong></li>
                <li>6th answer revealed: <strong>10 points</strong></li>
            </ul>
            
            <p><strong>Good luck and have fun!</strong></p>
        `
    },
    'timer': {
        title: 'Timer',
        content: `
            <p>Welcome to the <strong>Timer</strong> page!</p>
            
            <h3>How to Use</h3>
            <ul>
                <li>Press <span class="key">S</span> to start a 30-second countdown</li>
                <li>Press <span class="key">R</span> to reset the timer</li>
                <li>Press <span class="key">N</span> to go to the next question</li>
                <li>Press <span class="key">P</span> to go to the previous question</li>
                <li>The timer will turn red and display "Time's Up!" when it reaches zero</li>
            </ul>
            
            <h3>Features</h3>
            <ul>
                <li>Large, clear timer display perfect for venues</li>
                <li>Ticking sound while counting down</li>
                <li>Auto-updates question display for all buzzer rounds</li>
            </ul>
        `
    },
    'buzzer': {
        title: 'Buzzer Games',
        content: `
            <p>Welcome to <strong>Buzzer Games</strong> - fast-paced team competitions!</p>
            
            <h3>How to Play</h3>
            <ul>
                <li>Teams compete head-to-head in buzzer rounds</li>
                <li>Press <span class="key">S</span> to start the timer for each question</li>
                <li>Press <span class="key">N</span> to move to the next question</li>
                <li>Press <span class="key">P</span> to go back to previous question</li>
                <li>First team to buzz in and answer correctly wins points</li>
            </ul>
            
            <h3>Rounds</h3>
            <ul>
                <li><strong>Round 1:</strong> Teams A vs B, C vs D, E vs F</li>
                <li><strong>Round 2:</strong> Semi-finals (A&B winners, C&D winners)</li>
                <li><strong>Round 3:</strong> Final championship round</li>
            </ul>
            
            <p><strong>Be quick, be accurate, and win!</strong></p>
        `
    },
    'var': {
        title: 'VAR - Video Assistant Review',
        content: `
            <p>Welcome to <strong>VAR</strong> - Video Assistant Review system!</p>
            
            <h3>How to Use</h3>
            <ul>
                <li>Upload or drag & drop a video file</li>
                <li>Review video playback with controls</li>
                <li>Use play, pause, reset, and clear functions</li>
                <li>Perfect for reviewing gameplay moments and decisions</li>
            </ul>
            
            <h3>Features</h3>
            <ul>
                <li>Video upload and preview</li>
                <li>Full playback controls</li>
                <li>Clean, professional interface</li>
                <li>Ideal for tournament reviews</li>
            </ul>
        `
    },
    'tournament': {
        title: 'Tournament Bracket',
        content: `
            <p>Welcome to the <strong>Tournament Bracket</strong> system!</p>
            
            <h3>How to Use</h3>
            <ul>
                <li>Select teams for each match by clicking team slots</li>
                <li>Track tournament progress through rounds</li>
                <li>Matches are organized by rounds: Quarterfinals → Semifinals → Final</li>
                <li>Click on team slots to assign winners</li>
            </ul>
            
            <h3>Structure</h3>
            <ul>
                <li><strong>Round 1:</strong> Initial matches</li>
                <li><strong>Round 2:</strong> Semi-finals</li>
                <li><strong>Final:</strong> Championship match</li>
            </ul>
            
            <p><strong>May the best team win!</strong></p>
        `
    }
};

function showGameDescription(gameType) {
    const description = gameDescriptions[gameType];
    if (!description) return;
    
    // Remove existing overlay if any
    const existing = document.getElementById('game-description-overlay');
    if (existing) existing.remove();
    
    const overlay = document.createElement('div');
    overlay.id = 'game-description-overlay';
    overlay.className = 'game-description-overlay';
    overlay.innerHTML = `
        <div class="game-description-box">
            <h2 class="game-description-title">${description.title}</h2>
            <div class="game-description-content">
                ${description.content}
            </div>
            <button class="game-description-close" onclick="closeGameDescription()">
                Start Game
            </button>
        </div>
    `;
    
    document.body.appendChild(overlay);
}

function closeGameDescription() {
    const overlay = document.getElementById('game-description-overlay');
    if (overlay) {
        overlay.style.animation = 'fadeOut 0.3s ease';
        setTimeout(() => overlay.remove(), 300);
    }
}

// Auto-show description on page load based on URL
document.addEventListener('DOMContentLoaded', function() {
    const path = window.location.pathname;
    const pageName = path.split('/').pop().toLowerCase();
    
    // Show description only once for entry pages: Family Feud, Timer, and Buzzer
    // Only show on the main entry pages, not individual game pages
    if (path.includes('familyFeud.html') && !path.includes('Game')) {
        // Family Feud entry page only
        if (!sessionStorage.getItem('familyFeudDescShown')) {
            setTimeout(() => showGameDescription('family-feud'), 500);
            sessionStorage.setItem('familyFeudDescShown', 'true');
        }
    } else if (path.includes('timer.html')) {
        // Timer entry page only
        if (!sessionStorage.getItem('timerDescShown')) {
            setTimeout(() => showGameDescription('timer'), 500);
            sessionStorage.setItem('timerDescShown', 'true');
        }
    } else if (path.includes('BuzzerIndex.html')) {
        // Buzzer entry page only
        if (!sessionStorage.getItem('buzzerDescShown')) {
            setTimeout(() => showGameDescription('buzzer'), 500);
            sessionStorage.setItem('buzzerDescShown', 'true');
        }
    }
    
    // Close on ESC key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeGameDescription();
        }
    });
});

// ============================================
// CELEBRATION SYSTEM - Final Victory Effects
// ============================================

function celebrate(winner = null) {
    // Create celebration overlay
    const overlay = document.createElement('div');
    overlay.id = 'celebration-overlay';
    overlay.className = 'celebration-overlay';
    
    const winnerText = winner ? `<h1 class="celebration-winner">${winner} WINS!</h1>` : '';
    
    overlay.innerHTML = `
        <div class="celebration-content">
            ${winnerText}
            <div class="celebration-title">🎉 CELEBRATION 🎉</div>
            <div class="celebration-message">Amazing Performance!</div>
            <div class="celebration-confetti"></div>
        </div>
    `;
    
    document.body.appendChild(overlay);
    
    // Create confetti particles
    createConfetti();
    
    // Play celebration sound
    if (window.soundManager && window.soundManager.enabled) {
        const correctSound = window.soundManager.sounds?.correct;
        if (correctSound) {
            correctSound.play().catch(e => console.log('Sound play prevented'));
        }
    }
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        overlay.style.animation = 'fadeOut 0.5s ease';
        setTimeout(() => overlay.remove(), 500);
    }, 5000);
}

function createConfetti() {
    const colors = ['#FFD700', '#FF6B35', '#FFA366', '#FF4500', '#FFFFFF', '#00FF00', '#0080FF'];
    const confettiCount = 150;
    
    for (let i = 0; i < confettiCount; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.className = 'confetti-piece';
            confetti.style.left = Math.random() * 100 + '%';
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.animationDelay = Math.random() * 2 + 's';
            confetti.style.animationDuration = (Math.random() * 3 + 2) + 's';
            
            // Random shape
            if (Math.random() > 0.5) {
                confetti.style.borderRadius = '50%';
            }
            
            document.body.appendChild(confetti);
            
            // Remove after animation
            setTimeout(() => {
                if (confetti.parentNode) {
                    confetti.remove();
                }
            }, 5000);
        }, i * 10);
    }
}

// Fireworks effect
function createFireworks() {
    for (let i = 0; i < 5; i++) {
        setTimeout(() => {
            const firework = document.createElement('div');
            firework.className = 'firework';
            firework.style.left = Math.random() * 100 + '%';
            firework.style.top = Math.random() * 50 + '%';
            document.body.appendChild(firework);
            
            setTimeout(() => firework.remove(), 2000);
        }, i * 400);
    }
}

// Global function to trigger celebration
window.celebrate = celebrate;
window.createFireworks = createFireworks;
