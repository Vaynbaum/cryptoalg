import { Component, OnInit } from '@angular/core';
import { FermaService } from '../shared/services/ferma.service';

@Component({
  selector: 'app-prime-number',
  templateUrl: './prime-number.component.html',
  styleUrls: ['./prime-number.component.css'],
})
export class PrimeNumberComponent implements OnInit {
  N: number | undefined;
  y: number | undefined;
  x: number | undefined;
  constructor(private fermaService: FermaService) {}

  ngOnInit() {}
  public onChange(n: number) {
    this.N = n;
  }

  prime() {
    if (this.N > 0 && this.N != undefined) {
      let element: HTMLElement = document.getElementById(
        'presult'
      ) as HTMLElement;
      let answer = `Число: ${this.N}`;
      if (this.N % 2 == 0 && this.N != 2) {
        answer += ' составное';
        element.innerHTML = answer;
      } else {
        this.fermaService.ferma_hidden(this.N);
        this.x = this.fermaService.x;
        this.y = this.fermaService.y;
        if (this.x + this.y == 1 || this.x - this.y == 1 || this.N == 2) {
          answer += ' простое';
          element.innerHTML = answer;
        } else {
          answer += ' составное';
          element.innerHTML = answer;
        }
      }
    }
  }
}
