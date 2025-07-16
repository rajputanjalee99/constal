export class ExperienceModel {
    work_record: Array<WorkRecordModel>;
    // recieved_recommendations: RecievedRecommendationsModel;
    recieved_recommendations: Array<RecievedRecommendationsModel>;
    level_of_talent: string;
    regional_experience_none: boolean;
    regional_experience:any = [];
    regionalExperienceValidation: boolean;
}
export class WorkRecordModel{
    title: string;
    employment_type: string;
    company_name: string;
    start_month: number;
    start_year: number;
    end_month: number;
    end_year: number;
    currently_working: boolean;
    location: string;
    description: string;
    industry: string;
    media: [];
    titleValidation : boolean;
    employmentTypeValidation : boolean;
    companyNameValidation : boolean;
    endMonthValidation : boolean;
    endYearValidation : boolean;
}
export class RecievedRecommendationsModel{
    person_name: string;
    relationship: string;
    position_time: string;
    recommendations: string;
    talent_company_name: string;
    talent_position: string;
    personNameValidation : boolean;
    recommendationsValidation : boolean;
}
