import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import fs from 'fs'
import path from 'path'

// Custom plugin to copy/synchronize resume from root 'resume/' folder to 'public/' folder
function copyResumePlugin() {
  const syncResume = () => {
    const srcDir = path.resolve('resume');
    const destDir = path.resolve('public');
    const targetName = 'PATNALA UDAY KUMAR.pdf';
    const destFile = path.join(destDir, targetName);

    // Ensure resume/ directory exists
    if (!fs.existsSync(srcDir)) {
      fs.mkdirSync(srcDir, { recursive: true });
    }

    try {
      const files = fs.readdirSync(srcDir);
      const pdfFiles = files.filter(f => f.toLowerCase().endsWith('.pdf'));

      if (pdfFiles.length > 0) {
        // Look for exact match or target name (case-insensitive)
        let chosenFile = pdfFiles.find(f => f.toLowerCase() === targetName.toLowerCase());
        if (!chosenFile) {
          // Fallback to first PDF in the directory
          chosenFile = pdfFiles[0];
        }
        const srcFile = path.join(srcDir, chosenFile);
        
        fs.copyFileSync(srcFile, destFile);
        console.log(`[Resume Sync] Synchronized '${chosenFile}' from resume/ to public/${targetName}`);
      } else {
        // Initialize resume/ folder with the file from public/ if available
        if (fs.existsSync(destFile)) {
          const initialSrcFile = path.join(srcDir, targetName);
          fs.copyFileSync(destFile, initialSrcFile);
          console.log(`[Resume Sync] Initialized resume/ directory with existing ${targetName} from public/`);
        } else {
          console.warn(`[Resume Sync] No PDF files found in resume/ or public/`);
        }
      }
    } catch (err) {
      console.error(`[Resume Sync] Failed to synchronize resume file:`, err);
    }
  };

  return {
    name: 'copy-resume-plugin',
    buildStart() {
      syncResume();
    },
    configureServer(server) {
      const resumeDir = path.resolve('resume');
      server.watcher.add(resumeDir);
      server.watcher.on('all', (event, filePath) => {
        if (filePath.startsWith(resumeDir) && filePath.toLowerCase().endsWith('.pdf')) {
          console.log(`[Resume Sync] Live change detected (${event}) in resume/. Syncing...`);
          syncResume();
        }
      });
    }
  };
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), copyResumePlugin()],
})

