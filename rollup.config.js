import { resolve } from "path";
import { outputFileSync } from "fs-extra";
import { plugin as analyzer } from "rollup-plugin-analyzer";
import common from "rollup-plugin-commonjs";
import babel from "rollup-plugin-babel";
import nodeResolve from "rollup-plugin-node-resolve";
import { terser } from "rollup-plugin-terser";

outputFileSync(
  resolve(process.cwd(), "lib/browser/index.js"),
  `
'use strict';
if (process.env.NODE_ENV === 'production') {
  module.exports = require('./production.min.js');
} else {
  module.exports = require('./development.js');
}
`
);

function getKeys(dependencies = []) {
  return Object.keys(dependencies);
}

const packageJson = require("./package.json"); // eslint-disable-line import/no-dynamic-require
const peerDependencies = getKeys(packageJson.peerDependencies);
const externalModuleNames = [...peerDependencies];

function external(id) {
  return externalModuleNames.some(name => id.startsWith(name));
}

const defaultBabelOptions = {
  configFile: "./babel.config.js",
  runtimeHelpers: true
};

const defaultPlugins = [
  nodeResolve({
    extensions: [".js", ".jsx"],
    modulesOnly: true
  }),
  common(),
  babel(defaultBabelOptions)
];

function writeTo(analysisString) {
  outputFileSync(
    resolve(process.cwd(), "lib/browser/production.analysis.txt"),
    analysisString
  );
}

export default [
  {
    input: "src/index.js",
    output: {
      file: "lib/browser/development.js",
      format: "esm",
      sourcemap: true
    },
    external,
    plugins: defaultPlugins
  },
  {
    input: "src/index.js",
    output: {
      file: "lib/browser/production.min.js",
      format: "esm",
      sourcemap: true
    },
    external,
    plugins: [...defaultPlugins, terser(), analyzer({ writeTo })]
  }
];
