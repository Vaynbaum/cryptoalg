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
  adYi: number | undefined;
  addiv: number | undefined;

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
  }

  public pop() {
    this.comparisons.pop();
  }

  calc() {
    if (this.comparisons.length != 0) {
      let M = 1;
      let resM = 'M = ';
      this.compShow = [];
      this.comparisons.forEach((comp) => {
        M *= comp.m;
        resM += `${comp.m} * `;
      });
      resM = resM.slice(0, -2);
      resM += `= ${M}`;
      let element: HTMLElement = document.getElementById(
        'systCompModule'
      ) as HTMLElement;
      element.innerHTML = resM;

      this.comparisons.forEach((comp) => (comp.mi = M / comp.m));
      this.comparisons.forEach((comp) => {
        this.gsdService.gsdAdvance(comp.mi, comp.m, 0, 1, 1, 0);
        this.adXi = this.gsdService.adXi;
        this.adYi = this.gsdService.adYi;
        this.addiv = this.gsdService.addiv;
        comp.yi = this.numberConversionService.numberConversion(
          this.adXi,
          comp.m
        );
        this.compShow.push(comp);
      });
      let res = 0;
      this.comparisons.forEach((comp) => {
        res += comp.b * comp.mi * comp.yi;
      });
      res = this.numberConversionService.numberConversion(res, M);

      let answer = `Ответ: x = ${res} + ${M} * k, k ∈ Z`;
      element = document.getElementById('resSystComp') as HTMLElement;
      element.innerHTML = answer;
      this.comparisons = [];
    }
  }
}
