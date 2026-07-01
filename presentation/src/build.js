const fs = require('fs');
const path = require('path');

const sourceDir = __dirname;
const target = path.join(sourceDir, 'rl-engineering-tools-landscape.js');
const parts = fs.readdirSync(sourceDir)
  .filter((name) => /^part-\d+$/.test(name))
  .sort();

if (parts.length === 0) {
  throw new Error('No presentation source parts were found.');
}

const source = parts
  .map((name) => fs.readFileSync(path.join(sourceDir, name), 'utf8'))
  .join('');

fs.writeFileSync(target, source);
require(target);
