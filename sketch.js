let spider;
let web;
let nodes = [];
let clickableNodes = [];
let hoveredNode = null;
let initialPositions = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  web = new Web();
  generateNodes();
  spider = new Spider(nodes[0].x, nodes[0].y); 
}

function draw() {
  background(0);
  updateNodes();
  spider.move();
  spider.show();
  web.show();
  drawNodes();
  drawLetters();
  drawClickableNodes();
}

function generateNodes() {
  let numNodes = int(random(150, 200));
  for (let i = 0; i < numNodes; i++) {
    let x = random(100, windowWidth - 100);
    let y = random(100, windowHeight - 100);
    let node = createVector(x, y);
    node.velocity = createVector(random(-1, 1), random(-1, 1));
    node.acceleration = createVector(0, 0);
    nodes.push(node);
    initialPositions.push(createVector(x, y));
  }

  let urls = [
    'https://www.im-creator.com/free/lionix73/alejandrosproyects',
    'https://www.linkedin.com/in/alejandro-lopez-ramirez-34479b2a1/',
    'https://github.com/jfUPB/bitacorassimulacion2024-20-Lionix73'
  ];

  for (let i = 0; i < urls.length; i++) {
    let index = int(random(nodes.length));
    clickableNodes.push({
      node: nodes[index],
      url: urls[i]
    });
  }
}

function updateNodes() {
  for (let i = 0; i < nodes.length; i++) {
    let node = nodes[i];
    let initialPosition = initialPositions[i];

    // Calculate spring force
    let springForce = p5.Vector.sub(initialPosition, node);
    springForce.mult(0.01); // Adjust this value to change the springiness

    // Add a small random force to keep the nodes moving
    let randomForce = createVector(random(-0.1, 0.1), random(-0.1, 0.1));

    node.acceleration.add(springForce);
    node.acceleration.add(randomForce);
    node.velocity.add(node.acceleration);
    node.add(node.velocity);
    node.acceleration.mult(0);

    // Apply damping
    node.velocity.mult(0.95);

    // Bounce off edges
    if (node.x < 0 || node.x > windowWidth) {
      node.velocity.x *= -1;
    }
    if (node.y < 0 || node.y > windowHeight) {
      node.velocity.y *= -1;
    }
  }
}

function drawLetters() {
  noStroke();
  fill(0);
  textSize(200);
  textAlign(CENTER, CENTER);
  text('AL', windowWidth / 2, windowHeight / 2);
}

function drawNodes() {
  for (let node of nodes) {
    if (!clickableNodes.some(clickableNode => clickableNode.node === node)) {
      fill(150);
      ellipse(node.x, node.y, 6, 6);
    }
  }
}

function drawClickableNodes() {
  fill(0);
  stroke(255);
  for (let clickable of clickableNodes) {
    let isHovered = (hoveredNode === clickable.node);
    drawHexagon(clickable.node.x, clickable.node.y, 20, isHovered);
  }
}

function drawHexagon(x, y, radius, isHovered) {
  push();
  translate(x, y);
  if (isHovered) {
    radius *= 1.5; 
    rotate(frameCount * 0.02);
  }
  beginShape();
  for (let i = 0; i < 6; i++) {
    let angle = TWO_PI / 6 * i;
    let xOffset = cos(angle) * radius;
    let yOffset = sin(angle) * radius;
    vertex(xOffset, yOffset);
  }
  endShape(CLOSE);
  pop();
}

function mouseMoved() {
  hoveredNode = null;
  for (let clickable of clickableNodes) {
    let d = dist(mouseX, mouseY, clickable.node.x, clickable.node.y);
    if (d < 15) {
      hoveredNode = clickable.node;
      break;
    }
  }
}

function mousePressed() {
  for (let clickable of clickableNodes) {
    let d = dist(mouseX, mouseY, clickable.node.x, clickable.node.y);
    if (d < 15) {
      window.open(clickable.url, '_blank');
    }
  }
}