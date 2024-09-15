import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-advance-alg',
  templateUrl: './advance-alg.component.html',
  styleUrls: ['./advance-alg.component.css'],
})
export class AdvanceAlgComponent implements OnInit {
  adinp1: number | undefined;
  adinp2: number | undefined;
  adXi: number | undefined;
  adYi: number | undefined;
  addiv: number | undefined;
  adStrRi: string;
  adStrQi: string;
  adStrXi: string;
  adStrYi: string;
  adresult: number | undefined;
  constructor() {
    this.adStrRi = '';
    this.adStrQi = '';
    this.adStrYi = '';
    this.adStrXi = '';
  }

  ngOnInit() {}
  public onChangeInp1(n: number) {
    this.adinp1 = n;
  }
  public onChangeInp2(n: number) {
    this.adinp2 = n;
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

  display(adinp1: number, adinp2: number) {
    let element: HTMLElement = document.getElementById('adri') as HTMLElement;
    element.innerHTML = this.adStrRi;

    element = document.getElementById('adqi') as HTMLElement;
    element.innerHTML = this.adStrQi;

    element = document.getElementById('adxi') as HTMLElement;
    element.innerHTML = this.adStrXi;

    element = document.getElementById('adyi') as HTMLElement;
    element.innerHTML = this.adStrYi;

    let answer = `Ответ: ${this.adresult} = `;
    if (adinp1 >= 0) answer += `${adinp1} * `;
    else answer += `(${adinp1}) * `;

    if (this.adXi >= 0) answer += `${this.adXi} + `;
    else answer += `(${this.adXi}) + `;

    if (adinp2 >= 0) answer += `${adinp2} * `;
    else answer += `(${adinp2}) * `;

    if (this.adYi >= 0) answer += `${this.adYi}`;
    else answer += `(${this.adYi})`;

    element = document.getElementById('adresult') as HTMLElement;
    element.innerHTML = answer;
  }
  initValueDisplayVar(adinp1: number, adinp2: number) {
    this.adStrRi = `${adinp1}<br/>${adinp2}<br/>`;
    this.adStrQi = `&ensp;-<br/>&ensp;-<br/>`;
    this.adStrXi = `&ensp;1<br/>&ensp;0<br/>`;
    this.adStrYi = `&ensp;0<br/>&ensp;1<br/>`;
  }

  adGsdCalc() {
    let adinp1 = this.adinp1;
    let adinp2 = this.adinp2;
    if (adinp1 < adinp2) [adinp1, adinp2] = [adinp2, adinp1];

    if (
      adinp1 != undefined &&
      adinp1 != 0 &&
      adinp2 != undefined &&
      adinp2 != 0
    ) {
      this.initValueDisplayVar(adinp1, adinp2);
      this.adresult = this.gsdAdvance(adinp1, adinp2, 0, 1, 1, 0);
      this.display(adinp1, adinp2);
    }
  }
}
