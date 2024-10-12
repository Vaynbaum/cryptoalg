import { Injectable } from '@angular/core';
import { FermaService } from './ferma.service';

@Injectable()
export class FactorizationService {
  constructor(private fermaService: FermaService) {}
  allFact(n: number, array): [] {
    let arr: number[] = [0, 0];
    arr = this.fermaService.ferma_hidden(n);
    let dif = arr[0] - arr[1];
    let sum = arr[0] + arr[1];

    if (sum == 1 || dif == 1) {
      array.push(sum);
      array.push(dif);
    } else {
      array = this.allFact(sum, array);
      array = this.allFact(dif, array);
    }
    return array;
  }

  fact(num: number) {
    let array = [];
    while (num % 2 == 0) {
      array.push(2);
      num /= 2;
    }
    let arr = this.allFact(num, array).filter((item) => item != 1);
    return arr.map((item) => ({ num: item }));
  }

  isPrime(num: number) {
    if (num % 2 == 0 && num != 2) return false;
    else {
      this.fermaService.ferma_hidden(num);
      let x = this.fermaService.x;
      let y = this.fermaService.y;
      if (x + y == 1 || x - y == 1 || num == 2) return true;
      else return false;
    }
  }
}
