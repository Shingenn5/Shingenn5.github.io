const projects = {
  rasputin: {
    title: 'Rasputin — a local AI desktop app',
    intro: 'A privacy-first Electron desktop app for running large language models entirely on local hardware, without cloud services or API keys.',
    repo: 'https://github.com/Shingenn5/Rasputin',
    sections: [
      ['My contribution', 'Designed and built an Electron application with a React 18 frontend, Python FastAPI backend, and SQLite storage.'],
      ['Model orchestration with WarSat', 'Engineered model discovery, deployment, and approval-gated lifecycle management across llama.cpp and vLLM.'],
      ['Testing and automation', 'Tested the application with Playwright and built automation scripts for local research.']
    ]
  },
  geo: {
    title: 'Geo Graph — geospatial evidence workspace',
    intro: 'A TypeScript field survey workspace built with MapLibre and Cesium.',
    repo: 'https://github.com/Shingenn5/Geo-Graph',
    sections: [
      ['Connected evidence', 'Connected terrain, imagery, soils, geology, faults, and Utah well data in one workspace.'],
      ['Source context', 'Preserved source context and interpretation limits for geospatial evidence.']
    ]
  },
  forensics: {
    title: 'Digital Forensics Case Analysis',
    intro: 'Digital forensic investigations using Exterro FTK.',
    sections: [
      ['Investigation and analysis', 'Conducted in-depth digital forensic investigations and analyzed digital evidence to support case findings.'],
      ['Communicating findings', 'Translated findings into clear executive summaries for non-technical audiences.'],
      ['Related credential', 'Exterro FTK Ace Certification, earned in 2026.']
    ]
  }
};
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
