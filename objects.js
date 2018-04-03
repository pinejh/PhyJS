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
    this.points;
  }
  draw(c) {
    this.points = [];
    this.points.push(new Vector(this.radius * Math.cos(this.angle - this.angInt) + this.pos.x, this.radius * Math.sin(this.angle - this.angInt) + this.pos.y));
    this.points.push(new Vector(this.radius * Math.cos(this.angle + this.angInt) + this.pos.x, this.radius * Math.sin(this.angle + this.angInt) + this.pos.y));
    this.points.push(new Vector(this.radius * Math.cos(this.angle - this.angInt + Math.PI) + this.pos.x, this.radius * Math.sin(this.angle - this.angInt + Math.PI) + this.pos.y));
    this.points.push(new Vector(this.radius * Math.cos(this.angle + this.angInt + Math.PI) + this.pos.x, this.radius * Math.sin(this.angle + this.angInt + Math.PI) + this.pos.y));
    c.beginPath();
    //c.moveTo(this.pos.x, this.pos.y);
    c.moveTo(this.points[0].x, this.points[0].y);
    c.lineTo(this.points[1].x, this.points[1].y);
    c.lineTo(this.points[2].x, this.points[2].y);
    c.lineTo(this.points[3].x, this.points[3].y);
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
