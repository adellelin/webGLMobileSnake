var x = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
var y = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
var segLength = 25;
var j = 0;
var t = 0.0;
var tStep = 0.004;
var borderSize = 40;

function preload() {
  img = loadImage("textures/texture2.png");
}

function setup() {
  createCanvas(displayWidth, displayHeight, WEBGL);
  //ortho(width, -width, height, -height, 0.2, 2);
  frameRate(60);
}

function draw() {
  if (mouseIsPressed) {
    var a = constrain(mouseX, borderSize, width - borderSize);
    t = map(a, borderSize, width - borderSize, 0.0, 1.0);
  } else {
  t += tStep;
  if (t > 1.0) {
    t = 0.0;
    }
  }

  if(touchIsDown) {
    var a = constrain(mouseX, borderSize, width - borderSize);
    t = map(a, borderSize, width - borderSize, 0.0, 1.0);
  } else {
  t += tStep;
  if (t > 1.0) {
    t = 0.0;
    }
  }
  //directionalLight(r, g, b, x, y, z):
  var dirY = (mouseY / height - 0.5) * 2;
  var dirX = (mouseX / width - 0.5) * 2;
  directionalLight(255, 255, 255, dirX, -dirY, 0.25);
  directionalLight(250, 250, 255, -dirX, dirY, 0.25);
  //specularMaterial(0, 0, 255);

  background(0);
  j = (j + 1) % 200;
  fill(255, 255, j);
  
  // draw driplay bar at bottom
  push();
  //fill(255);
  translate( -width/2, height /2 - 150, 20);
  var barLength = width - 2 * borderSize;
  //line(0, -5, 0, 0, 5, 0);
  line(0, 0, 0, t * barLength, 0, 0);
  translate(width/2, 0, 0);
  //rotate(200, [0, 0, 1]);
  box(t/2 * barLength, 10, 10);
  pop();

  push();
  dragSegment(0, mouseX, mouseY, 0);
  //add touch from mobile
  dragSegment(0, touchX, touchY, 0);
  for (var i = 0; i < x.length - 1; i++) {
    dragSegment(i + 1, x[i], y[i], 0);
  }
  pop();
}

function dragSegment(i, xin, yin, zin) {
  var dx = xin - x[i];
  var dy = yin - y[i];
  var angle = atan2(dy, dx);
  x[i] = xin - cos(angle) * segLength;
  y[i] = yin - sin(angle) * segLength;
  zin -= 10;
  segment(x[i], y[i], zin, angle);

}

function segment(x, y, z, a) {
  push();
  translate(x - width/2 , y - height/2 , z);
  //translate(x, y, z);

  rotate(a, [x, y, z]);
  //line(0, 0, 0, segLength, segLength, 0);
  //texture(img);
  sphere(10);
  line(0, 0, 0, 50, 50, 10);
  
    var i = segLength;
     quad(
      -10, i, 0,
      10, i, 0,
      -10, 10, frameCount % 4,
      10, 10, i
      );
      
  pop();
}