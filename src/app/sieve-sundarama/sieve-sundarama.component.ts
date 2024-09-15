import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sieve-sundarama',
  templateUrl: './sieve-sundarama.component.html',
  styleUrls: ['./sieve-sundarama.component.css'],
})
export class SieveSundaramaComponent implements OnInit {
  N: number | undefined;
  constructor() {}

  ngOnInit() {}
  public onChange(n: number) {
    this.N = n;
  }
  displayResult(len: number, primes: number[]) {
    let answer = `Ответ: 2, `;
    for (let i = 1; i < len; ++i)
      if (primes[i] != 0) answer += `${primes[i] * 2 + 1}, `;

    answer = answer.slice(0, -2);
    let element: HTMLElement = document.getElementById(
      'sunresult'
    ) as HTMLElement;
    element.innerHTML = answer;
  }
  sieve() {
    if (this.N != undefined && this.N > 0) {
      const len = this.N + 1;
      let primes: number[] = new Array(len);
      for (let i = 0; i <= len; ++i) primes[i] = i;

      for (
        let i = 1;
        i <= Math.floor((Math.sqrt(2 * this.N + 1) - 1) / 2);
        i++
      ) {
        for (let j = i; j <= Math.floor((this.N - i) / (2 * i + 1)); j++) {
          if (i + j + 2 * i * j <= this.N) {
            primes[i + j + 2 * i * j] = 0;
          }
        }
      }

      this.displayResult(len, primes);
    }
  }
}
