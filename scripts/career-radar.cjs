const fs = require('node:fs');
const path = require('node:path');

const target = {
  name: 'Federico Croletti',
  minimumSalary: '60000 EUR+',
  homeBase: 'Via Carlo Perini, Milano',
  workMode: ['remote', 'hybrid Milan'],
  preferredContract: 'employee',
  primaryRoles: [
    'Frontend Tech Lead',
    'Angular Tech Lead',
    'Angular Architect',
    'AI-focused Frontend Lead',
  ],
  growthRoles: ['Engineering Manager', 'Delivery Manager', 'Technical Manager'],
};

const portals = [
  {
    name: 'LinkedIn Jobs',
    url: 'https://www.linkedin.com/jobs/search/?keywords={query}&location=Milano%2C%20Lombardia%2C%20Italia&f_WT=2%2C3&f_TPR=r86400',
  },
  {
    name: 'Indeed',
    url: 'https://it.indeed.com/jobs?q={query}&l=Milano%2C%20Lombardia&fromage=3&sc=0kf%3Aattr%28DSQF7%29%3B',
  },
  {
    name: 'InfoJobs',
    url: 'https://www.infojobs.it/offerte-lavoro/milano/{query}',
  },
  {
    name: 'Google Jobs search',
    url: 'https://www.google.com/search?q={query}+Milano+remote+hybrid+60k+jobs',
  },
];

const queries = [
  'Frontend Tech Lead Angular',
  'Angular Tech Lead',
  'Angular Architect',
  'Frontend Lead AI',
  'Engineering Manager Frontend',
  'Delivery Manager Angular',
  'Technical Manager Frontend',
];

const companyTargets = [
  'Capgemini',
  'Accenture',
  'Reply',
  'BIP',
  'NTT DATA',
  'Engineering Ingegneria Informatica',
  'Deloitte Digital',
  'Avanade',
  'Intesa Sanpaolo',
  'Bending Spoons',
  'Prima Assicurazioni',
  'Satispay',
  'Facile.it',
  'Moneyfarm',
  'Docebo',
];

const scoring = [
  ['+3', 'RAL dichiarata o range compatibile con 60k+'],
  ['+3', 'Tech Lead, Angular Lead, Frontend Architect o Engineering Manager'],
  ['+2', 'Remoto o ibrido Milano raggiungibile da Via Carlo Perini'],
  ['+2', 'Responsabilità su persone, delivery, mentoring o stakeholder'],
  ['+2', 'AI, Copilot, platform engineering, productivity o modernization'],
  ['-3', 'Ruolo puramente hands-on senza leadership'],
  ['-3', 'Presenza full-time lontana da Milano Nord/Ovest'],
  ['-2', 'RAL non indicata e seniority poco chiara'],
];

function encodeQuery(value) {
  return encodeURIComponent(value).replace(/%20/g, '+');
}

function renderSearches() {
  return queries
    .map((query) => {
      const links = portals
        .map((portal) => `- ${portal.name}: ${portal.url.replace('{query}', encodeQuery(query))}`)
        .join('\n');
      return `### ${query}\n${links}`;
    })
    .join('\n\n');
}

function renderCompanyTargets() {
  return companyTargets.map((company) => `- ${company}`).join('\n');
}

function renderScoring() {
  return scoring.map(([score, rule]) => `- ${score}: ${rule}`).join('\n');
}

function renderReport() {
  const now = new Date().toISOString().slice(0, 10);
  return `# Career Radar - ${target.name}\n\nGenerated: ${now}\n\n## Target\n\n- RAL: ${target.minimumSalary}\n- Base: ${target.homeBase}\n- Modalita: ${target.workMode.join(', ')}\n- Contratto: ${target.preferredContract}\n- Ruoli principali: ${target.primaryRoles.join(', ')}\n- Evoluzione: ${target.growthRoles.join(', ')}\n\n## Daily Search Links\n\n${renderSearches()}\n\n## Company Watchlist\n\n${renderCompanyTargets()}\n\n## Scoring Rules\n\n${renderScoring()}\n\n## Candidate Shortlist Template\n\n| Score | Azienda | Ruolo | RAL/benefit | Modalita | Distanza | Link | Azione |\n| --- | --- | --- | --- | --- | --- | --- | --- |\n|  |  |  |  |  |  |  |  |\n\n## Outreach Message\n\nBuongiorno, sono Federico Croletti, Senior Software Engineer / Frontend Tech Lead con esperienza su Angular enterprise, Micro Frontend, Module Federation, team leadership e uso pratico di AI/Copilot nei flussi di sviluppo. Sto valutando ruoli dipendenti da Frontend Tech Lead, Angular Tech Lead o percorsi verso Engineering/Delivery Management, preferibilmente remoto o ibrido su Milano. Se il ruolo prevede responsabilita tecnica, crescita del team e un pacchetto da 60k+ sarei felice di approfondire.\n`;
}

const outputPath = path.resolve(__dirname, '..', 'docs', 'CAREER-RADAR.md');
fs.writeFileSync(outputPath, renderReport(), 'utf8');
console.log(`Career radar written to ${outputPath}`);
