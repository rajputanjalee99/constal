import { Component, OnInit } from '@angular/core';

import { fire as firebase } from "../../firebase/firebase";
import { Service } from "./../../service/service.service";
import { Router, CanActivate } from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-home-login',
  templateUrl: './home-login.component.html',
  styleUrls: ['./home-login.component.scss']
})
export class HomeLoginComponent implements OnInit {

	myStyle: object = {};
  myParams: object = {};
  isLoading = false
  
  constructor(private service : Service,private router : Router,private _snackBar : MatSnackBar) {

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
          role : "client",
          social_id : user.providerData[0].uid,
          image : user.providerData[0].photoURL,
        }
        this.service.registerSocialUserTalent(form).subscribe(async res => {
    
          this.service.showSuccessMessage({
            message : "Logged Successfully."
          })
          this.isLoading = false;
          this.router.navigate(['profile-details']);
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
        const snackBarRef = this._snackBar.open(errorMessage,"CLOSE", {
          duration: 0,
          horizontalPosition: "center",
          verticalPosition: "bottom",
        });

        snackBarRef.onAction().subscribe(() => {
          console.log('The snack-bar action was triggered!'+errorCode);
        });
        
        snackBarRef.dismiss();
  
        // The email of the user's account used.
        var email = error.email;
        // The firebaseNew.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
      });
    }
}
