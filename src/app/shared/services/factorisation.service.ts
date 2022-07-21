import { Injectable } from '@angular/core';
import { FermaService } from './ferma.service';

@Injectable()
export class FactorizationService {
  constructor(private fermaService: FermaService) {}
  allFact(n: number, array) {
    let arr: number[] = [0, 0];
    arr = this.fermaService.ferma_hidden(n);

    if (arr[0] + arr[1] == 1 || arr[0] - arr[1] == 1) {
      array.push(arr[0] + arr[1]);
      array.push(arr[0] - arr[1]);
    } else {
      array = this.allFact(arr[0] + arr[1], array);
      array = this.allFact(arr[0] - arr[1], array);
    }
    return array;
  }
}
