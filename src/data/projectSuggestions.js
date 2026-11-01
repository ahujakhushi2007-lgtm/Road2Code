// Project ideas shown under a roadmap step, keyed by the step's exact `topic` from roadmaps.js.
// Steps without an entry simply show no ideas.
export const projectSuggestions = {
  // frontend
  'HTML & CSS': ['Personal portfolio page', 'Recipe card layout', 'Pricing table'],
  JavaScript: ['Calculator', 'To-Do App', 'Weather App'],
  React: ['Movie search app', 'Notes app with localStorage', 'Expense tracker'],
  'Tailwind CSS': ['Landing page redesign', 'Dashboard UI kit', 'Pricing page'],
  TypeScript: ['Type-safe todo app', 'Form validator', 'Small utility library'],
  'REST APIs & Fetch': ['GitHub profile finder', 'Currency converter', 'Quote generator'],
  'Next.js': ['Blog with static pages', 'Product catalog site', 'Personal portfolio v2'],

  // backend
  'Python or Java': ['Command-line to-do list', 'Simple text adventure', 'File organizer script'],
  'Node.js & Express': ['REST API for a notes app', 'URL shortener', 'Simple chat server'],
  'SQL Databases': ['Library management schema', 'Blog database design', 'Inventory tracker'],
  MongoDB: ['User profile store', 'Product catalog API', 'Comment system backend'],
  'REST API Design': ['Bookstore API', 'Task manager API', 'Movie ratings API'],
  'Authentication & JWT': ['Login system with protected routes', 'Password reset flow', 'Role-based admin panel'],
  'Docker & Deployment': ['Containerize a small API', 'Multi-service docker-compose app', 'Deploy a portfolio site'],
  'System Design Basics': ['Design a URL shortener at scale', 'Design a chat app backend', 'Design a rate limiter'],

  // aiml
  Python: ['Command-line to-do list', 'Simple text adventure', 'File organizer script'],
  'NumPy & Pandas': ['CSV data cleaner', 'Sales data analysis', 'Student grade calculator'],
  'Machine Learning (Scikit-learn)': ['House price predictor', 'Spam email classifier', 'Iris flower classifier'],
  'Data Visualization': ['COVID trends dashboard', 'Weather data charts', 'Personal budget visualizer'],
  'Deep Learning (PyTorch)': ['Handwritten digit recognizer', 'Image classifier', 'Simple neural net from scratch'],
  'Natural Language Processing': ['Sentiment analyzer', 'Text summarizer', 'Chatbot with intents'],
  'MLOps & Deployment': ['Deploy a model with an API', 'Model monitoring dashboard', 'Batch prediction pipeline'],

  // devops
  'Linux & Bash': ['Backup automation script', 'Server health check script', 'Log file analyzer'],
  Docker: ['Containerize a full-stack app', 'Multi-container app with docker-compose', 'Custom base image'],
  Kubernetes: ['Deploy a sample app to a local cluster', 'Autoscaling demo', 'Rolling update walkthrough'],
  'CI/CD (GitHub Actions)': ['Auto-deploy a static site', 'Automated test pipeline', 'Docker image build & push workflow'],
  'AWS / Cloud Basics': ['Host a static site on S3', 'Serverless function with Lambda', 'Simple EC2 deployment'],
  'Terraform (Infrastructure as Code)': ['Provision an EC2 instance', 'S3 bucket + policy setup', 'Multi-environment config'],
  'Monitoring (Grafana + Prometheus)': ['Monitor a sample app\'s metrics', 'Custom Grafana dashboard', 'Alerting rule setup'],

  // android
  'Java or Kotlin': ['Console-based quiz app', 'Simple calculator', 'Unit converter'],
  'XML Layouts & UI': ['Login screen UI', 'Profile card layout', 'Settings screen'],
  'Jetpack Compose': ['To-do list app', 'Weather app UI', 'Notes app'],
  'Room Database': ['Offline notes app', 'Expense tracker with local storage', 'Habit tracker'],
  'Retrofit & APIs': ['Movie browser app', 'News reader app', 'Recipe finder app'],
  Firebase: ['Realtime chat app', 'Auth-based todo app', 'Photo sharing app'],

  // dsa
  'Arrays & Strings': ['Palindrome checker', 'Anagram grouper', 'Two-sum solver'],
  'Linked Lists': ['Reverse a linked list visualizer', 'LRU cache', 'Music playlist (linked list)'],
  'Stacks & Queues': ['Balanced parentheses checker', 'Browser history simulator', 'Undo/redo feature'],
  'Trees & Binary Search Trees': ['BST visualizer', 'File system tree explorer', 'Autocomplete with a trie'],
  'Recursion & Backtracking': ['Sudoku solver', 'N-Queens visualizer', 'Maze solver'],
  'Dynamic Programming': ['Knapsack solver', 'Longest common subsequence tool', 'Coin change calculator'],
  Graphs: ['Shortest path visualizer', 'Social network friend suggester', 'Maze pathfinder'],

  // full-stack
  'HTML, CSS & JavaScript': ['Landing page with a contact form', 'Image gallery with filters', 'Pomodoro timer'],
  'MongoDB & Mongoose': ['Bookmark manager API', 'Blog with comments', 'URL shortener with click stats'],
  'Testing with Jest': ['Test a calculator module', 'Test a to-do reducer', 'Test an Express route'],
  'Deployment (Vercel & Render)': ['Deploy your portfolio', 'Deploy a MERN app', 'Add a custom domain'],

  // data science
  'Statistics & Probability': ['Dice roll simulation', 'A/B test calculator', 'Class survey analysis'],
  'SQL for Data Analysis': ['Sales report queries', 'IPL stats explorer', 'Library loans analysis'],
  'Exploratory Data Analysis': ['Netflix titles EDA', 'Cricket stats EDA', 'City air quality EDA'],
  'Dashboards with Streamlit': ['Expense dashboard', 'Stock price viewer', 'Weather trends app'],

  // cloud
  'Linux & Networking Basics': ['Home web server on a Raspberry Pi', 'Network scan report', 'SSH key setup guide'],
  'Cloud Concepts': ['Compare cloud pricing for one app', 'Architecture diagram of a web app', 'Static site on S3'],
  'AWS Core Services': ['Static site with S3 and CloudFront', 'Web server on EC2', 'IAM users and policies'],
  'Serverless with AWS Lambda': ['Contact form backend', 'Image resizer', 'Scheduled email reminder'],
  'Cloud Security & Cost': ['Billing alarm setup', 'Least-privilege IAM review', 'Monthly cost report'],

  // cybersecurity
  'Networking Fundamentals': ['Subnet calculator', 'Packet capture with Wireshark', 'Map your home network'],
  'Python for Security': ['Port scanner', 'Password strength checker', 'Login attempt log analyzer'],
  'Web Security (OWASP Top 10)': ['Fix a vulnerable login form', 'XSS demo and fix', 'Security headers checker'],
  'Cryptography Basics': ['Caesar and Vigenère cipher tool', 'File hash checker', 'Password hashing demo'],
  'Ethical Hacking with Kali Linux': ['Practice lab with Metasploitable', 'Write a pentest report', 'Audit your own Wi-Fi router'],
  'Capture the Flag Practice': ['Solve 10 picoCTF challenges', 'Write CTF walkthroughs', 'Build a mini CTF for friends'],
  'Security+ Certification': ['Flashcards for each exam domain', 'Practice exam log', 'Study plan tracker'],

  // ui/ux
  'Design Principles': ['Redesign a college notice page', 'Before and after UI critique', 'Gestalt principles poster'],
  'Figma Fundamentals': ['Mobile login screen', 'Recipe app screens', 'Event poster'],
  'Typography & Colour': ['Type scale specimen', 'Colour palette for a brand', 'Dark mode for an existing app'],
  'User Research': ['Interview 5 classmates', 'Survey and persona', 'Usability test report'],
  'Wireframes & Prototypes': ['Clickable food-ordering prototype', 'Onboarding flow', 'Checkout flow'],
  'Design Systems': ['Button and input library', 'Spacing and type tokens', 'Component documentation page'],
  Accessibility: ['Accessibility audit of a website', 'Colour contrast fixes', 'Keyboard-only navigation test'],
  'Portfolio & Case Studies': ['Three case studies', 'Personal portfolio site', 'Process walkthrough video'],

  // game development
  'C# Basics': ['Number-guessing game', 'Student grade calculator', 'Text adventure'],
  'Unity Fundamentals': ['Rolling ball game', 'Clicker game', 'Main menu and scenes'],
  'Game Physics & Collisions': ['Slingshot physics game', 'Platformer jump physics', 'Bowling game'],
  '2D Games': ['Flappy Bird clone', 'Top-down shooter', 'Endless runner'],
  '3D Games': ['First-person maze', 'Racing game prototype', 'Third-person explorer'],
  'Game & Level Design': ['Design three levels on paper', 'Playtest notes', 'Difficulty curve chart'],
  'Godot Engine': ['Pong in Godot', '2D platformer', 'Port a Unity game to Godot'],
  'Publishing on itch.io': ['Publish a game jam entry', 'Game page with screenshots', 'Collect player feedback'],
}
