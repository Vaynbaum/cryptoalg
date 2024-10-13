import { Component, OnInit } from '@angular/core';
import { FactorizationService } from '../shared/services/factorisation.service';

@Component({
  selector: 'app-primitive-root',
  templateUrl: './primitive-root.component.html',
  styleUrls: ['./primitive-root.component.css'],
})
export class PrimitiveRootComponent implements OnInit {
  m: number | undefined;

  constructor(private factorizationService: FactorizationService) {}

  ngOnInit() {}
  public onChange(m: number) {
    this.m = m;
  }

  calc() {}
}
