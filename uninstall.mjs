#!/usr/bin/env node

'use strict';

import { spawnSync as spawnSyncBuiltin } from 'child_process';
import path from 'path';
import fs from 'fs';
import os from 'os';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

process.chdir(__dirname);

/**
 *
 * @param {string} command
 * @param  {...string} args
 */
function runCommand(command, ...args) {
    spawnSyncBuiltin(command, args, { stdio: 'inherit', shell: true });

    console.log('\n-------------------------------\n');
}


console.log(`Removing 'node-command-alias-local'`);

runCommand('npm', 'uninstall', '-g', 'node-command-alias-local');


const ncaAliasDir = path.join(os.homedir(), '.nca', 'alias');

console.log(`Removing local aliases in ${ncaAliasDir}`);

fs.rmSync(ncaAliasDir, { recursive: true, force: true });


const nodeModulesDir = path.resolve(__dirname, 'node_modules');

console.log(`Removing 'node_modules' in ${nodeModulesDir}`);

fs.rmSync(nodeModulesDir, { recursive: true, force: true });


console.log(`Removing 'node-command-alias'`);

runCommand('npm', 'uninstall', '-g', 'node-command-alias');
