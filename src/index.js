/* @flow */
/* eslint no-console: 0 */
import { spawn } from 'child_process';

/**
 * Spawn a shell command, wrapped in a promise. Optional callback to hook into
 * when data is returned
 *
 * @param  {String} command      The shell command to run
 * @param  {Function} dataCallback Option callback function to run when data is
 * returned
 * @return {Promise}              Promise that resolves if the process exits
 * without an error code. Rejects if an exist code is given
 */
export default function (command: string, dataCallback?: () => {}) {
  return new Promise((resolve, reject) => {
    const commands = command.split(' ');
    const ls = spawn(commands.splice(0, 1)[0], commands);

    ls.stdout.on('data', (data) => {
      console.log(`${data}`);
      if (dataCallback) dataCallback(`${data}`);
    });

    ls.stderr.on('data', (data) => {
      console.log(`${data}`);
      if (dataCallback) dataCallback(`${data}`);
    });

    ls.on('close', (code) => {
      if (code) {
        reject();
      } else {
        resolve(`Process exited with code ${code}`);
      }
    });
  });
}
