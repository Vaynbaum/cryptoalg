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
    private numConvService: NumberConversionService
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

  showResCompr(res, M) {
    let answer = `Ответ: x = (`;
    this.comparisons.forEach((comp) => {
      answer += `${comp.b} * ${comp.mi} * ${comp.yi} + `;
    });
    answer = answer.slice(0, -3);
    answer += `) mod (${M}) = `;
    answer += `${res} + ${M} * k, k ∈ Z`;
    return answer;
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
        comp.yi = this.numConvService.numberConversion(this.adXi, comp.m);
        this.compShow.push(comp);
      });
      let res = 0;
      this.comparisons.forEach((comp) => {
        res += comp.b * comp.mi * comp.yi;
      });
      res = this.numConvService.numberConversion(res, M);
      let answer = this.showResCompr(res, M);
      this.showAnswer(answer, 'appResSystComp');
      this.comparisons = [];
    }
  }

  createAnswer(k, n, res, answer) {
    answer += `k = ${this.k} (mod ${this.m - 1}) = ${k}<br>`;
    answer += `${this.a}<sup>${k}</sup> (mod ${this.m}) = ${res}<br>`;
    return answer;
  }

  showAnswer(answer, id) {
    let element: HTMLElement = document.getElementById(id) as HTMLElement;
    element.innerHTML = answer;
  }

  showComplexM(answer) {
    answer += `m = ${this.m} = `;
    this.array.forEach((item) => {
      answer += `${item.num} * `;
    });
    answer = answer.slice(0, -3);
    answer += '<br><br>';
    return answer;
  }

  showX(answer, item) {
    answer += `${this.k} (mod (${item.num} - 1)) = ${item.pow}<br>`;
    return answer;
  }

  showCompr(answer) {
    answer += '<br>';
    this.array.forEach((item) => {
      if (item.num != 1) {
        answer += `x ≣ ${this.a}<sup>${item.pow}</sup> (mod ${item.num}) <br>`;
      }
    });
    return answer;
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
        if (this.gsdService.gsd(this.a, this.m) == 1) {
          let k = this.numConvService.numberConversion(this.k, this.m - 1);
          let n = this.a ** k;
          let res = n % this.m;
          answer = this.createAnswer(k, n, res, answer);
          this.showAnswer(answer, 'appAnswerCompModule');
        }
      } else {
        this.array = this.factorizationService.fact(this.m);
        this.array.sort((a, b) => {
          return a.num - b.num;
        });
        answer = this.showComplexM(answer);

        this.array.forEach((item) => {
          item.pow = this.k % (item.num - 1);
          let isMutuallyPrime = this.gsdService.gsd(this.a, item.num) == 1;
          let b = isMutuallyPrime ? this.a ** item.pow % item.num : 0;

          this.comparisons.push({ a: 1, b: b, m: item.num });
          answer = this.showX(answer, item);
        });
        answer = this.showCompr(answer);
        this.showAnswer(answer, 'appAnswerCompModule');
        this.calculateSystem();
      }
    }
  }
}
