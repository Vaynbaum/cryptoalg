import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css'],
})
export class InputComponent implements OnInit {
  num: number | undefined;
  @Input()
  label = '';
  @Input()
  holder = '';
  @Output()
  changeInput = new EventEmitter<number>();
  constructor() {}

  ngOnInit() {}

  public out() {
    this.changeInput.emit(this.num);
  }
}
