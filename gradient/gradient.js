let gradient

function setup() {
  createCanvas(600, 600)

  gradient = createElement('h3')
  gradient.position(height, width)
}

function draw() {
  background(220)

  let increment = 1/100;
  for (let i = -1; i <= 1; i+=increment) {
      let p = new Point(i, f(i), 1)
      p.radius = 2
      p.draw()
  }

  let x = map(mouseX, 0, width, -1, 1)
  let y = f(x)
  let m = derivada(x)

  let b = y - m * x

  let p1 = new Point(x - 0.5, m * (x - 0.5) + b, 0)
  let p2 = new Point(x + 0.5, m * (x + 0.5) + b, 0)

  push()
  stroke(0, 0, 255);
  strokeWeight(5)
  line(p1.x, p1.y, p2.x, p2.y);
  pop()

  gradient.html(m)
}

function derivada(x) {
    return 2 * x
}

function f(x) {
    return x * x
}