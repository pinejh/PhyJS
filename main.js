var canvas = document.getElementById('main');
canvas.width = 100;
canvas.height = 400;

var c = canvas.getContext('2d');

var grav = new Vector(0, .15);
var scene = new Scene(grav);
scene.draw = true;

/*var r1 = new Rect(canvas.width/2, canvas.height-20, canvas.width, 20);
//r1.setGrav(0, .15);
r1.mass = 25;
r1.isStatic = true;
scene.add(r1);*/
var circ1 = new Circle(50, canvas.height-10, 10);
circ1.mass = 25;
scene.add(circ1);
/*var circ2 = new Circle(50, canvas.height - 40, 10);
circ2.mass = 25;
scene.add(circ2);*/



function update() {
  c.clearRect(0, 0, canvas.width, canvas.height);
  scene.step(c);
  requestAnimationFrame(update);
}
