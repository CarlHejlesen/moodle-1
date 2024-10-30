const fs = require('fs');
const path = require('path');

// Stien til livequiz-mappen
const livequizDir = path.join(__dirname, 'server', 'moodle', 'mod', 'livequiz');
// Outputfilen
const outputFile = path.join(__dirname, 'output.txt');

// Funktion til at læse alle filer rekursivt i en mappe
function readFilesRecursively(dir) {
  let filesContent = '';

  // Hent alle filer og mapper i det angivne dir
  const items = fs.readdirSync(dir, { withFileTypes: true });

  items.forEach(item => {
    const itemPath = path.join(dir, item.name);

    if (item.isFile()) {
      // Læs filens indhold og tilføj til filesContent
      const content = fs.readFileSync(itemPath, 'utf-8');
      filesContent += `\n\n--- ${itemPath} ---\n${content}`;
    } else if (item.isDirectory()) {
      // Hvis det er en mappe, kald funktionen rekursivt
      filesContent += readFilesRecursively(itemPath);
    }
  });

  return filesContent;
}

// Kør funktionen og gem resultatet i output.txt
const allFilesContent = readFilesRecursively(livequizDir);
fs.writeFileSync(outputFile, allFilesContent, 'utf-8');

console.log(`Alle filer er samlet i ${outputFile}`);
