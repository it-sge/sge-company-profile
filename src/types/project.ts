export interface EquipmentItem {
  name: string;
  type: string;
  quantity: string;
  image: string;
}

export interface TimelineItem {
  step: string;
  icon: string;
}

export interface TechSpecItem {
  label: string;
  value: string;
}

export interface ProjectContentData {
  quickStats: {
    solarPanels: string;
    inverters: string;
    system: string;
    roi: string;
    co2Reduction: string;
  };
  overview: {
    challenge: string;
    solution: string;
    result: string;
  };
  projectInfo: {
    client: string;
    industry: string;
    projectType: string;
    installation: string;
    duration: string;
    epcContractor: string;
    warranty: string;
    monitoring: string;
  };
  equipment: EquipmentItem[];
  technicalSpecs: TechSpecItem[];
  beforeAfter: {
    before: string;
    after: string;
  };
  timeline: TimelineItem[];
  performance: {
    annualEnergy: string;
    monthlySaving: string;
    carbonReduction: string;
    equivalentTrees: string;
  };
  whyItMatters: string[];
  testimonial: {
    quote: string;
    name: string;
    title: string;
    company: string;
    avatar: string;
  };
  map: {
    address: string;
    coords: string;
    city: string;
    province: string;
  };
  gallery?: string[];
}

export const defaultProjectContentData: ProjectContentData = {
  quickStats: { solarPanels: "", inverters: "", system: "", roi: "", co2Reduction: "" },
  overview: { challenge: "", solution: "", result: "" },
  projectInfo: { client: "", industry: "", projectType: "", installation: "", duration: "", epcContractor: "Sun Global Energi", warranty: "", monitoring: "" },
  equipment: [],
  technicalSpecs: [],
  beforeAfter: { before: "", after: "" },
  timeline: [],
  performance: { annualEnergy: "", monthlySaving: "", carbonReduction: "", equivalentTrees: "" },
  whyItMatters: [],
  testimonial: { quote: "", name: "", title: "", company: "", avatar: "" },
  map: { address: "", coords: "", city: "", province: "" },
  gallery: []
};
