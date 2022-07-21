import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-deduction-class',
  templateUrl: './deduction-class.component.html',
  styleUrls: ['./deduction-class.component.css'],
})
export class DeductionClassComponent implements OnInit {
  n: number | undefined;
  m: number | undefined;
  constructor() {}

  ngOnInit() {}
  public onChangeN(n: number) {
    this.n = n;
  }
  public onChangeM(n: number) {
    this.m = n;
  }
  deduction() {
    if (this.n != undefined && this.m != undefined && this.m > 0) {
      let num = this.n;
      let count = 0;
      let oper = '+';
      if (num < 0)
        while (num < 0) {
          num += this.m;
          count++;
        }
      else if (num > this.m) {
        oper = '-';
        while (num >= this.m) {
          num -= this.m;
          count++;
        }
      }

      let answer = `Ответ: ${this.n} = ${num} ${oper} ${count} * ${this.m}`;
      let element = document.getElementById('deduction') as HTMLElement;
      element.innerHTML = answer;
    }
  }
}
