const skillWeights = {
  react: 3,
  typescript: 3,
  javascript: 3,
  redux: 2,
  "context api": 2,
  zustand: 2,
  css: 2,
  html: 2,
  api: 2,
  git: 1,
  github: 1,
};

const getWeight = (skill) => skillWeights[skill] || 1;

module.exports = { skillWeights, getWeight };