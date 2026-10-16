// 第7课：马蒂斯剪纸
// 致敬亨利·马蒂斯

let cutouts = [];
let colors = [
  [220, 50, 50],   // 红
  [30, 100, 200],  // 蓝
  [40, 160, 80],   // 绿
  [250, 200, 40],  // 黄
  [150, 50, 150]   // 紫
];

function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();
  
  // 初始放几个形状
  for (let i = 0; i < 10; i++) {
    cutouts.push({
      x: random(width),
      y: random(height),
      size: random(50, 150),
      color: random(colors),
      rotation: random(TWO_PI)
    });
  }
}

function draw() {
  background(255, 248, 231);
  
  for (let c of cutouts) {
    push();
    translate(c.x, c.y);
    rotate(c.rotation);
    
    fill(c.color[0], c.color[1], c.color[2]);
    
    // 画有机形状（像叶子/海浪）
    beginShape();
    for (let a = 0; a < TWO_PI; a += 0.1) {
      let r = c.size * (1 + 0.3 * sin(a * 3));
      vertex(cos(a) * r, sin(a) * r * 0.7);
    }
    endShape(CLOSE);
    pop();
  }
}

function mousePressed() {
  cutouts.push({
    x: mouseX,
    y: mouseY,
    size: random(50, 150),
    color: random(colors),
    rotation: random(TWO_PI)
  });
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
