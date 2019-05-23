
var points = []

var lr = 0.001;
var w1, w2, b;

function setup() {
  createCanvas(800, 600);
  frameRate(5)
  noLoop()
  w2 = -1
  w1 = random(-5, 5) / (w2 * -1)
  b = random(-1, 1) / (w2 * -1)

  // greens
  for (var i = 0; i < 25; i++) {
    var x = random(-1, 1);
    var y = random(0, 1);
    
    points.push(new Point(x, y, 1));
  }
  
  // reds
  for (var i = 0; i < 25; i++) {
    var x = random(-1, 1);
    var y = random(0, -1);
    //var y = randomGaussian(-1, -0.5);
    
    points.push(new Point(x, y, 0));
  }

}

function f(x) {
  return w1 * x + b;
}

function draw() {
  background(220);
  
  var p1 = new Point(-1, f(-1));
  var p2 = new Point(1, f(1));
  
  stroke(0);
  line(p1.x, p1.y, p2.x, p2.y);

  //draw the points
  points.forEach(point => {
    point.draw()

    var output = point.yRange * w2 + point.xRange * w1 + b;
    var label = output < 0;

    if (label != point.label) {
      //if has error, draw a bigger circle
      point.drawError(output)
    }
  });
}

function predict(point) {
  var output = point.xRange * w1 + point.yRange * w2 + b
  
  let labelRed = 0
  let labelGreen = 1
  
  //acima da linha é negativo (green)
  //se o output for negativo significa que classificamos como green
  var label = output < 0 ? labelGreen : labelRed 

  return label;
}

let loopTraining
function mousePressed() {

  //debug
  /*let x = map(mouseX, 0, width, -1, 1)
  let y = map(mouseY, 0, height, 1, -1)
  var output = x * w1 + y * w2 + b;
  console.log('output', output)*/

  loopTraining = setInterval(train, 80)
}

function train() {
  let hasError = false
  points.forEach(point => {
    var label = predict(point)

    if (label != point.label) {
      if (point.label == 1) { //green classificado errado
        w1 -= point.xRange * lr;
        w2 -= point.yRange * lr;
        b -= lr;
      } else { // red classificado errado
        w1 += point.xRange * lr;
        w2 += point.yRange * lr;
        b += lr;
      }

      w1 = w1 / (w2 * -1);
      b = b / (w2 * -1);

      hasError = true
    }
  });

  redraw()

  if (!hasError) {
    clearInterval(loopTraining)
    alert('Fim de treino!')
  }
}

function keyPressed() {

  if (keyCode != ENTER) {
    return false;
  }

  for (var i = 0; i < 1000; i++) {
    var x = random(-1, 1)
    var y = random(-1, 1)
    var label = predict(new Point(x, y))
  
    points.push(new Point(x, y, label))
  }
  redraw()  
}