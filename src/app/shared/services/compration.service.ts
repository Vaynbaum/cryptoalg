import { Injectable } from '@angular/core';
import { GsdService } from './gsd.service';
import { NumberConversionService } from './number-conversion.service';

@Injectable()
export class ComprationService {
  constructor(
    private numberConversionService: NumberConversionService,
    private gsdService: GsdService
  ) {}
  calcSimpleComparison(a, b, m) {
    this.gsdService.gsdAdvance(a, m, 0, 1, 1, 0);
    let adXi = this.gsdService.adXi;
    adXi = this.numberConversionService.numberConversion(adXi, m);

    let res = (adXi * b) % m;
    return this.numberConversionService.numberConversion(res, m);
  }
  calc(a, m, b) {
    let result = 0;

    a = this.numberConversionService.numberConversion(a, m);
    b = this.numberConversionService.numberConversion(b, m);

    let tmp1 = a > m ? a : m;
    let tmp2 = a < m ? a : m;
    let d = this.gsdService.gsd(tmp1, tmp2);

    if (d == 1) {
      return this.calcSimpleComparison(a, b, m);
    } else if (b % d == 0) {
      a /= d;
      b /= d;
      m /= d;

      result = this.calcSimpleComparison(a, b, m);
      return result
    } else return false;
  }
}
