import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-alg',
  templateUrl: './alg.component.html',
  styleUrls: ['./alg.component.css'],
})
export class AlgComponent implements OnInit {
  result: number | undefined;
  inp1: number | undefined;
  inp2: number | undefined;
  div: number | undefined;
  strRi: string;
  strQi: string;
  constructor() {}

  ngOnInit() {
    this.strRi = '';
    this.strQi = '';
  }
  public onChangeInp1(n: number) {
    this.inp1 = n;
  }
  public onChangeInp2(n: number) {
    this.inp2 = n;
  }
  gsd(a: number, b: number) {
    if (b == 0) return a;
    else {
      const tmp = a % b;
      this.div = Math.floor(a / b);
      a = b;
      b = tmp;
      this.strRi += `${b}<br/>`;
      this.strQi += `&ensp;${this.div}<br>`;
      return this.gsd(a, b);
    }
  }
  gsdCalc() {
    if (this.inp1 < this.inp2) {
      const tmp = this.inp1;
      this.inp1 = this.inp2;
      this.inp2 = tmp;
    }

    if (
      this.inp1 != undefined &&
      this.inp1 != 0 &&
      this.inp2 != undefined &&
      this.inp2 != 0
    ) {
      this.strRi = `${this.inp1}<br/>${this.inp2}<br/>`;
      this.strQi = `&ensp;-<br/>&ensp;-<br/>`;

      this.result = this.gsd(this.inp1, this.inp2);

      let element: HTMLElement = document.getElementById('ri') as HTMLElement;
      element.innerHTML = this.strRi;

      element = document.getElementById('qi') as HTMLElement;
      element.innerHTML = this.strQi;

      const answer = `Ответ: ${this.result}`;
      element = document.getElementById('result') as HTMLElement;
      element.innerHTML = answer;
    }
  }
}
