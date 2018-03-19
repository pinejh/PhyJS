function clamp(num, min, max) {
  return Math.min(Math.max(num, min), max);
}

const DRAG_SPHERE = .47;
const DRAG_CUBE = 1;
const DRAG_STREAMLINED = .04;

var PHY = {MASS_DENSITY: .25};

class Vector {
  constructor(x, y) {
    if(x == undefined || y == undefined) {
      this.x = 0;
      this.y = 0;
    } else {
      this.x = x;
      this.y = y;
    }
  }
  dist(other) {
    return Math.sqrt(Math.pow(this.x-other.x, 2) + Math.pow(this.y-other.y, 2));
  }
  addVector(other) {
    this.x += other.x;
    this.y += other.y;
    return this;
  }
  scale(scalar) {
    this.x *= scalar;
    this.y *= scalar;
    return this;
  }
  toString() {
    return this.x +", "+ this.y;
  }
}

class Body {
  constructor(x, y) {
    if(x == undefined || y == undefined) {
      this.pos = new Vector();
    } else {
      this.pos = new Vector(x, y);
    }
    this.vel = new Vector();
    this.acc = new Vector();
    this.grav = new Vector();
    this.dragCoeff = DRAG_STREAMLINED;
    this.mass = 1;
    this.crossArea = 1;
    this.shape = -1;
    this.isStatic = false;
    this.elastic = 1; // 0 to 1
  }
  updatePHY() {
    if(!this.static) {
      this.vel.addVector(this.acc);
      this.pos.addVector(this.vel);
      this.acc.scale(0);
      var newAcc = new Vector(this.grav.x, this.grav.y).scale(this.mass);
      //Fd = .5*p*v^2*Cd*A
      var drag = new Vector((this.vel.x < 0 ? 1:-1)*this.vel.x*this.vel.x, (this.vel.y < 0 ? 1:-1)*this.vel.y*this.vel.y).scale(.5*PHY.MASS_DENSITY*this.dragCoeff);
      newAcc.addVector(drag);
      // var contact = new Vector(-this.grav.x, -this.grav.y);
      // newAcc.addVector(contact);
      newAcc.scale(1 / this.mass);
      this.acc.addVector(newAcc);
    }
  }
  setPos(x, y) {
    if(y == undefined && x instanceof Vector) {
      this.pos.x = x.x;
      this.pos.y = x.y;
    } else {
      this.pos.x = x;
      this.pos.y = y;
    }
  }
  setGrav(x, y) {
    if(y == undefined && x instanceof Vector) {
      this.grav.x = x.x;
      this.grav.y = x.y;
    } else {
      this.grav.x = x;
      this.grav.y = y;
    }
  }
  setDrag(d) {
    this.drag = d;
  }
  addForce(x, y) {
    if(y == undefined && x instanceof Vector) this.acc.addVector(x);
    else this.acc.addVector(new Vector(x, y));
  }
}
