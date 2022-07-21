import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ferma-factorization-method',
  templateUrl: './ferma-factorization-method.component.html',
  styleUrls: ['./ferma-factorization-method.component.css'],
})
export class FermaFactorizationMethodComponent implements OnInit {
  N: number | undefined;
  x: number | undefined;
  y: number | undefined;
  strK: string | undefined;
  strX: string | undefined;
  strY2: string | undefined;
  strY: string | undefined;
  constructor() {}

  ngOnInit() {}
  public onChange(n: number) {
    this.N = n;
  }
  ferma_hidden(n: number) {
    let x_begin = Math.floor(Math.sqrt(n));
    let k = 0;

    while (x_begin ** 2 - n < 0) {
      x_begin += 1;
    }

    this.x = x_begin + k;
    let y2 = this.x * this.x - n;
    this.y = Math.sqrt(y2);

    this.strK += `${k}&ensp; <br>`;
    this.strX += `&ensp;${this.x}&ensp;<br>`;
    this.strY2 += `&ensp;${y2}&ensp;<br>`;
    this.strY += `&ensp;${this.y}&ensp;<br>`;

    while (this.y != Math.floor(this.y)) {
      k += 1;
      this.x = x_begin + k;
      y2 = this.x * this.x - n;
      this.y = Math.sqrt(y2);

      this.strK += `${k}&ensp; <br>`;
      this.strX += `&ensp;${this.x}&ensp; <br>`;
      this.strY2 += `&ensp;${y2}&ensp;<br>`;
      this.strY += `&ensp;${this.y}&ensp;<br>`;
    }
  }

  ferma() {
    if (this.N != undefined && this.N > 0 && this.N % 2 != 0) {
      this.strK = '';
      this.strX = '';
      this.strY2 = '';
      this.strY = '';

      let element: HTMLElement = document.getElementById(
        'fresult'
      ) as HTMLElement;
      let answer = `Ответ: `;

      this.ferma_hidden(this.N);

      answer += `${this.N} = (${this.x} + ${this.y}) * (${this.x} - ${
        this.y
      }) = ${this.x + this.y} * ${this.x - this.y}`;
      element.innerHTML = answer;

      element = document.getElementById('k') as HTMLElement;
      element.innerHTML = this.strK;

      element = document.getElementById('x') as HTMLElement;
      element.innerHTML = this.strX;

      element = document.getElementById('y2') as HTMLElement;
      element.innerHTML = this.strY2;

      element = document.getElementById('y') as HTMLElement;
      element.innerHTML = this.strY;
    }
  }
}
