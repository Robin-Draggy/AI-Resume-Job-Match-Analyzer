export interface CompareResponse {
  original: Analysis;
  tailored: {
    resume: Resume;
    analysis: Analysis;
  };
  improvement: {
    scoreIncrease: number;
    newlyMatchedSkills: string[];
  };
}

export interface Analysis {
  matchScore: number;
  matchedSkills: string[];
  missingSkills: string[];
  stats: {
    totalMatched: number;
    totalRequired: number;
    weightedMatched: number;
    weightedTotal: number;
  };
}

export interface Resume {
  summary: string;
  experience: {
    title: string;
    company: string;
    dates: string;
    achievements: string[];
  }[];
  skills: string[];
}