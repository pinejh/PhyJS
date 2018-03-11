# PhyJS
A 2D Javascript Physics Engine.

#### Setup:
```javascript
var canvas = document.getElementById('main');
canvas.width = 100;
canvas.height = 400;

var ctx = canvas.getContext('2d');

var rect = new Rect(25, 50, 20, 20);
rect.setGrav(0, .1);
rect.mass = 25;

function update() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  rect.updatePHY();
  rect.draw(ctx);
  ctx.stroke();
  requestAnimationFrame(update);
}
```
