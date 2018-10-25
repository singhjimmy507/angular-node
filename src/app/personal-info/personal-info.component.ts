import { Component, OnInit } from '@angular/core';
import { NgForm, FormGroup, Validators, FormBuilder, FormArray } from '@angular/forms';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-personal-info',
  templateUrl: './personal-info.component.html',
  styleUrls: ['./personal-info.component.css']
})
export class PersonalInfoComponent implements OnInit {

  enteredValue = '';
  newPost = ''; // Property of class. Doesn't require const, var, let
  DEBUG = false;
  isLinear = true;

  basicForm: FormGroup;
  dwellingForm: FormGroup;
  claimsForm: FormGroup;

  insuranceType = 'Home Insurance';

  places = [
    { value: 'kitchener', viewValue: 'Kitchener' },
    { value: 'toronto', viewValue: 'Toronto' },
    { value: 'montreal', viewValue: 'Montreal' },
    { value: 'ottawa', viewValue: 'Ottawa' }
  ];

  daysInMonth: number[];
  now: Date;

  // display next 5 years from now
  years: number[] = Array(5)
    .fill(0)
    .map((x, i) => i + new Date().getFullYear());
  months = [
    { value: 1, viewValue: 'January' },
    { value: 2, viewValue: 'February' },
    { value: 3, viewValue: 'March' },
    { value: 4, viewValue: 'April' },
    { value: 5, viewValue: 'May' },
    { value: 6, viewValue: 'June' },
    { value: 7, viewValue: 'July' },
    { value: 8, viewValue: 'August' },
    { value: 9, viewValue: 'September' },
    { value: 10, viewValue: 'October' },
    { value: 11, viewValue: 'November' },
    { value: 12, viewValue: 'December' }
  ];

  propertyKinds = {
    own: ['Home', 'Condo', 'Seasonal', 'Rental Dwelling', 'Mobile Home'],
    rent: ['Tenant', 'Storage']
  };

  onAddPost(form: NgForm) {
      // alert('Post added');
      console.log(form.value.location);
      console.log(form.value.firstName);
      console.log(form.value.lastName);
      console.log(form.value.ownershipStatus);
      this.newPost = this.enteredValue;
  }
  //  constructor(private fb: FormBuilder, private api: ApiService) { }
  constructor(private fb: FormBuilder, private api: ApiService) { }
  ngOnInit() {
    this.now = new Date();
    this.basicForm = this.fb.group({
      location: '',
      ownershipStatus: '',
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      dob: null,
      coverageStart: this.fb.group({
        year: this.now.getFullYear(),
        // month indexed from 1 (January is 1, February is 2, etc.)
        month: this.now.getMonth() + 1,
        day: this.now.getDate()
      })
    });

    this.dwellingForm = this.fb.group({
      propertyKind: null,
      isPrimaryResidence: null,
      secondaryResidenceOrConstruction: '',
      isVacant: null,
      vacancy: this.fb.group({
        duration: null,
        reason: null
      })
    });

    this.claimsForm = this.fb.group({
      hasMadeClaim: null,
      claims: this.fb.array([this.buildClaim()])
    });
  }
  // End of ngOnIt()
  get updatedPropertyKinds(): string[] {
    const selected = this.dwellingForm.get('propertyKind');
    const options: string[] = this.propertyKinds[this.basicForm.get('ownershipStatus').value];
    // Reset the propertyKind form control if it is not a vaid option given the ownershipStatus
    if (selected.value !== null && !options.includes(selected.value)) {
      selected.reset();
    }
    return options;
  }
  get claims(): FormArray {
    return <FormArray>this.claimsForm.get('claims');
  }
  buildClaim(): FormGroup {
    return this.fb.group({
      event: '',
      date: null
    });
  }
  addClaim(): void {
    this.claims.push(this.buildClaim());
  }
  removeClaim(i: number): void {
    this.claims.removeAt(i);
  }

  shouldShowField(key: string): boolean {
    if (key === 'primaryResidenceQuestion') {
      return this.handleShouldShowField(
        this.basicForm.get('ownershipStatus').value === 'own',
        () => (
          this.dwellingForm.patchValue({ isPrimaryResidence: null }),
          this.dwellingForm.get('isPrimaryResidence').clearValidators(),
          this.dwellingForm.get('isPrimaryResidence').updateValueAndValidity()
        )
      );
    } else if (key === 'secondaryOrConstructionQuestion') {
      return this.handleShouldShowField(
        this.dwellingForm.get('isPrimaryResidence').value === false,
        () =>
          this.dwellingForm.patchValue({
            secondaryResidenceOrConstruction: null
          })
      );
    } else if (key === 'isVacantQuestion') {
      return this.handleShouldShowField(
        this.dwellingForm.get('isPrimaryResidence').value === true ||
          this.dwellingForm.get('secondaryResidenceOrConstruction').value ===
            'Secondary',
        () => (
          this.dwellingForm.patchValue({ isVacant: null }),
          this.dwellingForm.get('isVacant').clearValidators(),
          this.dwellingForm.get('isVacant').updateValueAndValidity()
        )
      );
    } else if (key === 'vacancyDetailsQuestion') {
      return this.handleShouldShowField(
        this.dwellingForm.get('isVacant').value === true,
        () => (
          (this.dwellingForm.value.vacancy.duration = this.dwellingForm.value.vacancy.reason = null),
          this.dwellingForm.get('vacancy.duration').clearValidators(),
          this.dwellingForm.get('vacancy.reason').clearValidators(),
          this.dwellingForm.get('vacancy.duration').updateValueAndValidity(),
          this.dwellingForm.get('vacancy.reason').updateValueAndValidity()
        )
      );
    } else if (key === 'claimsList') {
      return this.handleShouldShowField(
        this.claimsForm.get('hasMadeClaim').value === true,
        () => {
          while (this.claims.length > 0) {
            this.removeClaim(0);
          }
          this.addClaim();
        }
      );
    }
  }
  private handleShouldShowField(
    condition: boolean,
    hideCallback?: Function
  ): boolean {
    if (condition) {
      return true;
    }
    if (hideCallback !== undefined) {
      hideCallback();
    }
    return false;
  }
  log(s) {
    console.log(s);
  }
  debug() {
    console.log(this.basicForm);
    console.log(this.dwellingForm);
    console.log(this.claimsForm);
  }

  onSubmit(event, formStepNum: number) {
    event.preventDefault();
    let form: FormGroup;
    switch (formStepNum) {
      case 0:
        form = this.basicForm;
        break;
      case 1:
        form = this.dwellingForm;
        break;
      case 2:
        form = this.claimsForm;
        break;
    }
    if (form.valid) {
      this.api.postForm(form.value);
    } else {
      console.log('Form invalid! Not submitted.');
    }
  }
}
