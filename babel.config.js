module.exports = api => {
  const env = api.env();
  const modules = env === 'main' || env === 'test' ? 'commonjs' : false;
  let ignore;

  if (env === 'main' || env === 'module') {
    ignore = ['**/*.test.js', '**/*.test.jsx'];
  } else {
    ignore = ['**/lib/**', '**/node_modules/**'];
  }

  return {
    comments: false,
    ignore,
    plugins: [
      ['@babel/plugin-proposal-decorators', { legacy: true }],
      ['@babel/plugin-proposal-class-properties', { loose: false }],
      '@babel/plugin-proposal-export-default-from',
      '@babel/plugin-proposal-export-namespace-from',
      '@babel/plugin-proposal-function-sent',
      '@babel/plugin-proposal-json-strings',
      '@babel/plugin-proposal-numeric-separator',
      '@babel/plugin-proposal-throw-expressions',
      '@babel/plugin-syntax-dynamic-import',
      '@babel/plugin-syntax-import-meta',
      [
        '@babel/plugin-transform-runtime',
        {
          corejs: false,
          helpers: true,
          regenerator: true,
          useESModules: false
        }
      ]
    ],
    presets: [
      [
        '@babel/preset-env',
        {
          modules,
          targets: { browsers: 'last 2 versions' },
          useBuiltIns: 'usage'
        }
      ],
      '@babel/preset-react'
    ]
  };
};
