function GameBoyAdvanceKeypad() {
	this.KEYCODE_LEFT = 65;     // A  → Left
	this.KEYCODE_UP = 87;       // W  →  Up
	this.KEYCODE_RIGHT = 68;    // D  →  Right
	this.KEYCODE_DOWN = 83;     // S  →  Down
	this.KEYCODE_L = 90;        // Z  → L 
	this.KEYCODE_R = 88;        // X  → R 
	this.KEYCODE_START = 13;    // Enter → Start 
	this.KEYCODE_SELECT = 8;    // Backspace → Select 
	this.KEYCODE_A = 81;        // Q  → A 
	this.KEYCODE_B = 69;        // E  → B 


	this.GAMEPAD_LEFT = 14;     // Gamepad D-Pad Left
	this.GAMEPAD_UP = 12;       // Gamepad D-Pad Up
	this.GAMEPAD_RIGHT = 15;    // Gamepad D-Pad Right
	this.GAMEPAD_DOWN = 13;     // Gamepad D-Pad Down
	this.GAMEPAD_START = 9;     // Start button
	this.GAMEPAD_SELECT = 8;    // Select button
	this.GAMEPAD_A = 1;         // Gamepad A
	this.GAMEPAD_B = 0;         // Gamepad B
	this.GAMEPAD_L = 4;         // Left shoulder button
	this.GAMEPAD_R = 5;         // Right shoulder button
	this.GAMEPAD_THRESHOLD = 0.2;

	this.A = 0;        // A button
	this.B = 1;        // B button
	this.SELECT = 2;   // Select button
	this.START = 3;    // Start button
	this.RIGHT = 4;    // Right direction
	this.LEFT = 5;     // Left direction
	this.UP = 6;       // Up direction
	this.DOWN = 7;     // Down direction
	this.R = 8;        // R shoulder button
	this.L = 9;        // L shoulder button

	this.currentDown = 0x03FF;
	this.eatInput = false;

	this.gamepads = [];
};

GameBoyAdvanceKeypad.prototype.keyboardHandler = function(e) {
	var toggle = 0;
	switch (e.keyCode) {
		case this.KEYCODE_START:
			toggle = this.START;
			break;
		case this.KEYCODE_SELECT:
			toggle = this.SELECT;
			break;
		case this.KEYCODE_A:
			toggle = this.A;
			break;
		case this.KEYCODE_B:
			toggle = this.B;
			break;
		case this.KEYCODE_L:
			toggle = this.L;
			break;
		case this.KEYCODE_R:
			toggle = this.R;
			break;
		case this.KEYCODE_UP:
			toggle = this.UP;
			break;
		case this.KEYCODE_RIGHT:
			toggle = this.RIGHT;
			break;
		case this.KEYCODE_DOWN:
			toggle = this.DOWN;
			break;
		case this.KEYCODE_LEFT:
			toggle = this.LEFT;
			break;
		default:
			return;
	}

	toggle = 1 << toggle;
	if (e.type == "keydown") {
		this.currentDown &= ~toggle;
	} else {
		this.currentDown |= toggle;
	}

	if (this.eatInput) {
		e.preventDefault();
	}
};

GameBoyAdvanceKeypad.prototype.gamepadHandler = function(gamepad) {
	var value = 0;
	if (gamepad.buttons[this.GAMEPAD_LEFT] > this.GAMEPAD_THRESHOLD) {
		value |= 1 << this.LEFT;
	}
	if (gamepad.buttons[this.GAMEPAD_UP] > this.GAMEPAD_THRESHOLD) {
		value |= 1 << this.UP;
	}
	if (gamepad.buttons[this.GAMEPAD_RIGHT] > this.GAMEPAD_THRESHOLD) {
		value |= 1 << this.RIGHT;
	}
	if (gamepad.buttons[this.GAMEPAD_DOWN] > this.GAMEPAD_THRESHOLD) {
		value |= 1 << this.DOWN;
	}
	if (gamepad.buttons[this.GAMEPAD_START] > this.GAMEPAD_THRESHOLD) {
		value |= 1 << this.START;
	}
	if (gamepad.buttons[this.GAMEPAD_SELECT] > this.GAMEPAD_THRESHOLD) {
		value |= 1 << this.SELECT;
	}
	if (gamepad.buttons[this.GAMEPAD_A] > this.GAMEPAD_THRESHOLD) {
		value |= 1 << this.A;
	}
	if (gamepad.buttons[this.GAMEPAD_B] > this.GAMEPAD_THRESHOLD) {
		value |= 1 << this.B;
	}
	if (gamepad.buttons[this.GAMEPAD_L] > this.GAMEPAD_THRESHOLD) {
		value |= 1 << this.L;
	}
	if (gamepad.buttons[this.GAMEPAD_R] > this.GAMEPAD_THRESHOLD) {
		value |= 1 << this.R;
	}

	this.currentDown = ~value & 0x3FF;
};

GameBoyAdvanceKeypad.prototype.gamepadConnectHandler = function(gamepad) {
	this.gamepads.push(gamepad);
};

GameBoyAdvanceKeypad.prototype.gamepadDisconnectHandler = function(gamepad) {
	this.gamepads = self.gamepads.filter(function(other) { return other != gamepad });
};

GameBoyAdvanceKeypad.prototype.pollGamepads = function() {
	var navigatorList = [];
	if (navigator.webkitGetGamepads) {
		navigatorList = navigator.webkitGetGamepads();
	} else if (navigator.getGamepads) {
		navigatorList = navigator.getGamepads();
	}

	// Let's all give a shout out to Chrome for making us get the gamepads EVERY FRAME
	if (navigatorList.length) {
		this.gamepads = [];
	}
	for (var i = 0; i < navigatorList.length; ++i) {
		if (navigatorList[i]) {
			this.gamepads.push(navigatorList[i]);
		}
	}
	if (this.gamepads.length > 0) {
		this.gamepadHandler(this.gamepads[0]);
	}

};

GameBoyAdvanceKeypad.prototype.registerHandlers = function() {
	window.addEventListener("keydown", this.keyboardHandler.bind(this), true);
	window.addEventListener("keyup", this.keyboardHandler.bind(this), true);

	window.addEventListener("gamepadconnected", this.gamepadConnectHandler.bind(this), true);
	window.addEventListener("mozgamepadconnected", this.gamepadConnectHandler.bind(this), true);
	window.addEventListener("webkitgamepadconnected", this.gamepadConnectHandler.bind(this), true);

	window.addEventListener("gamepaddisconnected", this.gamepadDisconnectHandler.bind(this), true);
	window.addEventListener("mozgamepaddisconnected", this.gamepadDisconnectHandler.bind(this), true);
	window.addEventListener("webkitgamepaddisconnected", this.gamepadDisconnectHandler.bind(this), true);
};
