import { Component, OnInit } from '@angular/core';
import { FermaService } from '../shared/services/ferma.service';

type dict = {
  num: number;
  cnt: number;
};

@Component({
  selector: 'app-func-euler',
  templateUrl: './func-euler.component.html',
  styleUrls: ['./func-euler.component.css'],
})
export class FuncEulerComponent implements OnInit {
  n: number | undefined;
  dict: dict[] = [];

  constructor(private fermaService: FermaService) {}

  ngOnInit() {}
  public onChange(n: number) {
    this.n = n;
  }

  allFact(n: number) {
    let arr: number[] = [0, 0];
    arr = this.fermaService.ferma_hidden(n);

    if (arr[0] + arr[1] == 1 || arr[0] - arr[1] == 1) {
      let num = arr[0] + arr[1];
      let obj = this.dict.find((obj) => obj.num == num);
      if (obj) obj.cnt++;
      else this.dict.push({ num: num, cnt: 1 });

      num = arr[0] - arr[1];
      obj = this.dict.find((obj) => obj.num == num);
      if (obj) obj.cnt++;
      else this.dict.push({ num: num, cnt: 1 });
    } else {
      this.allFact(arr[0] + arr[1]);
      this.allFact(arr[0] - arr[1]);
    }
  }

  displayResult() {
    let mult = 1;
    let answer = `Ответ: &#966;(${this.n}) = &#966;(`;
    let answer_tail = `) = `;

    this.dict = this.dict.sort((a, b) => a.num - b.num);
    this.dict.forEach((obj) => {
      if (obj.num != 1) {
        if (obj.cnt == 1) answer += `${obj.num} * `;
        else answer += `${obj.num}<sup>${obj.cnt}</sup> * `;

        answer_tail += `(${obj.num}${
          obj.cnt == 1 ? '' : `<sup>${obj.cnt}</sup>`
        }-${obj.cnt - 1 > 0 ? obj.num : 1}${
          obj.cnt - 1 > 1 ? `<sup>${obj.cnt - 1}</sup>` : ''
        })`;

        mult *= Math.pow(obj.num, obj.cnt) - Math.pow(obj.num, obj.cnt - 1);
      }
    });
    answer = answer.slice(0, -3);
    answer += answer_tail;

    let element: HTMLElement = document.getElementById(
      'euresult'
    ) as HTMLElement;
    answer += ` = ${mult}`;
    element.innerHTML = answer;
  }

  calc() {
    if (this.n != undefined && this.n > 0) {
      this.dict = [];
      let num = this.n;

      while (num % 2 == 0) {
        let obj = this.dict.find((obj) => obj.num == 2);
        if (obj) obj.cnt++;
        else this.dict.push({ num: 2, cnt: 1 });
        num /= 2;
      }
      this.allFact(num);
      this.displayResult();
    }
  }
}
