// 第3课：蒙德里安布吉伍吉
// 致敬皮特·蒙德里安《百老汇爵士乐》

let gridSize = 40;
let squares = [];
let colors = [
  [255, 0, 0],    // 红
  [255, 200, 0],  // 黄
  [0, 80, 255]    // 蓝
];

function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();
  
  // 生成网格上的小方块
  for (let x = gridSize; x < width; x += gridSize) {
    for (let y = gridSize; y < height; y += gridSize) {
      if (random() > 0.7) {
        squares.push({
          x: x,
          y: y,
          color: random(colors),
          alpha: random(100, 255),
          blinkSpeed: random(0.01, 0.05)
        });
      }
    }
  }
}

function draw() {
  background(0);
  
  // 画白色网格线
  stroke(255);
  strokeWeight(3);
  for (let x = 0; x < width; x += gridSize) {
    line(x, 0, x, height);
  }
  for (let y = 0; y < height; y += gridSize) {
    line(0, y, width, y);
  }
  
  // 画闪烁的彩色小方块
  noStroke();
  for (let s of squares) {
    // 呼吸效果
    s.alpha = 127 + 127 * sin(frameCount * s.blinkSpeed);
    fill(s.color[0], s.color[1], s.color[2], s.alpha);
    rect(s.x - gridSize/2 + 5, s.y - gridSize/2 + 5, gridSize - 10, gridSize - 10);
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  squares = [];
  for (let x = gridSize; x < width; x += gridSize) {
    for (let y = gridSize; y < height; y += gridSize) {
      if (random() > 0.7) {
        squares.push({
          x: x,
          y: y,
          color: random(colors),
          alpha: random(100, 255),
          blinkSpeed: random(0.01, 0.05)
        });
      }
    }
  }
}
