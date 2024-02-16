//for hands
let handpose;
let video;
let predictions = [];
let averagePoint;

//for cubes
let angleX = 0;
let angleY = 0;
let targetAngleX = 0;
let targetAngleY = 0;
let easing = 0.05;

//for stars
let stars = [];
let shootingStars = [];

//from class based on https://learn.ml5js.org/#/reference/handpose
function setup() {
  createCanvas(640, 480, WEBGL);
  video = createCapture(VIDEO);
  video.size(width, height);

  handpose = ml5.handpose(video, modelReady);
  handpose.on("predict", (results) => {
    predictions = results;
  });

  video.hide();
  
function modelReady() {
  console.log("Model ready!");
}
// end of stuff from class

  // Generate stars
  for (let i = 0; i < 200; i++) {
    stars.push(createVector(random(width), random(height)));
  }
}

function modelReady() {
  console.log("Model ready!");
}
// end of stuff from class


function draw() {
  background(0);

  
  // Draw stars
for (let i = 0; i < stars.length; i++) {
    fill(255, random(10, 255)); 
    ellipse(stars[i].x - width / 2, stars[i].y - height / 2, 2, 2);
}
  noStroke();
  
  ambientLight(70);
  directionalLight(25, 255, 255, 0, 0, -1);

  
//for movement i asked chatgpt to make some code to make a cubes rotation dependent on the mouse position, i applied that to my cubes and later once i had established the averagePoint i came back and modified the code myself to make the rotation dependent on hand position
  // Calculate rotation angles based on average point
  if (averagePoint !== undefined) {
    let targetX = map(averagePoint.y, 0, width, -PI, PI);
    let targetY = map(averagePoint.x, 0, height, -PI, PI);

    // Apply easing for smooth transition
    targetAngleX = targetX;
    targetAngleY = targetY;
  }

  // Apply delay and falloff
  angleX += (targetAngleX - angleX) * easing;
  angleY += (targetAngleY - angleY) * easing;

  // Draw cubes (code shortened by chatgpt)
  for (let i = 0; i < 7; i++) {
    push();
    rotateX(angleX);
    rotateY(angleY);
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

    pop();
  }

  
   //gave ml5js example to chatgpt and asked it to average the keypoints and draw one dot rather than drawing a dot for each keypoint
  // Calculate average position of all keypoints
  let averageX = 0;
  let averageY = 0;
  let totalKeypoints = 0;

  for (let i = 0; i < predictions.length; i++) {
    const prediction = predictions[i];
    for (let j = 0; j < prediction.landmarks.length; j++) {
      const keypoint = prediction.landmarks[j];
      averageX += keypoint[0];
      averageY += keypoint[1];
      totalKeypoints++;
    }
  }

  // Calculate average position
  if (totalKeypoints > 0) {
    averageX /= totalKeypoints;
    averageY /= totalKeypoints;
    averagePoint = createVector(averageX, averageY); // Save average point as a vector
    fill(255);
    noStroke();
  }
}
//end of chatgpt finding average

function drawCube() {
  push();
  stroke(255);
  strokeWeight(2);
  pointLight(255, 255, 255, 0, 150, 0);
  fill(255, 150, 150);
  box(50);
  pop();
}
