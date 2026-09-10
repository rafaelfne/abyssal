import { readFile, readdir } from 'node:fs/promises';
import { join } from 'node:path';
import { parse } from 'yaml';

type SkillFrontmatter = {
  name?: string;
  description?: string;
};

type SkillMetadata = {
  interface?: {
    default_prompt?: string;
    display_name?: string;
    short_description?: string;
  };
};

const skillsRoot = join(process.cwd(), '.agents', 'skills');
const skillNames = await readdir(skillsRoot);
const failures: string[] = [];

for (const skillName of skillNames) {
  const skillPath = join(skillsRoot, skillName);
  const content = await readFile(join(skillPath, 'SKILL.md'), 'utf8');
  const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---/);
  if (!frontmatterMatch?.[1]) {
    failures.push(`${skillName}: missing frontmatter`);
    continue;
  }

  const frontmatter = parse(frontmatterMatch[1]) as SkillFrontmatter;
  const metadata = parse(
    await readFile(join(skillPath, 'agents', 'openai.yaml'), 'utf8'),
  ) as SkillMetadata;
  if (frontmatter.name !== skillName) {
    failures.push(`${skillName}: frontmatter name does not match folder`);
  }
  if (!frontmatter.description?.trim()) {
    failures.push(`${skillName}: missing description`);
  }
  if (!metadata.interface?.display_name) {
    failures.push(`${skillName}: missing display name`);
  }
  const shortDescription = metadata.interface?.short_description ?? '';
  if (shortDescription.length < 25 || shortDescription.length > 64) {
    failures.push(`${skillName}: short description must have 25-64 characters`);
  }
  if (!metadata.interface?.default_prompt?.includes(`$${skillName}`)) {
    failures.push(`${skillName}: default prompt must reference $${skillName}`);
  }
  if (/\b(?:TODO|TBD)\b/.test(content)) {
    failures.push(`${skillName}: unfinished placeholder`);
  }
}

if (failures.length > 0) {
  console.error(failures.join('\n'));
  process.exitCode = 1;
}
