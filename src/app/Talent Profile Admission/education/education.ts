
export class QualificationsModel {
    education: Array<EducationModel>;
    licenses: Array<LicensesModel>;
}
export class EducationModel {
    school_name: string;
    degree: string;
    field_of_study: string;
    start_date: string;
    end_date: string;
    grade: string;
    documents: [];
    activities: string;
    schoolNameValidation : boolean;
    degreeValidation : boolean;
    fieldOfStudyValidation : boolean;
    startDateValidation : boolean;
    endDateValidation : boolean;
    documentValidation : boolean;
    endDateLessValidation : boolean;
    expectedGraduation : boolean = false;
    startMinDate: any = new Date(new Date().getFullYear()-100, 0, 1);
    startMaxDate: any = new Date();
    endMinDate: any = new Date(new Date().getFullYear()-100, 0, 1);
    endMaxDate: any = new Date();
}

export class LicensesModel {
    certificate_name: string;
    certification_authority: string;
    license_no: string;
    is_license_expire: boolean = true;
    start_month: string;
    start_year: string;
    end_month: string;
    end_year: string;
    from: string;
    year: string;
    certification_url: string;
    documents: [];
    certificateNameValidation : boolean;
    certificationUrlValidation : boolean;
    documentValidation : boolean;
    startMonthValidation : boolean;
    startYearValidation : boolean;
    endMonthValidation : boolean;
    endYearValidation : boolean;
}