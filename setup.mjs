#!/usr/bin/env node

'use strict';

import { spawnSync as spawnSyncBuiltin } from 'child_process';
import path from 'path';
import fs from 'fs';
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

function spawnSync(command, ...args) {
    return spawnSyncBuiltin(command, args, { shell: true });
}

function getNpmRoot() {
    return spawnSync('npm', 'root', '-g')?.stdout
        ?.toString()
        ?.split('\n')[0]
        ?? null;
}

function listInstalledNodePackages(global = false) {
    const result = global
        ? spawnSync('npm', 'list', '--json', '-g')
        : spawnSync('npm', 'list', '--json');
    return result?.stdout?.toString()
}

function isNcaInstalledGlobally() {
    return isNcaInstalled(true);
}

function isNcaInstalledLocally(global) {
    return isNcaInstalled(false);
}

function isNcaInstalled(global) {
    const jsonString = listInstalledNodePackages(global);

    if (!jsonString) {
        return false;
    }

    return JSON.parse(jsonString)?.dependencies?.['node-command-alias'] !== undefined;
}

/**
 * Create an alias for a command
 *
 * @param {string[]} ncaCommand - The command to create an alias for
 * @param {string} [aliasName=null] - The name of the alias
 */
function createNcaAlias(ncaCommand, aliasName = null) {
    const defaultAliasName = ncaCommand[0];
    const finalAliasName = aliasName ?? defaultAliasName;

    if (isAliasAlreadyInstalled(finalAliasName)) {
        console.info(`Skip: alias '${finalAliasName}' already installed.`)
        console.log('\n-------------------------------\n');
        return;
    }

    runCommand('nca', 'alias', 'add', ...ncaCommand);

    if (finalAliasName !== defaultAliasName) {
        runCommand('nca', 'alias', 'rename', defaultAliasName, finalAliasName);
    }
}

function getNcaLocalPath() {
    const npmRoot = getNpmRoot();
    const ncaLocalPath = path.resolve(npmRoot, 'node-command-alias-local');

    if (!fs.existsSync(ncaLocalPath)) {
        return null;
    }

    return fs.realpathSync(ncaLocalPath);

}

function isAliasAlreadyInstalled(aliasName) {
    const ncaLocalPath = getNcaLocalPath();

    if (!ncaLocalPath) {
        return false;
    }

    return fs.existsSync(path.resolve(ncaLocalPath, 'bin', aliasName));
}

if (isNcaInstalledGlobally()) {
    console.info(`Skip: 'node-command-alias' already installed globally.`)
    console.log('\n-------------------------------\n');
} else {
    console.info(`Installing 'node-command-alias' globally.`)
    runCommand('npm', 'install', '-g', 'node-command-alias');
}

if (isNcaInstalledLocally()) {
    console.info(`Skip: 'node-command-alias' already linked.`)
    console.log('\n-------------------------------\n');
} else {
    console.info(`Linking 'node-command-alias' to enable script autocompletion.`)
    runCommand('npm', 'link', 'node-command-alias');
}


createNcaAlias(['shell-bookmarks', 'bookmark'], 'bk');

createNcaAlias(['shell-bookmarks', 'unbookmark'], 'ubk');


const warpCommand = 'w';
const ncaMainConfigFilePathVariable = 'ncaMainConfigFilePath';
const shellBookmarksConfigPath = `${__dirname}/shell-bookmarks/shell-bookmarks.yml`;

console.log(`Add the following to your .bashrc to load warp (${warpCommand}) command\n\n`);

console.log(`# [ shell bookmarks ${warpCommand} command ]`);
console.log(`export ${ncaMainConfigFilePathVariable}=${shellBookmarksConfigPath}`);
console.log(`eval "$(nca shell-bookmarks init --cmd ${warpCommand} bash)"`);
console.log(`unset ${ncaMainConfigFilePathVariable}`);
console.log('# [ ------------------------- ]');
