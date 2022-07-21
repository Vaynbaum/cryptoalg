import { Component, OnInit } from '@angular/core';
import { GsdService } from '../shared/services/gsd.service';

@Component({
  selector: 'app-scm',
  templateUrl: './scm.component.html',
  styleUrls: ['./scm.component.css'],
})
export class SCMComponent implements OnInit {
  result: number | undefined;
  inp1: number | undefined;
  inp2: number | undefined;
  constructor(private gsdService: GsdService) {}

  ngOnInit() {}
  public onChangeInp1(n: number) {
    this.inp1 = n;
  }
  public onChangeInp2(n: number) {
    this.inp2 = n;
  }

  scmCalc() {
    if (this.inp1 < this.inp2) {
      const tmp = this.inp1;
      this.inp1 = this.inp2;
      this.inp2 = tmp;
    }

    if (
      this.inp1 != undefined &&
      this.inp1 != 0 &&
      this.inp2 != undefined &&
      this.inp2 != 0
    ) {
      this.result = this.inp1 * this.inp2;
      const gsd = this.gsdService.gsd(this.inp1, this.inp2);
      this.result /= gsd;

      const answer = `Ответ: [${this.inp1} * ${this.inp2}] / ${gsd} = ${this.result}`;
      let element: HTMLElement = document.getElementById(
        'scmresult'
      ) as HTMLElement;
      element.innerHTML = answer;
    }
  }
}
