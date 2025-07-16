import { AfterViewInit, Component, OnInit, ViewChild, ViewChildren, QueryList } from '@angular/core';
import { Options } from '@angular-slider/ngx-slider';
import { Service } from "../../service/service.service";
import {MatSnackBar} from '@angular/material/snack-bar';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router, CanActivate } from '@angular/router';
import {MatTabGroup} from '@angular/material/tabs';
import {MatPaginator} from '@angular/material/paginator';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-job-listing',
  templateUrl: './job-listing.component.html',
  styleUrls: ['./job-listing.component.scss']
})
export class JobListingComponent implements OnInit {
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

  constructor(public router: Router,private service : Service,private _snackBar: MatSnackBar,private fb: FormBuilder) { }
  jobDetails: any;
  jobtalents=[];
   talentCount = 0;
  clientCount = 0;
  isLoading = false
  reqData
  datamodel
  currentPage
  currentIndex
  visibility
  length
  createdat
  Difference_In_Days
  status
    noResultfound=false;
    jobType
  type
  searchTerm
  visibilityValue='';
  statusValue='';
  typeValue='';
    panelOpenState = false;
itemsperpage=500;
offset=0;
date1:any;
date2:any;
jobStatus
  ngOnInit(): void {
  var body = document.body;
  body.classList.remove("mystyle");

  this.getJoblist();
    this.currentPage = 10
    this.currentIndex = 0
    this.reqData = {}
    this.reqData.offset = 0
    this.reqData.limit = 10
  }

  openNav() {
    document.getElementById("mySidenav").style.width = "284px";
    // $(body).addClass("opacity-bg");
    var body = document.body;
    body.classList.add("mystyle");
  }

  closeNav() {
    document.getElementById("mySidenav").style.width = "0";
    // document.body.addClass("opacity-bg");
    var body = document.body;
    body.classList.remove("mystyle");
  }

   ngAfterViewInit() {
  }

    getPageSizeOptions() {
    return [10, 20, 30];
  }
    paginationOptionChange(evt) {
    this.reqData.offset = (evt.pageIndex * evt.pageSize).toString()
    this.reqData.limit = evt.pageSize
    this.currentPage = evt.pageSize
    this.currentIndex = evt.pageIndex
    var obj = {
      offset: this.reqData.offset,
      limit: this.reqData.limit
    }
    console.log(obj)
       this.service.getJobsUserslist(obj).subscribe(async (res:any) =>{
      console.log(res)
           this.jobDetails=res.data
           this.jobtalents=res.data.job_talents
           console.log(this.jobtalents)
                    for(let i=0;i<=this.reqData.limit;i++){
                 this.createdat= res.data[i].createdAt
                 const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds

                 this.date2 = new Date(res.data[i].createdAt);
                 console.log("d2",this.date2)
                  this.date1 = new Date();
   this.Difference_In_Days = Math.round(Math.abs((this.date1 - this.date2) / oneDay));


console.log("Difference_In_Days",this.Difference_In_Days)
                 }
    }, err => {
      console.log(err);
      if (err.status >= 400) {
        console.log('Invalid Credential!!!');
      } else {
        console.log('Internet Connection Error');
      }
    })
  }
  getJoblist(){
var obj = {
      limit: 10,
      offset: 0,
    }  
    this.service.getJobsUserslist(obj).subscribe(async (res:any) =>{
      console.log(res)
           this.jobDetails=res.data
           this.jobtalents=res.data.job_talents
                 this.length = res.count;
                        for(let i=0;i<=this.reqData.limit;i++){
                 this.createdat= res.data[i].createdAt
                 const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds

                 this.date2 = new Date(res.data[i].createdAt);
                 console.log("d2",this.date2)
                  this.date1 = new Date();
   this.Difference_In_Days = Math.round(Math.abs((this.date1 - this.date2) / oneDay));


console.log("Difference_In_Days",this.Difference_In_Days)
                 }
                   
  

            
    })
  
  }
  changeFilter(event){
        console.log(event)
        this.visibility=event.value;
        this.visibilityValue=event.value
        let param ={ visibility:this.visibility, status: this.status, type:this.type, offset: this.reqData.offset,
      limit: this.reqData.limit}
            this.service.getJobsUserslist(param).subscribe(async (res:any) =>{
      console.log(res)
           this.jobDetails=res.data
   this.length = res.count;
                        for(let i=0;i<=this.reqData.limit;i++){
                 this.createdat= res.data[i].createdAt
                 const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds

                 this.date2 = new Date(res.data[i].createdAt);
                 console.log("d2",this.date2)
                  this.date1 = new Date();
   this.Difference_In_Days = Math.round(Math.abs((this.date1 - this.date2) / oneDay));


console.log("Difference_In_Days",this.Difference_In_Days)
                 }
           this.jobtalents=res.data.job_talents
           console.log(this.jobtalents)
    })
  }
    changeStatus(event){
        console.log(event)
        this.status=event.value;
        this.statusValue=event.value
        let param ={ visibility:this.visibility, status: this.status, type:this.type, offset: this.reqData.offset,
      limit: this.reqData.limit}
            this.service.getJobsUserslist(param).subscribe(async (res:any) =>{
      console.log(res)
           this.jobDetails=res.data

           this.jobtalents=res.data.job_talents
           console.log(this.jobtalents)
              this.length = res.count;
                        for(let i=0;i<=this.reqData.limit;i++){
                 this.createdat= res.data[i].createdAt
                 const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds

                 this.date2 = new Date(res.data[i].createdAt);
                 console.log("d2",this.date2)
                  this.date1 = new Date();
   this.Difference_In_Days = Math.round(Math.abs((this.date1 - this.date2) / oneDay));


console.log("Difference_In_Days",this.Difference_In_Days)
                 }
    })
  }
     changeType(event){
        console.log(event)
        this.type=event.value;
        this.typeValue=event.value
        let param ={ visibility:this.visibility, status: this.status, type:this.type, offset: this.reqData.offset,
      limit: this.reqData.limit}
            this.service.getJobsUserslist(param).subscribe(async (res:any) =>{
      console.log(res)
           this.jobDetails=res.data

           this.jobtalents=res.data.job_talents
              this.length = res.count;
                        for(let i=0;i<=this.reqData.limit;i++){
                 this.createdat= res.data[i].createdAt
                 const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds

                 this.date2 = new Date(res.data[i].createdAt);
                 console.log("d2",this.date2)
                  this.date1 = new Date();
   this.Difference_In_Days = Math.round(Math.abs((this.date1 - this.date2) / oneDay));


console.log("Difference_In_Days",this.Difference_In_Days)
                 }
           console.log(this.jobtalents)
    })
  }
      clearType(event){
    console.log(event)
  this.visibilityValue=this.visibility;
  this.statusValue=this.status;
  this.typeValue='';
   let param ={ visibility:this.visibility, status: this.status, type:'',  offset: this.reqData.offset,
      limit: this.reqData.limit}
            this.service.getJobsUserslist(param).subscribe(async (res:any) =>{
      console.log(res)
           this.jobDetails=res.data
              this.length = res.count;
                        for(let i=0;i<=this.reqData.limit;i++){
                 this.createdat= res.data[i].createdAt
                 const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds

                 this.date2 = new Date(res.data[i].createdAt);
                 console.log("d2",this.date2)
                  this.date1 = new Date();
   this.Difference_In_Days = Math.round(Math.abs((this.date1 - this.date2) / oneDay));


console.log("Difference_In_Days",this.Difference_In_Days)
                 }
           this.jobtalents=res.data.job_talents
           console.log(this.jobtalents)
    })
  }
    clearVibility(event){
    console.log(event)
  this.visibilityValue="";
  this.statusValue=this.status;
  this.typeValue=this.type;
   let param ={ visibility:'', status: this.status, type:this.type,  offset: this.reqData.offset,
      limit: this.reqData.limit}
            this.service.getJobsUserslist(param).subscribe(async (res:any) =>{
      console.log(res)
           this.jobDetails=res.data
              this.length = res.count;
                        for(let i=0;i<=this.reqData.limit;i++){
                 this.createdat= res.data[i].createdAt
                 const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds

                 this.date2 = new Date(res.data[i].createdAt);
                 console.log("d2",this.date2)
                  this.date1 = new Date();
   this.Difference_In_Days = Math.round(Math.abs((this.date1 - this.date2) / oneDay));


console.log("Difference_In_Days",this.Difference_In_Days)
                 }
           this.jobtalents=res.data.job_talents
           console.log(this.jobtalents)
    })
  }
  clearStatus(event){
    console.log(event)
  this.visibilityValue=this.visibility;
  this.statusValue='';
  this.typeValue=this.type;
   let param ={ visibility:this.visibility, status: '', type:this.type,  offset: this.reqData.offset,
      limit: this.reqData.limit}
            this.service.getJobsUserslist(param).subscribe(async (res:any) =>{
      console.log(res)
           this.jobDetails=res.data
              this.length = res.count;
                        for(let i=0;i<=this.reqData.limit;i++){
                 this.createdat= res.data[i].createdAt
                 const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds

                 this.date2 = new Date(res.data[i].createdAt);
                 console.log("d2",this.date2)
                  this.date1 = new Date();
   this.Difference_In_Days = Math.round(Math.abs((this.date1 - this.date2) / oneDay));


console.log("Difference_In_Days",this.Difference_In_Days)
                 }
           this.jobtalents=res.data.job_talents
           console.log(this.jobtalents)
    })
  }
  clearallfilters(event){
  console.log(event)
  this.visibilityValue='';
  this.statusValue='';
  this.typeValue='';
   let param ={ visibility:'', status: '', type:'',  offset: this.reqData.offset,
      limit: this.reqData.limit}
            this.service.getJobsUserslist(param).subscribe(async (res:any) =>{
      console.log(res)
           this.jobDetails=res.data
              this.length = res.count;
                        for(let i=0;i<=this.reqData.limit;i++){
                 this.createdat= res.data[i].createdAt
                 const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds

                 this.date2 = new Date(res.data[i].createdAt);
                 console.log("d2",this.date2)
                  this.date1 = new Date();
   this.Difference_In_Days = Math.round(Math.abs((this.date1 - this.date2) / oneDay));


console.log("Difference_In_Days",this.Difference_In_Days)
                 }
           this.jobtalents=res.data.job_talents
           console.log(this.jobtalents)
    })
  }
    onSearchChange(event: string): void {  
  console.log(event)
let param={ 'search': event,  offset: this.reqData.offset,
      limit: this.reqData.limit};
  console.log(event)
   
     this.service.getJobsUserslist(param).subscribe(async (res:any) =>{
      console.log(param)
      this.noResultfound=false
           console.log("res",res)
this.jobDetails=res.data
   this.length = res.count;
   this.jobtalents=res.data.job_talents         
           if(res.count==0){
              this.noResultfound=true;  
          }
                        for(let i=0;i<=this.reqData.limit;i++){
                 this.createdat= res.data[i].createdAt
                 const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds

                 this.date2 = new Date(res.data[i].createdAt);
                 console.log("d2",this.date2)
                  this.date1 = new Date();
   this.Difference_In_Days = Math.round(Math.abs((this.date1 - this.date2) / oneDay));


console.log("Difference_In_Days",this.Difference_In_Days)
                 }
           
    })

}
editJob(id,type){
    localStorage.setItem('job_id',id)

console.log(id,type)

if(type=="individual"){
    this.router.navigate(['/disciplines/'+id])

}else{
    this.router.navigate(['/getting-started/'+id])

}
}
viewPosting(id,type){
localStorage.setItem('job_id',id)

console.log(id,type)

if(type=="individual"){
    this.router.navigate(['/view-job-posting/'+id])

}else{
    this.router.navigate(['/view-job-posting/'+id])

}

}
closejob(id){
let obj={
    status: 'closed',
    job_id:id
}
 this.service.changeJobStatus(obj).subscribe(async (res:any) =>{
 console.log(res)
         this.service.showErrorMessage({ message : "Job closed successfully", action : "Okay"});
         window.location.reload();
    })
}

openjob(id){
let obj={
    status: 'open',
    job_id:id
}
 this.service.changeJobStatus(obj).subscribe(async (res:any) =>{
    console.log(res)
             this.service.showErrorMessage({ message : "Job opened successfully", action : "Okay"});
         window.location.reload();
    })
}
reuseJob(id){
localStorage.setItem('job_id',id)
let obj={
    job_id:id
}
 this.service.duplicatePost(obj).subscribe(async (res:any) =>{
    console.log(res)
    this.router.navigate(['/disciplines/'+id])
    })
}
removeJob(id){
    console.log("alert delete id", id)

    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this Job!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.value) {
        let obj = {
          job_id: id
        }
        this.service.deleteJob(obj).subscribe(data => {
          console.log(data)
          this._snackBar.open('Job Deleted', 'OK');
          this.ngOnInit();
        }, err => {
          console.log("Error: ", err);
        })
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelled',
          'Your Job is safe :)',
          'error'
        )
      }
    })


  

}
}
