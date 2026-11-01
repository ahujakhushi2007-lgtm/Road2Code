// Structured study notes for each stop of every roadmap track.
// Starter notes provided for the first 3 stops of all 12 tracks, with a fallback for later stops.

export const courseNotes = {
  frontend: {
    1: {
      topic: 'HTML & CSS',
      summary: 'HTML provides the semantic skeleton of documents while modern CSS handles layout, responsiveness, typography, and visual styling.',
      sections: [
        {
          heading: 'Semantic HTML5 Architecture',
          content: 'Always use semantic elements (<main>, <article>, <section>, <nav>, <aside>, <header>, <footer>) over generic <div> tags. Semantic markup improves screen reader accessibility, browser SEO, and code maintainability.',
        },
        {
          heading: 'Modern CSS Layout: Flexbox vs Grid',
          content: 'Use Flexbox for 1-dimensional component layouts (navigation bars, button groups, vertical cards). Use CSS Grid for 2-dimensional page scaffolding, auto-fitting responsive card matrices (repeat(auto-fit, minmax(280px, 1fr))), and complex alignment.',
        },
        {
          heading: 'Responsive Design & CSS Custom Properties',
          content: 'Adopt mobile-first media queries with min-width breakpoints. Leverage CSS custom properties (variables) on :root for unified design tokens (spacing, typography, dark/light theme switching).',
        },
      ],
      keyPoints: [
        'The CSS Box Model comprises content, padding, border, and margin. Use box-sizing: border-box globally.',
        'Never remove :focus-visible outlines without providing an accessible high-contrast alternative.',
        'Use rem for typography and spacing scale, px for hairline borders, and em for icon sizing relative to parent text.',
      ],
      reviseChecklist: [
        'Can you build a responsive 3-column card grid with CSS Grid without media queries?',
        'Do you know the difference between inline, block, and inline-block display modes?',
        'Have you tested your markup with standard screen reader navigation keys?',
      ],
    },
    2: {
      topic: 'JavaScript',
      summary: 'Core modern ECMAScript features including closures, prototypes, asynchronous control flow, and DOM manipulation.',
      sections: [
        {
          heading: 'Scope, Closures, and Hoisting',
          content: 'Variables declared with let and const are block-scoped and reside in the Temporal Dead Zone (TDZ) before declaration. A closure is created when an inner function retains access to its lexical scope even after the outer function has executed.',
        },
        {
          heading: 'Asynchronous JavaScript: Event Loop & Promises',
          content: 'JavaScript operates on a single-threaded event loop. Synchronous code executes first on the call stack, microtasks (Promise callbacks, queueMicrotask) run immediately after, followed by macrotasks (setTimeout, event listeners).',
        },
        {
          heading: 'Functional Array Patterns',
          content: 'Prefer pure transformations with .map(), .filter(), .reduce(), .some(), and .find() over imperative for loops. Always avoid mutating the original source array directly.',
        },
      ],
      keyPoints: [
        'Promises transition from pending to fulfilled or rejected. Always handle errors via try/catch with async/await.',
        'Arrow functions do not bind their own this, arguments, or super.',
        'Deep cloning nested structures requires structuredClone(obj) rather than shallow spread operators.',
      ],
      reviseChecklist: [
        'Can you explain the exact sequence of console logs across microtasks and setTimeout?',
        'Can you write a debounce and throttle utility from scratch using closures?',
        'Do you understand how prototype chain lookup works when accessing object properties?',
      ],
    },
    3: {
      topic: 'React',
      summary: 'Component-driven declarative UI development using functional components, state hooks, unidirectional data flow, and virtual DOM reconciliation.',
      sections: [
        {
          heading: 'Component Lifecycle & React 19 State Flow',
          content: 'Components are pure functions that translate props and state into JSX. React renders in two phases: the render phase (computing diffs) and the commit phase (applying DOM updates). Avoid side-effects during render.',
        },
        {
          heading: 'Mastering React Hooks',
          content: 'useState manages local reactive values; useReducer handles structured state transitions; useEffect synchronises components with external systems (network, timers, DOM). Always include all referenced variables in effect dependency arrays.',
        },
        {
          heading: 'Lifting State & Context API',
          content: 'When multiple sibling components need shared data, lift state up to their closest common ancestor. For cross-cutting concerns (authentication, theme, toasts), use React Context to prevent prop-drilling.',
        },
      ],
      keyPoints: [
        'State updates are asynchronous and batched. Always pass an updater function (prev => prev + 1) when deriving from previous state.',
        'Keys in lists must be stable, unique IDs across re-renders—never use array indexes if items reorder or delete.',
        'Custom hooks encapsulate reusable stateful logic while keeping components clean and readable.',
      ],
      reviseChecklist: [
        'Do you know when to use useEffect versus handling actions inside event handlers?',
        'Can you explain why mutating state directly fails to trigger component re-renders?',
        'Have you built a custom hook with proper cleanup on unmount?',
      ],
    },
  },

  backend: {
    1: {
      topic: 'Python or Java',
      summary: 'Object-oriented programming fundamentals, data structures, type systems, and concurrency primitives for server-side engineering.',
      sections: [
        {
          heading: 'OOP & Clean Code Architecture',
          content: 'Encapsulation, inheritance, polymorphism, and abstraction. Master SOLID principles to design testable, modular, and extensible backend domain services.',
        },
        {
          heading: 'Memory Management & Garbage Collection',
          content: 'Understand heap vs stack memory allocation. In Java, JVM generational GC manages object lifetimes; in Python, reference counting paired with cyclical generational GC handles reclamation.',
        },
        {
          heading: 'Concurrency and Multithreading',
          content: 'Learn thread lifecycles, race conditions, mutexes, locks, and thread-safe data structures. Understand Python GIL versus JVM true OS-level thread parallel execution.',
        },
      ],
      keyPoints: [
        'Favor composition over inheritance to prevent fragile base class hierarchies.',
        'Always validate input boundaries and serialize safely using strong typing or Pydantic/Lombok.',
        'Catch specific exceptions; avoid swallowing errors with bare try/catch clauses.',
      ],
      reviseChecklist: [
        'Can you implement the Singleton and Factory design patterns with thread safety?',
        'Do you understand how thread pool executors manage concurrent worker tasks?',
        'Have you profiled memory usage under heavy loop allocations?',
      ],
    },
    2: {
      topic: 'Node.js & Express',
      summary: 'Event-driven, asynchronous I/O backend applications using Node.js runtime and the Express HTTP routing framework.',
      sections: [
        {
          heading: 'The Node.js Runtime Architecture',
          content: 'Node.js wraps Google V8 engine with libuv, providing an asynchronous event-driven loop and a thread pool for blocking file/crypto operations.',
        },
        {
          heading: 'Express Middleware Pattern',
          content: 'Middleware functions (req, res, next) form a sequential pipeline. Use middleware for JSON parsing, CORS headers, JWT verification, request logging, and centralized error handling.',
        },
        {
          heading: 'RESTful API Conventions',
          content: 'Map standard HTTP methods (GET, POST, PUT, PATCH, DELETE) to idempotent or mutating resource operations with accurate HTTP status codes (200, 201, 400, 401, 403, 404, 500).',
        },
      ],
      keyPoints: [
        'Never block the event loop with intensive synchronous computations (e.g., sync crypto or massive JSON parses).',
        'Always implement global error handling middleware with 4 arguments: (err, req, res, next).',
        'Use environment variables (.env) to isolate configuration and credentials from source code.',
      ],
      reviseChecklist: [
        'Can you write a custom authentication middleware verifying bearer tokens?',
        'Do you know when to return 401 Unauthorized versus 403 Forbidden?',
        'Have you handled uncaught exceptions and unhandled promise rejections cleanly?',
      ],
    },
    3: {
      topic: 'SQL Databases',
      summary: 'Relational data modeling, ACID transactions, normalization, and query optimization with PostgreSQL.',
      sections: [
        {
          heading: 'Relational Schema Design & Normalization',
          content: 'Organize tables into 1NF, 2NF, and 3NF to eliminate duplicate data and guarantee referential integrity using primary and foreign keys.',
        },
        {
          heading: 'Complex Joins & Aggregations',
          content: 'Master INNER, LEFT, RIGHT, and FULL OUTER joins. Use GROUP BY, HAVING, and window functions (ROW_NUMBER(), RANK(), OVER()) for analytical insights.',
        },
        {
          heading: 'Indexes & Query Optimization',
          content: 'B-Tree indexes speed up equality and range lookups. Use EXPLAIN ANALYZE to identify sequential table scans and optimize high-latency queries.',
        },
      ],
      keyPoints: [
        'ACID properties (Atomicity, Consistency, Isolation, Durability) guarantee transaction safety during concurrent workloads.',
        'Always sanitize inputs and use parameterized queries / prepared statements to prevent SQL injection.',
        'Be cautious of over-indexing: indexes accelerate reads but add write latency to INSERT, UPDATE, and DELETE.',
      ],
      reviseChecklist: [
        'Can you write an ACID transaction block with COMMIT and ROLLBACK handling?',
        'Do you know how to read the query plan output from EXPLAIN ANALYZE?',
        'Can you design a many-to-many relationship with a composite primary key join table?',
      ],
    },
  },

  fullstack: {
    1: {
      topic: 'HTML, CSS & JavaScript',
      summary: 'The holy trinity of web development: semantic structure, responsive CSS design, and imperative DOM programming.',
      sections: [
        {
          heading: 'Full-Stack Web Foundations',
          content: 'Modern full-stack developers must understand how browsers parse HTML into the DOM tree, CSS into the CSSOM, and execute JavaScript to create the render tree.',
        },
        {
          heading: 'Responsive Mobile-First CSS',
          content: 'Design for mobile viewports first, then scale up using Flexbox, Grid, and fluid typography. Use semantic class naming and CSS custom properties.',
        },
        {
          heading: 'DOM APIs and Event Delegation',
          content: 'Attach event listeners to parent containers rather than hundreds of child nodes to reduce memory footprints and handle dynamic elements effortlessly.',
        },
      ],
      keyPoints: [
        'Understand Critical Rendering Path: DNS lookup, TCP handshake, TLS negotiation, TTFB, and DOMContentLoaded.',
        'Use strict equality (===) and avoid type coercion traps in client and server code.',
        'Always sanitize user input both in browser forms and server endpoints.',
      ],
      reviseChecklist: [
        'Can you explain the event bubbling and capturing phases in the DOM?',
        'Do you know how to debounce rapid input events?',
        'Can you inspect layout shifts (CLS) and paint metrics in DevTools?',
      ],
    },
    2: {
      topic: 'React',
      summary: 'Building stateful, interactive single-page user interfaces with React component trees and hooks.',
      sections: [
        {
          heading: 'Declarative Component Modeling',
          content: 'Deconstruct complex mockups into small, composable, single-responsibility components with clear prop interfaces.',
        },
        {
          heading: 'State Flow and Side Effects',
          content: 'Coordinate state updates between parent and child components using callbacks, controlled components, and clean effect hooks.',
        },
        {
          heading: 'Client-Side Routing',
          content: 'Use React Router for URL routing, nested routes, route parameters, protected auth guards, and instant page transitions without full browser reloads.',
        },
      ],
      keyPoints: [
        'Never mutate state directly; always create fresh array/object references.',
        'Wrap asynchronous API calls in try/catch and store loading, error, and data states explicitly.',
        'Provide fallback UI states for empty lists and network errors.',
      ],
      reviseChecklist: [
        'Can you create an accessible modal dialog with backdrop dismissal and focus management?',
        'Do you know how to handle abort signals in fetch requests inside useEffect cleanup?',
        'Can you configure client-side navigation with route guards?',
      ],
    },
    3: {
      topic: 'Node.js & Express',
      summary: 'Server-side API architecture, routing, middleware orchestration, and JSON payload handling.',
      sections: [
        {
          heading: 'HTTP Server Architecture',
          content: 'Design RESTful endpoints that adhere to standard status codes, header configurations, and predictable JSON response structures.',
        },
        {
          heading: 'Custom Middleware Chains',
          content: 'Build modular middleware for auth token verification, request validation, rate limiting, and structured logging.',
        },
        {
          heading: 'Secure Backend Practices',
          content: 'Configure CORS origins, helmet security headers, request body size limits, and robust sanitization against injection attacks.',
        },
      ],
      keyPoints: [
        'Never trust client input; validate all request parameters, query strings, and body payloads.',
        'Keep environment secrets (.env) out of source control using .gitignore.',
        'Always return standard error responses: { ok: false, error: "Human-readable message" }.',
      ],
      reviseChecklist: [
        'Can you write a custom token verification middleware?',
        'Do you know how to set secure, HTTP-only cookies?',
        'Can you structure an Express app into controllers, services, and routes?',
      ],
    },
  },

  aiml: {
    1: {
      topic: 'Python for AI',
      summary: 'Python language features for high-performance scientific computing, object model, and vector manipulation.',
      sections: [
        {
          heading: 'Pythonic Coding & Comprehensions',
          content: 'List, dict, and set comprehensions, generators, and iterators allow memory-efficient processing of large datasets without loading everything into RAM.',
        },
        {
          heading: 'Object-Oriented Architecture for ML',
          content: 'Design custom dataset loaders, model wrappers, and transformation pipelines using inheritance and dunder methods (__len__, __getitem__, __call__).',
        },
        {
          heading: 'File I/O and Serialization',
          content: 'Manage structured CSV, JSON, HDF5, and Parquet data formats. Safely serialize and deserialize trained weights using pickle, joblib, and safetensors.',
        },
      ],
      keyPoints: [
        'Use type hints (typing module) to make mathematical multidimensional signatures explicit.',
        'Avoid loops over numerical arrays; always vectorize computations with specialized libraries.',
        'Virtual environments (venv, conda) isolate conflicting dependency packages.',
      ],
      reviseChecklist: [
        'Can you write a custom generator yielding batched data from disk?',
        'Do you know how to use functools.lru_cache for memoization?',
        'Have you created a custom context manager using the @contextmanager decorator?',
      ],
    },
    2: {
      topic: 'Maths & Statistics',
      summary: 'Linear algebra, multivariable calculus, probability distributions, and inferential statistics powering modern AI.',
      sections: [
        {
          heading: 'Linear Algebra Foundations',
          content: 'Vectors, matrices, dot products, matrix multiplication, eigenvalues, eigenvectors, and singular value decomposition (SVD) underpin neural network transformations.',
        },
        {
          heading: 'Multivariable Calculus & Gradient Descent',
          content: 'Partial derivatives, gradients, Jacobians, and Hessians. Understand how stochastic gradient descent (SGD) minimizes loss functions via backpropagation.',
        },
        {
          heading: 'Probability & Statistical Inference',
          content: 'Bayes Theorem, continuous and discrete distributions (Gaussian, Bernoulli, Poisson), hypothesis testing, p-values, and confidence intervals.',
        },
      ],
      keyPoints: [
        'Matrix multiplication requires inner dimensions to match: (m x k) * (k x n) = (m x n).',
        'Learning rate controls step size along the negative gradient vector: too high causes divergence, too low stalls.',
        'Central Limit Theorem states sample means approximate a normal distribution regardless of population shape.',
      ],
      reviseChecklist: [
        'Can you calculate the derivative of a composite function using the chain rule by hand?',
        'Do you know the difference between covariance and correlation?',
        'Can you explain the mathematical meaning of an L1 vs L2 regularization penalty?',
      ],
    },
    3: {
      topic: 'NumPy & Pandas',
      summary: 'Fast array computing with C-backed NumPy strides and tabular data manipulation with Pandas DataFrames.',
      sections: [
        {
          heading: 'NumPy N-Dimensional Arrays & Broadcasting',
          content: 'Broadcasting allows arithmetic operations between arrays of different shapes by conceptually expanding trailing dimensions of length 1.',
        },
        {
          heading: 'Pandas Data Cleaning & Feature Engineering',
          content: 'Handling missing values (fillna, dropna), categorical encoding, date-time parsing, and vectorized string transformations.',
        },
        {
          heading: 'Aggregation & Pivoting',
          content: 'Group-by operations split-apply-combine logic, pivot tables, multi-indexing, and joining disparate dataframes using merge.',
        },
      ],
      keyPoints: [
        'NumPy vector operations are orders of magnitude faster than Python for loops due to contiguous memory and SIMD instructions.',
        'Avoid chained indexing (df[a][b] = c) in Pandas; use .loc[row_indexer, col_indexer] to prevent SettingWithCopy warnings.',
        'Memory optimization: cast float64/int64 columns to float32 or categorical types where appropriate.',
      ],
      reviseChecklist: [
        'Can you perform boolean indexing on a 2D NumPy array?',
        'Do you know how broadcasting rules evaluate compatible shapes?',
        'Can you write a Pandas groupby pipeline calculating aggregations on multiple columns?',
      ],
    },
  },

  datascience: {
    1: {
      topic: 'Python',
      summary: 'Python fundamentals for data manipulation, exploratory analysis, and automated script pipelines.',
      sections: [
        {
          heading: 'Data Analysis Toolchain',
          content: 'Set up Jupyter notebooks, virtual environments, and clean coding practices for reproducible scientific workflows.',
        },
        {
          heading: 'Data Structures and Algorithms for Analysts',
          content: 'Lists, tuples, sets, dictionaries, and standard collections (Counter, defaultdict). Pick the right structure to optimize lookup efficiency.',
        },
        {
          heading: 'Data Extraction & Web Scraping Basics',
          content: 'Parse structured API endpoints and HTML pages using requests and BeautifulSoup while adhering to rate limits and robots.txt rules.',
        },
      ],
      keyPoints: [
        'Dict lookups are O(1) on average; list lookups are O(N).',
        'Always document statistical assumptions directly in notebook markdown cells.',
        'Write modular functions for ETL steps rather than monolithic scripts.',
      ],
      reviseChecklist: [
        'Can you read an API response, handle pagination, and load records into memory?',
        'Do you know when to use a tuple instead of a list?',
        'Have you automated an ETL script with logging and error handling?',
      ],
    },
    2: {
      topic: 'Maths & Statistics',
      summary: 'Descriptive and inferential statistics, probability theories, and data distribution modeling.',
      sections: [
        {
          heading: 'Descriptive Metrics & Distribution Shapes',
          content: 'Mean, median, mode, variance, standard deviation, interquartile range (IQR), skewness, and kurtosis. Understand how outliers bias mean vs median.',
        },
        {
          heading: 'Hypothesis Testing & Significance',
          content: 'Null vs alternative hypotheses, Type I (false positive) and Type II (false negative) errors, t-tests, ANOVA, and Chi-square independence tests.',
        },
        {
          heading: 'Regression & Correlation Analysis',
          content: 'Pearson and Spearman correlation coefficients. Ordinary least squares (OLS) linear regression and understanding R-squared variance explanation.',
        },
      ],
      keyPoints: [
        'Correlation does not imply causation; always investigate lurking confounding variables.',
        'Use IQR or Z-score thresholds to methodically detect and treat anomalous outlier observations.',
        'A p-value below alpha (typically 0.05) indicates sufficient statistical evidence to reject the null hypothesis.',
      ],
      reviseChecklist: [
        'Can you interpret a box plot and calculate upper/lower whisker fences?',
        'Do you know the difference between parametric and non-parametric tests?',
        'Can you explain the standard error of the mean?',
      ],
    },
    3: {
      topic: 'SQL Databases',
      summary: 'Data extraction, window functions, and business reporting queries from relational data warehouses.',
      sections: [
        {
          heading: 'Analytical SQL Queries',
          content: 'Write multi-table queries joining fact and dimension tables. Filter aggregated cohorts using HAVING and subqueries.',
        },
        {
          heading: 'Window Functions for Time-Series Analysis',
          content: 'Calculate running totals, moving 7-day averages, lead/lag period comparisons, and cohort ranks using OVER (PARTITION BY ... ORDER BY ...).',
        },
        {
          heading: 'Common Table Expressions (CTEs)',
          content: 'Break down unwieldy nested subqueries into readable, maintainable WITH cte_name AS (...) blocks.',
        },
      ],
      keyPoints: [
        'Filter early in WHERE clauses before JOIN and GROUP BY stages to minimize memory allocation.',
        'Window functions calculate across row sets without collapsing records like GROUP BY does.',
        'Use COALESCE to handle NULL values cleanly in calculated metrics.',
      ],
      reviseChecklist: [
        'Can you write a query calculating month-over-month revenue growth using LAG()?',
        'Do you know the difference between RANK() and DENSE_RANK()?',
        'Can you optimize a slow join using appropriate indexing strategies?',
      ],
    },
  },

  devops: {
    1: {
      topic: 'Linux & Bash',
      summary: 'Command-line mastery, Linux filesystem hierarchy, user permissions, and bash automation scripts.',
      sections: [
        {
          heading: 'Filesystem and Process Management',
          content: 'Navigate directories, inspect file contents (grep, awk, sed), monitor system resources (top, htop, df, free), and manage background processes (ps, kill, systemctl).',
        },
        {
          heading: 'User Permissions & Security',
          content: 'Understand chmod numeric and symbolic notations (rwx), chown ownership, umask defaults, and sudo privilege escalation.',
        },
        {
          heading: 'Shell Scripting Automation',
          content: 'Write defensive Bash scripts using set -euo pipefail, parameter expansion, exit codes, and automated cron scheduled jobs.',
        },
      ],
      keyPoints: [
        'Everything in Linux is conceptually a file or process descriptor (stdin 0, stdout 1, stderr 2).',
        'Use SSH key-based authentication with disabled root password logins for hardened servers.',
        'Redirect stderr and stdout using command > out.log 2>&1.',
      ],
      reviseChecklist: [
        'Can you write a bash script that checks if a service is healthy and restarts it if down?',
        'Do you know how to calculate chmod permissions like 755 and 644?',
        'Can you filter access logs for 500 errors using awk and sort by frequency?',
      ],
    },
    2: {
      topic: 'Git & GitHub',
      summary: 'Version control workflows, trunk-based branching strategies, merge conflict resolution, and pull request reviews.',
      sections: [
        {
          heading: 'Git Internal Architecture',
          content: 'Git stores snapshots as directed acyclic graphs (DAGs) of blobs, trees, commits, and tags referenced by SHA-1/SHA-256 hashes.',
        },
        {
          heading: 'Branching & Rebasing',
          content: 'Understand git merge vs git rebase. Rebase creates a linear project history while merge preserves exact commit topology.',
        },
        {
          heading: 'Collaborative Workflows',
          content: 'Configure branch protection rules, automated PR status checks, signed GPG commits, and clean commit messaging conventions.',
        },
      ],
      keyPoints: [
        'Never force-push (git push --force) to shared main/production branches without lease safeguards.',
        'Use git stash to shelve uncommitted work temporarily without littering commit histories.',
        'Git bisect automates binary search to isolate the exact commit that introduced a regression.',
      ],
      reviseChecklist: [
        'Can you resolve a complex git merge conflict between two diverged branches?',
        'Do you know how to squash multiple local commits into one before merging?',
        'Can you write a GitHub pull request template with checklist validation?',
      ],
    },
    3: {
      topic: 'Docker Containers',
      summary: 'Containerization principles, multi-stage Dockerfiles, image optimization, and Docker Compose orchestration.',
      sections: [
        {
          heading: 'Containers vs Virtual Machines',
          content: 'Containers virtualize the operating system kernel via Linux cgroups and namespaces, resulting in lightweight, instant boot times compared to hypervisor VMs.',
        },
        {
          heading: 'Writing Production Dockerfiles',
          content: 'Order commands from least frequently changed to most frequently changed to leverage Docker layer caching. Use multi-stage builds to produce tiny runtime images.',
        },
        {
          heading: 'Networking and Persistent Volumes',
          content: 'Configure bridge, host, and overlay networks. Mount named volumes and bind mounts for database persistence and hot-reload development environments.',
        },
      ],
      keyPoints: [
        'Run containers as non-root users (USER node or USER 1001) to mitigate container breakout vulnerabilities.',
        'Use .dockerignore to exclude node_modules, build artifacts, and secrets from image build contexts.',
        'Docker Compose defines multi-container applications with shared networks and dependency ordering (depends_on).',
      ],
      reviseChecklist: [
        'Can you write a multi-stage Dockerfile that builds a React app with Vite and serves it with Nginx?',
        'Do you know how to inspect container logs and execute commands inside a running container?',
        'Can you configure a docker-compose.yml file linking a web API with a Redis cache and Postgres DB?',
      ],
    },
  },

  cloud: {
    1: {
      topic: 'Networking Basics',
      summary: 'TCP/IP model, DNS resolution, subnets, routing, NAT gateways, and OSI layer communication.',
      sections: [
        {
          heading: 'IP Addressing and CIDR Notation',
          content: 'Calculate IPv4 subnet masks (e.g., /24 = 256 addresses, /16 = 65,536 addresses). Differentiate between RFC 1918 private IP ranges and public routable IPs.',
        },
        {
          heading: 'DNS & Traffic Routing',
          content: 'Recursive vs authoritative DNS resolvers. Key DNS record types: A, AAAA, CNAME, ALIAS, MX, TXT, and TTL caching implications.',
        },
        {
          heading: 'Transport and Application Protocols',
          content: 'TCP three-way handshake (SYN, SYN-ACK, ACK) and reliable delivery vs UDP connectionless speed. TLS 1.3 handshake encryption for HTTPS.',
        },
      ],
      keyPoints: [
        'Subnets divide a VPC network into isolated public and private security zones.',
        'A NAT Gateway allows instances in private subnets to reach the internet for updates without being accessible from the outside.',
        'Port 80 is HTTP, 443 is HTTPS, 22 is SSH, 53 is DNS.',
      ],
      reviseChecklist: [
        'Can you calculate the usable host IP count in a 10.0.1.0/26 subnet?',
        'Do you know what happens during a DNS lookup when a user types a URL?',
        'Can you explain the difference between a forward proxy and a reverse proxy?',
      ],
    },
    2: {
      topic: 'Linux & Scripting',
      summary: 'Cloud instance provisioning, systemd unit configurations, log analysis, and automated configuration management.',
      sections: [
        {
          heading: 'Remote Instance Management',
          content: 'SSH key pairs, bastion jump hosts, cloud-init user-data provisioning scripts, and secure host bastions.',
        },
        {
          heading: 'systemd Daemon Services',
          content: 'Create robust service unit files (/etc/systemd/system) with automatic restart policies, environment variables, and log collection via journalctl.',
        },
        {
          heading: 'Cloud CLI Automation',
          content: 'Script infrastructure queries and operations using AWS CLI or cloud SDKs with programmatic IAM roles and credentials.',
        },
      ],
      keyPoints: [
        'Always assign IAM Roles to cloud instances instead of storing static access keys on disk.',
        'Monitor disk usage regularly; configure log rotation (logrotate) to prevent root partition exhaustion.',
        'Use cloud-init scripts to configure software on initial instance boot.',
      ],
      reviseChecklist: [
        'Can you write a systemd service file running a Node.js or Python backend?',
        'Do you know how to query instance metadata from within a cloud virtual machine?',
        'Can you connect securely via SSH using an SSH agent and config file?',
      ],
    },
    3: {
      topic: 'AWS Core Services',
      summary: 'Compute, storage, networking, and identity foundations on Amazon Web Services.',
      sections: [
        {
          heading: 'Identity and Access Management (IAM)',
          content: 'Users, groups, roles, and policies. Implement the principle of least privilege with granular JSON policy conditions.',
        },
        {
          heading: 'Compute and Virtual Private Cloud (VPC)',
          content: 'Launch EC2 instances with custom AMIs, auto-scaling groups, and multi-AZ resilience inside custom VPC topologies.',
        },
        {
          heading: 'Storage: S3, EBS, and EFS',
          content: 'Differentiate between block storage (EBS attached to EC2), object storage (S3 globally accessible with lifecycle policies), and shared file storage (EFS).',
        },
      ],
      keyPoints: [
        'Security Groups are stateful firewalls at the instance level; Network ACLs are stateless at the subnet level.',
        'S3 bucket policies and ACLs should block public access by default unless hosting static public assets.',
        'Design for failure: deploy across multiple Availability Zones (AZs) in a region.',
      ],
      reviseChecklist: [
        'Can you explain the difference between an IAM user, an IAM role, and an IAM policy?',
        'Do you know how Security Groups handle outbound and return traffic automatically?',
        'Can you design an S3 lifecycle rule transitioning objects to Glacier for cold archiving?',
      ],
    },
  },

  cybersecurity: {
    1: {
      topic: 'Networking & Protocols',
      summary: 'Packet inspection, firewall architectures, port scanning, and network attack vectors.',
      sections: [
        {
          heading: 'Network Defense Fundamentals',
          content: 'Understand how adversaries map target networks using ping sweeps, ARP spoofing, and stealth SYN scans with Nmap.',
        },
        {
          heading: 'Packet Analysis with Wireshark',
          content: 'Capture and inspect pcap files. Filter for cleartext credentials, anomalies, TLS handshakes, and unencrypted traffic flows.',
        },
        {
          heading: 'Common Network Attacks',
          content: 'Man-in-the-middle (MITM), DNS poisoning, DHCP starvation, and DDoS amplification techniques.',
        },
      ],
      keyPoints: [
        'Always enforce encrypted protocols (SSH over Telnet, SFTP over FTP, HTTPS over HTTP).',
        'Segment internal networks to prevent lateral movement following an initial breach.',
        'Zero Trust principle: verify explicitly, grant least privilege, and assume breach.',
      ],
      reviseChecklist: [
        'Can you write Wireshark display filters to isolate HTTP POST requests?',
        'Do you understand how ARP poisoning redirects traffic through an attacker machine?',
        'Can you interpret an Nmap scan output to identify open ports and service versions?',
      ],
    },
    2: {
      topic: 'Linux & Scripting',
      summary: 'Security auditing, file integrity monitoring, log analysis, and automated Python security tooling.',
      sections: [
        {
          heading: 'System Hardening',
          content: 'Disable unused services, enforce strong password policies in PAM, configure SSH daemon settings, and enable SELinux/AppArmor profiles.',
        },
        {
          heading: 'Security Scripting with Python',
          content: 'Build custom port scanners, banner grabbers, and brute-force detection scripts using Python socket and scapy libraries.',
        },
        {
          heading: 'Log Analysis and Incident Response',
          content: 'Examine /var/log/auth.log and journalctl to detect failed authentication attempts and suspicious privilege escalation.',
        },
      ],
      keyPoints: [
        'File permissions must be audited regularly for setuid/setgid binaries that allow privilege escalation.',
        'Automate security checks with scheduled audit tools like Lynis.',
        'Never run untrusted scripts or tools as root.',
      ],
      reviseChecklist: [
        'Can you write a basic socket port scanner in Python?',
        'Do you know how to find world-writable files in Linux?',
        'Can you identify brute-force login attempts from an authentication log?',
      ],
    },
    3: {
      topic: 'Web Security Basics',
      summary: 'The OWASP Top 10 vulnerabilities: injection, broken authentication, XSS, and CSRF prevention.',
      sections: [
        {
          heading: 'Cross-Site Scripting (XSS)',
          content: 'Reflected, stored, and DOM-based XSS. Mitigate by context-aware output encoding, Content Security Policy (CSP), and avoiding innerHTML.',
        },
        {
          heading: 'Cross-Site Request Forgery (CSRF)',
          content: 'Adversaries trick a logged-in user into executing unwanted actions. Prevent with SameSite cookies and anti-CSRF token validation.',
        },
        {
          heading: 'SQL Injection (SQLi)',
          content: 'Attackers manipulate backend database queries through unsanitized inputs. Mitigate by using prepared statements and parameterized queries exclusively.',
        },
      ],
      keyPoints: [
        'A strong Content Security Policy (CSP) header is a powerful defense layer against script injection.',
        'Never store sensitive auth tokens in insecure localStorage if vulnerable to XSS; use HTTP-only secure cookies.',
        'Implement rate limiting and account lockout to mitigate credential stuffing.',
      ],
      reviseChecklist: [
        'Can you explain the difference between stored and reflected XSS?',
        'Do you know how the SameSite cookie attribute prevents CSRF attacks?',
        'Can you identify a vulnerable SQL string concatenation in code?',
      ],
    },
  },

  android: {
    1: {
      topic: 'Kotlin Basics',
      summary: 'Modern Kotlin syntax, null safety, data classes, higher-order functions, and functional programming.',
      sections: [
        {
          heading: 'Null Safety & Type System',
          content: 'Kotlin eliminates the billion-dollar mistake (NullPointerExceptions) with nullable vs non-nullable types, safe call (?.) and Elvis (?:) operators.',
        },
        {
          heading: 'Idiomatic Kotlin Features',
          content: 'Smart casting, extension functions, data classes with automatic equals/hashCode/toString, and sealed interfaces for state modeling.',
        },
        {
          heading: 'Coroutines & Asynchronous Programming',
          content: 'Lightweight threads with suspend functions, Dispatchers (Main, IO, Default), and structured concurrency with CoroutineScope.',
        },
      ],
      keyPoints: [
        'Use val for immutable references by default; reserve var only for mutable state.',
        'Extension functions allow extending existing classes without inheriting from them.',
        'Coroutines execute asynchronously without blocking the Android UI main thread.',
      ],
      reviseChecklist: [
        'Can you write a sealed class representing Loading, Success, and Error UI states?',
        'Do you know when to use Dispatchers.IO versus Dispatchers.Main?',
        'Have you written an extension function on a standard Kotlin type?',
      ],
    },
    2: {
      topic: 'Android Studio & OOP',
      summary: 'Android Studio IDE configuration, project structure, Gradle build scripts, and Android application architecture.',
      sections: [
        {
          heading: 'Project Structure & Gradle',
          content: 'Understanding AndroidManifest.xml, build.gradle (Kotlin DSL), dependency management, and build variants.',
        },
        {
          heading: 'Android Architecture Components',
          content: 'MVVM (Model-View-ViewModel) architectural pattern separating business logic, state management, and UI rendering.',
        },
        {
          heading: 'Activity and Component Lifecycles',
          content: 'Manage onCreate, onStart, onResume, onPause, onStop, and onDestroy states to prevent memory leaks and handle screen rotations cleanly.',
        },
      ],
      keyPoints: [
        'ViewModels survive configuration changes (like screen rotations) where Activities are destroyed and recreated.',
        'Always release expensive resources (camera, location listeners) in onStop or onDestroy.',
        'Use Android Keystore for secure credential storage.',
      ],
      reviseChecklist: [
        'Can you explain what happens when a user rotates their phone during a running task?',
        'Do you know how to add dependencies using Gradle version catalogs?',
        'Have you created a ViewModel with StateFlow holding screen UI state?',
      ],
    },
    3: {
      topic: 'Jetpack Compose',
      summary: 'Declarative UI toolkit for modern Android apps with reactive state re-composition and Material Design 3.',
      sections: [
        {
          heading: 'Declarative UI Paradigm',
          content: 'Compose functions emit UI elements by describing what the screen should look like based on current state, replacing legacy XML layouts.',
        },
        {
          heading: 'State and Recomposition',
          content: 'Use remember and mutableStateOf to hold reactive state. Compose automatically recomposes only the functions that read changed state.',
        },
        {
          heading: 'Layouts and Modifiers',
          content: 'Arrange components with Column, Row, Box, and LazyColumn (for virtualized lists). Modifiers control padding, sizing, background, and click interactions.',
        },
      ],
      keyPoints: [
        'Keep composables stateless by hoisting state up to callers and passing event callbacks down.',
        'Use rememberSaveable to preserve UI state across Activity destruction and process death.',
        'Modifier order matters: modifier.padding(16.dp).background(...) behaves differently than background then padding.',
      ],
      reviseChecklist: [
        'Can you build a virtualized LazyColumn with smooth scrolling and item keys?',
        'Do you know how state hoisting makes composables easier to test and reuse?',
        'Can you apply MaterialTheme typography and color schemes to custom composables?',
      ],
    },
  },

  uiux: {
    1: {
      topic: 'Design Principles',
      summary: 'Visual hierarchy, typography scales, color theory, contrast ratios, and Gestalt psychology in UI design.',
      sections: [
        {
          heading: 'Visual Hierarchy & Layout',
          content: 'Guide the user eyes using size, weight, color contrast, and whitespace. Group related elements using Gestalt proximity and common region.',
        },
        {
          heading: 'Color Systems & Semantic Palettes',
          content: 'Establish 60-30-10 color proportions. Define functional semantic tokens: primary brand, neutral surfaces, success, warning, and destructive red.',
        },
        {
          heading: 'Accessibility & WCAG 2.1 Guidelines',
          content: 'Ensure minimum contrast ratios: 4.5:1 for normal text and 3:1 for large text. Never convey information through color alone.',
        },
      ],
      keyPoints: [
        'Typography scales establish clear rhythm: base body size, subheadings, and section titles with proportional line heights.',
        'Generous whitespace reduces cognitive overload and makes interfaces feel premium and easy to scan.',
        'Affordance and signifiers show users how interactive components behave before they touch them.',
      ],
      reviseChecklist: [
        'Can you check if a text and background color pair meets WCAG AA compliance?',
        'Do you know how to build an 8pt spatial grid system for padding and margins?',
        'Can you identify violations of Fitts Law in a navigation bar layout?',
      ],
    },
    2: {
      topic: 'Figma Basics',
      summary: 'Vector graphics, frames, groups, auto layout, constraints, and component master variants in Figma.',
      sections: [
        {
          heading: 'Auto Layout Mastery',
          content: 'Auto Layout mimics modern CSS Flexbox. Control direction, padding, gap, and alignment. Set children to fixed, hug contents, or fill container.',
        },
        {
          heading: 'Components, Variants & Properties',
          content: 'Create reusable master components with interactive variants (default, hover, active, disabled) and boolean/text properties.',
        },
        {
          heading: 'Styles and Design Tokens',
          content: 'Publish centralized color styles, typography styles, and elevation shadow effects to keep team files unified.',
        },
      ],
      keyPoints: [
        'Use Frames instead of Groups for proper responsive constraints and clipping.',
        'Name component variants systematically (e.g., Size=Medium, State=Hover, Icon=True).',
        'Keyboard shortcuts: Shift+A for Auto Layout, Option/Alt drag to duplicate.',
      ],
      reviseChecklist: [
        'Can you build a fully responsive button component with left/right icons using Auto Layout?',
        'Do you know how to publish a design library in Figma?',
        'Can you configure constraints to keep elements pinned correctly on resize?',
      ],
    },
    3: {
      topic: 'Typography & Colour',
      summary: 'Type classification, vertical rhythm, readability, emotional color psychology, and theme tokens.',
      sections: [
        {
          heading: 'Typeface Selection & Pairings',
          content: 'Pairing contrasting typefaces: expressive display headings with clean, legible geometric or humanist sans-serif body fonts.',
        },
        {
          heading: 'Readability Metrics',
          content: 'Optimal line length (measure) is 45 to 75 characters. Set line height (leading) between 1.4 and 1.6 for body copy to prevent line-jumping.',
        },
        {
          heading: 'Dark Mode Design Considerations',
          content: 'Never use pure #000000 black surfaces; use deep greys (#121212 to #1A1D24) to reduce glare and preserve elevation through lighter surface tints.',
        },
      ],
      keyPoints: [
        'Limit typefaces to two per product to maintain visual discipline.',
        'Desaturate vibrant brand colors slightly in dark mode to prevent visual vibration against dark backgrounds.',
        'Letter-spacing (tracking) should be tighter for large headings and slightly looser for tiny uppercase labels.',
      ],
      reviseChecklist: [
        'Can you calculate a modular typographic scale using a 1.25 major third ratio?',
        'Do you know how surface elevation is indicated in dark mode interfaces?',
        'Can you audit a screen for character measure and line-height compliance?',
      ],
    },
  },

  gamedev: {
    1: {
      topic: 'C# Programming',
      summary: 'C# syntax, OOP architecture, delegates, events, collections, and memory management for game loops.',
      sections: [
        {
          heading: 'C# Core for Game Programmers',
          content: 'Master types, control structures, structs vs classes (value vs reference types), and garbage collection considerations in real-time game loops.',
        },
        {
          heading: 'Delegates, Actions, and Events',
          content: 'Decouple game systems (health bars, audio managers, scoring) by publishing events using System.Action and UnityEvent callbacks.',
        },
        {
          heading: 'Coroutines and Async Operations',
          content: 'Execute timed events (spawning waves, animation delays, cooldown timers) using IEnumerator coroutines and YieldInstructions.',
        },
      ],
      keyPoints: [
        'Avoid frequent object instantiation (new) inside Update() loops to prevent garbage collection frame rate spikes.',
        'Use Object Pooling for high-frequency objects like bullets and particle sparks.',
        'Cache component references (GetComponent<T>()) in Awake or Start.',
      ],
      reviseChecklist: [
        'Can you write an object pool manager in C# without memory allocations during gameplay?',
        'Do you know the difference between Update() and FixedUpdate()?',
        'Can you decouple player death logic from game over UI using C# events?',
      ],
    },
    2: {
      topic: 'Unity Basics',
      summary: 'The Unity Editor, game objects, components, scene management, assets pipeline, and prefab workflows.',
      sections: [
        {
          heading: 'GameObjects and Component Pattern',
          content: 'Composition over inheritance: GameObjects are containers; components (Transform, MeshRenderer, Collider, custom scripts) define behavior.',
        },
        {
          heading: 'Prefab Workflow',
          content: 'Create reusable asset templates with overrides. Nested prefabs and prefab variants streamline level building and asset iteration.',
        },
        {
          heading: 'The Unity Execution Lifecycle',
          content: 'Understand exact order of execution: Awake, OnEnable, Start, FixedUpdate (physics tick), Update (per frame), LateUpdate (camera tracking).',
        },
      ],
      keyPoints: [
        'Camera tracking scripts should always execute in LateUpdate to prevent jitter after player movement in Update.',
        'Multiply movement speeds by Time.deltaTime in Update() for framerate-independent motion.',
        'Always organize project assets into clear folders (Scripts, Prefabs, Materials, Sprites, Audio).',
      ],
      reviseChecklist: [
        'Can you explain why Time.deltaTime is necessary when calculating translation velocity?',
        'Do you know how to instantiate a prefab at a specific world position and rotation?',
        'Can you configure input bindings using the modern Unity Input System?',
      ],
    },
    3: {
      topic: 'Physics & Input',
      summary: 'Rigidbody dynamics, colliders, raycasting, physics materials, and player controller implementation.',
      sections: [
        {
          heading: '2D & 3D Rigidbodies and Forces',
          content: 'Simulate realistic velocity, mass, gravity, and drag. Apply instantaneous impulses (AddForce with ForceMode.Impulse) for jumps and explosions.',
        },
        {
          heading: 'Colliders vs Triggers',
          content: 'Solid colliders resolve physical impacts (OnCollisionEnter); trigger colliders detect overlap events (OnTriggerEnter) for checkpoints and pickups.',
        },
        {
          heading: 'Raycasting Techniques',
          content: 'Cast invisible rays from world origins or camera viewports to detect ground checks, line of sight, and crosshair weapon impacts using Physics.Raycast.',
        },
      ],
      keyPoints: [
        'All physics code modifying Rigidbodies must live inside FixedUpdate(), never standard Update().',
        'Use LayerMasks with Raycasts to avoid wasting CPU cycles calculating hits against unnecessary geometry.',
        'Prevent tunnelling at high velocities by setting Rigidbody Collision Detection to Continuous.',
      ],
      reviseChecklist: [
        'Can you write a ground check using a downward Physics.Raycast or sphere overlap?',
        'Do you know the difference between OnCollisionEnter and OnTriggerEnter?',
        'Can you configure Physics Materials to create bouncy or high-friction surfaces?',
      ],
    },
  },

  dsa: {
    1: {
      topic: 'Time & Space Complexity',
      summary: 'Big-O notation, asymptotic analysis, worst/average/best cases, and recursion stack memory calculation.',
      sections: [
        {
          heading: 'Asymptotic Analysis & Big-O Notation',
          content: 'Measure algorithm growth rate as input size N tends toward infinity: O(1) constant, O(log N) logarithmic, O(N) linear, O(N log N) linearithmic, O(N^2) quadratic, O(2^N) exponential.',
        },
        {
          heading: 'Space Complexity & Call Stack Overhead',
          content: 'Calculate memory consumed by auxiliary data structures plus function call frames on the execution stack during recursive depth.',
        },
        {
          heading: 'Amortized Complexity',
          content: 'Understand why dynamic array resizing (e.g., ArrayList or JS array push) is amortized O(1) even though periodic capacity doubling takes O(N).',
        },
      ],
      keyPoints: [
        'Drop lower-order terms and constant coefficients: O(3N^2 + 5N + 10) simplifies to O(N^2).',
        'Binary search reduces the problem space by half at each step, yielding O(log N) time.',
        'Premature optimization is the root of evil: write clean, correct code first, then profile bottlenecks.',
      ],
      reviseChecklist: [
        'Can you derive the time complexity of recursive Fibonacci without memoization?',
        'Do you know the difference between in-place algorithms and auxiliary memory?',
        'Can you explain Master Theorem for divide-and-conquer recurrences?',
      ],
    },
    2: {
      topic: 'Arrays & Two Pointers',
      summary: 'Linear contiguous memory structures, prefix sums, sliding windows, and two-pointer traversal strategies.',
      sections: [
        {
          heading: 'Memory Layout and O(1) Indexing',
          content: 'Arrays allocate contiguous memory blocks. Element access arr[i] evaluates in O(1) time via base_address + i * element_size.',
        },
        {
          heading: 'The Two-Pointer Technique',
          content: 'Use two converging pointers (left & right) on sorted arrays for target sum searches (2-Sum II), or fast & slow pointers for cycle detection and in-place removals.',
        },
        {
          heading: 'Sliding Window Pattern',
          content: 'Maintain a dynamic window of elements across contiguous subarrays to solve longest substring and minimum sub-array sum problems in linear O(N) time.',
        },
      ],
      keyPoints: [
        'Prefix sum arrays allow range sum queries arr[L...R] in O(1) time after O(N) pre-computation.',
        'In-place array manipulations avoid allocating extra O(N) auxiliary space.',
        'Be vigilant of index out of bounds exceptions on boundary edge cases (empty arrays, single elements).',
      ],
      reviseChecklist: [
        'Can you solve the 3-Sum problem in O(N^2) time using sorting and two pointers?',
        'Do you know how to expand and contract a sliding window for variable-length substrings?',
        'Can you reverse an array in-place with O(1) extra space?',
      ],
    },
    3: {
      topic: 'Strings & Hash Maps',
      summary: 'Hash tables, collision resolution mechanisms, character frequency frequency counts, and anagram checks.',
      sections: [
        {
          heading: 'Hash Table Internals & Hash Functions',
          content: 'Hash functions convert keys into array index slots. Handle collisions via separate chaining (linked lists / red-black trees) or open addressing (linear probing).',
        },
        {
          heading: 'Lookup Performance & Load Factors',
          content: 'Hash maps achieve average-case O(1) lookup, insertion, and deletion. When the load factor exceeds thresholds (typically 0.75), tables rehash into larger buckets.',
        },
        {
          heading: 'String Manipulation & Anagram Patterns',
          content: 'Strings in most modern languages (Java, Python, JS) are immutable. Use fixed-size integer arrays (int[26]) for fast ASCII character frequency lookups.',
        },
      ],
      keyPoints: [
        'Worst-case hash map lookup degrades to O(N) if all keys hash to the same bucket.',
        'Use StringBuilder or join() methods to avoid quadratic O(N^2) string concatenation overhead.',
        'Hash keys must be immutable with consistent hash code and equality implementations.',
      ],
      reviseChecklist: [
        'Can you determine if two strings are valid anagrams in O(N) time and O(1) extra space?',
        'Do you know how separate chaining resolves hash collisions?',
        'Can you find the first non-repeating character in a string using a single-pass hash map?',
      ],
    },
  },
}

/**
 * Returns structured course study notes for a specific track and step.
 * Falls back to a structured template if custom notes have not been written for higher stops.
 */
export function getCourseNotes(trackKey, stepId, stepTopic = '') {
  if (courseNotes[trackKey]?.[stepId]) {
    return courseNotes[trackKey][stepId]
  }

  // Structured high-quality fallback for steps beyond stop 3
  return {
    topic: stepTopic || `Module ${stepId}`,
    summary: `In-depth core study guide, industry best practices, and practical implementation patterns for ${stepTopic || 'this roadmap stop'}.`,
    sections: [
      {
        heading: 'Architecture & Core Principles',
        content: `Mastering ${stepTopic || 'this module'} requires understanding how it fits into the production software development lifecycle. Review official documentation and observe how modern systems handle configuration, performance, and boundary constraints.`,
      },
      {
        heading: 'Production Patterns & Common Pitfalls',
        content: `When implementing ${stepTopic || 'these concepts'}, avoid anti-patterns such as unhandled exceptions, tight coupling, and lack of test coverage. Focus on writing clean, modular code with clear interfaces.`,
      },
      {
        heading: 'Industry Standards & Scalability',
        content: `Senior engineers evaluate ${stepTopic || 'this topic'} not just on feature completion, but on observability, maintainability, security, and developer ergonomics across the team.`,
      },
    ],
    keyPoints: [
      `Review the official documentation linked on this stop to stay up-to-date with current API standards.`,
      `Implement the suggested practice project to solidify hands-on muscle memory.`,
      `Write clear comments explaining non-obvious architecture decisions.`,
    ],
    reviseChecklist: [
      `Can you explain the main use cases for ${stepTopic || 'this stop'} in a technical interview?`,
      `Have you completed the code exercises or practice project suggested for this stop?`,
      `Do you know how to debug common errors associated with this technology?`,
    ],
  }
}

