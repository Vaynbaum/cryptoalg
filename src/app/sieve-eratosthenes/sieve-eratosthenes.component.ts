import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sieve-eratosthenes',
  templateUrl: './sieve-eratosthenes.component.html',
  styleUrls: ['./sieve-eratosthenes.component.css']
})
export class SieveEratosthenesComponent implements OnInit {
  N: number | undefined;
  constructor() {}

  ngOnInit() {}
  public onChange(n:number){
    this.N = n;
  }
  sieve() {
    if (this.N != undefined && this.N > 0 && this.N < 100000) {
      const len = this.N + 1;

      let primes: number[] = new Array(len);
      for (let i = 0; i < this.N; ++i) primes[i] = i;

      for (let i = 2; i < len; i++) {
        for (let j = i + 1; j < len; j++) {
          if (primes[j] == 0) continue;
          if (j % i == 0) primes[j] = 0;
        }
      }

      let answer = `Ответ: `;

      for (let i = 2; i < this.N; ++i)
        if (primes[i] != 0) answer += `${primes[i]}, `;

      let element: HTMLElement = document.getElementById(
        'eresult'
      ) as HTMLElement;
      element.innerHTML = answer;
    }
  }
}
