var canvas = document.getElementById('main');
canvas.width = 100;
canvas.height = 400;

var c = canvas.getContext('2d');

var r1 = new Rect(25, 50, 20, 20);
r1.setGrav(0, .15);
r1.mass = 25;
var circ = new Circle(50, 50, 10);
circ.setGrav(0, .15);
circ.mass = 25;

function update() {
  //c.clearRect(0, 0, canvas.width, canvas.height);
  r1.updatePHY();
  r1.draw(c);
  c.stroke();
  circ.updatePHY();
  circ.draw(c);
  c.stroke();
  requestAnimationFrame(update);
}
