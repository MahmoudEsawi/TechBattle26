# 🏗️ Tech Battle - Clean Architecture

## 📁 Project Structure

```
techbattle2/
├── index.html                 # Main landing page
├── assets/                    # Static assets
│   ├── images/               # Image files
│   └── sounds/               # Audio files
├── css/                       # Stylesheets
│   └── style.css             # Main stylesheet
├── js/                        # JavaScript files
│   └── app.js                # Consolidated application logic
├── pages/                     # HTML pages
│   ├── games/                # Family Feud game pages
│   │   ├── Game1.html
│   │   ├── Game2.html
│   │   ├── Game3.html
│   │   └── Game4.html
│   ├── buzzer/               # Buzzer game pages
│   │   ├── BuzzerIndex.html
│   │   ├── BuzzerAvsB.html
│   │   ├── BuzzerCvsD.html
│   │   └── ...
│   ├── components/           # Reusable components
│   │   ├── navbar.html
│   │   └── gameControls.html
│   ├── timer.html            # Timer page
│   ├── var.html              # VAR page
│   ├── tournament.html       # Tournament page
│   └── familyFeud.html       # Family Feud index
└── README.md                  # Documentation
```

## 🎯 Architecture Principles

### 1. **Separation of Concerns**
- **HTML**: Structure and content
- **CSS**: All styling in one file (`css/style.css`)
- **JavaScript**: All logic in one file (`js/app.js`)

### 2. **Component-Based**
- Reusable components in `pages/components/`
- Navbar and game controls are modular
- Easy to update across all pages

### 3. **Feature-Based Organization**
- Pages organized by feature (games, buzzer, etc.)
- Clear navigation paths
- Logical grouping

### 4. **Resource Organization**
- All static assets in `assets/`
- Centralized stylesheets
- Consolidated JavaScript

## 📝 File Paths Reference

### From Root (`index.html`)
- CSS: `./css/style.css`
- JS: `./js/app.js`
- Assets: `./assets/`
- Pages: `./pages/`

### From Pages (`pages/games/Game1.html`)
- CSS: `../../css/style.css`
- JS: `../../js/app.js`
- Assets: `../../assets/`
- Components: `../components/`
- Home: `../../index.html`

### From Components (`pages/components/navbar.html`)
- CSS: `../../css/style.css`
- Assets: `../../assets/`
- Home: `../../index.html`

## 🔧 JavaScript Modules in `app.js`

1. **Scoreboard** - Score management system
2. **SoundManager** - Audio control system
3. **TeamSelector** - Team selection modal
4. **Game Logic** - Main game functionality
5. **Navbar** - Navigation functionality
6. **Controls** - UI controls and shortcuts

## 🎨 Styling

All styles are in `css/style.css` with clear sections:
- CSS Variables
- Base Styles
- Components (Scoreboard, Navbar, etc.)
- Pages (Games, Timer, Buzzer)
- Responsive Design
- Animations

## 🚀 Adding New Pages

1. Create HTML file in appropriate `pages/` subdirectory
2. Include CSS: `<link rel="stylesheet" href="../../css/style.css">`
3. Include JS: `<script src="../../js/app.js"></script>`
4. Load components: `fetch('../components/navbar.html')`

## 📦 Dependencies

- jQuery 3.6.0 (CDN)
- Bootstrap 4.0.0 (CDN)
- Three.js r128 (CDN)

## ✅ Benefits

- **Maintainability**: Clear organization
- **Scalability**: Easy to add features
- **Performance**: Consolidated assets
- **Clarity**: Self-documenting structure
- **Reusability**: Component-based design

