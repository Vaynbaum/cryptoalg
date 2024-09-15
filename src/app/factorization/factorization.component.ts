import { Component, OnInit } from '@angular/core';
import { FactorizationService } from '../shared/services/factorisation.service';

@Component({
  selector: 'app-factorization',
  templateUrl: './factorization.component.html',
  styleUrls: ['./factorization.component.css'],
})
export class FactorizationComponent implements OnInit {
  N: number | undefined;
  array: number[] = [];
  constructor(private factorizationService: FactorizationService) {}

  ngOnInit() {}
  public onChange(n: number) {
    this.N = n;
  }

  initValueDisplayVar() {
    let answer = `Ответ: ${this.N} = `;
    return answer;
  }

  convertArr2Map() {
    const map = new Map();
    this.array = this.array.sort((a, b) => a - b);
    for (let i = 0; i < this.array.length; i++) {
      let num = this.array[i];
      if (num != 1) {
        if (map.has(num)) map.set(num, map.get(num) + 1);
        else map.set(num, 1);
      }
    }
    return map;
  }

  showResult() {
    let answer = this.initValueDisplayVar();
    const map = this.convertArr2Map();

    for (let item of map) {
      if (item[1] == 1) answer += `${item[0]} * `;
      else answer += `${item[0]}<sup>${item[1]}</sup> * `;
    }
    answer = answer.slice(0, -3);

    let element: HTMLElement = document.getElementById(
      'factresult'
    ) as HTMLElement;
    element.innerHTML = answer;
  }

  fact() {
    if (this.N > 0 && this.N != undefined) {
      let num = this.N;
      this.array = [];

      while (num % 2 == 0) {
        this.array.push(2);
        num /= 2;
      }
      this.array = this.factorizationService.allFact(num, this.array);
      this.showResult();
    }
  }
}
