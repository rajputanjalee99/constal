
export class AccomplishmentsModel {
  publications: Array<PublicationsModel>;
  courses: Array<CoursesModel>;
  projects: Array<ProjectsModel>;
  // awards: AwardsModel;
  awards: Array<AwardsModel>;
  languages: LanguagesModel;
  // organizations: Array<OrganizarionModel>;
  organizations: Array<OrganizationsModel>;
}
export class PublicationsModel {
  title : string;
  publisher : string;
  publish_date : string;
  authors : any = [];
  publication_url : string;
  titleValidation : boolean;
  publicationUrlValidation : boolean;
}
export class CoursesModel {
  course_name :string;
  start_date : string;
  end_date : string;
  associated_with : string;
  courseValidation : boolean;
  endDateLessValidation : boolean;
}

export class ProjectsModel{
project_name : string;
start_month : number;
start_year : number;
end_month : number;
end_year : number;
team_members :any = [];
associated_with : string;
project_url : string;
description : string;
media :  any = [];
projectNameValidation : boolean;
endMonthValidation : boolean;
endYearValidation : boolean;
is_currently_working : boolean = false;
projectUrlValidation : boolean;
}

export class AwardsModel {
  title : string;
  associated_with : string;
  issuer : string;
  start_month : number;
  start_year : number;
  end_month : number;
  end_year : number;
  is_currently_working : string;
  description : string;
  media : any = [];
  titleValidation : boolean;
  issuerValidation : boolean;
}

export class LanguagesModel {
  english_proficiency : string;
  other_language : any = [];
  englishProficiencyValidation : boolean;
}

export class OrganizarionModel  {
  organization: string;
  position_helds : string;
  occupation : string;
  membership_ongoing: boolean = false;
  start_month : number;
  start_year : number;
  end_month : number;
  end_year : number;
  additional_note :string;
  organizationValidation : boolean;
  endMonthValidation : boolean;
  endYearValidation : boolean;
}

export class OrganizationsModel  {
  organization: string;
  position_helds : string;
  occupation : string;
  membership_ongoing: string;
  start_month : number;
  start_year : number;
  end_month : number;
  end_year : number;
  additional_note :string;
}

export class MediaModel{
  type : string;
  url : string;
}

export class LanguageModel{
  language : string;
  proficiency : string;
  otherLanguageValidation : boolean;
  otherProficiencyValidation : boolean;
}
