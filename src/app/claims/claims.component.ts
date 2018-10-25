import { Component, OnInit } from '@angular/core';
import { FormArray, FormGroup, Validators, FormBuilder, FormControl, AbstractControl, NgForm } from '@angular/forms';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-claims',
  templateUrl: './claims.component.html',
  styleUrls: ['./claims.component.css']
})
export class ClaimsComponent implements OnInit {

  claimsForm: FormGroup;
  dumm = '';
  now: Date;
  DEBUG = false;
  isLinear = true;

  basicForm: FormGroup;
  dwellingForm: FormGroup;

  claims1: Claim[] = [
    {value: 'Fire-0', viewValue: 'Fire'},
    {value: 'Flooding-1', viewValue: 'Flooding'},
    {value: 'General-2', viewValue: 'General'}
  ];
  constructor(private fb: FormBuilder, private api: ApiService) { }
  onAddClaim(form: NgForm) {
    // alert('Post added');
    console.log('Claim Added');
}
  ngOnInit() {
    this.now = new Date();
    this.claimsForm = this.fb.group({
      hasMadeClaim: null,
      claims: this.fb.array([this.buildClaim()])
    });
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
//   addClaim() {
//     alert('Add new claim');
// }
  onAddPolicy() {
    // alert('Add new policy');
  this.dumm = 'Add new policy';
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

export interface Claim {
  value: string;
  viewValue: string;
}


