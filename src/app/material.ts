import {MatButtonModule, MatCheckboxModule} from '@angular/material';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { NgModule } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatRadioModule} from '@angular/material/radio';
@NgModule({
  imports: [MatButtonModule, MatCheckboxModule, MatAutocompleteModule, MatIconModule, MatInputModule, MatRadioModule],
  exports: [MatButtonModule, MatCheckboxModule, MatAutocompleteModule, MatIconModule, MatInputModule, MatRadioModule],
})
export class MaterialModule { }
