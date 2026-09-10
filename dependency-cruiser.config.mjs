export default {
  forbidden: [
    {
      name: 'no-circular-dependencies',
      severity: 'error',
      from: {},
      to: { circular: true },
    },
    {
      name: 'domain-does-not-depend-on-apps',
      severity: 'error',
      from: { path: '^packages/domain' },
      to: { path: '^apps/' },
    },
    {
      name: 'domain-does-not-depend-on-external-packages',
      severity: 'error',
      from: { path: '^packages/domain' },
      to: { dependencyTypes: ['npm', 'npm-dev', 'npm-optional', 'npm-peer'] },
    },
    {
      name: 'contracts-do-not-depend-on-apps',
      severity: 'error',
      from: { path: '^packages/contracts' },
      to: { path: '^apps/' },
    },
    {
      name: 'web-does-not-depend-on-api',
      severity: 'error',
      from: { path: '^apps/web' },
      to: { path: '^apps/api' },
    },
  ],
  options: {
    doNotFollow: { path: 'node_modules' },
    exclude: { path: '(dist|coverage|node_modules)' },
    tsConfig: { fileName: 'tsconfig.json' },
  },
};
