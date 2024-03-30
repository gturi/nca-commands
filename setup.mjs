#!/usr/bin/env node

import { spawnSync } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

process.chdir(__dirname);

function runCommand(command, ...args) {
    spawnSync(command, args, { stdio: 'inherit', shell: true });
}

function createNcaAlias(ncaCommand, aliasName = null) {
    runCommand('nca', 'alias', 'add', ncaCommand);
    if (aliasName) {
        runCommand('nca', 'alias', 'rename', ncaCommand, aliasName);
    }
}

runCommand('npm', 'link', 'node-command-alias');

createNcaAlias('bookmark', 'bk');
createNcaAlias('unbookmark', 'ubk');
