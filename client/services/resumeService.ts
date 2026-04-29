const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export interface CompareResponse {
  success: boolean;
  data: {
    original: {
      matchScore: number;
      matchedSkills: string[];
      missingSkills: string[];
      stats: {
        totalMatched: number;
        totalRequired: number;
        weightedMatched: number;
        weightedTotal: number;
      };
    };
    tailored: {
      resume: {
        success: boolean;
        summary: string;
        experience: Array<{
          title: string;
          company: string;
          dates: string;
          achievements: string[];
        }>;
        skills: string[];
      };
      analysis: {
        matchScore: number;
        matchedSkills: string[];
        missingSkills: string[];
        stats: {
          totalMatched: number;
          totalRequired: number;
          weightedMatched: number;
          weightedTotal: number;
        };
      };
    };
    improvement: {
      scoreIncrease: number;
      newlyMatchedSkills: string[];
    };
  };
  message: string;
  statusCode: number;
}

export const resumeService = {
  async compare(resume: File, jobDescription: string): Promise<CompareResponse> {
    const formData = new FormData();
    formData.append("resume", resume);
    formData.append("jobDescription", jobDescription);

    try {
      const response = await fetch(`${API_BASE_URL}/api/v1/resume/compare`, {
        method: "POST",
        body: formData,
        // Don't set Content-Type header - browser will set it with boundary for FormData
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
      }

      const result = await response.json();
      
      if (!result.success) {
        throw new Error(result.message || 'Analysis failed');
      }

      return result;
    } catch (error) {
      console.error("Error comparing resume:", error);
      throw error;
    }
  }
};