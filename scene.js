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
    var colls = [];
    this.forEach(body => {
      body.updatePHY();

      //collision
      this.forEach(obj => {
        if (obj !== body && this.findIndex(e => { return e[1] == this.indexOf(body) && e[0] == this.indexOf(obj)}) == -1 && body.pos.dist(obj.pos) <= body.radius + obj.radius) {
          colls.push([this.indexOf(body), this.indexOf(obj)]);
          if(body instanceof Circle) {
            if(obj instanceof Circle) {
              confirm("circ, circ");
            } else {

            }
          } else {
            if (obj instanceof Circle) {

            } else {

            }
          }
        }
      });
      if(body.pos.y + body.radius >= canvas.height) body.addForce(-body.grav.x, -body.grav.y);
      
      if(this.draw && c != undefined) {
        body.draw(c);
        c.stroke();
      }
    });
  }
}
