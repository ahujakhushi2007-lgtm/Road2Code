// The ordered steps of each track, keyed by the same `key` used in goals.js.
// `tag` is the DEV.to tag used to fetch community articles for that step.

// Builds a YouTube search link, so a video resource never points to a deleted video.
const search = (query) => `https://www.youtube.com/results?search_query=${encodeURIComponent(query)}`

export const roadmaps = {
  frontend: {
    title: 'Frontend Developer',
    steps: [
      { id: 1, topic: 'HTML & CSS', tag: 'css', resources: [
        { type: 'video', label: 'HTML Full Course', url: 'https://youtu.be/pQN-pnXPaVg' },
        { type: 'docs', label: 'MDN HTML Docs', url: 'https://developer.mozilla.org/en-US/docs/Web/HTML' },
      ] },
      { id: 2, topic: 'JavaScript', tag: 'javascript', resources: [
        { type: 'video', label: 'JS in One Video', url: 'https://youtu.be/hdI2bqOjy3c' },
        { type: 'docs', label: 'MDN JS Docs', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript' },
      ] },
      { id: 3, topic: 'React', tag: 'react', resources: [
        { type: 'video', label: 'React Full Course', url: 'https://youtu.be/bMknfKXIFA8' },
        { type: 'docs', label: 'React Docs', url: 'https://react.dev' },
      ] },
      { id: 4, topic: 'Tailwind CSS', tag: 'tailwindcss', resources: [
        { type: 'video', label: 'Tailwind Crash Course', url: 'https://youtu.be/UBOj6rqRUME' },
        { type: 'docs', label: 'Tailwind Docs', url: 'https://tailwindcss.com/docs' },
      ] },
      { id: 5, topic: 'TypeScript', tag: 'typescript', resources: [
        { type: 'video', label: 'TypeScript Full Course', url: 'https://youtu.be/30LWjhZzg50' },
        { type: 'docs', label: 'TypeScript Docs', url: 'https://www.typescriptlang.org/docs/' },
      ] },
      { id: 6, topic: 'Git & GitHub', tag: 'git', resources: [
        { type: 'video', label: 'Git Tutorial', url: 'https://youtu.be/apGV9Kg7ics' },
        { type: 'docs', label: 'GitHub Docs', url: 'https://docs.github.com' },
      ] },
      { id: 7, topic: 'REST APIs & Fetch', tag: 'api', resources: [
        { type: 'video', label: 'APIs for Beginners', url: 'https://youtu.be/GZvSYJDk-us' },
        { type: 'docs', label: 'Fetch API MDN', url: 'https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API' },
      ] },
      { id: 8, topic: 'Next.js', tag: 'nextjs', resources: [
        { type: 'video', label: 'Next.js Full Course', url: 'https://youtu.be/ZVnjOPwW4ZA' },
        { type: 'docs', label: 'Next.js Docs', url: 'https://nextjs.org/docs' },
      ] },
    ],
  },
  backend: {
    title: 'Backend Developer',
    steps: [
      { id: 1, topic: 'Python or Java', tag: 'python', resources: [
        { type: 'video', label: 'Python Full Course', url: 'https://youtu.be/_uQrJ0TkZlc' },
        { type: 'docs', label: 'Python Docs', url: 'https://docs.python.org/3/' },
      ] },
      { id: 2, topic: 'Node.js & Express', tag: 'node', resources: [
        { type: 'video', label: 'Node.js Crash Course', url: 'https://youtu.be/fBNz5xF-Kx4' },
        { type: 'docs', label: 'Node.js Docs', url: 'https://nodejs.org/en/docs' },
      ] },
      { id: 3, topic: 'SQL Databases', tag: 'sql', resources: [
        { type: 'video', label: 'SQL Full Course', url: 'https://youtu.be/HXV3zeQKqGY' },
        { type: 'docs', label: 'PostgreSQL Docs', url: 'https://www.postgresql.org/docs/' },
      ] },
      { id: 4, topic: 'MongoDB', tag: 'mongodb', resources: [
        { type: 'video', label: 'MongoDB Tutorial', url: 'https://youtu.be/-56x56UppqQ' },
        { type: 'docs', label: 'MongoDB Docs', url: 'https://www.mongodb.com/docs' },
      ] },
      { id: 5, topic: 'REST API Design', tag: 'api', resources: [
        { type: 'video', label: 'REST API Tutorial', url: 'https://youtu.be/0sOvCWFmrtA' },
        { type: 'docs', label: 'REST API Guide', url: 'https://restfulapi.net' },
      ] },
      { id: 6, topic: 'Authentication & JWT', tag: 'security', resources: [
        { type: 'video', label: 'JWT Auth Tutorial', url: 'https://youtu.be/mbsmsi7l3r4' },
        { type: 'docs', label: 'JWT Docs', url: 'https://jwt.io/introduction' },
      ] },
      { id: 7, topic: 'Docker & Deployment', tag: 'docker', resources: [
        { type: 'video', label: 'Docker Tutorial', url: 'https://youtu.be/fqMOX6JJhGo' },
        { type: 'docs', label: 'Docker Docs', url: 'https://docs.docker.com' },
      ] },
      { id: 8, topic: 'System Design Basics', tag: 'systemdesign', resources: [
        { type: 'video', label: 'System Design Primer', url: 'https://youtu.be/xpDnVSmNFX0' },
        { type: 'docs', label: 'System Design Guide', url: 'https://github.com/donnemartin/system-design-primer' },
      ] },
    ],
  },
  fullstack: {
    title: 'Full-Stack Developer',
    steps: [
      { id: 1, topic: 'HTML, CSS & JavaScript', tag: 'javascript', resources: [
        { type: 'video', label: 'HTML, CSS and JS full course', url: search('html css javascript full course for beginners') },
        { type: 'docs', label: 'MDN Learn Web Development', url: 'https://developer.mozilla.org/en-US/docs/Learn' },
      ] },
      { id: 2, topic: 'React', tag: 'react', resources: [
        { type: 'video', label: 'React Full Course', url: 'https://youtu.be/bMknfKXIFA8' },
        { type: 'docs', label: 'React Docs', url: 'https://react.dev' },
      ] },
      { id: 3, topic: 'Node.js & Express', tag: 'node', resources: [
        { type: 'video', label: 'Node.js Crash Course', url: 'https://youtu.be/fBNz5xF-Kx4' },
        { type: 'docs', label: 'Express Getting Started', url: 'https://expressjs.com/en/starter/installing.html' },
      ] },
      { id: 4, topic: 'MongoDB & Mongoose', tag: 'mongodb', resources: [
        { type: 'video', label: 'MongoDB and Mongoose tutorial', url: search('mongodb mongoose tutorial') },
        { type: 'docs', label: 'Mongoose Docs', url: 'https://mongoosejs.com/docs/' },
      ] },
      { id: 5, topic: 'Authentication & JWT', tag: 'security', resources: [
        { type: 'video', label: 'JWT Auth Tutorial', url: 'https://youtu.be/mbsmsi7l3r4' },
        { type: 'docs', label: 'JWT Docs', url: 'https://jwt.io/introduction' },
      ] },
      { id: 6, topic: 'Git & GitHub', tag: 'git', resources: [
        { type: 'video', label: 'Git Tutorial', url: 'https://youtu.be/apGV9Kg7ics' },
        { type: 'docs', label: 'GitHub Docs', url: 'https://docs.github.com' },
      ] },
      { id: 7, topic: 'Testing with Jest', tag: 'testing', resources: [
        { type: 'video', label: 'Jest testing tutorial', url: search('jest testing tutorial for beginners') },
        { type: 'docs', label: 'Jest Getting Started', url: 'https://jestjs.io/docs/getting-started' },
      ] },
      { id: 8, topic: 'Deployment (Vercel & Render)', tag: 'webdev', resources: [
        { type: 'video', label: 'Deploy a MERN app', url: search('deploy mern app vercel render') },
        { type: 'docs', label: 'Vercel Docs', url: 'https://vercel.com/docs' },
      ] },
    ],
  },
  aiml: {
    title: 'AI/ML Engineer',
    steps: [
      { id: 1, topic: 'Python', tag: 'python', resources: [
        { type: 'video', label: 'Python for ML', url: 'https://youtu.be/rfscVS0vtbw' },
        { type: 'docs', label: 'Python Docs', url: 'https://docs.python.org/3/' },
      ] },
      { id: 2, topic: 'Math (Linear Algebra + Stats)', tag: 'machinelearning', resources: [
        { type: 'video', label: 'Math for ML', url: 'https://youtu.be/1VSZtNYMntM' },
        { type: 'docs', label: 'Khan Academy', url: 'https://www.khanacademy.org/math/linear-algebra' },
      ] },
      { id: 3, topic: 'NumPy & Pandas', tag: 'datascience', resources: [
        { type: 'video', label: 'NumPy Tutorial', url: 'https://youtu.be/QUT1VHiLmmI' },
        { type: 'docs', label: 'Pandas Docs', url: 'https://pandas.pydata.org/docs/' },
      ] },
      { id: 4, topic: 'Machine Learning (Scikit-learn)', tag: 'machinelearning', resources: [
        { type: 'video', label: 'ML with Python', url: 'https://youtu.be/7eh4d6sabA0' },
        { type: 'docs', label: 'Scikit-learn Docs', url: 'https://scikit-learn.org/stable/' },
      ] },
      { id: 5, topic: 'Data Visualization', tag: 'dataviz', resources: [
        { type: 'video', label: 'Matplotlib Tutorial', url: 'https://youtu.be/3Xc3CA655Y4' },
        { type: 'docs', label: 'Matplotlib Docs', url: 'https://matplotlib.org/stable/users/index' },
      ] },
      { id: 6, topic: 'Deep Learning (PyTorch)', tag: 'deeplearning', resources: [
        { type: 'video', label: 'PyTorch Full Course', url: 'https://youtu.be/c36lUUr864M' },
        { type: 'docs', label: 'PyTorch Docs', url: 'https://pytorch.org/docs/stable/index.html' },
      ] },
      { id: 7, topic: 'Natural Language Processing', tag: 'nlp', resources: [
        { type: 'video', label: 'NLP with Python', url: 'https://youtu.be/X2vAabgKiuM' },
        { type: 'docs', label: 'HuggingFace Docs', url: 'https://huggingface.co/docs' },
      ] },
      { id: 8, topic: 'MLOps & Deployment', tag: 'mlops', resources: [
        { type: 'video', label: 'MLOps Tutorial', url: 'https://youtu.be/9BgIDqAzfuA' },
        { type: 'docs', label: 'MLflow Docs', url: 'https://mlflow.org/docs/latest/index.html' },
      ] },
    ],
  },
  datascience: {
    title: 'Data Scientist',
    steps: [
      { id: 1, topic: 'Python', tag: 'python', resources: [
        { type: 'video', label: 'Python for ML', url: 'https://youtu.be/rfscVS0vtbw' },
        { type: 'docs', label: 'Python Tutorial', url: 'https://docs.python.org/3/tutorial/' },
      ] },
      { id: 2, topic: 'Statistics & Probability', tag: 'datascience', resources: [
        { type: 'video', label: 'Statistics for data science', url: search('statistics for data science full course') },
        { type: 'docs', label: 'Khan Academy Statistics', url: 'https://www.khanacademy.org/math/statistics-probability' },
      ] },
      { id: 3, topic: 'SQL for Data Analysis', tag: 'sql', resources: [
        { type: 'video', label: 'SQL for data analysis', url: search('sql for data analysis full course') },
        { type: 'docs', label: 'SQLBolt lessons', url: 'https://sqlbolt.com/' },
      ] },
      { id: 4, topic: 'NumPy & Pandas', tag: 'datascience', resources: [
        { type: 'video', label: 'NumPy Tutorial', url: 'https://youtu.be/QUT1VHiLmmI' },
        { type: 'docs', label: 'Pandas Docs', url: 'https://pandas.pydata.org/docs/' },
      ] },
      { id: 5, topic: 'Data Visualization', tag: 'dataviz', resources: [
        { type: 'video', label: 'Matplotlib Tutorial', url: 'https://youtu.be/3Xc3CA655Y4' },
        { type: 'docs', label: 'Seaborn Docs', url: 'https://seaborn.pydata.org/' },
      ] },
      { id: 6, topic: 'Exploratory Data Analysis', tag: 'datascience', resources: [
        { type: 'video', label: 'EDA with Python', url: search('exploratory data analysis python pandas') },
        { type: 'docs', label: 'Kaggle Learn', url: 'https://www.kaggle.com/learn' },
      ] },
      { id: 7, topic: 'Machine Learning (Scikit-learn)', tag: 'machinelearning', resources: [
        { type: 'video', label: 'ML with Python', url: 'https://youtu.be/7eh4d6sabA0' },
        { type: 'docs', label: 'Scikit-learn Docs', url: 'https://scikit-learn.org/stable/' },
      ] },
      { id: 8, topic: 'Dashboards with Streamlit', tag: 'python', resources: [
        { type: 'video', label: 'Streamlit tutorial', url: search('streamlit tutorial for beginners') },
        { type: 'docs', label: 'Streamlit Docs', url: 'https://docs.streamlit.io/' },
      ] },
    ],
  },
  devops: {
    title: 'DevOps Engineer',
    steps: [
      { id: 1, topic: 'Linux & Bash', tag: 'linux', resources: [
        { type: 'video', label: 'Linux Full Course', url: 'https://youtu.be/sWbUDq4S6Y8' },
        { type: 'docs', label: 'Linux Docs', url: 'https://linux.die.net/man/' },
      ] },
      { id: 2, topic: 'Git & GitHub', tag: 'git', resources: [
        { type: 'video', label: 'Git Tutorial', url: 'https://youtu.be/apGV9Kg7ics' },
        { type: 'docs', label: 'GitHub Docs', url: 'https://docs.github.com' },
      ] },
      { id: 3, topic: 'Docker', tag: 'docker', resources: [
        { type: 'video', label: 'Docker Full Course', url: 'https://youtu.be/fqMOX6JJhGo' },
        { type: 'docs', label: 'Docker Docs', url: 'https://docs.docker.com' },
      ] },
      { id: 4, topic: 'Kubernetes', tag: 'kubernetes', resources: [
        { type: 'video', label: 'Kubernetes Tutorial', url: 'https://youtu.be/X48VuDVv0do' },
        { type: 'docs', label: 'Kubernetes Docs', url: 'https://kubernetes.io/docs/home/' },
      ] },
      { id: 5, topic: 'CI/CD (GitHub Actions)', tag: 'githubactions', resources: [
        { type: 'video', label: 'GitHub Actions Tutorial', url: 'https://youtu.be/R8_veQiYBjI' },
        { type: 'docs', label: 'GitHub Actions Docs', url: 'https://docs.github.com/en/actions' },
      ] },
      { id: 6, topic: 'AWS / Cloud Basics', tag: 'aws', resources: [
        { type: 'video', label: 'AWS Full Course', url: 'https://youtu.be/k1RI5locZE4' },
        { type: 'docs', label: 'AWS Docs', url: 'https://docs.aws.amazon.com' },
      ] },
      { id: 7, topic: 'Terraform (Infrastructure as Code)', tag: 'terraform', resources: [
        { type: 'video', label: 'Terraform Tutorial', url: 'https://youtu.be/l5k1ai_GBDE' },
        { type: 'docs', label: 'Terraform Docs', url: 'https://developer.hashicorp.com/terraform/docs' },
      ] },
      { id: 8, topic: 'Monitoring (Grafana + Prometheus)', tag: 'monitoring', resources: [
        { type: 'video', label: 'Grafana Tutorial', url: 'https://youtu.be/9TJx7QTrTyo' },
        { type: 'docs', label: 'Prometheus Docs', url: 'https://prometheus.io/docs/introduction/overview/' },
      ] },
    ],
  },
  cloud: {
    title: 'Cloud Engineer',
    steps: [
      { id: 1, topic: 'Linux & Networking Basics', tag: 'linux', resources: [
        { type: 'video', label: 'Linux and networking for cloud', url: search('linux networking basics for cloud engineers') },
        { type: 'docs', label: 'Linux Journey', url: 'https://linuxjourney.com/' },
      ] },
      { id: 2, topic: 'Cloud Concepts', tag: 'cloud', resources: [
        { type: 'video', label: 'Cloud computing explained', url: search('cloud computing explained iaas paas saas') },
        { type: 'docs', label: 'What is cloud computing? (AWS)', url: 'https://aws.amazon.com/what-is-cloud-computing/' },
      ] },
      { id: 3, topic: 'AWS Core Services', tag: 'aws', resources: [
        { type: 'video', label: 'EC2, S3 and IAM tutorial', url: search('aws ec2 s3 iam tutorial for beginners') },
        { type: 'docs', label: 'AWS Docs', url: 'https://docs.aws.amazon.com/' },
      ] },
      { id: 4, topic: 'Docker', tag: 'docker', resources: [
        { type: 'video', label: 'Docker Full Course', url: 'https://youtu.be/fqMOX6JJhGo' },
        { type: 'docs', label: 'Docker Docs', url: 'https://docs.docker.com' },
      ] },
      { id: 5, topic: 'Kubernetes', tag: 'kubernetes', resources: [
        { type: 'video', label: 'Kubernetes Tutorial', url: 'https://youtu.be/X48VuDVv0do' },
        { type: 'docs', label: 'Kubernetes Docs', url: 'https://kubernetes.io/docs/home/' },
      ] },
      { id: 6, topic: 'Terraform (Infrastructure as Code)', tag: 'terraform', resources: [
        { type: 'video', label: 'Terraform Tutorial', url: 'https://youtu.be/l5k1ai_GBDE' },
        { type: 'docs', label: 'Terraform Docs', url: 'https://developer.hashicorp.com/terraform/docs' },
      ] },
      { id: 7, topic: 'Serverless with AWS Lambda', tag: 'serverless', resources: [
        { type: 'video', label: 'AWS Lambda tutorial', url: search('aws lambda tutorial for beginners') },
        { type: 'docs', label: 'AWS Lambda Docs', url: 'https://docs.aws.amazon.com/lambda/' },
      ] },
      { id: 8, topic: 'Cloud Security & Cost', tag: 'security', resources: [
        { type: 'video', label: 'Well-Architected Framework', url: search('aws well architected framework explained') },
        { type: 'docs', label: 'AWS Well-Architected', url: 'https://aws.amazon.com/architecture/well-architected/' },
      ] },
    ],
  },
  cybersecurity: {
    title: 'Cybersecurity Analyst',
    steps: [
      { id: 1, topic: 'Networking Fundamentals', tag: 'networking', resources: [
        { type: 'video', label: 'Computer networking course', url: search('computer networking full course') },
        { type: 'docs', label: 'Cloudflare Learning Center', url: 'https://www.cloudflare.com/learning/' },
      ] },
      { id: 2, topic: 'Linux & Bash', tag: 'linux', resources: [
        { type: 'video', label: 'Linux Full Course', url: 'https://youtu.be/sWbUDq4S6Y8' },
        { type: 'docs', label: 'Linux Journey', url: 'https://linuxjourney.com/' },
      ] },
      { id: 3, topic: 'Python for Security', tag: 'python', resources: [
        { type: 'video', label: 'Python for cybersecurity', url: search('python for cybersecurity beginners') },
        { type: 'docs', label: 'Python Tutorial', url: 'https://docs.python.org/3/tutorial/' },
      ] },
      { id: 4, topic: 'Web Security (OWASP Top 10)', tag: 'security', resources: [
        { type: 'video', label: 'OWASP Top 10 explained', url: search('owasp top 10 explained') },
        { type: 'docs', label: 'OWASP Top 10', url: 'https://owasp.org/www-project-top-ten/' },
      ] },
      { id: 5, topic: 'Cryptography Basics', tag: 'cryptography', resources: [
        { type: 'video', label: 'Cryptography basics', url: search('cryptography basics for beginners') },
        { type: 'docs', label: 'What is encryption?', url: 'https://www.cloudflare.com/learning/ssl/what-is-encryption/' },
      ] },
      { id: 6, topic: 'Ethical Hacking with Kali Linux', tag: 'cybersecurity', resources: [
        { type: 'video', label: 'Ethical hacking full course', url: search('ethical hacking full course kali linux') },
        { type: 'docs', label: 'Kali Linux Docs', url: 'https://www.kali.org/docs/' },
      ] },
      { id: 7, topic: 'Capture the Flag Practice', tag: 'ctf', resources: [
        { type: 'video', label: 'picoCTF walkthroughs', url: search('picoctf beginner walkthrough') },
        { type: 'docs', label: 'picoCTF', url: 'https://picoctf.org/' },
      ] },
      { id: 8, topic: 'Security+ Certification', tag: 'cybersecurity', resources: [
        { type: 'video', label: 'CompTIA Security+ course', url: search('comptia security+ full course') },
        { type: 'docs', label: 'CompTIA Security+', url: 'https://www.comptia.org/certifications/security' },
      ] },
    ],
  },
  android: {
    title: 'Android Developer',
    steps: [
      { id: 1, topic: 'Java or Kotlin', tag: 'kotlin', resources: [
        { type: 'video', label: 'Kotlin Full Course', url: 'https://youtu.be/F9UC9DY-vIU' },
        { type: 'docs', label: 'Kotlin Docs', url: 'https://kotlinlang.org/docs/home.html' },
      ] },
      { id: 2, topic: 'Android Studio Setup', tag: 'android', resources: [
        { type: 'video', label: 'Android Studio Tutorial', url: 'https://youtu.be/fis26HvvDII' },
        { type: 'docs', label: 'Android Docs', url: 'https://developer.android.com/docs' },
      ] },
      { id: 3, topic: 'XML Layouts & UI', tag: 'android', resources: [
        { type: 'video', label: 'Android UI Tutorial', url: 'https://youtu.be/BBWyXo-3JGQ' },
        { type: 'docs', label: 'Android UI Docs', url: 'https://developer.android.com/develop/ui' },
      ] },
      { id: 4, topic: 'Jetpack Compose', tag: 'jetpackcompose', resources: [
        { type: 'video', label: 'Compose Tutorial', url: 'https://youtu.be/6_wK_Ud8--0' },
        { type: 'docs', label: 'Compose Docs', url: 'https://developer.android.com/jetpack/compose' },
      ] },
      { id: 5, topic: 'Room Database', tag: 'android', resources: [
        { type: 'video', label: 'Room DB Tutorial', url: 'https://youtu.be/lwAvI3WDXBY' },
        { type: 'docs', label: 'Room Docs', url: 'https://developer.android.com/training/data-storage/room' },
      ] },
      { id: 6, topic: 'Retrofit & APIs', tag: 'android', resources: [
        { type: 'video', label: 'Retrofit Tutorial', url: 'https://youtu.be/4JGvDUlfk7Y' },
        { type: 'docs', label: 'Retrofit Docs', url: 'https://square.github.io/retrofit/' },
      ] },
      { id: 7, topic: 'Firebase', tag: 'firebase', resources: [
        { type: 'video', label: 'Firebase Android Tutorial', url: 'https://youtu.be/jbHfJpoOzkI' },
        { type: 'docs', label: 'Firebase Docs', url: 'https://firebase.google.com/docs' },
      ] },
      { id: 8, topic: 'Play Store Deployment', tag: 'android', resources: [
        { type: 'video', label: 'Publish App Tutorial', url: 'https://youtu.be/7Gy9_KP-suI' },
        { type: 'docs', label: 'Play Console Docs', url: 'https://developer.android.com/distribute/console' },
      ] },
    ],
  },
  uiux: {
    title: 'UI/UX Designer',
    steps: [
      { id: 1, topic: 'Design Principles', tag: 'design', resources: [
        { type: 'video', label: 'UI design principles', url: search('ui design principles for beginners') },
        { type: 'docs', label: 'Laws of UX', url: 'https://lawsofux.com/' },
      ] },
      { id: 2, topic: 'Figma Fundamentals', tag: 'figma', resources: [
        { type: 'video', label: 'Figma for beginners', url: search('figma tutorial for beginners') },
        { type: 'docs', label: 'Figma Help Center', url: 'https://help.figma.com/' },
      ] },
      { id: 3, topic: 'Typography & Colour', tag: 'design', resources: [
        { type: 'video', label: 'Typography and colour in UI', url: search('typography and color in ui design') },
        { type: 'docs', label: 'Material Design styles', url: 'https://m3.material.io/styles' },
      ] },
      { id: 4, topic: 'User Research', tag: 'ux', resources: [
        { type: 'video', label: 'UX research methods', url: search('ux research methods explained') },
        { type: 'docs', label: 'Nielsen Norman Group articles', url: 'https://www.nngroup.com/articles/' },
      ] },
      { id: 5, topic: 'Wireframes & Prototypes', tag: 'ux', resources: [
        { type: 'video', label: 'Prototyping in Figma', url: search('wireframing and prototyping in figma') },
        { type: 'docs', label: 'Figma Help Center', url: 'https://help.figma.com/' },
      ] },
      { id: 6, topic: 'Design Systems', tag: 'design', resources: [
        { type: 'video', label: 'Design systems in Figma', url: search('design systems in figma tutorial') },
        { type: 'docs', label: 'Material Design 3', url: 'https://m3.material.io/' },
      ] },
      { id: 7, topic: 'Accessibility', tag: 'a11y', resources: [
        { type: 'video', label: 'Accessibility for designers', url: search('web accessibility for designers') },
        { type: 'docs', label: 'W3C accessibility intro', url: 'https://www.w3.org/WAI/fundamentals/accessibility-intro/' },
      ] },
      { id: 8, topic: 'Portfolio & Case Studies', tag: 'ux', resources: [
        { type: 'video', label: 'UX portfolio case studies', url: search('ux portfolio case study tips') },
        { type: 'docs', label: 'Behance', url: 'https://www.behance.net/' },
      ] },
    ],
  },
  gamedev: {
    title: 'Game Developer',
    steps: [
      { id: 1, topic: 'C# Basics', tag: 'csharp', resources: [
        { type: 'video', label: 'C# for beginners', url: search('c# full course for beginners') },
        { type: 'docs', label: 'C# Docs (Microsoft)', url: 'https://learn.microsoft.com/en-us/dotnet/csharp/' },
      ] },
      { id: 2, topic: 'Unity Fundamentals', tag: 'unity3d', resources: [
        { type: 'video', label: 'Unity beginner tutorial', url: search('unity beginner tutorial') },
        { type: 'docs', label: 'Unity Learn', url: 'https://learn.unity.com/' },
      ] },
      { id: 3, topic: 'Game Physics & Collisions', tag: 'unity3d', resources: [
        { type: 'video', label: 'Unity physics and collisions', url: search('unity physics collisions tutorial') },
        { type: 'docs', label: 'Unity Manual', url: 'https://docs.unity3d.com/Manual/' },
      ] },
      { id: 4, topic: '2D Games', tag: 'gamedev', resources: [
        { type: 'video', label: 'Make a 2D game in Unity', url: search('unity 2d game tutorial') },
        { type: 'docs', label: 'Unity Learn', url: 'https://learn.unity.com/' },
      ] },
      { id: 5, topic: '3D Games', tag: 'gamedev', resources: [
        { type: 'video', label: 'Make a 3D game in Unity', url: search('unity 3d game tutorial') },
        { type: 'docs', label: 'Unity Manual', url: 'https://docs.unity3d.com/Manual/' },
      ] },
      { id: 6, topic: 'Game & Level Design', tag: 'gamedev', resources: [
        { type: 'video', label: 'Game design fundamentals', url: search('game design fundamentals') },
        { type: 'docs', label: 'Game Developer: design', url: 'https://www.gamedeveloper.com/design' },
      ] },
      { id: 7, topic: 'Godot Engine', tag: 'godot', resources: [
        { type: 'video', label: 'Godot beginner tutorial', url: search('godot beginner tutorial') },
        { type: 'docs', label: 'Godot Docs', url: 'https://docs.godotengine.org/' },
      ] },
      { id: 8, topic: 'Publishing on itch.io', tag: 'gamedev', resources: [
        { type: 'video', label: 'Publish a game on itch.io', url: search('how to publish a game on itch.io') },
        { type: 'docs', label: 'itch.io creator docs', url: 'https://itch.io/docs/creators/' },
      ] },
    ],
  },
  dsa: {
    title: 'DSA & Competitive Programming',
    steps: [
      { id: 1, topic: 'Arrays & Strings', tag: 'algorithms', resources: [
        { type: 'video', label: 'Arrays by Striver', url: 'https://youtu.be/37E9ckMDdTk' },
        { type: 'docs', label: 'Striver A2Z Sheet', url: 'https://takeuforward.org/strivers-a2z-dsa-course/strivers-a2z-dsa-course-sheet-2/' },
      ] },
      { id: 2, topic: 'Linked Lists', tag: 'datastructures', resources: [
        { type: 'video', label: 'Linked List Playlist', url: 'https://youtu.be/Nq7ok-OyEpg' },
        { type: 'docs', label: 'GFG Linked List', url: 'https://www.geeksforgeeks.org/data-structures/linked-list/' },
      ] },
      { id: 3, topic: 'Stacks & Queues', tag: 'datastructures', resources: [
        { type: 'video', label: 'Stack & Queue Tutorial', url: 'https://youtu.be/P1bAPZCFBpM' },
        { type: 'docs', label: 'GFG Stack', url: 'https://www.geeksforgeeks.org/stack-data-structure/' },
      ] },
      { id: 4, topic: 'Trees & Binary Search Trees', tag: 'datastructures', resources: [
        { type: 'video', label: 'Trees by Striver', url: 'https://youtu.be/_ANrF3FJm7I' },
        { type: 'docs', label: 'GFG Trees', url: 'https://www.geeksforgeeks.org/binary-tree-data-structure/' },
      ] },
      { id: 5, topic: 'Recursion & Backtracking', tag: 'algorithms', resources: [
        { type: 'video', label: 'Recursion Playlist', url: 'https://youtu.be/yVdKa8dnKiE' },
        { type: 'docs', label: 'GFG Recursion', url: 'https://www.geeksforgeeks.org/recursion/' },
      ] },
      { id: 6, topic: 'Dynamic Programming', tag: 'algorithms', resources: [
        { type: 'video', label: 'DP by Striver', url: 'https://youtu.be/FfXoiwwnxFw' },
        { type: 'docs', label: 'DP Patterns', url: 'https://leetcode.com/discuss/general-discussion/458695/dynamic-programming-patterns' },
      ] },
      { id: 7, topic: 'Graphs', tag: 'algorithms', resources: [
        { type: 'video', label: 'Graph Series by Striver', url: 'https://youtu.be/59fUtYYz7ZU' },
        { type: 'docs', label: 'GFG Graphs', url: 'https://www.geeksforgeeks.org/graph-data-structure-and-algorithms/' },
      ] },
      { id: 8, topic: 'LeetCode Practice', tag: 'leetcode', resources: [
        { type: 'video', label: 'How to Grind LeetCode', url: 'https://youtu.be/SVvr3ZjtjI8' },
        { type: 'docs', label: 'LeetCode', url: 'https://leetcode.com' },
      ] },
    ],
  },
}
