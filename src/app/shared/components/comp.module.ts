import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonsComponent } from './buttons/buttons.component';
import { InputComponent } from './input/input.component';
import { FormsModule } from '@angular/forms';
import { WarningComponent } from './warning/warning.component';
import { TitleComponent } from './title/title.component';

@NgModule({
  imports: [CommonModule, FormsModule],
  declarations: [
    ButtonsComponent,
    InputComponent,
    WarningComponent,
    TitleComponent,
  ],
  exports: [ButtonsComponent, InputComponent, WarningComponent, TitleComponent],
})
export class CompModule {}
