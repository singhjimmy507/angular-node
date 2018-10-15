import {MatButtonModule} from '@angular/material';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { NgModule } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatRadioModule} from '@angular/material/radio';
import {MatCardModule} from '@angular/material/card';
import {MatDatepickerModule} from '@angular/material/datepicker';

@NgModule({
  // tslint:disable-next-line:max-line-length
  imports: [MatButtonModule, MatAutocompleteModule, MatIconModule, MatInputModule, MatRadioModule, MatCardModule, MatDatepickerModule],
  // tslint:disable-next-line:max-line-length
  exports: [MatButtonModule, MatAutocompleteModule, MatIconModule, MatInputModule, MatRadioModule, MatCardModule, MatDatepickerModule],
})
export class MaterialModule { }
