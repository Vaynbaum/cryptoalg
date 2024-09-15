import { Injectable } from '@angular/core';
import { FermaService } from './ferma.service';

@Injectable()
export class FactorizationService {
  constructor(private fermaService: FermaService) {}
  allFact(n: number, array) {
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
}
