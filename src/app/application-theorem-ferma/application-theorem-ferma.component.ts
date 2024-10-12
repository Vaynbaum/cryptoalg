import { Component, OnInit } from '@angular/core';
import { FactorizationService } from '../shared/services/factorisation.service';
import { GsdService } from '../shared/services/gsd.service';
import { NumberConversionService } from '../shared/services/number-conversion.service';
type Item = {
  num: number;
  pow?: number;
};
type Comparison = {
  a: number;
  b: number;
  m: number;
  mi?: number;
  yi?: number;
};
@Component({
  selector: 'application-theorem-ferma',
  templateUrl: './application-theorem-ferma.component.html',
  styleUrls: ['./application-theorem-ferma.component.css'],
})
export class ApplicationTheoremFermaComponent implements OnInit {
  k: number | undefined;
  m: number | undefined;
  a: number | undefined;

  adXi: number | undefined;
  adYi: number | undefined;
  addiv: number | undefined;

  array: Item[] = [];
  comparisons: Comparison[] = [];
  compShow: Comparison[] = [];
  constructor(
    private gsdService: GsdService,
    private factorizationService: FactorizationService,
    private numberConversionService: NumberConversionService
  ) {}

  ngOnInit() {}

  public onChangeA(a: number) {
    this.a = a;
  }
  public onChangeK(k: number) {
    this.k = k;
  }
  public onChangeM(m: number) {
    this.m = m;
  }

  calculateSystem() {
    if (this.comparisons.length != 0) {
      let M = 1;
      this.compShow = [];
      this.comparisons.forEach((comp) => (M *= comp.m));

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
      let answer = `Ответ: x = (`;
      this.comparisons.forEach((comp) => {
        res += comp.b * comp.mi * comp.yi;
        answer += `${comp.b} * ${comp.mi} * ${comp.yi} + `;
      });
      answer = answer.slice(0, -3);
      answer += `) mod (${M}) = `;
      res = this.numberConversionService.numberConversion(res, M);

      answer += `${res} + ${M} * k, k ∈ Z`;
      let element = document.getElementById('appResSystComp') as HTMLElement;
      element.innerHTML = answer;
      this.comparisons = [];
    }
  }

  calc() {
    if (
      this.a != undefined &&
      this.k != undefined &&
      this.m != undefined &&
      this.m > 0
    ) {
      let answer = ``;
      if (this.factorizationService.isPrime(this.m)) {
      } else {
        this.array = this.factorizationService.fact(this.m);
      }

      this.array.sort((a, b) => {
        return a.num - b.num;
      });
      answer += `m = ${this.m} = `;
      this.array.forEach((item) => {
        answer += `${item.num} * `;
      });
      answer = answer.slice(0, -3);
      answer += '<br><br>';

      this.array.forEach((item) => {
        item.pow = this.k % (item.num - 1);
        this.comparisons.push({
          a: 1,
          b: this.a ** item.pow % item.num,
          m: item.num,
        });

        answer += `${this.k} (mod (${item.num} - 1)) = ${item.pow}<br>`;
      });
      answer += '<br>';
      this.array.forEach((item) => {
        if (item.num != 1) {
          answer += `x ≣ ${this.a}^${item.pow} (mod ${item.num}) <br>`;
        }
      });

      let element: HTMLElement = document.getElementById(
        'appAnswerCompModule'
      ) as HTMLElement;
      element.innerHTML = answer;

      this.calculateSystem();
    }
  }
}
