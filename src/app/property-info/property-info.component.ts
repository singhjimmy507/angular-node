import { Component, OnInit } from '@angular/core';
import { FormArray, FormGroup, Validators, FormBuilder, FormControl, AbstractControl, NgForm } from '@angular/forms';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-property-info',
  templateUrl: './property-info.component.html',
  styleUrls: ['./property-info.component.css']
})
export class PropertyInfoComponent implements OnInit {

  dumm = '';
  now: Date;
  DEBUG = false;
  isLinear = true;
  basicForm: FormGroup;
  dwellingForm: FormGroup;
  propertyKinds = {
    own: ['Home', 'Condo', 'Seasonal', 'Rental Dwelling', 'Mobile Home'],
    rent: ['Tenant', 'Storage']
  };

  constructor(private fb: FormBuilder, private api: ApiService) { }

  onAddClaim(form: NgForm) {
    // alert('Post added');
    console.log('Claim Added');
}
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

  }

  get updatedPropertyKinds(): string[] {
    const selected = this.dwellingForm.get('propertyKind');
    const options: string[] = this.propertyKinds['own'];
    // Reset the propertyKind form control if it is not a vaid option given the ownershipStatus
    if (selected.value !== null && !options.includes(selected.value)) {
      selected.reset();
    }
    return options;
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
    }
    if (form.valid) {
      this.api.postForm(form.value);
    } else {
      console.log('Form invalid! Not submitted.');
    }
  }
}
