import ts from 'typescript';

export type CommentViolation = {
  line: number;
  text: string;
};

const directivePattern =
  /^(?:\/\/|\/\*)\s*(?:@ts-expect-error|@ts-ignore|@ts-nocheck|eslint-disable(?:-next-line|-line)?|prettier-ignore)\b/;
const reasonPattern = /^\/\/\s*reason:\s+\S/;

export function findCommentViolations(source: string): CommentViolation[] {
  const scanner = ts.createScanner(
    ts.ScriptTarget.Latest,
    false,
    ts.LanguageVariant.JSX,
    source,
  );
  const comments: Array<
    CommentViolation & { kind: 'directive' | 'reason' | 'other' }
  > = [];

  for (
    let token = scanner.scan();
    token !== ts.SyntaxKind.EndOfFileToken;
    token = scanner.scan()
  ) {
    if (
      token !== ts.SyntaxKind.SingleLineCommentTrivia &&
      token !== ts.SyntaxKind.MultiLineCommentTrivia
    ) {
      continue;
    }

    const text = scanner.getTokenText().trim();
    const line =
      ts.getLineAndCharacterOfPosition(
        ts.createSourceFile('source.tsx', source, ts.ScriptTarget.Latest),
        scanner.getTokenPos(),
      ).line + 1;
    const kind = directivePattern.test(text)
      ? 'directive'
      : reasonPattern.test(text)
        ? 'reason'
        : 'other';
    comments.push({ kind, line, text });
  }

  return comments
    .filter((comment, index) => {
      if (comment.kind === 'other') {
        return true;
      }

      const previous = comments[index - 1];
      const next = comments[index + 1];
      const companionKind =
        comment.kind === 'directive' ? 'reason' : 'directive';
      return ![previous, next].some(
        (candidate) =>
          candidate?.kind === companionKind &&
          Math.abs(candidate.line - comment.line) === 1,
      );
    })
    .map(({ line, text }) => ({ line, text }));
}
