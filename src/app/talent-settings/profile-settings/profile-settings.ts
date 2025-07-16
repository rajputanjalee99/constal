export class QualificationsModel {
    education: Array<EducationModel>;
    licenses: Array<LicensesModel>;
}

export class AccomplishmentsModel {
    languages: LanguagesModel;
}

export class EducationModel {
    school_name: string;
    degree: string;
    field_of_study: string;
    start_date: string;
    end_date: string;
    grade: string;
    documents: [];
    expectedGraduation : boolean;
    activities: string;
}

export class LicensesModel {
    certificate_name: string;
    certification_authority: string;
    license_no: string;
    is_license_expire: boolean = true;
    from: string;
    year: string;
    certification_url: string;
    documents: [];
}

export class LanguagesModel {
    english_proficiency : string;
    other_language : any = [];
    englishProficiencyValidation : boolean;
}

export class LanguageModel{
    language : string;
    proficiency : string;
    otherLanguageValidation : boolean;
    otherProficiencyValidation : boolean;
}