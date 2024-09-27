import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { AlgComponent } from './alg/alg.component';
import { AdvanceAlgComponent } from './advance-alg/advance-alg.component';
import { SCMComponent } from './scm/scm.component';
import { SieveEratosthenesComponent } from './sieve-eratosthenes/sieve-eratosthenes.component';
import { SieveSundaramaComponent } from './sieve-sundarama/sieve-sundarama.component';
import { FermaFactorizationMethodComponent } from './ferma-factorization-method/ferma-factorization-method.component';
import { PrimeNumberComponent } from './prime-number/prime-number.component';
import { FactorizationComponent } from './factorization/factorization.component';
import { ModuleComponent } from './module/module.component';
import { FuncEulerComponent } from './func-euler/func-euler.component';
import { ReducedSystemComponent } from './reduced-system/reduced-system.component';
import { ReverseComponent } from './reverse/reverse.component';
import { DeductionClassComponent } from './deduction-class/deduction-class.component';
import { CompModule } from './shared/components/comp.module';
import { ComparisonComponent } from './comparison/comparison.component';
import { ComparisonSystemComponent } from './comparison-system/comparison-system.component';
import { ApplicationTheoremFermaComponent } from './application-theorem-ferma/application-theorem-ferma.component';
import { GsdService } from './shared/services/gsd.service';
import { FermaService } from './shared/services/ferma.service';
import { NumberConversionService } from './shared/services/number-conversion.service';
import { FactorizationService } from './shared/services/factorisation.service';
import { ReverseElementComponent } from './reverse-element/reverse-element.component';
import { ComprationService } from './shared/services/compration.service';

@NgModule({
  imports: [BrowserModule, FormsModule, CompModule],
  declarations: [
    AppComponent,
    AlgComponent,
    AdvanceAlgComponent,
    SCMComponent,
    SieveEratosthenesComponent,
    SieveSundaramaComponent,
    FermaFactorizationMethodComponent,
    PrimeNumberComponent,
    FactorizationComponent,
    ModuleComponent,
    FuncEulerComponent,
    ReducedSystemComponent,
    ReverseComponent,
    ReverseElementComponent,
    DeductionClassComponent,
    ComparisonComponent,
    ComparisonSystemComponent,
    ApplicationTheoremFermaComponent,
  ],
  providers: [
    GsdService,
    FermaService,
    NumberConversionService,
    FactorizationService,
    ComprationService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
