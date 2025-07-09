# 🎮 Jacob's GBA Portfolio Emulator

## Overview

**Jacob's GBA Portfolio Emulator** is a web-based Game Boy Advance (GBA) emulator designed to showcase a fully interactive `.gba` portfolio — featuring a custom map, animated character, NPC dialogs, and buildings.It provides a nostalgic, retro-style experience right in the browser.

This project merges creative game design with frontend emulation, making it ideal for self-branding, interactive resumes, and showcasing technical and artistic skillsets.

---

## System Architecture

### Frontend

* **Interface**: Embedded emulator running in the browser
* **Display**: Pixel-accurate Canvas output (GBA resolution)
* **Input**: Keyboard support (mobile/gamepad planned)
* **ROM**: Preloaded `.gba` file containing Jake’s custom portfolio

### Backend

* **Emulation Engine**: Based on `GBA.js` (JavaScript-only)
* **Memory**: Emulates GBA memory and real-time registers
* **Audio**: HTML5 Web Audio support for in-ROM music/sound
* **Save System**: Supports manual import/export of `.sav` files

---

## Modular Design

### 🔹 ROM Loader

* Automatically loads Jacob's personal `portfolio.gba` ROM
* Can be modified to allow custom ROM uploads (disabled for security)

### 🔹 Emulator Core

* JS-based CPU, GPU, memory map, and interrupt emulation
* Optimized for web performance (60fps-capable)

### 🔹 Save Support

* Download/upload `.sav` files manually
* Supports real-time clock games

---

## Key Features

### 🧾 `index.html`

* Main launcher that auto-runs the emulator and ROM

### 🎮 `startEmulator(romFile)`

* Starts the embedded portfolio ROM
* Handles rendering and input loop

### 🖼 `captureScreenshot()`

* Saves a PNG of the current GBA frame (snapshot of your portfolio)

### ⏸ `togglePause()`

* Pause/resume the emulator (controlled via keyboard)

---

## Use Cases

This emulator is used to power Jake's **GBA-style portfolio**, with:

* A top-down character that explores a custom map
* Interactive NPCs for resume, certifications, projects, and references
* Dialog options and enterable buildings
* Retro game feel powered entirely by web tech

---

## Deployment

### 🔧 Local Dev Instructions

```bash
git clone https://github.com/jake/gba-portfolio-emulator.git
cd gba-portfolio-emulator
```

1. Place your compiled `portfolio.gba` file into the root folder.
2. Open `index.html` in your browser.

---
## License

This project is licensed under the **Apache License 2.0**.

---

## 🔗 Links
* 🎮 Play Jacob's Portfolio: [ https://sugarplum1827.github.io/Porfolio-Emulator/]( https://sugarplum1827.github.io/Porfolio-Emulator/)
