import { Component, OnInit } from '@angular/core';
import { Service } from "../../service/service.service";
import {MatSnackBar} from '@angular/material/snack-bar';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router, CanActivate } from '@angular/router';

@Component({
  selector: 'app-project-title',
  templateUrl: './project-title.component.html',
  styleUrls: ['./project-title.component.scss']
})
export class ProjectTitleComponent implements OnInit {

	form: FormGroup;
	isLoading = false;
	visibility = "anyone";
	jobDetail = null;
	   myFiles:string [] = [];

	totalTalents = [];
  
	constructor(public router: Router,private service : Service,private _snackBar: MatSnackBar,private fb: FormBuilder) {
	  // window.service = this.service
	  this.form = this.fb.group({
		title: ['', Validators.required],
		description: ['', Validators.required],
		// visibility: ['', Validators.required],
	  })
  
	  if(!localStorage.getItem("job_id")){
			  this.service.showErrorMessage({
				  message : "Please start from Step 1"
			  })
			  this.router.navigate(['getting-started']);
		  }
  
	  if(localStorage.getItem("talents")){
  
		this.totalTalents = JSON.parse(localStorage.getItem("talents"))
  
	  }
  
  
	}
  
	// constructor() { }
  addlink=[{list:""}
  ];

	files = [];
  
	co_workers = [{
		  email: "",
		  description: "",
	  }]
  
	  // onSelect(event) {
	  //   console.log("event ================== ",event);
	  //   this.files.push(...event.addedFiles);
	  // }
  
  
	ngOnInit(): void {
		this.getJobDetail();
		      this.isLoading = false;

	}
  
	getJobDetail(){
		  let job_id;
		  if(localStorage.getItem("reuse_job_id")){
			  job_id = localStorage.getItem("reuse_job_id");
		  }else{
			  job_id = localStorage.getItem("job_id");
		  }
		  
		  if (job_id && job_id!=undefined) {
		  this.service.getJobDetail(job_id).subscribe(async res => {
			this.isLoading = false
			this.jobDetail = res.details;
			console.log("post title response =================== ",res)
  
			  this.form.setValue({
				  title: res.details && res.details.title ? res.details.title : "",
				  description: res.details && res.details.description ? res.details.description : "",
			  });
  
			  if(res.details && res.details.visibility){
				  this.visibility = res.details.visibility;
			  }
  
			  if(res.details && res.details.co_workers.length){
				  this.co_workers = res.details.co_workers
			  }
  
			  if(res.details && res.details.project_files.length){
				  this.myFiles = res.details.project_files
			  }
  
			  if(res.details && res.details.links.length){
				  this.addlink = res.details.links
			  }
  
  
		  //   if(res.details.description){
		  // 	  alert(res.details.description)
		  // 	this.form.setValue({
		  // 		description: res.details.description,
		  // 	});
		  //   }
  
		  //   if(res.details.visibility){
		  // 	this.visibility = res.details.visibility;
		  //   }
  
  
  
		  },(err) => {
			this.isLoading = false
			this.service.handleError(err)
			console.log(err)
		  })
	  }else{
		  this.jobDetail = null;
	  }
	}
	

	uploadFile(evt: any) {
    if (!evt.addedFiles.length) {
        return;
    }
	  for (var i = 0; i < evt.addedFiles.length; i++) { 
	              this.myFiles.push(evt.addedFiles[i]);

        }
	 
		    this.isLoading = true;

	const job_id = localStorage.getItem("job_id");
    const file = evt.addedFiles[0];
    var img_arr = file.name.split('.');
    const ext = img_arr.pop();

	   if (file.size/1024/1024 > 25) {
      this.isLoading = false;
	   for (var i = 0; i < evt.addedFiles.length; i++) { 
	              this.myFiles.splice(evt.addedFiles.indexOf(i),1);

        }  
      this.service.showErrorMessage({ message : "The file should not exceed more than 25MB.", action : "Okay"});
      return;
    }

        const fr = new FileReader();
        fr.readAsDataURL(file);
        const formData = new FormData();
		for (var i = 0; i < this.myFiles.length; i++) { 
      formData.append("media",this.myFiles[i]);

    }
		          formData.append('job_id',job_id);

			console.log(this.myFiles)

		console.log(formData)
        this.service.uploadPostJobMedia(formData).subscribe(async res => {
		
       for(let i=0;i<this.myFiles.length;i++){
		   const obj = {
            name: this.myFiles[i]['name'],
            media: this.myFiles[i]['name'],
            url: res.file_name[i],
            type: this.myFiles[i]['type'],
          }
		   this.files.push(obj);
		 }
        console.log("files",this.files)
        
		//   console.log("post file obj =========== ",obj)
         
		  		            this.isLoading = false;

        },(err) => {
          this.service.handleError(err)
          console.log(err)
		  		            this.isLoading = false;

        })
 
	}
  
	  onRemove(event) {
		// this.files.splice(this.files.indexOf(event), 1);
					this.files.splice(this.files.indexOf(event), 1);
								this.myFiles.splice(this.myFiles.indexOf(event), 1);

	  }
  
	createJobPostStep2(){
	 if(!this.form.valid  ){
			  		      return this.service.showErrorMessage({ message : "Please enter job title, description", action : "Okay"})

	

		

	}else{
		  console.log("here ===================== ")
	  this.isLoading = true;
	  const coWorker = this.co_workers.map(item => {
		  return {
			  email : item.email,
			  description : item.description
		  }
	  })
	    const list = this.addlink.map(item => {
		  return {
			  list : item.list,
		  }
	  })
	  const form = {
		title : this.form.controls['title'].value,
		description : this.form.controls['description'].value,
		visibility : this.visibility,
		job_id : localStorage.getItem("job_id"),
		project_files : this.files,
		co_workers : coWorker,  
		links:list
	  }
		  console.log("form ================== ",form)
  
	  this.service.createJobPostStep2(form).subscribe(async res => {
		  console.log("res ================== ",res)
		// const snackBarRef = this._snackBar.open("Job created successfully","Post Job", {
		//   duration: undefined,
		// });
		// // localStorage.setItem("job_id",res._id),
		// snackBarRef.onAction().subscribe(() => {
		//   this.router.navigate(['visibility-talent-preferences']);
		// });
		// this.router.navigate(['visibility-talent-preferences']);
		this.router.navigate(["post-review"])
		// this.router.navigate(["review-post"])
		this.isLoading = false;
  
  
		// this.router.navigate(['login']);
	  },(err) => {
		  console.log("err ================== ",err)
		this.isLoading = false;
		this.service.handleError(err)
		//this.isLoading = false
	  })
	}

	}


  
	  validateEmail(email) {
	    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	    return re.test(String(email).toLowerCase());
	}
  
	  validateCo_workers() {
  
		  const verify = this.co_workers.find(item => {
			  return !item['email_message'] && !item['description_message']
		  })
		  if (verify) {
			  return true
		  } else {
			  return false
		  }
  
	  }
  
	  validate(e, type, ind) {
  
		   console.log(e.target.value);
	    if (type == "email") {

	        if (!e.target.value) {
	            this.co_workers[ind]["email_message"] = "Please enter email"
	            return false
	        } else {
	            if (!this.validateEmail(e.target.value)) {
	                this.co_workers[ind]["email_message"] = "Please enter valid email"
	                return false
	            }

	            this.co_workers[ind]["email_message"] = ""
	        }
  
  
		  }
  
		  if (type == "description") {
  
			  if (!e.target.value) {
				  this.co_workers[ind]["description_message"] = "Please enter description"
				  return false
			  } else {
				  this.co_workers[ind]["description_message"] = ""
			  }
  
  
		  }
  
		  this.validateCo_workers()
  
  
	  }
  
	  addCoworkers() {
	  console.log(this.co_workers["email"])
	  if(this.co_workers.find(item => {
			  return !item['email'] && !item['description']
		  })){
		        return this.service.showErrorMessage({ message : "Email and Description should not be blank", action : "Okay"})


		  }
	  else{
	  console.log(this.co_workers.find(item => {
			  return !item['email_message'] && !item['description_message']
		  }))
	   this.co_workers.push({
		  email: "",
		  description: "",
	  })
	  }
	 
	  }
   
	  addedLink() {
	  console.log(this.addlink)
	  if(this.addlink.find(item => {
			  return !item['list'] 
		  })){
		        return this.service.showErrorMessage({ message : "link can not be blank", action : "Okay"})


		  }
	  else{
	  console.log(this.addlink.find(item => {
			  return !item['list'] 
		  }))
	   this.addlink.push({
		  list: "",
	  })
	  }
	 
	  }
	  removeCoworkers(ind) {
		  this.co_workers.splice(1, ind);
	  }


}
