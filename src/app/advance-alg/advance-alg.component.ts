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
      const tmp = a % b;
      this.addiv = Math.floor(a / b);
      a = b;
      b = tmp;

      this.adXi = x2 - this.addiv * x1;
      this.adYi = y2 - this.addiv * y1;

      this.adStrRi += `${b}<br/>`;
      this.adStrQi += `&ensp;${this.addiv}<br>`;
      this.adStrXi += `&ensp;${this.adXi}<br>`;
      this.adStrYi += `&ensp;${this.adYi}<br>`;

      return this.gsdAdvance(a, b, this.adXi, x1, this.adYi, y1);
    }
  }

  adGsdCalc() {
    if (this.adinp1 < this.adinp2) {
      const tmp = this.adinp1;
      this.adinp1 = this.adinp2;
      this.adinp2 = tmp;
    }

    if (
      this.adinp1 != undefined &&
      this.adinp1 != 0 &&
      this.adinp2 != undefined &&
      this.adinp2 != 0
    ) {
      this.adStrRi = `${this.adinp1}<br/>${this.adinp2}<br/>`;
      this.adStrQi = `&ensp;-<br/>&ensp;-<br/>`;
      this.adStrXi = `&ensp;1<br/>&ensp;0<br/>`;
      this.adStrYi = `&ensp;0<br/>&ensp;1<br/>`;

      this.adresult = this.gsdAdvance(this.adinp1, this.adinp2, 0, 1, 1, 0);

      let element: HTMLElement = document.getElementById('adri') as HTMLElement;
      element.innerHTML = this.adStrRi;

      element = document.getElementById('adqi') as HTMLElement;
      element.innerHTML = this.adStrQi;

      element = document.getElementById('adxi') as HTMLElement;
      element.innerHTML = this.adStrXi;

      element = document.getElementById('adyi') as HTMLElement;
      element.innerHTML = this.adStrYi;

      let answer = `Ответ: ${this.adresult} = `;
      if (this.adinp1 >= 0) answer += `${this.adinp1} * `;
      else answer += `(${this.adinp1}) * `;

      if (this.adXi >= 0) answer += `${this.adXi} + `;
      else answer += `(${this.adXi}) + `;

      if (this.adinp2 >= 0) answer += `${this.adinp2} * `;
      else answer += `(${this.adinp2}) * `;

      if (this.adYi >= 0) answer += `${this.adYi}`;
      else answer += `(${this.adYi})`;

      element = document.getElementById('adresult') as HTMLElement;
      element.innerHTML = answer;
    }
  }
}
