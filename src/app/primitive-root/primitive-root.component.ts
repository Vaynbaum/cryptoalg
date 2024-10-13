import { Component, OnInit } from '@angular/core';
import { FactorizationService } from '../shared/services/factorisation.service';
import { EylerService } from '../shared/services/eyler.service';

@Component({
  selector: 'app-primitive-root',
  templateUrl: './primitive-root.component.html',
  styleUrls: ['./primitive-root.component.css'],
})
export class PrimitiveRootComponent implements OnInit {
  m: number | undefined;

  constructor(
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

  calculateProducts(combinations) {
    return combinations.map((combination) =>
      combination.reduce((a, b) => a * b, 1)
    );
  }

  showDividers(answer, feu, numbers, products) {
    answer += `φ(${this.m}) = ${feu} = `;
    numbers.forEach((item) => {
      answer += `${item} * `;
    });
    answer = answer.slice(0, -3);
    answer += '<br>';
  }
  showAnswer(answer, id) {
    let element: HTMLElement = document.getElementById(id) as HTMLElement;
    element.innerHTML = answer;
  }

  calc() {
    if (this.m != undefined && this.m > 0) {
      let feu = this.eulerService.main(this.m);
      let answer = '';
      let numbers = this.factorizationService
        .fact(feu)
        .map((item) => item.num)
        .sort((a, b) => a - b);
      let products = this.generateUniqueCombinations(numbers)
        .map((combination) => combination.reduce((a, b) => a * b, 1))
        .sort((a, b) => a - b);
      this.showDividers(answer, feu, numbers, products);

      let notFindedRoot = true;
      let contenderRoot = 2;
      // while (notFindedRoot) {}

      this.showAnswer(answer, 'primitiveresult');
    }
  }
}
