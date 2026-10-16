// 第2课：波洛克滴画
// 致敬杰克逊·波洛克

let prevX, prevY;
let colors = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(255);
  
  // 波洛克风格的颜色：黑、白、棕、黄、蓝
  colors = [
    color(0, 0, 0),
    color(50, 30, 20),
    color(200, 180, 50),
    color(30, 50, 120),
    color(120, 30, 30),
    color(255, 255, 255)
  ];
}

function draw() {
  if (mouseIsPressed) {
    // 随机颜色
    stroke(random(colors));
    strokeWeight(random(1, 6));
    noFill();
    
    // 画线条，带点抖动，模拟滴画的感觉
    beginShape();
    for (let i = 0; i < 5; i++) {
      let jitterX = random(-10, 10);
      let jitterY = random(-10, 10);
      vertex(mouseX + jitterX, mouseY + jitterY);
    }
    endShape();
    
    // 随机滴一些小点点
    if (random() > 0.7) {
      noStroke();
      fill(random(colors));
      ellipse(mouseX + random(-20, 20), mouseY + random(-20, 20), random(2, 8));
    }
  }
}

function keyPressed() {
  if (key === ' ') {
    background(255);
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  background(255);
}
