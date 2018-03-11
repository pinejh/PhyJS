class Body extends Particle {
  constuctor(x, y) {
    super.apply(x, y);
  }
}
Object.assign(Body, Particle);

/*class Polygon extends Body {
  constructor(x, y, points, radius) {
    super(x, y);
    this.pointCount = points;
    this.points = new Array(points).fill(new Vector(x, y), 0, points);
    this.radius;
    for(var i = 0; i < Math.PI*2; i += Math.PI*2/this.pointCount) {

    }
  }
}*/

class Rect extends Body {
  constructor(x, y, w, h) {
    super(x, y);
    this.width = w;
    this.height = h;
    this.radius = Math.sqrt(this.width*this.width/4 + this.height*this.height/4);
    this.angle = 0;
    this.angInt = Math.atan(this.height/this.width);
    this.dragCoeff = DRAG_CUBE;
    this.volume = this.width * this.height;
  }
  draw(c) {
    c.beginPath();
    //c.moveTo(this.pos.x, this.pos.y);
    c.moveTo(this.radius*Math.cos(this.angle-this.angInt)+this.pos.x, this.radius*Math.sin(this.angle-this.angInt)+this.pos.y);
    c.lineTo(this.radius*Math.cos(this.angle+this.angInt)+this.pos.x, this.radius*Math.sin(this.angle+this.angInt)+this.pos.y);
    c.lineTo(this.radius*Math.cos(this.angle-this.angInt+Math.PI)+this.pos.x, this.radius*Math.sin(this.angle-this.angInt+Math.PI)+this.pos.y);
    c.lineTo(this.radius*Math.cos(this.angle+this.angInt+Math.PI)+this.pos.x, this.radius*Math.sin(this.angle+this.angInt+Math.PI)+this.pos.y);
    //c.lineTo(this.radius*Math.cos(this.angle-this.angInt)+this.pos.x, this.radius*Math.sin(this.angle-this.angInt)+this.pos.y);
    c.closePath();
  }
}
Object.assign(Rect, Body);

class Circle extends Body {
  constructor(x, y, r) {
    super(x, y);
    this.radius = r;
    this.dragCoeff = DRAG_SPHERE;
    //this.area = 2*this.radius;
  }
  draw(c) {
    c.beginPath();
    c.arc(this.pos.x, this.pos.y, this.radius, 0, Math.PI*2, false);
    c.closePath();
  }
}
Object.assign(Circle, Body);
