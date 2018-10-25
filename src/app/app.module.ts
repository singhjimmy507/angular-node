import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatInputModule, MatCardModule, MatButtonModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { PostCreateComponent} from './posts/post-create/post-create.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule} from './material';
import { MatDatepickerModule} from '@angular/material/datepicker';
import { ClaimsComponent } from './claims/claims.component';
import { PropertyInfoComponent } from './property-info/property-info.component';
import { ContactInfoComponent } from './contact-info/contact-info.component';
import { PersonalInfoComponent } from './personal-info/personal-info.component';
import { HomeComponent } from './home/home.component';
import { HttpClientModule } from '@angular/common/http';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatExpansionModule} from '@angular/material/expansion';

const appRoutes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'claims', component: ClaimsComponent },
  { path: 'personal-info', component: PersonalInfoComponent },
  { path: 'property-info', component: PropertyInfoComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    PostCreateComponent,
    ClaimsComponent,
    PropertyInfoComponent,
    ContactInfoComponent,
    PersonalInfoComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    MaterialModule,
    MatDatepickerModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatExpansionModule,
    MatButtonToggleModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
