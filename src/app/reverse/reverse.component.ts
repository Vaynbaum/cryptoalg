import { Component, OnInit } from '@angular/core';
import { GsdService } from '../shared/services/gsd.service';
type pair = { syst: number; rev: number };

@Component({
  selector: 'app-reverse',
  templateUrl: './reverse.component.html',
  styleUrls: ['./reverse.component.css'],
})
export class ReverseComponent implements OnInit {
  m: number | undefined;
  system: number[];
  adXi: number | undefined;
  adYi: number | undefined;
  addiv: number | undefined;
  reverse: number[];
  objrev: pair[];
  flag = false;
  constructor(private gsdService: GsdService) {}

  ngOnInit() {}
  public onChange(n: number) {
    this.m = n;
  }

  reducedSystem() {
    this.system = [];
    for (let i = 0; i < this.m; i++) {
      let a = this.m > i ? this.m : i;
      let b = this.m < i ? this.m : i;
      if (this.gsdService.gsd(a, b) == 1) this.system.push(i);
    }
  }

  calc() {
    if (this.m != undefined && this.m > 0) {
      this.flag = false;
      this.reducedSystem();
      this.reverse = [];
      this.objrev = [];
      this.system.forEach((obj) => {
        this.gsdService.gsdAdvance(obj, this.m, 0, 1, 1, 0);
        this.adXi = this.gsdService.adXi;
        this.adYi = this.gsdService.adYi;
        this.addiv = this.gsdService.addiv;
        while (this.adXi < 0) this.adXi += this.m;
        this.reverse.push(this.adXi);
      });

      for (let i = 0; i < this.reverse.length; i++) {
        let syst = this.system[i];
        let rev = this.reverse[i];
        let obj: pair = { syst, rev };
        this.objrev.push(obj);
      }
      this.flag = true;
    }
  }
}
