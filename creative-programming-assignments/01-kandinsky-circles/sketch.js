// 第1课：康定斯基的圆圈
// 致敬瓦西里·康定斯基《几个圆圈》

let circles = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  noLoop();
  
  // 生成30个随机圆圈
  for (let i = 0; i < 30; i++) {
    circles.push({
      x: random(width),
      y: random(height),
      r: random(30, 150),
      hue: random(360),
      saturation: random(50, 100),
      brightness: random(50, 100),
      hasStroke: random() > 0.5,
      strokeWeight: random(2, 8)
    });
  }
}

function draw() {
  background(240);
  
  colorMode(HSB, 360, 100, 100);
  
  for (let c of circles) {
    // 外圈
    noFill();
    if (c.hasStroke) {
      stroke(c.hue, c.saturation, c.brightness);
      strokeWeight(c.strokeWeight);
    } else {
      noStroke();
    }
    
    // 有的圆圈是实心的
    if (random() > 0.5) {
      fill(c.hue, c.saturation, c.brightness, 0.8);
    }
    
    ellipse(c.x, c.y, c.r * 2, c.r * 2);
    
    // 有的圆圈里面还有一个小圆圈
    if (random() > 0.6) {
      noStroke();
      fill(c.hue + 30, c.saturation, c.brightness, 0.9);
      ellipse(c.x, c.y, c.r * 0.6, c.r * 0.6);
    }
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  redraw();
}

// 点击重新生成
function mousePressed() {
  redraw();
}
