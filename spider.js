class Spider {
  constructor(x, y) {
    this.position = createVector(x, y);
    this.targetIndex = 1;
  }

  move() {
    let target = nodes[this.targetIndex];
    let direction = p5.Vector.sub(target, this.position);
    let distance = direction.mag();
  
    // If the distance to the target is less than the speed, move directly to the target
    let speed = 30; // Adjust the speed of the spider
    if (distance < speed) {
      this.position = target.copy();
      web.addLine(nodes[this.targetIndex - 1], target);
      this.targetIndex++;
      if (this.targetIndex >= nodes.length) {
        this.targetIndex = 1; // Loop back to the first node
      }
    } else {
      direction.setMag(speed);
      this.position.add(direction);
    }
  }

  show() {
    fill(0);
    stroke(255);
    ellipse(this.position.x, this.position.y, 10, 10);
  }
}