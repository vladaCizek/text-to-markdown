import fs from 'fs-extra';
import path from 'path';

export async function checkAndCreateFolder(folderPath) {
  try {
    await fs.ensureDir(folderPath);
    console.log(`Folder ensured: ${folderPath}`);
  } catch (err) {
    console.error(`Error ensuring folder: ${folderPath}`, err);
  }
}

export function checkAndCreateFile(filePath, content = '') {
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, content);
    console.log(`File created: ${filePath}`);
  } else {
    console.log(`File already exists: ${filePath}`);
  }
}

export function fileExists(filePath) {
  return fs.existsSync(filePath);
}

export function folderExists(folderPath) {
  return fs.existsSync(folderPath);
}