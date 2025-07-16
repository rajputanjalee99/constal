import { Component, OnInit } from '@angular/core';
// const {firebase} = import
import { fire as firebase } from "../../firebase/firebase";
import { Service } from "./../../service/service.service";
import { Router, CanActivate } from '@angular/router';
import { environment } from "./../../../environments/environment";

@Component({
  selector: 'app-signup-talent',
  templateUrl: './signup-talent.component.html',
  styleUrls: ['./signup-talent.component.scss']
})
export class SignupTalentComponent implements OnInit {

	  myStyle: object = {};
    myParams: object = {};
    isLoading = false
  
  	constructor(private service : Service,private router : Router) {
      
  	}

  	ngOnInit(): void {
  		this.myStyle = {
            'position': 'absolute',
            'width': '100%',
            'height': '100%',
            'z-index': -1,
            'top': 0,
            'left': 0,
            'right': 0,
            'bottom': 0,
        };
        this.myParams = {
          particles: {
            number: {
                value: 100,
            },
            color: {
                value: '#444444'
            },
            shape: {
                type: 'triangle',
            },
            line_linked: {
              color: "#444444",
              opacity: 0
              
            },
          }
        };

    }
    
    loginWithGoogle(){
      // alert("sd");
      var provider = new firebase.auth.GoogleAuthProvider();
      firebase.auth()
      .signInWithPopup(provider)
      .then((result) => {
        /** @type {firebaseNew.auth.OAuthCredential} */
        var credential = result.credential;
        console.log(credential)
  
        // This gives you a Google Access Token. You can use it to access the Google API.
        // var token = credential.accessToken;
        // The signed-in user info.
        var user = result.user;
        console.log(user.providerData[0])

        this.isLoading = true;
        const form = {
          first_name : user.providerData[0].displayName,
          last_name : "",
          email : user.providerData[0].email,
          user_type : "google",
          role : "talent",
          social_id : user.providerData[0].uid,
          image : user.providerData[0].photoURL,
        }
        this.service.registerSocialUserTalent(form).subscribe(async res => {
    
          localStorage.setItem("user_details",JSON.stringify(res.user)),
          localStorage.setItem("token",res.token),
          localStorage.setItem("remember_me","yes"),
          
          this.service.showSuccessMessage({
            message : "Logged Successfully."
          })
          this.isLoading = false;

          if(res.user.is_profile_submitted_to_admin){
            // redirect to dashboard
            this.router.navigate(["talent-dashboard"]);
          }else{
            this.router.navigate(['choose-discipline']);
    
          }
          // this.router.navigate(['profile-details']);
        },(err) => {
          this.isLoading = false;
          this.service.handleError(err)
          console.log(err)
          //this.isLoading = false
        })


        // ...
      }).catch((error) => {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        this.service.showSuccessMessage({
          message : errorMessage
        })
  
        // The email of the user's account used.
        var email = error.email;
        // The firebaseNew.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
      });
    }

    loginWithLinkedIn(){

      // return
      // alert(environment.linkedinURLTalent);
      window.location.href = environment.linkedinURLTalent;
    }


}
