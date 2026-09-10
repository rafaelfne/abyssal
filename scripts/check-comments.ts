import { readFile, readdir } from 'node:fs/promises';
import { extname, join, relative } from 'node:path';
import { findCommentViolations } from './lib/comment-policy.js';

const sourceExtensions = new Set([
  '.ts',
  '.tsx',
  '.js',
  '.jsx',
  '.mjs',
  '.cjs',
]);
const roots = ['apps', 'packages', 'scripts', 'tooling'];
const ignoredDirectories = new Set(['dist', 'coverage', 'node_modules']);

async function sourceFiles(path: string): Promise<string[]> {
  const entries = await readdir(path, { withFileTypes: true });
  const files = await Promise.all(
    entries.map(async (entry) => {
      const entryPath = join(path, entry.name);
      if (entry.isDirectory()) {
        return ignoredDirectories.has(entry.name) ? [] : sourceFiles(entryPath);
      }
      return sourceExtensions.has(extname(entry.name)) ? [entryPath] : [];
    }),
  );
  return files.flat();
}

const files = (await Promise.all(roots.map(sourceFiles))).flat();
const violations = (
  await Promise.all(
    files.map(async (file) => {
      const source = await readFile(file, 'utf8');
      return findCommentViolations(source).map(
        (violation) =>
          `${relative(process.cwd(), file)}:${violation.line} ${violation.text}`,
      );
    }),
  )
).flat();

if (violations.length > 0) {
  console.error(violations.join('\n'));
  process.exitCode = 1;
}
