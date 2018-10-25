import {MatButtonModule} from '@angular/material';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { NgModule } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatRadioModule} from '@angular/material/radio';
import {MatCardModule} from '@angular/material/card';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule} from '@angular/material';
import {MatSelectModule} from '@angular/material/select';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  // tslint:disable-next-line:max-line-length
  imports: [MatButtonModule, MatAutocompleteModule, MatIconModule, MatInputModule, HttpClientModule, MatRadioModule, MatCardModule, MatDatepickerModule, MatNativeDateModule, MatSelectModule],
  // tslint:disable-next-line:max-line-length
  exports: [MatButtonModule, MatAutocompleteModule, MatIconModule, MatInputModule, HttpClientModule, MatRadioModule, MatCardModule, MatDatepickerModule, MatNativeDateModule, MatSelectModule],
})
export class MaterialModule { }
