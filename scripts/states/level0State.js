class level0State {
    constructor() {
        this.isPaused = false;
        // Define the rectangle as a platform
        this.platform = {
            x: 0,
            y: height - 250,
            width: 200,
            height: 250
        };

        // Define the box in the middle of the screen
        this.box = {
            x: width / 2 - 50,
            y: height - 50,
            width: 100,
            height: 50,
            movable: true
        };

        this.player = new Player(this.platform.x + (this.platform.width / 2) - 20, this.platform.y - 60);
    }
  
    // Toggle the paused state
    togglePause() {
        this.isPaused = !this.isPaused;
    }
  
    // Update game state
    update() {
        if (this.isPaused) {
            return;  // If the game is paused, we don't update the game state
        }
        this.player.update();
        //this.platform.checkCollision(this.player, this.box);

        // Check for player being grounded due to screen bottom
        if (this.player.y + this.player.height > height) {
            this.player.y = height - this.player.height;
            this.player.velocityY = 0;
            this.player.grounded = true;
        }

        // Check for player going off screen to the left or right
        if (this.player.x < 0) {
            this.player.x = 0;
        }
        if (this.player.x + this.player.width > width) {
            this.player.x = width - this.player.width;
        }

        if (this.player.y + this.player.height > this.platform.y && this.player.x + this.player.width > this.platform.x && this.player.x < this.platform.x + this.platform.width) {
            this.player.y = this.platform.y - this.player.height;
            this.player.velocityY = 0;
            this.player.grounded = true;
        }
    }
    checkCollision() {
        // Check for horizontal overlap
        let horizontalOverlap = this.player.x + this.player.width > this.box.x && this.player.x < this.box.x + this.box.width;

        // Check for vertical overlap
        let verticalOverlap = this.player.y + this.player.height > this.box.y && this.player.y < this.box.y + this.box.height;

        // If there is both horizontal and vertical overlap, there is a collision
        if (horizontalOverlap && verticalOverlap) {
            console.log("Collision detected");

            // Assuming player has a 'velocityX' property indicating movement direction and speed
            if (this.player.velocityX > 0 && this.player.x + this.player.width <= this.box.x + this.box.width) {
                // Player moving right and colliding with the left side of the box
                console.log("Player pushing box right");
                this.box.x += this.player.velocityX;
            } else if (this.player.velocityX < 0 && this.player.x >= this.box.x) {
                // Player moving left and colliding with the right side of the box
                console.log("Player pushing box left");
                this.box.x += this.player.velocityX;
            }
        } else {
            console.log("No collision");
        }
    }

    // Render game visuals
    draw() {
        noStroke();
        background(128);
        fill(255);
        text("Level 0", width / 2, height / 4);

        // Draw the platform as a rectangle
        fill(150); // Different color for platform
        rect(this.platform.x, this.platform.y, this.platform.width, this.platform.height);

        // Draw the box
        fill(200); // Different color for the box
        rect(this.box.x, this.box.y, this.box.width, this.box.height);

        this.player.draw();
        // If the game is paused, overlay the pause menu
        if (this.isPaused) {
            drawPauseMenu(this);
        }
    }
}
// class Level0NeoTokyoState {
//     constructor() {
//         this.isPaused = false;
//         this.pauseMenuOptions = ['Resume', 'Settings', 'Quit'];
//     }
  
//     // Toggle the paused state
//     togglePause() {
//         this.isPaused = !this.isPaused;
//     }
  
//     // Update game state
//     update() {
//         if (this.isPaused) {
//             return;  // If the game is paused, we don't update the game state
//         }
  
//         // ... add game update logic here
//     }
  
//     // Render game visuals
//     draw() {
//         background(150); // Gray background to visually differentiate from MenuState
//         text("Level 0", width / 2, height / 4);
//         // ... your regular game drawing logic goes here
  
//         // If the game is paused, overlay the pause menu
//         if (this.isPaused) {
//             this.drawPauseMenu();
//         }
//     }
// }

// class doorPuzzleState {
//     constructor() {
//       this.walls = new Group();
//       this.boxes = new Group();
//       this.player = createSprite(100, 100, 40, 40);
//       this.player.shapeColor = color(255);
//       this.winArea = createSprite(350, height / 2, 50, height);
//       this.winArea.shapeColor = color(0, 255, 0);
//       this.puzzleSolved = false;
  
//       // Initialize walls
//       for (let i = 0; i < 5; i++) {
//         let w = createSprite(
//           random(125, width - 125), (height / 5) * i,
//           random(10, 100), random(10, 100));
//         w.shapeColor = color(0);
//         this.walls.add(w);
//       }
  
//       // Initialize boxes
//       for (let i = 0; i < 4; i++) {
//         let b = createSprite(
//           random(50, 100), random(100, height - 100),
//           25, 25);
//         b.shapeColor = color(255, 0, 0);
//         this.boxes.add(b);
//       }
//     }
  
//     update() {
//       this.player.velocity.x = (mouseX - this.player.position.x) * 0.1;
//       this.player.velocity.y = (mouseY - this.player.position.y) * 0.1;
  
//       this.player.collide(this.walls);
//       this.player.displace(this.boxes);
//       this.boxes.collide(this.walls);
//       this.boxes.displace(this.boxes);
  
//       this.boxes.overlap(this.winArea, box => {
//         box.remove();
//         if (this.boxes.length === 0) {
//           this.puzzleSolved = true;
//         }
//       });
//     }
  
//     draw() {
//       background(50);
//       drawSprites();
  
//       if (this.puzzleSolved) {
//         fill(255);
//         textSize(32);
//         text("Puzzle Solved!", 100, height / 2);
//       }
//     }
//   }
  
// To handle key presses
function keyPressed() {
    console.log('Key pressed with code:', keyCode); // This will log which key was pressed

    if (keyCode === ESCAPE && currentState instanceof level0State) {
        console.log('Attempting to toggle pause'); // This will log when the pause toggle is attempted
        currentState.togglePause();
    }
}