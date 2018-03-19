# PhyJS
A 2D Javascript Physics Engine.

#### [JSDocs for PhyJS](https://pinejh.github.io/PhyJS) 

#### Setup:
```javascript
var canvas = document.getElementById('main');
canvas.width = 100;
canvas.height = 400;

var ctx = canvas.getContext('2d');

var grav = new Vector(0, .15);
var scene = new Scene(grav);
scene.draw = true;

var circ = new Circle(50, 50, 10);
circ.mass = 25;
scene.add(circ);

function update() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  scene.step(ctx);
  requestAnimationFrame(update);
}
```
