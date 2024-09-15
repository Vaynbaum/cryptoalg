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
      this.div = Math.floor(a / b);
      [a, b] = [b, a % b];

      this.saveStateToDisplay(b);
      return this.gsd(a, b);
    }
  }
  saveStateToDisplay(b: number | undefined) {
    this.strRi += `${b}<br/>`;
    this.strQi += `&ensp;${this.div}<br>`;
  }
  initValueDisplayVar(inp1: number, inp2: number) {
    this.strRi = `${inp1}<br/>${inp2}<br/>`;
    this.strQi = `&ensp;-<br/>&ensp;-<br/>`;
  }
  display() {
    let element: HTMLElement = document.getElementById('ri') as HTMLElement;
    element.innerHTML = this.strRi;

    element = document.getElementById('qi') as HTMLElement;
    element.innerHTML = this.strQi;

    const answer = `Ответ: ${this.result}`;
    element = document.getElementById('result') as HTMLElement;
    element.innerHTML = answer;
  }
  gsdCalc() {
    let inp1 = this.inp1;
    let inp2 = this.inp2;
    if (inp1 < inp2) [inp1, inp2] = [inp2, inp1];

    if (inp1 != undefined && inp1 != 0 && inp2 != undefined && inp2 != 0) {
      this.initValueDisplayVar(inp1, inp2);
      this.result = this.gsd(inp1, inp2);
      this.display();
    }
  }
}
