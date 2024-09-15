import { Injectable } from '@angular/core';

@Injectable()
export class GsdService {
  get adXi(): number {
    return this._adXi;
  }
  set adXi(val: number) {
    this._adXi = val;
  }
  get adYi(): number {
    return this._adYi;
  }
  set adYi(val: number) {
    this._adYi = val;
  }
  get addiv(): number {
    return this._addiv;
  }
  set addiv(val: number) {
    this._addiv = val;
  }
  _adXi: number | undefined;
  _adYi: number | undefined;
  _addiv: number | undefined;
  constructor() {}
  gsd(a: number, b: number) {
    if (b == 0) return a;
    else {
      [a, b] = [b, a % b];
      return this.gsd(a, b);
    }
  }

  gsdAdvance(
    a: number | undefined,
    b: number | undefined,
    x1: number | undefined,
    x2: number | undefined,
    y1: number | undefined,
    y2: number | undefined
  ) {
    if (b == 0) {
      this.adXi = x2;
      this.adYi = y2;
      return a;
    } else {
      this.addiv = Math.floor(a / b);
      [a, b] = [b, a % b];

      this.adXi = x2 - this.addiv * x1;
      this.adYi = y2 - this.addiv * y1;

      return this.gsdAdvance(a, b, this.adXi, x1, this.adYi, y1);
    }
  }
}
