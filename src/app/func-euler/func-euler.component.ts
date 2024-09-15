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
      if (
        this.dict.find((obj) => {
          return obj.num == arr[0] + arr[1];
        })
      )
        this.dict.find((obj) => {
          if (obj.num == arr[0] + arr[1]) obj.cnt++;
        });
      else {
        let num = arr[0] + arr[1];
        let cnt = 1;
        this.dict.push({ num, cnt });
      }

      if (
        this.dict.find((obj) => {
          return obj.num == arr[0] - arr[1];
        })
      )
        this.dict.find((obj) => {
          if (obj.num == arr[0] - arr[1]) obj.cnt++;
        });
      else {
        let num = arr[0] - arr[1];
        let cnt = 1;
        this.dict.push({ num, cnt });
      }
    } else {
      this.allFact(arr[0] + arr[1]);
      this.allFact(arr[0] - arr[1]);
    }
  }

  calc() {
    if (this.n != undefined && this.n > 0) {
      this.dict = [];
      let num = this.n;

      while (num % 2 == 0) {
        if (this.dict.find((obj) => obj.num == 2))
          this.dict.find((obj) => {
            if (obj.num == 2) obj.cnt++;
          });
        else this.dict.push({ num: 2, cnt: 1 });
        num /= 2;
      }
      console.log(this.dict);
      this.allFact(num);

      let mult = 1;
      this.dict.forEach((obj) => {
        if (obj.num != 1)
          mult *= Math.pow(obj.num, obj.cnt) - Math.pow(obj.num, obj.cnt - 1);
      });

      let element: HTMLElement = document.getElementById(
        'euresult'
      ) as HTMLElement;
      let answer = `Ответ: &#966;(${this.n}) = ${mult}`;
      element.innerHTML = answer;
    }
  }
}
