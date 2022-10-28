#!/usr/bin/env node

/**
 * get_close_matches
 * find nearest string from list
 *
 * @author Myth <https://github.com/iMyth>
 */

const init = require('./utils/init');
const cli = require('./utils/cli');
const log = require('./utils/log');
const getCloseMatches = require('./utils/getCloseMatches');
const chalk = require('chalk');

const input = cli.input;
const flags = cli.flags;
const { clear, debug } = flags;

(async () => {
	init({ clear });
	input.includes(`help`) && cli.showHelp(0);
	const inputString = input[0];
	const targetStrings = input.slice(1, input.length);
	const matches = getCloseMatches(inputString, targetStrings);

	console.log(
		'find',
		chalk.blue(inputString),
		'in',
		chalk.blue(targetStrings),
		'close matches are',
		chalk.blue(JSON.stringify(matches))
	);

	debug && log(flags);

	return matches;
})();
