let currentState;
var icelandFont;

function preload() {
  icelandFont = loadFont('./assets/fonts/IcelandRegular.ttf');
}

function setup() {
  createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
  currentState = new MenuState(); // We start with the menu state
}

function draw() {
  currentState.update(); // Update the current state
  currentState.draw(); // Draw the current state
}

function mousePressed() {
  if (currentState instanceof level0State && currentState.isPaused) {
      handlePauseMenuClick(mouseX, mouseY, currentState);
  }
  // Any other global mousePressed events below...
}
