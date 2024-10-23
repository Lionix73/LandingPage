class Wave {
  constructor(x, y, w, amplitude, period) {
    this.xspacing = 8;
    this.w = w;
    this.origin = createVector(x, y);
    this.theta = 0.0;
    this.amplitude = amplitude;
    this.period = period;
    this.dx = (TWO_PI / this.period) * this.xspacing;
    this.yvalues = new Array(floor(this.w / this.xspacing));
    this.xVel = -0.5;
    this.firstBall;
    this.baseColor;
  }

  update() {
    this.origin.add(this.xVel, 0);
    this.firstBall = this.origin.x + this.yvalues.length * this.xspacing;
    this.theta += 0.02;
    let x = this.theta;
    for (let i = 0; i < this.yvalues.length; i++) {
      this.yvalues[i] = sin(x + random(0.1)) * this.amplitude;
      x += this.dx;
    }
  }

  show() {
    for (let x = 0; x < this.yvalues.length; x++) {
      let size = map(sin(x + frameCount * 0.1), -1, 1, 24, 72);
      stroke(0);
      fill(this.baseColor);
      push();
      translate(this.origin.x + x * this.xspacing, this.origin.y + this.yvalues[x]);
      circle(0, 0, size);
      pop();
    }
  }
  
  checkEdges() {
    if (this.origin.x - 24 < 0) {
      this.xVel *= -1;
    } else if (this.firstBall + 18 > width) {
      this.xVel *= -1;
    }
  }
}