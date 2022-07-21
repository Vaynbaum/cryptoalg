import { Component, OnInit } from '@angular/core';
import { GsdService } from '../shared/services/gsd.service';

@Component({
  selector: 'app-reduced-system',
  templateUrl: './reduced-system.component.html',
  styleUrls: ['./reduced-system.component.css'],
})
export class ReducedSystemComponent implements OnInit {
  m: number | undefined;
  constructor(private gsdService: GsdService) {}

  ngOnInit() {}
  public onChange(n: number) {
    this.m = n;
  }

  calc() {
    if (this.m != undefined && this.m > 0) {
      let system: number[] = [];
      for (let i = 0; i < this.m; i++) {
        let a = this.m > i ? this.m : i;
        let b = this.m < i ? this.m : i;
        if (this.gsdService.gsd(a, b) == 1) system.push(i);
      }

      let str = system.join(', ');
      const answer = `Ответ: U(${this.m}) = {${str}}`;
      let element = document.getElementById('reduced-result') as HTMLElement;
      element.innerHTML = answer;
    }
  }
}
