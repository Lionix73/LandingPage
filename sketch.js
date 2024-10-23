let wave;

function setup() {
  createCanvas(800, 400);
  wave = new Wave(0, height / 2, width, 75, 300);
  wave.baseColor = color(0, 50, 150, 255);
}

function draw() {
  wave.update();
  wave.checkEdges();
  wave.show();
}

function mouseMoved() {
  let newAmplitude = map(mouseY, 0, height, 50, 200);
  wave.amplitude = newAmplitude;
}

function keyPressed() {
  if (key === 'R' || key === 'r') {
    wave.baseColor = color(255, 0, 0, 255); 
  } else if (key === 'G' || key === 'g') {
    wave.baseColor = color(0, 255, 0, 255); 
  } else if (key === 'B' || key === 'b') {
    wave.baseColor = color(0, 0, 255, 255); 
  }  else if (key === 'W' || key === 'w') {
    wave.baseColor = color(255, 255, 255, 255); 
  }
}