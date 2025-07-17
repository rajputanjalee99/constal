// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import { environment as envProd } from "./environment.prod";

const CLIENT_ID = "788qylu3jxdsf3";
const REDIRECT_URL_TALENT_DEVELOPMENT = "http://localhost:4200/linkedin/callback/talent";
// const REDIRECT_URL_TALENT_PRODUCTION = "https://myconstal.com/linkedin/callback/talent";
const REDIRECT_URL_TALENT_PRODUCTION = "https://developers.promaticstechnologies.com/linkedin/callback/talent";

const REDIRECT_URL_CLIENT_DEVELOPMENT = "http://localhost:4200/linkedin/callback/client";
const REDIRECT_URL_CLIENT_PRODUCTION = "https://developers.promaticstechnologies.com/linkedin/callback/client";

const REDIRECT_URL_REFERRAL_DEVELOPMENT = "http://localhost:4200/linkedin/callback/referral";
const REDIRECT_URL_REFERRAL_PRODUCTION = "https://developers.promaticstechnologies.com/linkedin/callback/referral";

const CALLBACK_URL_TALENT = envProd.production ? REDIRECT_URL_TALENT_PRODUCTION : REDIRECT_URL_TALENT_DEVELOPMENT 
const CALLBACK_URL_CLIENT = envProd.production ? REDIRECT_URL_CLIENT_PRODUCTION : REDIRECT_URL_CLIENT_DEVELOPMENT 
const CALLBACK_URL_REFERRAL = envProd.production ? REDIRECT_URL_REFERRAL_PRODUCTION : REDIRECT_URL_REFERRAL_DEVELOPMENT 
// alert(CALLBACK_URL_REFERRAL)
export const environment = {
  production: true,
  // SERVER_URL : "https://apis.myconstal.com:5011/",
  SERVER_URL : "https://developers.promaticstechnologies.com:5011/",
  SERVER_WEB_URL : "https://constal.web.app/",
  LOCAL_URL : "http://localhost:4200/",
  // SHARE_FB_URL : "https://www.facebook.com/sharer/sharer.php?u=",
  SHARE_FB_URL : "fb-messenger://share/?link=",
  SHARE_TWITTER_URL : "https://www.twitter.com/share?url=",
  SHARE_WHATSAPP_URL : "https://web.whatsapp.com/send?text=",
  SHARE_LINKEDIN_URL : "https://www.linkedin.com/cws/share?url=",
  firebaseConfig : {
    apiKey: "***************************88",
    authDomain: "constal-4a419.firebaseapp.com",
    projectId: "constal-4a419",
    storageBucket: "constal-4a419.appspot.com",
    messagingSenderId: "606553676775",
    appId: "1:606553676775:web:c54d48e6e8b22870997b42",
    measurementId: "G-6T0R57D1NL"
  },
  talent_callback_url : CALLBACK_URL_TALENT,
  client_callback_url : CALLBACK_URL_CLIENT,
  referral_callback_url : CALLBACK_URL_REFERRAL,
  linkedinURLTalent : "https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id="+CLIENT_ID+"&scope=r_liteprofile,r_emailaddress&state=*&redirect_uri="+CALLBACK_URL_TALENT,
  linkedinURLClient : "https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id="+CLIENT_ID+"&scope=r_liteprofile,r_emailaddress&state=*&redirect_uri="+CALLBACK_URL_CLIENT,
  linkedinURLReferral : "https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id="+CLIENT_ID+"&scope=r_liteprofile,r_emailaddress&state=*&redirect_uri="+CALLBACK_URL_REFERRAL,
  // COMMON_MEDIA : "https://apis.myconstal.com/constal_apis/public/talent_media/",
  // desp : "https://apis.myconstal.com/constal_apis/public/disciplines_images/"
  COMMON_MEDIA : "",
  desp : ""
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
