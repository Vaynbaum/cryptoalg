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

  fact() {
    if (this.N > 0 && this.N != undefined) {
      let element: HTMLElement = document.getElementById(
        'factresult'
      ) as HTMLElement;
      let answer = `Ответ: ${this.N} = `;
      this.array = [];
      let num = this.N;

      while (num % 2 == 0) {
        this.array.push(2);
        num /= 2;
      }

      this.array = this.factorizationService.allFact(num, this.array);
      for (let i = 0; i < this.array.length; i++) {
        if (this.array[i] != 1) {
          if (this.array.length - i > 2) answer += `${this.array[i]} * `;
          else {
            answer += `${this.array[i]}`;
          }
        }
      }

      element.innerHTML = answer;
    }
  }
}
