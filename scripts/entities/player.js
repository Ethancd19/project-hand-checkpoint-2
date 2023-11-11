class Player {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.width = 60;
    this.height = 60;
    this.velocityY = 0;
    this.grounded = false;
    this.speed = 5;
    this.jumpForce = 15;
  }

  update() {
    // Player Physics
    if (keyIsDown(65)) { // 'A' key
      this.x -= this.speed;
    }

    if (keyIsDown(68)) { // 'D' key
      this.x += this.speed;
    }

    if (keyIsDown(32) && this.grounded) { // Space key
      this.velocityY = -this.jumpForce;
      this.grounded = false;
    }

    // Apply gravity
    this.velocityY += 1;
    this.y += this.velocityY;
  }

  draw() {
    fill(255, 0, 0);
    rect(this.x, this.y, this.width, this.height); // Draw player
  }

  // ... More player-specific methods ...
}
