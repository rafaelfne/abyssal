import { access, readFile, readdir } from 'node:fs/promises';
import { dirname, extname, join, relative, resolve } from 'node:path';

const ignoredDirectories = new Set(['.git', 'dist', 'node_modules']);

async function markdownFiles(path: string): Promise<string[]> {
  const entries = await readdir(path, { withFileTypes: true });
  const files = await Promise.all(
    entries.map(async (entry) => {
      const entryPath = join(path, entry.name);
      if (entry.isDirectory()) {
        return ignoredDirectories.has(entry.name)
          ? []
          : markdownFiles(entryPath);
      }
      return extname(entry.name) === '.md' ? [entryPath] : [];
    }),
  );
  return files.flat();
}

const failures: string[] = [];
const linkPattern = /!?\[[^\]]*\]\(([^)]+)\)/g;

for (const file of await markdownFiles(process.cwd())) {
  const content = await readFile(file, 'utf8');
  for (const match of content.matchAll(linkPattern)) {
    const rawTarget = match[1]?.trim().replace(/^<|>$/g, '');
    const target = rawTarget?.split(/\s+/)[0]?.split('#')[0];
    if (
      !target ||
      target.startsWith('#') ||
      /^(?:https?:|mailto:)/.test(target)
    ) {
      continue;
    }
    const targetPath = resolve(dirname(file), decodeURIComponent(target));
    try {
      await access(targetPath);
    } catch {
      failures.push(`${relative(process.cwd(), file)} -> ${target}`);
    }
  }
}

if (failures.length > 0) {
  console.error(failures.join('\n'));
  process.exitCode = 1;
}
