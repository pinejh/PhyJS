# PhyJS
A 2D Javascript Physics Engine.

#### Setup:
```javascript
var canvas = document.getElementById('main');
canvas.width = 100;
canvas.height = 400;

var ctx = canvas.getContext('2d');

var r1 = new Rect(25, 50, 20, 20);
r1.setGrav(0, .1);
r1.mass = 25;

function update() {
  r1.updatePHY();
  r1.draw(ctx);
  ctx.stroke();
  requestAnimationFrame(update);
}
```
