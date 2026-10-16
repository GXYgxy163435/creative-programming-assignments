// 第6课：毕加索立体派
// 致敬巴勃罗·毕加索

let shapes = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  noLoop();
  
  // 立体派配色：棕、黄、蓝、红、黑、白
  let colors = [
    [120, 80, 40],
    [200, 170, 100],
    [60, 80, 120],
    [150, 50, 40],
    [30, 30, 30],
    [240, 230, 200]
  ];
  
  // 生成随机几何形状拼成的抽象人脸
  for (let i = 0; i < 15; i++) {
    shapes.push({
      x: random(width * 0.3, width * 0.7),
      y: random(height * 0.2, height * 0.8),
      w: random(50, 150),
      h: random(50, 150),
      angle: random(-PI, PI),
      color: random(colors)
    });
  }
}

function draw() {
  background(245, 240, 230);
  
  for (let s of shapes) {
    push();
    translate(s.x, s.y);
    rotate(s.angle);
    
    noStroke();
    fill(s.color[0], s.color[1], s.color[2]);
    rectMode(CENTER);
    rect(0, 0, s.w, s.h);
    
    // 黑色轮廓线
    noFill();
    stroke(30);
    strokeWeight(2);
    rect(0, 0, s.w, s.h);
    pop();
  }
  
  // 画两个错位的眼睛
  fill(255);
  ellipse(width*0.42, height*0.4, 40, 30);
  ellipse(width*0.58, height*0.42, 40, 30);
  
  fill(20, 20, 20);
  ellipse(width*0.43, height*0.4, 15, 15);
  ellipse(width*0.57, height*0.42, 15, 15);
  
  // 错位的鼻子和嘴
  stroke(30);
  strokeWeight(3);
  line(width*0.5, height*0.45, width*0.48, height*0.6);
  line(width*0.42, height*0.65, width*0.6, height*0.63);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  redraw();
}

// 点击重新生成构图
function mousePressed() {
  redraw();
}
