import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { SignupUserComponent } from './view/signup-user/signup-user.component';
import { HeaderComponent } from './common/header/header.component';
import { FooterComponent } from './common/footer/footer.component';

import {MatButtonModule} from '@angular/material/button';

import { ParticlesModule } from 'angular-particle';
import { UserProfileComponent } from './view/user-profile/user-profile.component';

import { HomeLoginComponent } from './view/home-login/home-login.component';
import { SignupTalentComponent } from './view/signup-talent/signup-talent.component';
import { TalentProfileComponent } from './view/talent-profile/talent-profile.component';
import { UserLoginComponent } from './view/user-login/user-login.component';
import { UserForgotPasswordComponent } from './view/user-forgot-password/user-forgot-password.component';
import { UserResetPasswordComponent } from './view/user-reset-password/user-reset-password.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ClientInfoComponent } from './client-settings/client-info/client-info.component';
import { ClientPasswordComponent } from './client-settings/client-password/client-password.component';

import { ToastrModule } from 'ngx-toastr';
import { GettingStartedComponent } from './client post job/getting-started/getting-started.component';
import { ClientHeaderComponent } from './common/client-header/client-header.component';


import { MatRadioModule} from '@angular/material/radio'; 
import { MatProgressBarModule} from '@angular/material/progress-bar';
import { LeftSidebarComponent } from './common/left-sidebar/left-sidebar.component';
import { RightSidebarComponent } from './common/right-sidebar/right-sidebar.component';
import { PostTitleComponent } from './client post job/post-title/post-title.component';
import { ChooseDisciplineComponent } from './Talent Profile Admission/choose-discipline/choose-discipline.component';
import { TalentHeaderComponent } from './common/talent-header/talent-header.component';
import { TalentSidebarComponent } from './common/talent-sidebar/talent-sidebar.component';
import { ChooseSpecialityComponent } from './Talent Profile Admission/choose-speciality/choose-speciality.component';

import { TagInputModule } from 'ngx-chips';
import { MatCheckboxModule} from '@angular/material/checkbox';
import { MatTabsModule} from '@angular/material/tabs';
import { MatDatepickerModule} from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule} from '@angular/material/slide-toggle';
import { NgxDropzoneModule } from 'ngx-dropzone';

import { HomePageComponent } from './home-page/home-page.component';
import { HomeHeaderComponent } from './common/home-header/home-header.component';
import { ChooseServicesComponent } from './Talent Profile Admission/choose-services/choose-services.component';
import { EducationComponent } from './Talent Profile Admission/education/education.component';
import { LicensesComponent } from './Talent Profile Admission/licenses/licenses.component';
import { SkillsComponent } from './Talent Profile Admission/skills/skills.component';
import { AccomplishmentsComponent } from './Talent Profile Admission/accomplishments/accomplishments.component';
import { ExperienceComponent } from './Talent Profile Admission/experience/experience.component';
import { SignupUserEmailComponent } from './view/signup-user-email/signup-user-email.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ProfileDetailsComponent } from './Talent Profile Admission/profile-details/profile-details.component';
import { VisibilityPreferencesComponent } from './Talent Profile Admission/visibility-preferences/visibility-preferences.component';
import { ChooseSectorsComponent } from './Talent Profile Admission/choose-sectors/choose-sectors.component';
import { SelectDropDownModule } from 'ngx-select-dropdown';
import { NgxSliderModule } from '@angular-slider/ngx-slider';
import { TalentLoginComponent } from "./../app/view/talent-login/talent-login.component";
import { EmailExistComponent } from "./common/snackbar/email_exist/email.component";

import { CarouselModule } from 'ngx-owl-carousel-o';
import { LinkedinTalentComponent } from './callback/linkedin-talent/linkedin-talent.component';
import { LinkedinClientComponent } from './callback/linkedin-client/linkedin-client.component';

import { MatNativeDateModule, MAT_DATE_FORMATS } from '@angular/material/core';

import { MatMomentDateModule } from "@angular/material-moment-adapter";

import { Service } from "./service/service.service";
import { TalentDashboardComponent } from './talent-dashboard/talent-dashboard.component';
import { TalentDbHeaderComponent } from './common/talent-db-header/talent-db-header.component';


export const MY_FORMATS = {
  parse: {
    dateInput: 'LL',
  },
  display: {
    dateInput: 'YYYY-MM-DD',
    monthYearLabel: 'YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'YYYY',
  },
};

// import { SocialLoginModule, SocialAuthServiceConfig } from 'angularx-social-login';
// import { LinkedInSdkModule } from 'angular-linkedin-sdk';


// ----------------4-04-21-----------------


import { VisibilityTalentPreferencesComponent } from './client post job/visibility-talent-preferences/visibility-talent-preferences.component';
import { TalentPreferencesComponent } from './client post job/talent-preferences/talent-preferences.component';
import { ReviewPostComponent } from './client post job/review-post/review-post.component';

import {MatExpansionModule} from '@angular/material/expansion';
import { TalentRightSidebarComponent } from './common/talent-right-sidebar/talent-right-sidebar.component';
import { ClientPostJobsComponent } from './client post job/client-post-jobs/client-post-jobs.component';
import { ClientDbHeaderComponent } from './common/client-db-header/client-db-header.component';
import { FilterSingleComponent } from './common/filter-single/filter-single.component';

import { DisciplinesComponent } from './client-post-job(individual)/disciplines/disciplines.component';
import { PostReviewComponent } from './client-post-job(individual)/post-review/post-review.component';
import { ProjectTitleComponent } from './client-post-job(individual)/project-title/project-title.component';
import { SectorsComponent } from './client-post-job(individual)/sectors/sectors.component';
import { ServicesComponent } from './client-post-job(individual)/services/services.component';
import { SpecialityComponent } from './client-post-job(individual)/speciality/speciality.component';
import { TalentBudgetComponent } from './client-post-job(individual)/talent-budget/talent-budget.component';
import { ClientLeftSidebarComponent } from './common/client-left-sidebar/client-left-sidebar.component';

import { NgxIntlTelInputModule } from 'ngx-intl-tel-input';

import { ContactInfoComponent } from './talent-settings/contact-info/contact-info.component';
import { TalentSettingsSidebarComponent } from './common/talent-settings-sidebar/talent-settings-sidebar.component';
import { IdentifyVerificationComponent } from './talent-settings/identify-verification/identify-verification.component';
import { PasswordSecurityComponent } from './talent-settings/password-security/password-security.component';
import { NotificationSettingsComponent } from './talent-settings/notification-settings/notification-settings.component';
import { ProfileSettingsComponent } from './talent-settings/profile-settings/profile-settings.component';

import { MyProfileComponent } from "./Talent Profile Admission/my-profile/my-profile.component";
import { DatePipe } from '@angular/common';
import { UserGuard } from "./guard/user.guard";
import { MyProfieGuard } from "./guard/my-profie.guard";
import { ViewProfileComponent } from './client-search-talent/view-profile/view-profile.component';
import { MatCarouselModule } from 'ng-mat-carousel';
import { IntroHeaderComponent } from './common/intro-header/intro-header.component';
import { IntroPageComponent } from './intro-page/intro-page.component';
import{AboutUsComponent} from './about-us/about-us.component';
import {PrivacyPolicyComponent} from './privacy-policy/privacy-policy.component'

import { ReferralSignupComponent } from './referral-program/referral-signup/referral-signup.component';
import { ReferralDbComponent } from './referral-program/referral-db/referral-db.component';
import { ReferralApplyComponent } from './referral-program/referral-apply/referral-apply.component';
import { ReferralLoginComponent } from './referral-program/referral-login/referral-login.component';
import { ReferralForgetPasswordComponent } from './referral-program/referral-forget-password/referral-forget-password.component';
import { ReferralResetPasswordComponent } from './referral-program/referral-reset-password/referral-reset-password.component';
import { ReferralHeaderComponent } from './common/referral-header/referral-header.component'

import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import { LinkedinReferralComponent } from './callback/linkedin-referral/linkedin-referral.component';
import { ReferralTermsComponent } from './referral-program/referral-terms/referral-terms.component';
import { ReferralPolicyComponent } from './referral-program/referral-policy/referral-policy.component';



import { PlyrModule } from 'ngx-plyr';
import { Page404Component } from './view/page404/page404.component';

import { CreateAgencyComponent } from "./agency-profile/create-agency/create-agency.component";
import { ProfileSettingsSidebarComponent } from './common/profile-settings-sidebar/profile-settings-sidebar.component';
import { ConfirmDialogComponent } from './common/confirm-dialog/confirm-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';

// agency profile
import { CreateAgencyProfileComponent } from "./agency-profile/create-agency-profile/create-agency-profile.component";

import { CreateAgencySidebarComponent } from "./common/create-agency-sidebar/create-agency-sidebar.component";
import { AgencyDisciplinesComponent } from "./agency-profile/agency-disciplines/agency-disciplines.component";

import { AgencySpecialityComponent } from "./agency-profile/agency-speciality/agency-speciality.component";
import { AgencyServicesComponent } from "./agency-profile/agency-services/agency-services.component";
import { AgencySkillsComponent } from "./agency-profile/agency-skills/agency-skills.component";

import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { JobListingComponent } from './client-post-job/job-listing/job-listing.component';
import { GettingStartedGuestComponent } from './client-post-job-guest/getting-started-guest/getting-started-guest.component';
import { PostTitleGuestComponent } from './client-post-job-guest/post-title-guest/post-title-guest.component';
import { ReviewPostGuestComponent } from './client-post-job-guest/review-post-guest/review-post-guest.component';
import { TalentPreferenceGuestComponent } from './client-post-job-guest/talent-preference-guest/talent-preference-guest.component';
import { VisibilityPreferencesGuestComponent } from './client-post-job-guest/visibility-preferences-guest/visibility-preferences-guest.component';
import { VisibilityTalentPreferencesGuestComponent } from './client-post-job-guest/visibility-talent-preferences-guest/visibility-talent-preferences-guest.component';
import { PostReviewIndividualGuestComponent } from './client-post-job-guest-individual/post-review-individual-guest/post-review-individual-guest.component';
import { ProjectTitleIndividualGuestComponent } from './client-post-job-guest-individual/project-title-individual-guest/project-title-individual-guest.component';
import { SectorsIndividualGuestComponent } from './client-post-job-guest-individual/sectors-individual-guest/sectors-individual-guest.component';
import { ServicesIndividualGuestComponent } from './client-post-job-guest-individual/services-individual-guest/services-individual-guest.component';
import { SpecialityIndividualGuestComponent } from './client-post-job-guest-individual/speciality-individual-guest/speciality-individual-guest.component';
import { TalentBudgetIndividualGuestComponent } from './client-post-job-guest-individual/talent-budget-individual-guest/talent-budget-individual-guest.component';
import { DisciplinesIndividualGuestComponent } from './client-post-job-guest-individual/disciplines-individual-guest/disciplines-individual-guest.component';
import { DraftedJobsComponent } from './client-post-job/drafted-jobs/drafted-jobs.component';
import { ViewJobComponent } from './client-post-jobs/view-job/view-job.component';
import { ViewJobPostingComponent } from './client-post-job/view-job-posting/view-job-posting.component';
import { FilterComponent } from './common/filter/filter.component';
import { ClientLeftSidebarGuestComponent } from './common/client-left-sidebar-guest/client-left-sidebar-guest.component';
import { ClientSettingsSidebarComponent } from './common/client-settings-sidebar/client-settings-sidebar.component';
import { ClientDashboardComponent } from './client-dashboard/client-dashboard.component';
import { TermsOfServicesComponent } from './view/terms-of-services/terms-of-services.component';
import { ClientForgotPasswordComponent } from './view/client-forgot-password/client-forgot-password.component';

// end agency profile
@NgModule({
  declarations: [
    AppComponent,
    SignupUserComponent,
    HeaderComponent,
    ClientSettingsSidebarComponent,
    FooterComponent,
    UserProfileComponent,
    HomeLoginComponent,
    SignupTalentComponent,
    TalentProfileComponent,
    UserLoginComponent,
    UserForgotPasswordComponent,
    UserResetPasswordComponent,
    ClientHeaderComponent,
    LeftSidebarComponent,
    RightSidebarComponent,
    PostTitleComponent,
    ChooseDisciplineComponent,
    TalentHeaderComponent,
    TalentSidebarComponent,
        ClientInfoComponent,
    ChooseSpecialityComponent,
    HomePageComponent,
    HomeHeaderComponent,
    ChooseServicesComponent,
    EducationComponent,
    LicensesComponent,
    SkillsComponent,
    AccomplishmentsComponent,
    ExperienceComponent,
    SignupUserEmailComponent,
    ProfileDetailsComponent,
    VisibilityPreferencesComponent,
    ChooseSectorsComponent,
    TalentLoginComponent,
    EmailExistComponent,
    LinkedinTalentComponent,
    LinkedinClientComponent,
    TalentDashboardComponent,
    TalentDbHeaderComponent,
    GettingStartedComponent,
    VisibilityTalentPreferencesComponent,
    TalentPreferencesComponent,
    ReviewPostComponent,
    TalentRightSidebarComponent,
    ClientPostJobsComponent,
    ClientDbHeaderComponent,
    FilterSingleComponent,
    DisciplinesComponent,
    PostReviewComponent,
    ProjectTitleComponent,
    SectorsComponent,
    ServicesComponent,
    SpecialityComponent,
    TalentBudgetComponent,
    ClientLeftSidebarComponent,
    ContactInfoComponent,
    TalentSettingsSidebarComponent,
    IdentifyVerificationComponent,
    PasswordSecurityComponent,
    NotificationSettingsComponent,
    ProfileSettingsComponent,
    ViewProfileComponent,
    MyProfileComponent,
    IntroHeaderComponent,
    IntroPageComponent,
    AboutUsComponent,
    PrivacyPolicyComponent,
    ReferralSignupComponent,
    ReferralDbComponent,
    ReferralApplyComponent,
    ReferralLoginComponent,
    ReferralForgetPasswordComponent,
    ReferralResetPasswordComponent,
    ReferralHeaderComponent,
    LinkedinReferralComponent,
    ReferralTermsComponent,
    ReferralPolicyComponent,
    CreateAgencyProfileComponent,
    CreateAgencySidebarComponent,
    Page404Component,
    CreateAgencyComponent,
    ProfileSettingsSidebarComponent,
    ConfirmDialogComponent,
    AgencyDisciplinesComponent,
    AgencySpecialityComponent,
    AgencyServicesComponent,
    AgencySkillsComponent,
JobListingComponent ,
    GettingStartedGuestComponent ,
    PostTitleGuestComponent
,
    ClientPasswordComponent,

    ReviewPostGuestComponent ,
    TalentPreferenceGuestComponent ,
    VisibilityPreferencesGuestComponent,
    VisibilityTalentPreferencesGuestComponent,
    TalentBudgetIndividualGuestComponent,
    SpecialityIndividualGuestComponent,
    ServicesIndividualGuestComponent,
    SectorsIndividualGuestComponent,
    ProjectTitleIndividualGuestComponent,
    PostReviewIndividualGuestComponent,
        DisciplinesIndividualGuestComponent,
        DraftedJobsComponent,
        ViewJobComponent,
        ViewJobPostingComponent,
        FilterComponent
,
        ClientLeftSidebarGuestComponent,
        ClientDashboardComponent,
        TermsOfServicesComponent,
        ClientForgotPasswordComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ParticlesModule,
    BrowserAnimationsModule,
    MatRadioModule,
    MatProgressBarModule,
    MatTabsModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatSlideToggleModule,
    NgxDropzoneModule,
    TagInputModule,
    MatCheckboxModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    MatSnackBarModule,
    FormsModule,
    ReactiveFormsModule,
    CarouselModule,
    MatIconModule,
    NgxSliderModule,
    MatProgressSpinnerModule,
    SelectDropDownModule,
    MatNativeDateModule,
    MatMomentDateModule,
    MatExpansionModule,
    NgxIntlTelInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatCarouselModule,
    PlyrModule,
    MatDialogModule,
    MatButtonModule,
    NgMultiSelectDropDownModule.forRoot()

    
    
    // LinkedInSdkModule,
    // NgxLinkedinModule.forRoot({
    //   clientId: '788qylu3jxdsf3'
    // })
  ],
  providers: [{provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},{ provide: HTTP_INTERCEPTORS, useClass: Service, multi: true },DatePipe,UserGuard,MyProfieGuard],
  entryComponents : [ConfirmDialogComponent],
  bootstrap: [AppComponent],
  
})
export class AppModule { }
