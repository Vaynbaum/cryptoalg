import { Injectable } from '@angular/core';

@Injectable()
export class NumberConversionService {
  constructor() {}
  numberConversion(n: number, m: number) {
    if (n < 0)
      while (n < 0) {
        n += m;
      }
    else if (n > m)
      while (n >= m) {
        n -= m;
      }
    return n;
  }
}
