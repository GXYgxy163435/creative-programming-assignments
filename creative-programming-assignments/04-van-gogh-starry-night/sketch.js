// 第4课：梵高《星夜》
// 致敬文森特·梵高

let stars = [];
let brushStrokes = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();
  
  // 生成星星
  for (let i = 0; i < 15; i++) {
    stars.push({
      x: random(width * 0.1, width * 0.9),
      y: random(height * 0.1, height * 0.5),
      r: random(15, 35),
      glow: random(0, TWO_PI)
    });
  }
  
  // 生成漩涡笔触
  for (let i = 0; i < 200; i++) {
    brushStrokes.push({
      x: random(width),
      y: random(height * 0.6),
      len: random(30, 100),
      angle: random(TWO_PI),
      speed: random(0.01, 0.03)
    });
  }
}

function draw() {
  // 深蓝色夜空背景
  background(10, 25, 80);
  
  // 画旋转的云层笔触
  colorMode(RGB);
  for (let s of brushStrokes) {
    s.angle += s.speed;
    let x2 = s.x + cos(s.angle) * s.len;
    let y2 = s.y + sin(s.angle) * s.len * 0.5;
    
    stroke(50, 100, 200, 80);
    strokeWeight(random(2, 6));
    line(s.x, s.y, x2, y2);
  }
  
  // 画发光的星星
  for (let star of stars) {
    star.glow += 0.05;
    let glowSize = star.r * (1 + 0.3 * sin(star.glow));
    
    // 光晕
    noStroke();
    fill(255, 220, 80, 30);
    ellipse(star.x, star.y, glowSize * 3, glowSize * 3);
    
    // 亮星
    fill(255, 240, 100);
    ellipse(star.x, star.y, glowSize, glowSize);
    
    // 星芒
    stroke(255, 240, 100, 150);
    strokeWeight(2);
    line(star.x - glowSize*2, star.y, star.x + glowSize*2, star.y);
    line(star.x, star.y - glowSize*2, star.x, star.y + glowSize*2);
  }
  
  // 画下方的山丘
  noStroke();
  fill(20, 40, 80);
  beginShape();
  vertex(0, height);
  for (let x = 0; x <= width; x += 50) {
    let y = height * 0.75 + sin(x * 0.01) * 30;
    vertex(x, y);
  }
  vertex(width, height);
  endShape(CLOSE);
  
  // 画黑色的柏树
  fill(10, 20, 30);
  for (let i = 0; i < 3; i++) {
    let cx = width * 0.1 + i * 80;
    beginShape();
    vertex(cx, height * 0.75);
    vertex(cx - 20, height * 0.4);
    vertex(cx + 20, height * 0.4);
    vertex(cx + 30, height * 0.75);
    endShape(CLOSE);
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
