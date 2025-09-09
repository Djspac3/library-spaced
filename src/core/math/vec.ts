export class vec2 {
  x: number;
  y: number;
  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  clone() {
    return new vec2(this.x, this.y);
  }

  length() {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }

  isZero() {
    return this.x === 0 && this.y === 0;
  }

  distanceTo(other: vec2) {
    const dx = this.x - other.x;
    const dy = this.y - other.y;
    return Math.sqrt(dx * dx + dy * dy);
  }

  angleTo(other: vec2) {
    const dx = other.x - this.x;
    const dy = other.y - this.y;
    return Math.atan2(dy, dx);
  }

  normalize() {
    const length = this.length();
    if (length == 0) return undefined;
    this.x /= length;
    this.y /= length;
    return this;
  }

  copy(other: vec2) {
    this.x = other.x;
    this.y = other.y;
    return this;
  }

  add(other: vec2) {
    this.x += other.x;
    this.y += other.y;
    return this;
  }

  subtract(other: vec2) {
    this.x -= other.x;
    this.y -= other.y;
    return this;
  }

  multiply(scale: number) {
    this.x *= scale;
    this.y *= scale;
    return this;
  }

  divide(scale: number) {
    this.x /= scale;
    this.y /= scale;
    return this;
  }

  rotate(angle: number) {
    const cosAngle = Math.cos(angle);
    const sinAngle = Math.sin(angle);
    const x = this.x;
    const y = this.y;
    this.x = x * cosAngle - y * sinAngle;
    this.y = x * sinAngle + y * cosAngle;
    return this;
  }

  lerp(target: vec2, fraction: number) {
    this.x += (target.x - this.x) * fraction;
    this.y += (target.y - this.y) * fraction;
    return this;
  }

  toString() {
    return `Vec2(${this.x.toFixed(3)}, ${this.y.toFixed(3)})`;
  }

  static readonly zero = Object.freeze(new vec2(0, 0));

  static fromRotation(angle: number, length = 1) {
    return new vec2(Math.cos(angle) * length, Math.sin(angle) * length);
  }
}

export class vec3 {
  x: number;
  y: number;
  z: number;
  constructor(x: number, y: number, z: number) {
    this.x = x;
    this.y = y;
    this.z = z;
  }

  clone() {
    return new vec3(this.x, this.y, this.z);
  }

  length() {
    return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
  }

  add(other: vec3) {
    this.x += other.x;
    this.y += other.y;
    this.z += other.z;
    return this;
  }

  subtract(other: vec3) {
    this.x -= other.x;
    this.y -= other.y;
    this.z -= other.z;
    return this;
  }

  multiply(scale: number) {
    this.x *= scale;
    this.y *= scale;
    this.z *= scale;
    return this;
  }

  divide(scale: number) {
    this.x /= scale;
    this.y /= scale;
    this.z /= scale;
    return this;
  }

  rotateX(angle: number) {
    const cos = Math.cos(angle);
    const sin = Math.sin(angle);
    const y = this.y;
    const z = this.z;
    this.y = y * cos - z * sin;
    this.z = y * sin + z * cos;
    return this;
  }

  rotateY(angle: number) {
    const cos = Math.cos(angle);
    const sin = Math.sin(angle);
    const x = this.x;
    const z = this.z;
    this.x = z * sin + x * cos;
    this.z = z * cos - x * sin;
    return this;
  }

  rotateZ(angle: number) {
    const cos = Math.cos(angle);
    const sin = Math.sin(angle);
    const x = this.x;
    const y = this.y;
    this.x = x * cos - y * sin;
    this.y = x * sin + y * cos;
    return this;
  }

  lerp(target: vec3, fraction: number) {
    this.x += (target.x - this.x) * fraction;
    this.y += (target.y - this.y) * fraction;
    this.z += (target.z - this.z) * fraction;
    return this;
  }

  toString() {
    return `Vec3(${this.x.toFixed(3)}, ${this.y.toFixed(3)}, ${this.z.toFixed(
      3
    )})`;
  }

  static readonly zero = Object.freeze(new vec3(0, 0, 0));
}
