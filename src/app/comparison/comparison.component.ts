import { Component, OnInit } from '@angular/core';
import { GsdService } from '../shared/services/gsd.service';
import { NumberConversionService } from '../shared/services/number-conversion.service';

@Component({
  selector: 'app-comparison',
  templateUrl: './comparison.component.html',
  styleUrls: ['./comparison.component.css'],
})
export class ComparisonComponent implements OnInit {
  a: number | undefined;
  b: number | undefined;
  m: number | undefined;
  adXi: number | undefined;
  adYi: number | undefined;
  addiv: number | undefined;
  results: string[] = [];
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

  saveStateToDisplay() {
    let answer = `${this.a != 1 ? `*${this.adXi}/ ` : ''}${this.a} * x ≣ ${
      this.b
    } (mod ${this.m})`;
    this.results.push(answer);
  }

  calcSimpleComparison() {
    this.gsdService.gsdAdvance(this.a, this.m, 0, 1, 1, 0);
    this.adXi = this.gsdService.adXi;
    this.adYi = this.gsdService.adYi;
    this.addiv = this.gsdService.addiv;
    this.adXi = this.numberConversionService.numberConversion(
      this.adXi,
      this.m
    );
    this.saveStateToDisplay();

    let res = (this.adXi * this.b) % this.m;
    return this.numberConversionService.numberConversion(res, this.m);
  }

  displayOneSolution(result: number) {
    let answer = `Ответ: x = ${result} + ${this.m} * k, k ∈ Z`;
    this.results.push(answer);
  }

  calc() {
    if (
      this.b != undefined &&
      this.a != undefined &&
      this.m != undefined &&
      this.m > 0
    ) {
      this.results = [];
      let result = 0;

      this.a = this.numberConversionService.numberConversion(this.a, this.m);
      this.b = this.numberConversionService.numberConversion(this.b, this.m);
      let tmp1 = this.a > this.m ? this.a : this.m;
      let tmp2 = this.a < this.m ? this.a : this.m;

      let d = this.gsdService.gsd(tmp1, tmp2);

      if (d == 1) {
        result = this.calcSimpleComparison();
        this.displayOneSolution(result);
      } else if (this.b % d == 0) {
        this.a /= d;
        this.b /= d;
        this.m /= d;

        result = this.calcSimpleComparison();

        let lastM = this.m;
        this.m *= d;
        let answer = `Ответ: x = ${result} + ${this.m} * k, k ∈ Z`;
        this.results.push(answer);

        for (let i = 1; i < d; i++) {
          result += lastM;
          let answer = `Ответ: x = ${result} + ${this.m} * k, k ∈ Z`;
          this.results.push(answer);
        }
      } else {
        this.results.push('Нет решений');
      }
    }
  }
}
