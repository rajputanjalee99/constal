import { Component, NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SignupUserComponent } from './view/signup-user/signup-user.component';
import { UserProfileComponent } from './view/user-profile/user-profile.component';
import { HomeLoginComponent } from './view/home-login/home-login.component';
import { SignupTalentComponent } from './view/signup-talent/signup-talent.component';
import { TalentProfileComponent } from './view/talent-profile/talent-profile.component';
import { UserLoginComponent } from './view/user-login/user-login.component';
import { UserForgotPasswordComponent } from './view/user-forgot-password/user-forgot-password.component';
import { UserResetPasswordComponent } from './view/user-reset-password/user-reset-password.component';
import {TermsOfServicesComponent} from './view/terms-of-services/terms-of-services.component';
import { GettingStartedComponent } from './client post job/getting-started/getting-started.component';
import { PostTitleComponent } from './client post job/post-title/post-title.component';
import { ClientPasswordComponent } from './client-settings/client-password/client-password.component';
import { ClientForgotPasswordComponent } from './view/client-forgot-password/client-forgot-password.component';

import { ChooseDisciplineComponent } from './Talent Profile Admission/choose-discipline/choose-discipline.component';
import { ChooseSpecialityComponent } from './Talent Profile Admission/choose-speciality/choose-speciality.component';

import { HomePageComponent } from './home-page/home-page.component';
import { ChooseServicesComponent } from './Talent Profile Admission/choose-services/choose-services.component';
import { EducationComponent } from './Talent Profile Admission/education/education.component';
import { SkillsComponent } from './Talent Profile Admission/skills/skills.component';
import { AccomplishmentsComponent } from './Talent Profile Admission/accomplishments/accomplishments.component';
import { ExperienceComponent } from './Talent Profile Admission/experience/experience.component';

import { SignupUserEmailComponent } from "./view/signup-user-email/signup-user-email.component";
import { ProfileDetailsComponent } from './Talent Profile Admission/profile-details/profile-details.component';
import { VisibilityPreferencesComponent } from './Talent Profile Admission/visibility-preferences/visibility-preferences.component';
import { ChooseSectorsComponent } from './Talent Profile Admission/choose-sectors/choose-sectors.component';

import { TalentLoginComponent } from "./view/talent-login/talent-login.component";

import { LinkedinTalentComponent } from "./callback/linkedin-talent/linkedin-talent.component";

import { LinkedinClientComponent } from "./callback/linkedin-client/linkedin-client.component";

import { LinkedinReferralComponent } from "./callback/linkedin-referral/linkedin-referral.component";

import { TalentDashboardComponent } from './talent-dashboard/talent-dashboard.component';
import { ClientDashboardComponent} from './client-dashboard/client-dashboard.component';
import { Page404Component as PagenotfoundComponent } from "./view/page404/page404.component";
import {ClientInfoComponent} from'./client-settings/client-info/client-info.component';

// ----------------4-04-21-----------------




import { VisibilityTalentPreferencesComponent } from './client post job/visibility-talent-preferences/visibility-talent-preferences.component';
import { TalentPreferencesComponent } from './client post job/talent-preferences/talent-preferences.component';
import { ReviewPostComponent } from './client post job/review-post/review-post.component';

import { ClientPostJobsComponent } from './client post job/client-post-jobs/client-post-jobs.component';

import { DisciplinesComponent } from './client-post-job(individual)/disciplines/disciplines.component';
import { PostReviewComponent } from './client-post-job(individual)/post-review/post-review.component';
import { ProjectTitleComponent } from './client-post-job(individual)/project-title/project-title.component';
import { SectorsComponent } from './client-post-job(individual)/sectors/sectors.component';
import { ServicesComponent } from './client-post-job(individual)/services/services.component';
import { SpecialityComponent } from './client-post-job(individual)/speciality/speciality.component';
import { TalentBudgetComponent } from './client-post-job(individual)/talent-budget/talent-budget.component';
import { ContactInfoComponent } from './talent-settings/contact-info/contact-info.component';
import { IdentifyVerificationComponent } from './talent-settings/identify-verification/identify-verification.component';
import { PasswordSecurityComponent } from './talent-settings/password-security/password-security.component';
import { NotificationSettingsComponent } from './talent-settings/notification-settings/notification-settings.component';
import { ProfileSettingsComponent } from './talent-settings/profile-settings/profile-settings.component';
import { MyProfileComponent } from './Talent Profile Admission/my-profile/my-profile.component';

import { IntroPageComponent } from './intro-page/intro-page.component';
import{AboutUsComponent} from './about-us/about-us.component'

// Guard implement by Raj
import { UserGuard } from "./guard/user.guard";
import { LoggedUserGuard } from "./guard/logged-user.guard";

import { ViewProfileComponent } from "./client-search-talent/view-profile/view-profile.component";
import {PrivacyPolicyComponent} from './privacy-policy/privacy-policy.component'


import { ReferralSignupComponent } from './referral-program/referral-signup/referral-signup.component';
import { ReferralDbComponent } from './referral-program/referral-db/referral-db.component';
import { ReferralApplyComponent } from './referral-program/referral-apply/referral-apply.component';
import { ReferralLoginComponent } from './referral-program/referral-login/referral-login.component';
import { ReferralForgetPasswordComponent } from './referral-program/referral-forget-password/referral-forget-password.component';
import { ReferralResetPasswordComponent } from './referral-program/referral-reset-password/referral-reset-password.component';

import { ReferralTermsComponent } from './referral-program/referral-terms/referral-terms.component';
import { ReferralPolicyComponent } from './referral-program/referral-policy/referral-policy.component';
import { CreateAgencyProfileComponent } from "./agency-profile/create-agency-profile/create-agency-profile.component";

import { CreateAgencyComponent } from "./agency-profile/create-agency/create-agency.component";
import { AgencyDisciplinesComponent } from "./agency-profile/agency-disciplines/agency-disciplines.component";

import { AgencySpecialityComponent } from "./agency-profile/agency-speciality/agency-speciality.component";
import { AgencyServicesComponent } from "./agency-profile/agency-services/agency-services.component";
import { AgencySkillsComponent } from "./agency-profile/agency-skills/agency-skills.component";
import { MyProfieGuard } from './guard/my-profie.guard';
import {JobListingComponent} from './client-post-job/job-listing/job-listing.component';

import {GettingStartedGuestComponent} from './client-post-job-guest/getting-started-guest/getting-started-guest.component';
import {PostTitleGuestComponent} from './client-post-job-guest/post-title-guest/post-title-guest.component';
import { ReviewPostGuestComponent } from './client-post-job-guest/review-post-guest/review-post-guest.component';
import { TalentPreferenceGuestComponent } from './client-post-job-guest/talent-preference-guest/talent-preference-guest.component';
import {VisibilityPreferencesGuestComponent} from './client-post-job-guest/visibility-preferences-guest/visibility-preferences-guest.component';
import {VisibilityTalentPreferencesGuestComponent} from './client-post-job-guest/visibility-talent-preferences-guest/visibility-talent-preferences-guest.component';



import { PostReviewIndividualGuestComponent } from './client-post-job-guest-individual/post-review-individual-guest/post-review-individual-guest.component';
import { ProjectTitleIndividualGuestComponent } from './client-post-job-guest-individual/project-title-individual-guest/project-title-individual-guest.component';
import { SectorsIndividualGuestComponent } from './client-post-job-guest-individual/sectors-individual-guest/sectors-individual-guest.component';
import { ServicesIndividualGuestComponent } from './client-post-job-guest-individual/services-individual-guest/services-individual-guest.component';
import { SpecialityIndividualGuestComponent } from './client-post-job-guest-individual/speciality-individual-guest/speciality-individual-guest.component';
import { TalentBudgetIndividualGuestComponent } from './client-post-job-guest-individual/talent-budget-individual-guest/talent-budget-individual-guest.component';
import { DisciplinesIndividualGuestComponent } from './client-post-job-guest-individual/disciplines-individual-guest/disciplines-individual-guest.component';

import { DraftedJobsComponent } from './client-post-job/drafted-jobs/drafted-jobs.component';
import {ViewJobPostingComponent} from './client-post-job/view-job-posting/view-job-posting.component';
const routes: Routes = [
	{
		path: 'home-login',
		component: HomeLoginComponent,
		canActivate: [LoggedUserGuard]
	},
	// {
	// 	path: '',
	// 	component: HomePageComponent
	// },
	{
		path: '',
		component: IntroPageComponent
	},
	{
		path: 'referral/:code',
		component: IntroPageComponent
	},
	{
		path: 'sign-up-user',
		component: SignupUserComponent,
		canActivate: [LoggedUserGuard]
	},
	{
		path: 'user-profile',
		component: UserProfileComponent
	},
	{
		path: 'sign-up-user-email',
		component: SignupUserEmailComponent,
		canActivate: [LoggedUserGuard]
	},
	{
		path: 'sign-up-user-email/referral/:code',
		component: SignupUserEmailComponent,
		canActivate: [LoggedUserGuard]
	},
	{
		path: 'signup-talent',
		component: SignupTalentComponent,
		canActivate: [LoggedUserGuard]
	},
	{
		path: 'talent-profile',
		component: TalentProfileComponent,
		canActivate: [LoggedUserGuard]
	},
	{
		path: 'signup-talent-user',
		component: TalentProfileComponent,
		canActivate: [LoggedUserGuard]
	},
	{
		path: 'signup-talent-user/referral/:code',
		component: TalentProfileComponent,
		canActivate: [LoggedUserGuard]
	},
	{
		path: 'user-login',
		component: UserLoginComponent,
		canActivate: [LoggedUserGuard]
	},
	{
		path: 'talent-login',
		component: TalentLoginComponent,
		canActivate: [LoggedUserGuard]
	},
	{
		path: 'view-talent-profile/:talent_user_id',
		component: ViewProfileComponent
	},
	{
		path: 'login',
		component: UserLoginComponent,
		canActivate: [LoggedUserGuard]
	},
	{
		path: 'user-forgot',
		component: UserForgotPasswordComponent,
		canActivate: [LoggedUserGuard]
	},
	{
		path: 'forgot-password',
		component: UserForgotPasswordComponent,
		canActivate: [LoggedUserGuard]
	},
	{
		path: 'forgot-password-client',
		component: ClientForgotPasswordComponent,
		canActivate: [LoggedUserGuard]
	},
	{
		path: 'reset-password/:code/:token',
		component: UserResetPasswordComponent
	},
	{
		path: 'user-reset',
		component: UserResetPasswordComponent
	},
	{
		path: 'post-job',
		component: PostTitleComponent,
		canActivate : [UserGuard],
	},
	{
		path: 'choose-discipline',
		component: ChooseDisciplineComponent,
		canActivate : [UserGuard],
	},
	{
		path: 'choose-speciality',
		component: ChooseSpecialityComponent,
		canActivate : [UserGuard],
	},
	{
		path: 'choose-speciality/:descipline_id/:descipline_slug',
		component: ChooseSpecialityComponent,
		canActivate : [UserGuard],
	},
	{
		path: 'choose-sectors/:descipline_id/:descipline_slug',
		component: ChooseSectorsComponent,
		canActivate : [UserGuard],
	},
	{
		path: 'choose-services',
		component: ChooseServicesComponent,
		canActivate : [UserGuard],
	},
	{
		path: 'education',
		component: EducationComponent,
		canActivate : [UserGuard],
	},
	{
		path: 'qualifications',
		component: EducationComponent,
		canActivate : [UserGuard],
	},
	{
		path: 'skills',
		component: SkillsComponent,
		canActivate : [UserGuard],
	},
	{
		path: 'accomplishments',
		component: AccomplishmentsComponent,
		canActivate : [UserGuard],
	},
	{
		path: 'experience',
		component: ExperienceComponent,
		canActivate : [UserGuard],
	},
	{
		path: 'profile-details',
		component: ProfileDetailsComponent,
		canActivate : [UserGuard],
	},
	{
		path: 'visibility-preferences',
		component: VisibilityPreferencesComponent,
		canActivate : [UserGuard],
	},
	{
		path: 'choose-sectors',
		component: ChooseSectorsComponent,
		canActivate : [UserGuard],
	},
	{
		path: 'linkedin/callback/talent',
		component: LinkedinTalentComponent
	},
	{
		path: 'linkedin/callback/client',
		component: LinkedinClientComponent
	},
	{
		path: 'linkedin/callback/referral',
		component: LinkedinReferralComponent
	},
	{
		path: 'talent-dashboard',
		component: TalentDashboardComponent,
		canActivate : [UserGuard],
	},
		{
		path: 'client-dashboard',
		component: ClientDashboardComponent,
		canActivate : [UserGuard],
	},
	{
		path: 'getting-started',
		component: GettingStartedComponent,
		canActivate : [UserGuard],
	},
	{
		path: 'post-title',
		component: PostTitleComponent,
		canActivate : [UserGuard],
	},
		{
		path: 'terms-of-service',
		component: TermsOfServicesComponent,
	},
	{
		path: 'visibility-talent-preferences',
		component: VisibilityTalentPreferencesComponent
	},
	{
		path: 'talent-preferences',
		component: TalentPreferencesComponent
	},
	{
		path: 'review-post',
		component: ReviewPostComponent
	},
	{
		path: 'post-jobs-list',
		component: ClientPostJobsComponent
	},
	{
		path: 'disciplines',
		component: DisciplinesComponent
	},
	{
		path: 'post-review',
		component: PostReviewComponent
	},
	{
		path: 'project-title',
		component: ProjectTitleComponent
	},
	{
		path: 'sectors',
		component: SectorsComponent
	},
	{
		path: 'services',
		component: ServicesComponent
	},
	{
		path: 'speciality',
		component: SpecialityComponent
	},
	{
		path: 'speciality/:descipline_id/:descipline_slug',
		component: SpecialityComponent
	},
	{
		path: 'talent-budget',
		component: TalentBudgetComponent
	},
	{
		path: 'talent-budget',
		component: TalentBudgetComponent
	},
	{
		path: 'contact-info',
		component:ContactInfoComponent,
		canActivate: [UserGuard]
	},
	{
		path: 'identify-verification',
		component:IdentifyVerificationComponent
	},
	{
		path: 'password-security',
		component:PasswordSecurityComponent,
		canActivate: [UserGuard]
	},
	{
		path: 'notification-settings',
		component:NotificationSettingsComponent,
		canActivate: [UserGuard]
	},
	{
		path: 'my-profile',
		component:ProfileSettingsComponent,
		canActivate : [UserGuard,MyProfieGuard],
	},
	// {
	// 	path: 'my-profile',
	// 	component: MyProfileComponent,
	// 	canActivate : [UserGuard],
	// },
	{
		path: 'intro-page',
		component: IntroPageComponent
	},
	{
		path:'about-us',
		component:AboutUsComponent
	},
	{
		path:'privacy-policy',
		component:PrivacyPolicyComponent
	},
	{
		path: 'referral-signup',
		component:ReferralSignupComponent,
		canActivate: [LoggedUserGuard]
	},
	{
		path: 'referral-db',
		component:ReferralDbComponent,
		canActivate : [UserGuard],
	},
	{
		path: 'referral-apply',
		component:ReferralApplyComponent
	},
	{
		path: 'referral-login',
		component:ReferralLoginComponent,
		canActivate: [LoggedUserGuard]
	},
	{
		path: 'referral-forget',
		component:ReferralForgetPasswordComponent,
		canActivate: [LoggedUserGuard]
	},
	{
		path: 'referral-reset',
		component:ReferralResetPasswordComponent
	},
	{
		path: 'referral-reset-password/:code/:token',
		component:ReferralResetPasswordComponent
	},
	{
		path: 'referral-terms',
		component:ReferralTermsComponent
	},
	{
		path: 'referral-policy',
		component:ReferralPolicyComponent
	},
	{
		path: 'create-agency-profile',
		component:CreateAgencyProfileComponent
	},
	{
		path: 'create-agency',
		component:CreateAgencyComponent
	},
	{
		path: 'agency-disciplines',
		component:AgencyDisciplinesComponent,
	},
	{
		path: 'agency-specialities',
		component:AgencySpecialityComponent,
	},
	{
		path: 'agency-services',
		component:AgencyServicesComponent,
	},
	{
		path: 'agency-skills',
		component:AgencySkillsComponent,
	},
		{
		path:'client-password',
		component: ClientPasswordComponent
	},
		  {
			path:"job-listing",
			component:JobListingComponent
	  },
	   {
			path:"getting-started-guest",
			component:GettingStartedGuestComponent
	  },
	   {
			path:"post-title-guest",
			component:PostTitleGuestComponent
	  },
	   {
			path:"review-post-guest",
			component:ReviewPostGuestComponent
	  },
	   {
			path:"visibility-talent-preference-guest",
			component:VisibilityTalentPreferencesGuestComponent
	  },
	   {
			path:"talent-preferences-guest",
			component:TalentPreferenceGuestComponent
	  },
	   {
			path:"visibility-preference-guest",
			component:VisibilityPreferencesGuestComponent
	  },
	   {
			path:"discipline-guest",
			component:DisciplinesIndividualGuestComponent
	  },
	     {
			path:"discipline-guest/:id",
			component:DisciplinesIndividualGuestComponent
	  },
	   {
			path:"talent-budget-guest",
			component:TalentBudgetIndividualGuestComponent
	  },
	   {
			path:"visibility-preference-guest",
			component:VisibilityPreferencesGuestComponent
	  },
	   {
			path:"services-guest",
			component:ServicesIndividualGuestComponent
	  },
	   {
			path:"sectors-guest",
			component:SectorsIndividualGuestComponent
	  },
	   {
			path:"project-title-guest",
			component:ProjectTitleIndividualGuestComponent
	  },
	   {
			path:"post-review-individual-guest",
			component:PostReviewIndividualGuestComponent
	  },
	  	{
		path: 'disciplines/:id',
		component: DisciplinesComponent
	},
			{
		path: 'post-review/:id',
		component: PostReviewComponent
	},
		{
		path: 'speciality/:descipline_id/:descipline_slug',
		component: SpecialityComponent
	},
		{
		path: 'speciality-guest',
		component: SpecialityIndividualGuestComponent
	},
		{
		path: 'speciality-guest/:descipline_id/:descipline_slug',
		component: SpecialityIndividualGuestComponent
	},
	    {
			path:"drafted-jobs",
			component:DraftedJobsComponent
	  },
	   {
			path:"view-job-posting/:id",
			component:ViewJobPostingComponent
	  },
	  	{
		path:'client-info',
		component:ClientInfoComponent
	},
	{ path: '**', pathMatch: 'full', 
        component: PagenotfoundComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: false,  scrollPositionRestoration: 'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
