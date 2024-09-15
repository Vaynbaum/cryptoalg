import { Injectable } from '@angular/core';

@Injectable()
export class FermaService {
  get x(): number {
    return this._x;
  }
  set x(val: number) {
    this._x = val;
  }
  get y(): number {
    return this._y;
  }
  set y(val: number) {
    this._y = val;
  }
  _y: number | undefined;
  _x: number | undefined;
  constructor() {}
  ferma_hidden(n: number) {
    let x_begin = Math.floor(Math.sqrt(n));
    let k = 0;

    while (x_begin ** 2 - n < 0) x_begin += 1;

    this.x = x_begin + k;
    let y2 = this.x * this.x - n;
    this.y = Math.sqrt(y2);

    while (this.y != Math.floor(this.y)) {
      k += 1;
      this.x = x_begin + k;
      y2 = this.x * this.x - n;
      this.y = Math.sqrt(y2);
    }

    return [this.x, this.y];
  }
}
