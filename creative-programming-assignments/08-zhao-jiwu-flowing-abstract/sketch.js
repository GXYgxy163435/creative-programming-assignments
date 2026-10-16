// 第8课：流动的抽象 · 致敬赵无极
// 摄像头手势交互版：用手控制颜料流动

let myShader;
let handX = 0.5, handY = 0.5;
let hands, camera;

const fragSrc = `
precision highp float;
uniform vec2 uRes;
uniform float uTime;
uniform vec2 uHand;

float noise(vec2 p) {
  return sin(p.x * 1.0 + uTime * 0.5) * cos(p.y * 1.2 + uTime * 0.3);
}

float fbm(vec2 p) {
  float v = 0.0;
  float a = 0.5;
  for (int i = 0; i < 5; i++) {
    v += a * noise(p);
    p *= 2.0;
    a *= 0.5;
  }
  return v;
}

void main() {
  vec2 uv = gl_FragCoord.xy / uRes;
  vec2 centered = uv * 2.0 - 1.0;
  centered.x *= uRes.x / uRes.y;

  float handDist = distance(centered, uHand * 2.0 - 1.0);
  float handRipple = exp(-handDist * handDist * 5.0);
  
  vec2 p = centered * 2.0;
  p += handRipple * 0.5 * vec2(
    fbm(p + uTime * 0.2),
    fbm(p + uTime * 0.15 + 10.0)
  );

  float n1 = fbm(p * 1.5 + uTime * 0.1);
  float n2 = fbm(p * 2.5 + uTime * 0.15 + 5.0);
  float n3 = fbm(p * 3.5 + uTime * 0.08 + 15.0);

  vec3 col = vec3(0.0);
  col.r = 0.2 + 0.6 * n1;
  col.g = 0.1 + 0.5 * n2;
  col.b = 0.3 + 0.7 * n3;

  col += vec3(0.2, 0.1, 0.05) * n1;
  col *= 0.8 + 0.2 * sin(uTime * 0.2);

  gl_FragColor = vec4(col, 1.0);
}
`;

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  myShader = createShader(
    `
    attribute vec3 aPosition;
    uniform mat4 uProjectionMatrix;
    uniform mat4 uModelViewMatrix;
    void main() {
      gl_Position = uProjectionMatrix * uModelViewMatrix * vec4(aPosition, 1.0);
    }
    `,
    fragSrc
  );
  pixelDensity(1);

  // 初始化MediaPipe手势识别
  hands = new Hands({
    locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`,
  });
  hands.setOptions({
    maxNumHands: 1,
    modelComplexity: 0,
    minDetectionConfidence: 0.5,
    minTrackingConfidence: 0.5,
  });
  hands.onResults(onHandResults);

  camera = new Camera(document.getElementById('webcam'), {
    onFrame: async () => {
      await hands.send({ image: document.getElementById('webcam') });
    },
    width: 200,
    height: 150,
  });
  camera.start();
}

function onHandResults(results) {
  if (results.multiHandLandmarks && results.multiHandLandmarks.length > 0) {
    // 取手腕位置作为控制点
    const wrist = results.multiHandLandmarks[0][0];
    // 摄像头是镜像的，所以x要翻转
    handX = 1.0 - wrist.x;
    handY = wrist.y;
  }
}

function draw() {
  shader(myShader);
  myShader.setUniform('uRes', [width * pixelDensity(), height * pixelDensity()]);
  myShader.setUniform('uTime', millis() / 1000.0);
  myShader.setUniform('uHand', [handX, handY]);
  
  rectMode(CENTER);
  rect(0, 0, width, height);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
