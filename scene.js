class Scene extends Array {
  constructor(grav) {
    super();
    this.draw = true;
    this.grav = grav;
  }
  add(body) {
    body.setGrav(this.grav);
    this.unshift(body);
  }
  remove(i) {
    if(isNaN(i) && i instanceof Body) {
      for(var n = this.length; n >= 0; n++) {
        if(i == this[n]) {
          this.splice(n, n+1);
        }
      }
    } else {
      this.splice(i, i+1);
    }
  }
  step(c) {
    this.forEach((body, index) => {
      body.updatePHY();

      //collision
      for(var i = index+1; i < this.length; i++) {
        if (body.pos.dist(this[i].pos) <= body.radius + this[i].radius) {
          if(body instanceof Circle) {
            if (this[i] instanceof Circle) {
              confirm("circ, circ");
            } else {
              var theta = -this[i].angle;
              var newCirc = new Vector((Math.cos(theta) * (body.pos.x - this[i].pos.x) - Math.sin(theta) * (body.pos.y - this[i].pos.y) + this[i].pos.x), (Math.sin(theta) * (body.pos.x - this[i].pos.x) + Math.cos(theta) * (body.pos.y - this[i].pos.y) + this[i].pos.y));
              var closest = new Vector(this[i].pos.x - this[i].width / 2, this[i].pos.y - this[i].height/2);
              if (newCirc.x > closest.x) {
                closest.x = (newCirc.x < closest.x + this[i].width ? newCirc.x : closest.x + this[i].width);
              }
              if (newCirc.y > closest.y) {
                closest.y = (newCirc.y < closest.y + this[i].height ? newCirc.y : closest.y + this[i].height);
              }
              if(newCirc.dist(closest) < body.radius) confirm("circ, rect");
            }
          } else {
            if (this[i] instanceof Circle) {
              var theta = -body.angle;
              var newCirc = new Vector((Math.cos(theta) * (this[i].pos.x - body.pos.x) - Math.sin(theta) * (this[i].pos.y - body.pos.y) + body.pos.x), (Math.sin(theta) * (this[i].pos.x - body.pos.x) + Math.cos(theta) * (this[i].pos.y - body.pos.y) + body.pos.y));
              var closest = new Vector(body.pos.x - body.width / 2, body.pos.y - body.height / 2);
              if (newCirc.x > closest.x) {
                closest.x = (newCirc.x < closest.x + body.width ? newCirc.x : closest.x + body.width);
              }
              if (newCirc.y > closest.y) {
                closest.y = (newCirc.y < closest.y + body.height ? newCirc.y : closest.y + body.height);
              }
              if (newCirc.dist(closest) < this[i].radius) confirm("rect, circ");
            } else {
              confirm("rect, rect");
            }
          }
        }
      }
      if(body.pos.y + body.radius >= canvas.height) body.addForce(-body.grav.x, -body.grav.y);
      
      if(this.draw && c != undefined) {
        body.draw(c);
        c.stroke();
      }
    });
  }
}
