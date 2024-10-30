class Web {
  constructor() {
    this.lines = [];
  }

  addLine(node1, node2) {
    this.lines.push({ node1, node2 });
  }

  show() {
    stroke(255);
    for (let l of this.lines) {
      line(l.node1.x, l.node1.y, l.node2.x, l.node2.y);
    }
  }
}