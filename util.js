function clamp(num, min, max) {
  return Math.min(Math.max(num, min), max);
}

const DRAG_SPHERE = .47;
const DRAG_CUBE = 1;
const DRAG_STREAMLINED = .04;

var PHY = {MASS_DENSITY: .25};

/**
 * @class
 * A 2D vector for minipulation in x and y co-ordinates.
 */
class Vector {
  /**
   * Default constructor for Vector creates <0, 0> if no x and y are specified.
   * @param {number} x - The X co-ordinate of the new Vector.
   * @param {number} y - The Y co-ordinate of the new Vector.
   */
  constructor(x, y) {
    if(x == undefined || y == undefined) {
      this.x = 0;
      this.y = 0;
    } else {
      this.x = x;
      this.y = y;
    }
  }
  /**
   * Returns the distance between the Vector and the 'other' Vector.
   * @param {Vector} other
   * @returns {number} Distance between Vectors.
   */
  dist(other) {
    return Math.sqrt(Math.pow(this.x-other.x, 2) + Math.pow(this.y-other.y, 2));
  }
  /**
   * Returns the angle to 'other' Vector from this Vector.
   * @param {*} other 
   * @returns {number} Angle to the specified Vector.
   */
  angleTo(other) {
    return Math.atan2((other.y-this.y), (other.x-this.x));
  }
  /**
   * Adds specified vector to self.
   * @param {Vector} other 
   * @returns {this}
   */
  addVector(other) {
    this.x += other.x;
    this.y += other.y;
    return this;
  }
  /**
   * Scales Vector by specified scalar.
   * @param {number} scalar
   * @returns {this}
   */
  scale(scalar) {
    this.x *= scalar;
    this.y *= scalar;
    return this;
  }
  /**
   * Returns Vector in string format of <x, y>.
   * @returns {string}
   */
  toString() {
    return "<"+this.x +", "+ this.y+">";
  }
}

class Line {
  constructor(v1, v2) {
    this.start = v1;
    this.end = v2;
    this.length = this.start.dist(this.end);
    this.angle = this.start.angleTo(this.end);
    this.center = new Vector(this.start.x+this.end.x, this.start.y+this.end.y).scale(1/2);
  }
  draw(c) {
    c.beginPath();
    c.moveTo(this.start.x, this.start.y);
    c.lineTo(this.end.x, this.end.y);
    c.closePath();
    c.stroke();
  }
}

/**
 * @class
 * A physics body for movement and collisions.
 */
class Body {
  /**
   * Constructor for Body class.
   * @param {number} x X-coordinate for position.
   * @param {number} y Y-coordinate for position.
   */
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
  /**
   * Updates position and movement for Body.
   */
  updatePHY() {
    if(!this.isStatic) {
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
  /**
   * Set position of Body.
   * @param {number} x X-coordinate for position.
   * @param {number} y Y-coordinate for position.
   */
  setPos(x, y) {
    if(y == undefined && x instanceof Vector) {
      this.pos.x = x.x;
      this.pos.y = x.y;
    } else {
      this.pos.x = x;
      this.pos.y = y;
    }
  }
  /**
   * Set gravity of Body.
   * @param {number} x Gravity in X.
   * @param {number} y Gravity in Y.
   */
  setGrav(x, y) {
    if(y == undefined && x instanceof Vector) {
      this.grav.x = x.x;
      this.grav.y = x.y;
    } else {
      this.grav.x = x;
      this.grav.y = y;
    }
  }
  /**
   * Sets drag constant for Body.
   * @param {number} d For normal objects use the specified 'DRAG_' enums.
   */
  setDrag(d) {
    this.drag = d;
  }
  /**
   * Add force external force to Body (i.e. collisions etc...).
   * @param {*} x Pass in a Vector or a force in X direction.
   * @param {number} y Force in Y direction.
   */
  addForce(x, y) {
    if(y == undefined && x instanceof Vector) this.acc.addVector(x);
    else this.acc.addVector(new Vector(x, y));
  }
}


