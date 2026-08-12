import fs from 'fs';
import path from 'path';

function syncResume() {
  const srcDir = path.resolve('resume');
  const destDir = path.resolve('public');
  const targetName = 'PATNALA UDAY KUMAR.pdf';
  const destFile = path.join(destDir, targetName);

  if (!fs.existsSync(srcDir)) {
    fs.mkdirSync(srcDir, { recursive: true });
  }

  try {
    const files = fs.readdirSync(srcDir);
    const pdfFiles = files.filter(f => f.toLowerCase().endsWith('.pdf'));

    if (pdfFiles.length > 0) {
      let chosenFile = pdfFiles.find(f => f.toLowerCase() === targetName.toLowerCase()) || pdfFiles[0];
      const srcFile = path.join(srcDir, chosenFile);
      fs.copyFileSync(srcFile, destFile);
      console.log(`[Resume Sync] Successfully synced '${chosenFile}' from resume/ to public/${targetName}`);
    } else if (fs.existsSync(destFile)) {
      const initialSrcFile = path.join(srcDir, targetName);
      fs.copyFileSync(destFile, initialSrcFile);
      console.log(`[Resume Sync] Initialized resume/ with ${targetName} from public/`);
    } else {
      console.warn(`[Resume Sync] Warning: No PDF found in resume/ or public/`);
    }
  } catch (err) {
    console.error(`[Resume Sync] Sync error:`, err);
  }
}

syncResume();
