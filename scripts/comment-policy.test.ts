import { describe, expect, it } from 'vitest';
import { findCommentViolations } from './lib/comment-policy.js';

describe('comment policy', () => {
  it('rejects ordinary comments', () => {
    expect(
      findCommentViolations('// explain the code\nconst value = 1;'),
    ).toEqual([{ line: 1, text: '// explain the code' }]);
  });

  it('accepts a justified tool directive', () => {
    const source = [
      '// reason: External type is incomplete.',
      '// @ts-expect-error',
      'const value: string = 1;',
    ].join('\n');
    expect(findCommentViolations(source)).toEqual([]);
  });

  it('rejects an unjustified tool directive', () => {
    expect(findCommentViolations('// @ts-ignore\nconst value = 1;')).toEqual([
      { line: 1, text: '// @ts-ignore' },
    ]);
  });
});
