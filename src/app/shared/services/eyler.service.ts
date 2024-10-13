import { Injectable } from '@angular/core';
import { FermaService } from './ferma.service';
type dict = {
  num: number;
  cnt: number;
};

@Injectable()
export class EylerService {
  constructor(private fermaService: FermaService) {}
  dict: dict[] = [];
  allFact(n: number) {
    let arr: number[] = [0, 0];
    arr = this.fermaService.ferma_hidden(n);
    let dif = arr[0] - arr[1];
    let sum = arr[0] + arr[1];

    if (sum == 1 || dif == 1) {
      this.addValue(sum);
      this.addValue(arr[0] - arr[1]);
    } else {
      this.allFact(sum);
      this.allFact(dif);
    }
  }
  addValue(num: number) {
    let obj = this.dict.find((obj) => obj.num == num);
    if (obj) obj.cnt++;
    else this.dict.push({ num: num, cnt: 1 });
  }
  main(num: number) {
    this.dict = [];
    while (num % 2 == 0) {
      this.addValue(2);
      num /= 2;
    }
    this.allFact(num);
    let mult = 1;

    this.dict.forEach((obj) => {
      if (obj.num != 1) {
        mult *= Math.pow(obj.num, obj.cnt) - Math.pow(obj.num, obj.cnt - 1);
      }
    });
    return mult;
  }
}
