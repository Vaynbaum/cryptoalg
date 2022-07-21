import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-module',
  templateUrl: './module.component.html',
  styleUrls: ['./module.component.css'],
})
export class ModuleComponent implements OnInit {
  n: number | undefined;
  m: number | undefined;
  constructor() {}

  ngOnInit() {}
  public onChangeN(n: number) {
    this.n = n;
  }
  public onChangeM(n: number) {
    this.m = n;
  }
  calc() {
    if (this.n != undefined && this.m != undefined && this.m != 0) {
      const answer = `Ответ: ${this.n} &#8803; ${Math.abs(
        this.n % this.m
      )} (mod ${this.m})`;
      let element = document.getElementById('modresult') as HTMLElement;
      element.innerHTML = answer;
    }
  }
}
