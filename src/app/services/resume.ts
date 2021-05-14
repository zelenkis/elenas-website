export interface IResume {
    basics: IBasics;
    roles:IRoles[];
    projects: IProjects[];
    education: IEducation[];
    skills: ISkills[];
    languages: ILanguages[];

}

export interface IBasics {
    name: string;
    currentRole: string;
    picture: string;
    contacts: IContacts[];
    website: string;
    summary: string;
    location: ILocation;
    aboutText: IAboutText;
}

export interface IContacts{
    title:string;
    url: string;
    account: string;
    icon: string;
}


export interface ILocation{
    city:string;
    country: string;
    countryCode: string;
}

export interface IAboutText{
    paragraphs: string[];
}


export interface IRoles {
    company: string;
    position: string;
    companyWebsite: string;
    startDate: string;
    endDate: string;
    summary: string;
}


export interface IProjects{
    title: string;
    description: string;
    imageUrl: string;
    URL: string;
    gitHubUrl: string;
}

export interface IEducation{
    institution: string;
    field: string;
    degree: string;
    startDate: string;
    endDate: string;
    courses: string[];
}

export interface ISkills{
    title: string;
    icon: string;
}

export interface ILanguages{
    language: string;
    fluency: string;
}

  