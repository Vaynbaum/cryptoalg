import { Component, OnInit } from '@angular/core';
import { NumberConversionService } from '../shared/services/number-conversion.service';

@Component({
  selector: 'app-reverse-element',
  templateUrl: './reverse-element.component.html',
  styleUrls: ['./reverse-element.component.css'],
})
export class ReverseElementComponent implements OnInit {
  a: number | undefined;
  m: number | undefined;

  public onChangeA(n: number) {
    this.a = n;
  }
  public onChangeM(n: number) {
    this.m = n;
  }
  adXi: number | undefined;
  adYi: number | undefined;
  addiv: number | undefined;
  adStrRi: string;
  adStrQi: string;
  adStrXi: string;
  adStrYi: string;
  adresult: number | undefined;
  constructor(private numberConversionService: NumberConversionService) {
    this.adStrRi = '';
    this.adStrQi = '';
    this.adStrYi = '';
    this.adStrXi = '';
  }

  ngOnInit() {}

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
      // swap a and b
      [a, b] = [b, a % b];

      this.adXi = x2 - this.addiv * x1;
      this.adYi = y2 - this.addiv * y1;

      this.saveStateToDisplay(b);
      return this.gsdAdvance(a, b, this.adXi, x1, this.adYi, y1);
    }
  }

  saveStateToDisplay(b: number | undefined) {
    this.adStrRi += `${b}<br/>`;
    this.adStrQi += `&ensp;${this.addiv}<br>`;
    this.adStrXi += `&ensp;${this.adXi}<br>`;
    this.adStrYi += `&ensp;${this.adYi}<br>`;
  }

  display(a: number, m: number) {
    let element: HTMLElement = document.getElementById('adri2') as HTMLElement;
    element.innerHTML = this.adStrRi;

    element = document.getElementById('adqi2') as HTMLElement;
    element.innerHTML = this.adStrQi;

    element = document.getElementById('adxi2') as HTMLElement;
    element.innerHTML = this.adStrXi;

    element = document.getElementById('adyi2') as HTMLElement;
    element.innerHTML = this.adStrYi;

    let answer = `${this.adresult} = `;
    if (a >= 0) answer += `${a} * `;
    else answer += `(${a}) * `;

    if (this.adXi >= 0) answer += `${this.adXi} + `;
    else answer += `(${this.adXi}) + `;

    if (m >= 0) answer += `${m} * `;
    else answer += `(${m}) * `;

    if (this.adYi >= 0) answer += `${this.adYi}`;
    else answer += `(${this.adYi})`;

    element = document.getElementById('adresult2') as HTMLElement;
    element.innerHTML = answer;

    answer = `Ответ: Обратный элемент ${a} по модулю ${m} = ${this.numberConversionService.numberConversion(
      this.adXi,
      m
    )}`;
    element = document.getElementById('adresult3') as HTMLElement;
    element.innerHTML = answer;
  }
  resetValueDisplayVar() {
    this.adStrRi = '';
    this.adStrQi = '';
    this.adStrXi = '';
    this.adStrYi = '';
    this.adresult = null;
  }
  initValueDisplayVar(adinp1: number, adinp2: number) {
    this.adStrRi = `${adinp1}<br/>${adinp2}<br/>`;
    this.adStrQi = `&ensp;-<br/>&ensp;-<br/>`;
    this.adStrXi = `&ensp;1<br/>&ensp;0<br/>`;
    this.adStrYi = `&ensp;0<br/>&ensp;1<br/>`;
  }
  displayError() {
    let element = document.getElementById('adresult2') as HTMLElement;
    element.innerHTML = 'Нет обратного элемента';
    element = document.getElementById('adresult3') as HTMLElement;
    element.innerHTML = '';

    element = document.getElementById('adri2') as HTMLElement;
    element.innerHTML = '';

    element = document.getElementById('adqi2') as HTMLElement;
    element.innerHTML = '';

    element = document.getElementById('adxi2') as HTMLElement;
    element.innerHTML = '';

    element = document.getElementById('adyi2') as HTMLElement;
    element.innerHTML = '';
  }
  adGsdCalc() {
    let a = this.a;
    let m = this.m;
    this.resetValueDisplayVar();
    if (a != undefined && a != 0 && m != undefined && m != 0) {
      this.initValueDisplayVar(a, m);

      this.adresult = this.gsdAdvance(a, m, 0, 1, 1, 0);
      if (this.adresult == 1) this.display(a, m);
      else this.displayError();
    }
  }
}
