import { Component, OnInit } from '@angular/core';
import { GsdService } from '../shared/services/gsd.service';
import { NumberConversionService } from '../shared/services/number-conversion.service';
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
        let a = this.comparisons[i].m;
        let b = this.comparisons[j].m;
        if (b > a) [a, b] = [b, a];
        let res = this.gsdService.gsd(a, b);
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

  solvingComparison(comps) {
    for (let c of comps) {
      c.a = this.numberConversionService.numberConversion(c.a, c.m);
      c.b = this.numberConversionService.numberConversion(c.b, c.m);

      this.gsdService.gsdAdvance(this.a, this.m, 0, 1, 1, 0);
      this.adXi = this.gsdService.adXi;
      this.adXi = this.numberConversionService.numberConversion(
        this.adXi,
        this.m
      );
    }
  }

  calc() {
    let comp = this.deepClone(this.comparisons);
    if (comp.length != 0) {
      if (!this.checkPrime()) {
        this.displayNoSolution();
        return;
      }

      this.compShow = [];
      let M = this.multModules();

      comp.forEach((comp) => (comp.mi = M / comp.m));
      comp.forEach((comp) => {
        this.gsdService.gsdAdvance(comp.mi, comp.m, 0, 1, 1, 0);
        this.adXi = this.gsdService.adXi;
        comp.yi = this.numberConversionService.numberConversion(
          this.adXi,
          comp.m
        );
        this.compShow.push(comp);
      });
      let res = 0;
      comp.forEach((comp) => {
        res += comp.b * comp.mi * comp.yi;
      });
      res = this.numberConversionService.numberConversion(res, M);

      let answer = `Ответ: x = ${res} + ${M} * k, k ∈ Z`;
      let element = document.getElementById('resSystComp');
      element.innerHTML = answer;
      comp = [];
    }
  }
}
