const fs = require('fs');
const path = require('path');

const flow = [
  { file: 'Landing.jsx', next: '#/about', label: 'About' },
  { file: 'About.jsx', next: '#/skills', label: 'Skills' },
  { file: 'Skills.jsx', next: '#/journey', label: 'Journey' },
  { file: 'Journey.jsx', next: '#/projects', label: 'Projects' },
  { file: 'Projects.jsx', next: '#/experience', label: 'Experience' },
  { file: 'Experience.jsx', next: '#/achievements', label: 'Achievements' },
  { file: 'Achievements.jsx', next: '#/contact', label: 'Contact' }
];

flow.forEach(({ file, next, label }) => {
  const filePath = path.join(__dirname, 'src/v2/pages', file);
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Add import if not exists
    if (!content.includes('NextPageButton')) {
      const importStatement = `import NextPageButton from '../../components/NextPageButton';\n`;
      const lastImportIndex = content.lastIndexOf('import ');
      const endOfLastImport = content.indexOf('\n', lastImportIndex) + 1;
      content = content.slice(0, endOfLastImport) + importStatement + content.slice(endOfLastImport);
    }

    // Find the last occurrence of "</div>" that precedes "};"
    // A safer way is to split by lines.
    const lines = content.split('\n');
    let injected = false;
    for (let i = lines.length - 1; i >= 0; i--) {
      if (lines[i].includes('</div>') && !injected) {
        // insert before this line
        lines.splice(i, 0, `      <NextPageButton to="${next}" label="${label}" isDarkMode={isDarkMode} />`);
        injected = true;
        break;
      }
    }

    fs.writeFileSync(filePath, lines.join('\n'));
    console.log(`Updated ${file}`);
  }
});
