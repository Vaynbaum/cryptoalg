import { Component, OnInit } from '@angular/core';
import { FactorizationService } from '../shared/services/factorisation.service';
import { EylerService } from '../shared/services/eyler.service';
import { GsdService } from '../shared/services/gsd.service';

@Component({
  selector: 'app-primitive-root',
  templateUrl: './primitive-root.component.html',
  styleUrls: ['./primitive-root.component.css'],
})
export class PrimitiveRootComponent implements OnInit {
  m: number | undefined;
  objrev: any[] = [];

  constructor(
    private gsdService: GsdService,
    private factorizationService: FactorizationService,
    private eulerService: EylerService
  ) {}

  ngOnInit() {}
  public onChange(m: number) {
    this.m = m;
  }

  generateUniqueCombinations(arr, current = [], result = [], startIndex = 0) {
    if (current.length > 0) {
      result.push(current.slice());
    }
    if (current.length === arr.length) return;

    for (let i = startIndex; i < arr.length; i++) {
      if (i > startIndex && arr[i] === arr[i - 1]) continue;
      current.push(arr[i]);
      this.generateUniqueCombinations(arr, current, result, i + 1);
      current.pop();
    }
    return result;
  }



  showDividers(answer, feu, numbers, products) {
    answer += `φ(${this.m}) = ${feu} = `;
    numbers.forEach((item) => {
      answer += `${item} * `;
    });
    answer = answer.slice(0, -3);
    answer += `<br>Делители: {`;
    products.forEach((item) => {
      answer += `${item}, `;
    });
    answer = answer.slice(0, -2);
    answer += `}<br>`;
    return answer;
  }
  showAnswer(answer, id) {
    let element: HTMLElement = document.getElementById(id) as HTMLElement;
    element.innerHTML = answer;
  }

  showPrime(answer, contenderRoot, d) {
    answer += `<br>(${contenderRoot}, ${this.m}) = ${d}<br>`;
    return answer;
  }

  showCompr(answer, contenderRoot, item, res, res1) {
    answer += `${contenderRoot}<sup>${item}</sup> ≣ ${res} (mod ${this.m}) ${
      res1 ? '≣' : '≢'
    } 1<br>`;
    return answer;
  }

  showRoot(answer, root) {
    answer += `a = ${root}`;
    return answer;
  }

  checkExistRoot() {
    let nums = this.factorizationService.fact(this.m).map((item) => item.num);
    if (this.m == 2 || this.m == 4) return true;

    let dict = new Map();
    for (let num of nums) {
      if (dict.has(num)) dict.set(num, dict.get(num) + 1);
      else dict.set(num, 1);
    }
    let dict1 = Array.from(dict, ([name, value]) => ({ name, value }));
    if (dict1.length == 1 && dict1[0].name % 2 == 1) return true;
    else if (dict1.length == 2) {
      if (dict1[0].name == 2) {
        if (dict1[0].value == 1) return dict1[1].name % 2 == 1;
      }
      if (dict1[1].name == 2) {
        if (dict1[0].value == 1) return dict1[1].name % 2 == 1;
      }
    }
    return false;
  }

  calc() {
    if (this.m != undefined && this.m > 0) {
      this.objrev = [];
      if (!this.checkExistRoot()) {
        this.showAnswer(
          'Первообразный корень не существует',
          'primitiveresult'
        );
        return;
      }
      let feu = this.eulerService.main(this.m);
      let answer = '';
      let numbers = this.factorizationService
        .fact(feu)
        .map((item) => item.num)
        .sort((a, b) => a - b);
      let products = this.generateUniqueCombinations(numbers)
        .map((combination) => combination.reduce((a, b) => a * b, 1))
        .sort((a, b) => a - b);
      answer = this.showDividers(answer, feu, numbers, products);

      let contenderRoot = 2;
      let answer2 = '';
      let notFinded = true;
      while (notFinded) {
        let tmp1 = contenderRoot > this.m ? contenderRoot : this.m;
        let tmp2 = contenderRoot < this.m ? contenderRoot : this.m;
        let d = this.gsdService.gsd(tmp1, tmp2);
        if (d == 1) {
          answer2 = this.showPrime(answer2, contenderRoot, d);
          let finded = true;
          for (let item of products.slice(0, -1)) {
            let res = contenderRoot ** item % this.m;
            let resIs1 = res == 1;
            answer2 = this.showCompr(answer2, contenderRoot, item, res, resIs1);
            if (resIs1) {
              finded = false;
              break;
            }
          }
          if (finded) {
            notFinded = false;
            break;
          }
        }
        contenderRoot += 1;
      }
      answer += answer2;
      answer = this.showRoot(answer, contenderRoot);

      for (let i = 0; i < feu; i++) {
        this.objrev.push({
          pow: i,
          res: contenderRoot ** i % this.m,
        });
      }
      this.showAnswer(answer, 'primitiveresult');
    }
  }
}
