import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatInputModule, MatCardModule, MatButtonModule } from '@angular/material';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import {PostCreateComponent} from './posts/post-create/post-create.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule} from './material';
import {MatDatepickerModule} from '@angular/material/datepicker';

@NgModule({
  declarations: [
    AppComponent,
    PostCreateComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    MaterialModule,
    MatDatepickerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
