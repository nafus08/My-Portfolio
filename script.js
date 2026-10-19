const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');
const themeToggle = document.querySelector('.theme-toggle');

function applyTheme(theme) {
  const isDark = theme === 'dark';
  document.body.dataset.theme = isDark ? 'dark' : 'light';
  if (themeToggle) {
    themeToggle.setAttribute('aria-pressed', String(isDark));
    themeToggle.setAttribute('aria-label', `Switch to ${isDark ? 'light' : 'dark'} mode`);
    themeToggle.innerHTML = isDark ? '☀ <span>Light mode</span>' : '☾ <span>Dark mode</span>';
  }
}

const savedTheme = localStorage.getItem('portfolio-theme');
applyTheme(savedTheme === 'dark' ? 'dark' : 'light');

if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    const nextTheme = document.body.dataset.theme === 'dark' ? 'light' : 'dark';
    localStorage.setItem('portfolio-theme', nextTheme);
    applyTheme(nextTheme);
  });
}

if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('is-open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });

  navLinks.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('is-open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

const currentYear = document.getElementById('year');
if (currentYear) {
  currentYear.textContent = new Date().getFullYear();
}

const projectData = {
  'school-management': {
    name: 'School Management System',
    image: 'images/school-management-login.png',
    imageAlt: 'School Management System sign-in page',
    description:
      'A full-stack school management system with a responsive TypeScript front end, dynamic routing, and form validation for student, teacher, and admin roles. The Node.js application queries a designed MySQL schema to manage student records, attendance, and grades.',
    stack: ['Node.js', 'TypeScript', 'MySQL'],
    live: 'https://school-management-system-mxu496sbg.vercel.app/',
    liveAccessNote: true,
    github: 'https://github.com/nafus08/school-management-system',
    challenges: 'Designing relational data for student records, attendance, and grades while supporting distinct student, teacher, and admin workflows.',
    improvements: 'Possible next steps include adding reporting dashboards, finer-grained permissions, and automated test coverage.'
  },
  'used-car-parts': {
    name: 'UsedCarParts',
    image: 'images/used-car-parts-wireframes.png',
    imageAlt: 'UsedCarParts marketplace app wireframes',
    description:
      'An Android marketplace app for buying and selling used car parts. The app includes listings and user accounts, with Firebase authentication, database, storage, and real-time data synchronization. Wireframes and an ERD were created before development.',
    stack: ['Kotlin', 'Gradle', 'Firebase'],
    live: null,
    github: 'https://github.com/nafus08/used-car-parts',
    challenges: 'Supporting Arabic content with a right-to-left layout alongside real-time marketplace listings and user accounts.',
    improvements: 'Possible next steps include richer search and filtering, saved listings, and expanded listing-management tools.'
  },
  'customer-churn': {
    name: 'Customer Churn Prediction',
    image: 'images/customer-churn-roc.png',
    imageAlt: 'ROC curve comparison for customer churn prediction models',
    description:
      'A machine-learning project implementing neural network, K-nearest neighbors, and logistic regression classifiers from scratch. Models were compared using a prepared dataset, tuned hyperparameters, and evaluated with accuracy and other metrics documented in a project report.',
    stack: ['Python', 'Neural Network', 'KNN', 'Logistic Regression'],
    live: null,
    github: 'https://github.com/nafus08/customer-churn-prediction',
    challenges: 'Preprocessing data, tuning hyperparameters, and comparing multiple classifiers with consistent evaluation metrics.',
    improvements: 'Possible next steps include cross-validation, additional evaluation metrics, and testing against further datasets.'
  }
};

const projectId = new URLSearchParams(window.location.search).get('project');
const detailPage = document.querySelector('.detail-page');

if (detailPage && projectId && projectData[projectId]) {
  const project = projectData[projectId];
  document.title = `${project.name} | Nafus`;

  const nameEl = document.querySelector('[data-project-name]');
  const imageEl = document.querySelector('[data-project-image]');
  const descriptionEl = document.querySelector('[data-project-description]');
  const stackEl = document.querySelector('[data-project-stack]');
  const liveEl = document.querySelector('[data-project-live]');
  const liveRow = document.querySelector('[data-project-live-row]');
  const liveNote = document.querySelector('[data-project-live-note]');
  const githubEl = document.querySelector('[data-project-github]');
  const challengeEl = document.querySelector('[data-project-challenges]');
  const futureEl = document.querySelector('[data-project-future]');

  if (nameEl) nameEl.textContent = project.name;
  if (imageEl) {
    imageEl.src = project.image;
    imageEl.alt = project.imageAlt;
  }
  if (descriptionEl) descriptionEl.textContent = project.description;
  if (stackEl) {
    stackEl.innerHTML = project.stack.map((item) => `<span>${item}</span>`).join('');
  }
  if (liveEl) {
    if (project.live) {
      liveEl.href = project.live;
      if (liveRow) liveRow.hidden = false;
    } else {
      if (liveRow) liveRow.hidden = true;
    }
  }
  if (githubEl) githubEl.href = project.github;
  if (liveNote) liveNote.hidden = !project.liveAccessNote;
  if (challengeEl) challengeEl.textContent = project.challenges;
  if (futureEl) futureEl.textContent = project.improvements;
}
