
var points = []

let lastErrorValues = []
let config = {
  minValDataset: 0,
  maxValDataset: 90, 
  dataset: dadosIMC
}

let features = []
let labels = []

let input, button, resultado, modelM, modelB, error;

let classifier

function setup() {
  createCanvas(600, 600);

  createHtmlElements()
  //frameRate(5)
  noLoop()

  config.dataset.forEach(dado => {
    var expectativa = dado[0];
    var imc = dado[1];
    let point = new Point(imc, expectativa, 1, config.minValDataset, config.maxValDataset)

    points.push(point)
    features.push(point.xRange)
    labels.push(point.yRange)
  });
  
  classifier = new LinearRegression()
}

function draw() {
  background(220);

  modelM.html('[m] Inclinação: ' + parseFloat(classifier.m).toFixed(2))
  modelB.html('[b] y intercepta: ' + parseFloat(classifier.b).toFixed(2))
  error.html('Erro: ' + parseFloat(classifier.error).toFixed(2))

  var p1 = new Point(config.minValDataset, classifier.f(config.minValDataset), 1, config.minValDataset, config.maxValDataset);
  var p2 = new Point(config.maxValDataset, classifier.f(config.maxValDataset), 1, config.minValDataset, config.maxValDataset);
  
  push()
  strokeWeight(5)
  stroke(0)
  line(p1.x, p1.y, p2.x, p2.y)
  pop()
  
  //draw the points
  points.forEach(point => {
    point.draw()    
  });

  //draw error
  push()
  fill(255, 0, 0)
  circle(width - 50, 50, Math.log(classifier.error) * 10)
  
  lastErrorValues.push(classifier.error)
  lastErrorValues = lastErrorValues.slice(-10)

  let mean = lastErrorValues.reduce((v1, v2) => {
    return v1 + v2
  }) / lastErrorValues.length

  if (mean < classifier.error + 0.6) {
    console.log('parar', mean,  classifier.error)
    clearInterval(loopTraining)
  } else {
    console.log('continuar', mean,  classifier.error)
  }

  pop()
}

function predictExpectativa() {
  const imc = input.value();  
  var p = new Point(parseFloat(imc), undefined, 1, config.minValDataset, config.maxValDataset)
  var yPred = classifier.predict(p.xRange)
  points.push(new Point(parseFloat(imc), yPred, 0, config.minValDataset, config.maxValDataset))
  resultado.html('Viverá ' + Math.floor(yPred) + ' anos')
  redraw()
}

let loopTraining

function mousePressed() {
  // evita problemas de loop infinito ao clicar varias vezes com o mouse...
  // se houver um click de mouse antes e, um loop tiver sido iniciado e ainda não parado
  clearInterval(loopTraining)

  loopTraining = setInterval(() => { 
    classifier.fit(features, labels) 
    redraw()
  }, 100)
}

function createHtmlElements() {
  input = createInput();
  input.position(width, 65);

  button = createButton('submit');
  button.position(width + 120, 65);
  button.mousePressed(predictExpectativa);

  resultado = createElement('h2');
  resultado.position(width, 5);

  modelM = createElement('h3')
  modelM.position(width, 100)

  modelB = createElement('h3')
  modelB.position(width, 130)

  error = createElement('h3')
  error.position(width, 160)
}