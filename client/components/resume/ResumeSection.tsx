interface ResumeSectionProps {
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
}

const ResumeSection = ({ resume }: ResumeSectionProps) => {
  return (
    <div className="resume-section space-y-6">
      {/* Summary */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-3">Professional Summary</h3>
        <p className="text-gray-600 leading-relaxed">{resume.summary}</p>
      </div>

      {/* Experience */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Work Experience</h3>
        <div className="space-y-6">
          {resume.experience.map((exp, idx) => (
            <div key={idx} className="border-l-2 border-blue-200 pl-4">
              <div className="flex justify-between items-start mb-2 flex-wrap gap-2">
                <div>
                  <h4 className="font-semibold text-gray-900">{exp.title}</h4>
                  <p className="text-blue-600 text-sm font-medium">{exp.company}</p>
                </div>
                <span className="text-sm text-gray-500 bg-gray-50 px-2 py-1 rounded">
                  {exp.dates}
                </span>
              </div>
              <ul className="list-disc list-inside space-y-1 mt-2">
                {exp.achievements.map((achievement, achievementIdx) => (
                  <li key={achievementIdx} className="text-gray-600 text-sm">
                    {achievement}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Skills */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-3">Technical Skills</h3>
        <div className="flex flex-wrap gap-2">
          {resume.skills.map((skill) => (
            <span
              key={skill}
              className="px-3 py-1 bg-gray-50 text-gray-700 rounded-full text-sm border border-gray-200"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ResumeSection;