import { Component, OnInit } from '@angular/core';
import { GsdService } from '../shared/services/gsd.service';
import { NumberConversionService } from '../shared/services/number-conversion.service';
import { ComprationService } from '../shared/services/compration.service';
type Comparison = {
  a: number;
  b: number;
  m: number;
  mi?: number;
  yi?: number;
};
@Component({
  selector: 'app-comparison-system',
  templateUrl: './comparison-system.component.html',
  styleUrls: ['./comparison-system.component.css'],
})
export class ComparisonSystemComponent implements OnInit {
  b: number | undefined;
  m: number | undefined;
  a: number | undefined;

  adXi: number | undefined;

  comparisons: Comparison[] = [];
  compShow: Comparison[] = [];

  constructor(
    private numberConversionService: NumberConversionService,
    private comprationService: ComprationService,
    private gsdService: GsdService
  ) {}

  ngOnInit() {}
  public onChangeA(a: number) {
    this.a = a;
  }
  public onChangeB(b: number) {
    this.b = b;
  }
  public onChangeM(m: number) {
    this.m = m;
  }

  public push() {
    if (
      this.a != undefined &&
      this.b != undefined &&
      this.m != undefined &&
      this.m > 0
    )
      this.comparisons.push({
        a: this.a,
        b: this.b,
        m: this.m,
      });
    this.a = 0;
    this.b = 0;
    this.m = 0;
  }

  public pop() {
    this.comparisons.pop();
  }

  displayResM(m: number) {
    let resM = 'M = ';

    this.comparisons.forEach((comp) => {
      resM += `${comp.m} * `;
    });

    resM = resM.slice(0, -2);
    resM += `= ${m}`;

    let element = document.getElementById('systCompModule');
    element.innerHTML = resM;
  }

  multModules() {
    let M = 1;
    this.comparisons.forEach((comp) => {
      M *= comp.m;
    });

    this.displayResM(M);
    return M;
  }

  checkPrime() {
    for (let i = 0; i < this.comparisons.length; i++) {
      for (let j = i + 1; j < this.comparisons.length; j++) {
        let tmp1 = this.comparisons[i].m;
        let tmp2 = this.comparisons[j].m;
        if (tmp2 > tmp1) [tmp1, tmp2] = [tmp2, tmp1];
        let res = this.gsdService.gsd(tmp1, tmp2);
        if (res != 1) return false;
      }
    }
    return true;
  }

  displayNoSolution() {
    let element = document.getElementById('systCompModule');
    element.innerHTML = 'Нет решения';
  }
  deepClone(data) {
    return JSON.parse(JSON.stringify(data));
  }

  solvingComparisons(comps) {
    for (let c of comps) {
      c.b = this.comprationService.calc(c.a, c.b, c.m);
    }
  }

  displayRes(res, M) {
    let answer = `Ответ: x = ${res} + ${M} * k, k ∈ Z`;
    let element = document.getElementById('resSystComp');
    element.innerHTML = answer;
  }

  calc() {
    let comps = this.deepClone(this.comparisons);
    if (comps.length != 0) {
      if (!this.checkPrime()) {
        this.displayNoSolution();
        return;
      }

      this.compShow = [];
      let M = this.multModules();
      this.solvingComparisons(comps);

      comps.forEach((comp) => (comp.mi = M / comp.m));
      for (let comp of comps) {
        this.gsdService.gsdAdvance(comp.mi, comp.m, 0, 1, 1, 0);
        let adXi = this.gsdService.adXi;
        comp.yi = this.numberConversionService.numberConversion(adXi, comp.m);
        this.compShow.push(comp);
      }

      let res = 0;
      comps.forEach((comp) => (res += comp.b * comp.mi * comp.yi));
      res = this.numberConversionService.numberConversion(res, M);
      this.displayRes(res, M);
      comps = [];
    }
  }
}
