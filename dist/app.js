const projects = {
  rasputin: {title:'Rasputin — a local AI workbench',intro:'An independent software project exploring how to make local language models easier to work with.',sections:[['The problem','Running models on personal hardware involves more than a chat box: the interface, backend, model lifecycle, and hardware all need to work together.'],['My contribution','Full-stack development across a React interface, Python FastAPI backend, and a model orchestration layer. The project combines application development with hands-on work on local inference.'],['Technical focus','React, Vite, FastAPI, SQLite, ChromaDB, and local model runtimes. My current direction focuses on native execution with llama.cpp.'],['Project status','An ongoing personal project. I can discuss the architecture, implementation tradeoffs, and development process in an interview.']]},
  forensics: {title:'Digital Forensics Case Analysis',intro:'Academic investigations that connect technical evidence to understandable findings.',sections:[['The work','Used Exterro FTK to examine digital evidence in academic case investigations.'],['The communication challenge','Translated findings into executive summaries for non-technical audiences, focusing on making the analysis understandable.'],['Related credential','Exterro FTK Ace Certification, earned in 2024.']]}
};
Object.assign(projects, {
  population: {title:'State Population Explorer',intro:'An AI-assisted academic web project that helps students compare U.S. state populations over time.',repo:'https://github.com/Shingenn5/Final-Term-Project',sections:[['What it does','Select states individually or by region, move a year slider, and compare total population, absolute change, or percentage change. The interface includes a chart description for screen readers and loading and error states.'],['How it works','A static HTML, CSS, and JavaScript application uses the Data USA API and Chart.js to turn population records into interactive charts and yearly summaries.'],['Development context','The repository explicitly documents using Codex to generate the implementation. This project explores AI-assisted frontend development and integrating data, interaction, and accessibility requirements.']]},
  weather: {title:'Cookeville Weather',intro:'A focused weather interface for Cookeville, Tennessee.',repo:'https://github.com/Shingenn5/Shingenn5.github.io',sections:[['What it does','Displays current temperature, humidity, wind speed, and feels-like temperature, followed by a seven-day forecast and an embedded Windy map.'],['How it works','Vanilla JavaScript fetches current conditions and forecast data from Open-Meteo, then populates a Bootstrap interface with weather icons, forecast cards, and an API error state.'],['Project scope','A frontend learning project for a fixed location. The portfolio description is based on the repository implementation; the external weather services have not been runtime-tested here.']]},
});
projects.rasputin.repo = 'https://github.com/Shingenn5/Rasputin';
const dialog = document.querySelector('#project-dialog');
document.querySelectorAll('[data-project]').forEach(button => button.addEventListener('click', () => {
  const project = projects[button.dataset.project];
  document.querySelector('#dialog-title').textContent = project.title;
  document.querySelector('#dialog-intro').textContent = project.intro;
  const content = document.querySelector('#dialog-content');
  content.replaceChildren();
  project.sections.forEach(([heading, text]) => {const section = document.createElement('section');const h = document.createElement('h3');h.textContent = heading;const p = document.createElement('p');p.textContent = text;section.append(h,p);content.append(section);});
  if (project.repo) {const link = document.createElement('a');link.className = 'source-link';link.href = project.repo;link.target = '_blank';link.rel = 'noopener noreferrer';link.textContent = 'View source on GitHub ↗';content.append(link);}
  dialog.showModal(); document.body.classList.add('modal-open');
}));
document.querySelector('#close-dialog').addEventListener('click', () => dialog.close());
dialog.addEventListener('close', () => document.body.classList.remove('modal-open'));
dialog.addEventListener('click', event => {if(event.target === dialog){const rect = dialog.getBoundingClientRect();if(event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialog.close();}});
document.querySelector('#year').textContent = new Date().getFullYear();
