#!/usr/bin/env node

import { spawnSync } from 'child_process';
import path from 'path';
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
    spawnSync(command, args, { stdio: 'inherit', shell: true });
}

/**
 * Create an alias for a command
 *
 * @param {string[]} ncaCommand - The command to create an alias for
 * @param {string} [aliasName=null] - The name of the alias
 */
function createNcaAlias(ncaCommand, aliasName = null) {
    runCommand('nca', 'alias', 'add', ...ncaCommand);
    if (aliasName) {
        runCommand('nca', 'alias', 'rename', ncaCommand[0], aliasName);
    }
}

runCommand('npm', 'link', 'node-command-alias');

createNcaAlias(['shell-bookmarks', 'bookmark'], 'bk');
createNcaAlias(['shell-bookmarks', 'unbookmark'], 'ubk');
