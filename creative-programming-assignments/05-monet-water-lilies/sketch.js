// 第5课：莫奈《睡莲》
// 致敬克劳德·莫奈

let waterDrops = [];
let lilies = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();
  
  // 生成水面波纹
  for (let i = 0; i < 50; i++) {
    waterDrops.push({
      x: random(width),
      y: random(height),
      r: random(20, 80),
      alpha: random(20, 60),
      speed: random(0.005, 0.02)
    });
  }
  
  // 生成睡莲
  for (let i = 0; i < 8; i++) {
    lilies.push({
      x: random(width * 0.1, width * 0.9),
      y: random(height * 0.2, height * 0.8),
      size: random(30, 70),
      hue: random([10, 330, 280]),
      alpha: random(150, 220)
    });
  }
}

function draw() {
  // 水面背景
  background(180, 210, 190);
  
  // 画朦胧的水面色块
  colorMode(RGB);
  for (let d of waterDrops) {
    d.r += 0.2;
    if (d.r > 100) d.r = 20;
    
    fill(
      random(150, 200),
      random(180, 220),
      random(160, 200),
      d.alpha
    );
    ellipse(d.x, d.y, d.r * 2, d.r);
  }
  
  // 画睡莲叶子
  for (let l of lilies) {
    // 绿色荷叶
    fill(80, 120, 70, 180);
    ellipse(l.x, l.y, l.size * 1.5, l.size);
    
    // 粉色/白色睡莲花
    colorMode(HSB, 360, 100, 100);
    fill(l.hue, 40, 95, l.alpha);
    ellipse(l.x, l.y - 10, l.size * 0.6, l.size * 0.6);
    
    // 花心
    fill(50, 80, 90);
    ellipse(l.x, l.y - 10, l.size * 0.2, l.size * 0.2);
  }
  
  // 画倒影的树
  fill(100, 130, 110, 80);
  for (let i = 0; i < 5; i++) {
    let tx = i * width / 4;
    rect(tx - 20, 0, 40, height * 0.3);
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

// 点击添加新的睡莲
function mousePressed() {
  lilies.push({
    x: mouseX,
    y: mouseY,
    size: random(30, 70),
    hue: random([10, 330, 280]),
    alpha: random(150, 220)
  });
}
