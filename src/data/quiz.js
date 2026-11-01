// Career quiz. Each option adds one point to every track listed in its `goals`.
// The three tracks with the most points are shown as matches.
export const quizQuestions = [
  {
    id: 1,
    prompt: 'What sounds most fun to build?',
    options: [
      { text: 'A website people use every day', goals: ['frontend', 'fullstack', 'uiux'] },
      { text: 'The server and database behind an app', goals: ['backend', 'fullstack', 'cloud'] },
      { text: 'Something that learns from data', goals: ['aiml', 'datascience'] },
      { text: 'A game or a mobile app', goals: ['gamedev', 'android'] },
    ],
  },
  {
    id: 2,
    prompt: 'Which school subject did you enjoy most?',
    options: [
      { text: 'Art or design', goals: ['uiux', 'frontend', 'gamedev'] },
      { text: 'Maths', goals: ['aiml', 'dsa', 'datascience'] },
      { text: 'Physics or electronics', goals: ['gamedev', 'devops', 'android'] },
      { text: 'Logic puzzles and computers', goals: ['dsa', 'backend', 'cybersecurity'] },
    ],
  },
  {
    id: 3,
    prompt: 'How do you like to work?',
    options: [
      { text: 'Seeing results on screen right away', goals: ['frontend', 'uiux', 'android'] },
      { text: 'Digging into numbers and patterns', goals: ['datascience', 'aiml'] },
      { text: 'Keeping systems fast, safe and running', goals: ['devops', 'cloud', 'cybersecurity'] },
      { text: 'Solving one hard problem at a time', goals: ['dsa', 'backend', 'aiml'] },
    ],
  },
  {
    id: 4,
    prompt: 'Pick a tool you would like to master.',
    options: [
      { text: 'Figma or React', goals: ['uiux', 'frontend'] },
      { text: 'Python and Jupyter notebooks', goals: ['datascience', 'aiml'] },
      { text: 'Docker and AWS', goals: ['devops', 'cloud'] },
      { text: 'Unity or Android Studio', goals: ['gamedev', 'android'] },
    ],
  },
  {
    id: 5,
    prompt: 'What would you do on a free weekend?',
    options: [
      { text: 'Redesign a website I find confusing', goals: ['uiux', 'frontend'] },
      { text: 'Build a full app with login and a database', goals: ['fullstack', 'backend'] },
      { text: 'Look for security flaws in a practice lab', goals: ['cybersecurity', 'cloud'] },
      { text: 'Solve contest problems on LeetCode', goals: ['dsa'] },
    ],
  },
  {
    id: 6,
    prompt: 'Where do you see yourself in five years?',
    options: [
      { text: 'Building products at a startup', goals: ['fullstack', 'frontend', 'android'] },
      { text: 'Working with data at a big company', goals: ['datascience', 'aiml'] },
      { text: 'Running cloud infrastructure or security', goals: ['cloud', 'devops', 'cybersecurity'] },
      { text: 'Cracking interviews at top tech companies', goals: ['dsa', 'backend'] },
    ],
  },
]
