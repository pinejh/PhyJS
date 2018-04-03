var canvas = document.getElementById('main');
canvas.width = 100;
canvas.height = 400;

var c = canvas.getContext('2d');

var grav = new Vector(0, .15);
var scene = new Scene(grav);
scene.draw = true;

var r1 = new Rect(30, canvas.height - 30, 40, 20);
r1.angle = Math.PI/6;
r1.isStatic = true;
//scene.add(r1);
var circ1 = new Circle(10, canvas.height/2, 10);
circ1.mass = 25;
//circ1.isStatic = true;
scene.add(circ1);
/*var circ2 = new Circle(50, canvas.height - 40, 10);
circ2.mass = 25;
scene.add(circ2);*/
scene.add(r1);

var l = new Line(r1.pos, circ1.pos);

function update() {
  c.clearRect(0, 0, canvas.width, canvas.height);
  scene.step(c);
  l.draw(c);
  requestAnimationFrame(update);
}
