import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { $ } from 'protractor';
import { Service } from "./../../service/service.service"
declare let $ : any


@Component({
  selector: 'app-identify-verification',
  templateUrl: './identify-verification.component.html',
  styleUrls: ['./identify-verification.component.scss']
})
export class IdentifyVerificationComponent implements OnInit {

  constructor(private service : Service,private fb : FormBuilder) { }

  verificationForm : FormGroup  

  file : File

  countries_list 

  files: File[] = [];

  onSelect(event) {
    console.log(event);
    if (this.files.length == 0) {
      this.files.push(...event.addedFiles);
    }
  }

  onRemove(event) {
    console.log(event);
    this.files.splice(this.files.indexOf(event), 1);
  }

  countries(){
    this.service.getCountryWiseData({}).subscribe(res => {
      this.countries_list = res.countries
    },(error) => {
      this.service.handleError(error)
    })
  }

  

  ngOnInit(): void {

    this.verificationForm = this.fb.group(
      {
        first_name : ["",[Validators.required]],
        last_name : ["",[Validators.required]],
        dob : ["",[Validators.required]],
        country_issuing_id   : ["",[Validators.required]],
        government_issue_photo_id : ["",[Validators.required]],
      }
    )

    this.countries();

  }

  sendVerification(){

    if(this.files.length > 0){
      const formData = new FormData();

      formData.append("first_name",this.verificationForm.controls["first_name"].value);
      formData.append("last_name",this.verificationForm.controls["last_name"].value);
      formData.append("gov_issued_photo_id",this.verificationForm.controls["government_issue_photo_id"].value);
      formData.append("proof_image",this.files[0]);
      formData.append("country_issuing_id",this.verificationForm.controls["country_issuing_id"].value);
      formData.append("dob",this.verificationForm.controls["dob"].value);

      this.service.uploadTalentVerification(formData).subscribe(res => {

        $('#uploadImg').modal("hide")
        $('#identity').modal("hide")
        this.service.showSuccessMessage({

          message : "Verification request has been sent"

        })

      },(error) => {
        this.service.handleError(error)
      })

    }else{
      this.service.showErrorMessage({
        message : "Please upload atleast one image"
      })
    }
    

  }

}
