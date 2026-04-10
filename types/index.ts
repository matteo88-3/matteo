export type Services = {
    serviceNo: string;
    serviceTitle: string;
    serviceSlogan: string;
    serviceImage: string;
    serviceLocation: string;
}


// About Us type
export type AboutUs = {
    exists: boolean;
    aboutus: string | null;
    aboutusImage: string | null;
};

// Mission & Vision type
export type MissionVision = {
    exists: boolean;
    mission: string | null;
    vision: string | null;
};

// Why Choose Us item type
export type WhyChooseItem = {
    id?: string | null;
    reason: string;
};

// Our Service item type
export type OurServiceItem = {
    id?: string | null;
    name: string;
    description: string;
};

// Managing Team member type
export type TeamMember = {
    id?: string | null;
    name: string;
    image: string | null;
    description: string;
    email: string;
    phoneNumber: string;
    status: string;
};

// Industry type
export type Industry = {
    id?: string | null;
    name: string;
};

// Footer contact type
export type FooterContact = {
    exists: boolean;
    id?: string | null;
    email?: string | null;
    phoneNumber?: string | null;
    location?: string | null;
};

// Complete Service Detail type
export type ServiceDetail = {
    serviceNo: string;
    serviceTitle: string;
    serviceSlogan: string;
    serviceDescription: string;
    serviceImage: string;
    serviceLocation: string;
    aboutUs: AboutUs;
    mission: MissionVision;
    whyChooseUs: WhyChooseItem[];
    services: OurServiceItem[];
    managingTeam: TeamMember[];
    industries: Industry[];
    footer: FooterContact;
};


export type Job = {
  id: number
  title: string
  location: string
  type: 'Full-time' | 'Part-time' | 'Contract' | 'Remote' | 'Internship'
  experience: string
  salary: string
  postedDate: string
  deadline: string
  description: string
  requirements: string[]
  responsibilities?: string[]
  benefits: string[]
  company: {
    name: string
    logo: string
    industry: string
    description?: string
    website?: string
    size?: string
    founded?: string
    rating?: number
    reviews?: number
  }
  skills?: string[]
  urgent?: boolean
  featured?: boolean
  remote?: boolean
  equity?: boolean
}


export type JobCareer = {
  cjId: string;
  job_name: string;
  jobDescription: string;
  responsibilities: [];
  requirements: [];
  benefits: [];
  skills: [];
  jobType: string;
  location: string;
  salary_range: string;
  salaryCurrency: string;
  jobCategory: string;
  jobexperiency: string;
  deadline: string;
  postedDate:string
  jobstatus: string;
  status: string;
  company: {
    name: string
    logo: string
    industry: string
    description: string
    website: string
    size: string
    location: string
  }
}