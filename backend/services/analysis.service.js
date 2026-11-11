
const SKILLS = {
  "JavaScript": ["javascript", "js"],
  "TypeScript": ["typescript"],
  "Python": ["python"],
  "Java": ["java"],
  "C#": ["c#"],
  "C++": ["c++"],
  "React": ["react", "react.js", "reactjs"],
  "Angular": ["angular"],
  "Vue": ["vue", "vue.js", "vuejs"],
  "Node.js": ["node.js", "nodejs", "node"],
  "Express": ["express.js", "expressjs", "express"],
  "Django": ["django"],
  "FastAPI": ["fastapi"],
  "HTML": ["html", "html5"],
  "CSS": ["css", "css3"],
  "Bootstrap": ["bootstrap"],
  "Tailwind CSS": ["tailwind", "tailwind css"],
  "SQL": ["sql"],
  "PostgreSQL": ["postgresql", "postgres"],
  "MySQL": ["mysql"],
  "MongoDB": ["mongodb", "mongo"],
  "SQLite": ["sqlite"],
  "Prisma": ["prisma"],
  "Git": ["git"],
  "GitHub": ["github"],
  "Docker": ["docker"],
  "Kubernetes": ["kubernetes", "k8s"],
  "AWS": ["aws", "amazon web services"],
  "Azure": ["azure"],
  "REST APIs": ["rest api", "restful api", "rest apis"],
  "GraphQL": ["graphql"],
  "CI/CD": ["ci/cd", "continuous integration"],
  "Jest": ["jest"],
  "Playwright": ["playwright"],
  "Pytest": ["pytest"],
  "Figma": ["figma"]
};

function escapeRegex(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function containsSkill(text, aliases) {
  return aliases.some((alias) => {
    const pattern = new RegExp(
      `(^|[^a-z0-9])${escapeRegex(alias)}(?=$|[^a-z0-9])`,
      "i"
    );

    return pattern.test(text);
  });
}

export function extractSkills(text) {
  if (typeof text !== "string") {
    return [];
  }

  return Object.entries(SKILLS)
    .filter(([, aliases]) => containsSkill(text, aliases))
    .map(([skill]) => skill);
}

export function analyzeCV(cvText, jobDescription) {
  const cvSkills = extractSkills(cvText);
  const requiredSkills = extractSkills(jobDescription);

  const matchedSkills = requiredSkills.filter(
    (skill) => cvSkills.includes(skill)
  );

  const missingSkills = requiredSkills.filter(
    (skill) => !cvSkills.includes(skill)
  );

  const matchPercentage = requiredSkills.length
    ? Math.round(
        (matchedSkills.length / requiredSkills.length) * 100
      )
    : null;

  return {
    matchPercentage,
    cvSkills,
    requiredSkills,
    matchedSkills,
    missingSkills,
    recommendations: missingSkills.map(
      (skill) => `Consider developing or demonstrating ${skill} skills.`
    )
  };
}
