import axios from 'axios';
import {promises as fs} from 'fs';
import {fileURLToPath} from 'url';
import path from 'path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

interface FileSource {
  id: string;
  path: string;
  isRemote: boolean;
  showId: boolean;
}

const files: FileSource[] = [
  {id: 'Starting instructions', path: '../llm-instructions-start.md', isRemote: false, showId: false},
  {
    id: 'User Guide',
    path: 'https://raw.githubusercontent.com/UltimateHackingKeyboard/firmware/master/doc-dev/user-guide.md',
    isRemote: true,
    showId: true
  },
  {
    id: 'Reference Manual',
    path: 'https://raw.githubusercontent.com/UltimateHackingKeyboard/firmware/master/doc-dev/reference-manual.md',
    isRemote: true,
    showId: true
  },
  {id: 'JSyntax favourite macros', path: '../../macros.md', isRemote: false, showId: true},
  {id: 'End instructions', path: '../llm-instructions-end.md', isRemote: false, showId: false},
];

async function fetchRemoteFile(url: string): Promise<string> {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error(`Failed to fetch remote file from ${url}: ${error}`);
    return '';
  }
}

async function readLocalFile(filePath: string): Promise<string> {
  try {
    const fullPath = path.resolve(__dirname, filePath);
    return await fs.readFile(fullPath, 'utf8');
  } catch (error) {
    console.error(`Failed to read local file from ${filePath}: ${error}`);
    return '';
  }
}

async function generateMarkdownFile() {
  const fileContents = await Promise.all(files.map(file => {
    const header = file.showId ? `The following text is \`${file.id}\`:\n\n` : '';

    if (file.isRemote) {
      return fetchRemoteFile(file.path).then(content => `${header}${content}`);
    } else {
      return readLocalFile(file.path).then(content => `${header}${content}`);
    }
  }));

  const combinedContent = fileContents.join('\n\n---\n\n');

  try {
    await fs.writeFile('llm-uhk-smart-macro-initial-prompt.md', combinedContent);
    console.log('Markdown file generated successfully.');
  } catch (error) {
    console.error(`Failed to write to markdown file: ${error}`);
  }
}

generateMarkdownFile();