import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-indicative-comparison-2',
  templateUrl: './indicative-comparison-2.component.html',
  styleUrls: ['./indicative-comparison-2.component.css'],
})
export class IndicativeComparison2Component implements OnInit {
  a: number | undefined;
  b: number | undefined;
  m: number | undefined;
  constructor() {}

  public onChangeA(a: number) {
    this.a = a;
  }
  public onChangeB(b: number) {
    this.b = b;
  }
  public onChangeM(m: number) {
    this.m = m;
  }
  ngOnInit() {}
  calc() {
    
  }
}
