let lines = [];
let particles = [];
let stars = [];
let shootingStars = [];
let angleX = 0;
let angleY = 0;

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  noStroke();

  // generate stars
  for (let i = 0; i < 200; i++) {
    stars.push(createVector(random(-width / 2, width / 2), random(-height / 2, height / 2)));
  }
}

function draw() {
  background(0);

  // Set the cursor to crosshairs: +
  noCursor();

  // make stars pan
  for (let i = 0; i < stars.length; i++) {
    stars[i].x += 0.08; // Adjust pan speed
    if (stars[i].x > width / 2) {
      stars[i].x = -width / 2;
      stars[i].y = random(-height / 2, height / 2);
    }
    fill(255, random(10, 255));
    ellipse(stars[i].x, stars[i].y, 2, 2);
  }

  // Twinkling
  for (let i = 0; i < stars.length; i++) {
    fill(255, random(10, 255)); // alpha controls twinkle
    ellipse(stars[i].x, stars[i].y, 2, 2);
    if (random() > 0.99) {
    }
  }

  // Shooting stars
  for (let i = 0; i < shootingStars.length; i++) {
    let star = shootingStars[i];
    fill(255, star.alpha);
    ellipse(star.x, star.y, 4, 4);

    // shooting star position
    star.x += star.speedX;
    star.y += star.speedY;

    // remove shooting stars
    star.alpha -= 2;
    if (star.alpha <= 0 || star.x < -width / 2 || star.x > width / 2 || star.y < -height / 2 || star.y > height / 2) {
      shootingStars.splice(i, 1);
    }
  }

  // Generate shooting stars
  if (random() > 0.995) {
    let startX = random(-width / 2, width / 2);
    let startY = random(-height / 4, height / 4);
    let speedX = random(2, 5);
    let speedY = random(-1, 1);
    let alpha = 255;
    shootingStars.push({ x: startX, y: startY, speedX, speedY, alpha });
  }

  // ambient light
  ambientLight(10);

  // directional light
  directionalLight(25, 255, 255, 0, 0, -1);

  for (let i = 0; i < 7; i++) {
    push();
    rotateX(angleX);
    rotateY(angleY);

    // i wrote like 150+ lines to get the cube effect, and asked chatgpt to shorten it, this is what i got. i vaguely understand it but i couldnt recreate it
    let translationVector;
    if (i === 0) translationVector = createVector(0, -150, 0);
    else if (i === 1) translationVector = createVector(-150, 0, 0);
    else if (i === 2) translationVector = createVector(0, 0, -150);
    else if (i === 3) translationVector = createVector(150, 0, 0);
    else if (i === 4) translationVector = createVector(0, 150, 0);
    else if (i === 5) translationVector = createVector(0, 0, 150);
    else translationVector = createVector(0, 0, 0);

    translate(translationVector);

    drawCube();

    // rotation angle
    angleX += 0.002;
    angleY += 0.002;
    pop();
  }

  //*anything related to the laser is completely written by chatgpt, i had little to nothing to do with it except for the idea and the troubleshooting, i dont think there is any code written by me beyond this point but i used chatgpt to integrate a few different sketches together so im not 100% sure*
  
  // Draw the laser lines
  for (let i = 0; i < lines.length; i++) {
    let lineData = lines[i];
    let alpha = map(millis() - lineData.timestamp, 0, 500, 255, 0); 
   //laser inside color
    let lineColor = color(255, 0, 0, alpha); 
    let borderColor = color(255, 255, 255, alpha); // Red color with alpha based on fading
    // Stroke weight for the white line
    strokeWeight(7); 
    stroke(lineColor);
    let directionX = mouseX - lineData.startX;
    let directionY = mouseY - lineData.startY;
    let magnitude = sqrt(directionX * directionX + directionY * directionY);
    directionX /= magnitude;
    directionY /= magnitude;
    let shortenedStartX = lineData.startX + directionX * map(millis() - lineData.timestamp, 0, 500, 0, magnitude); // Faster translation
    let shortenedStartY = lineData.startY + directionY * map(millis() - lineData.timestamp, 0, 500, 0, magnitude); // Faster translation
    line(shortenedStartX, shortenedStartY, lineData.endX, lineData.endY);

    strokeWeight(3); // Stroke weight for the red border
    stroke(borderColor);
    line(shortenedStartX, shortenedStartY, lineData.endX, lineData.endY);
  }

  // Update and display each particle
  for (let i = particles.length - 1; i >= 0; i--) {
    particles[i].update();
    particles[i].display();
    if (particles[i].isDead()) {
      particles.splice(i, 1); // Remove dead particles
    }
  }
}

function keyPressed() {
  // Check if the key pressed is the space bar (keyCode 32)
  if (key === ' ') {
    // Create particles on space bar press
    for (let i = 0; i < 25; i++) {
      let particle = new Particle(mouseX - height / 2, mouseY - width / 2);
      particles.push(particle);
    }

    // Add a new line to the array with start and end coordinates
    lines.push({
      startX: width,
      startY: height,
      endX: mouseX - height / 2,
      endY: mouseY - width / 2,
      timestamp: millis() // Store the timestamp when the line was created
    });
  }
}


class Particle {
  constructor(x, y) {
    this.position = createVector(x, y);
    this.velocity = createVector(random(-5, 5), random(-5, 5));
    this.acceleration = createVector(0, 0.05); // Gravity-like acceleration
    this.size = random(5, 15);
    this.lifespan = 255; // Initial lifespan
  }

  update() {
    // Update velocity and position
    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);

    // Decrease lifespan
    this.lifespan -= 2;

    // Gradually reduce acceleration to simulate slowing down
    this.acceleration.mult(0.95);
  }

  display() {
    // Draw particle with independent stroke weight
    stroke(255, 150, 150, this.lifespan); // White color with alpha based on lifespan
    strokeWeight(3); // Independent stroke weight for particles
    fill(255, this.lifespan); // White color with alpha based on lifespan
    ellipse(this.position.x, this.position.y, this.size, this.size);
  }

  isDead() {
    // Check if the particle's lifespan has reached zero
    return this.lifespan <= 0;
  }
}

function drawCube() {
  push();
  stroke(255);
  strokeWeight(2);

  // Add point light
  pointLight(255, 255, 255, 0, 0, 0);

  fill(255, 150, 150);
  box(50);
  pop();
}
