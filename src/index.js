/* eslint no-console: 0 */
import { spawn } from 'child_process';

/**
 * Handle the logging functions from the spawn command, also running the
 * callback function is provided
 *
 * @param  {Object} out          The loggin callback from the spawn process
 * @param  {Function} dataCallback Optional callback to run when something is
 * logged to the console
 * @return {Void}              No return value
 */
export function log(out, dataCallback) {
  out.on('data', (data) => {
    console.log(`${data}`);
    if (dataCallback) dataCallback(`${data}`);
  });
}

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
export default function (command, dataCallback) {
  return new Promise((resolve, reject) => {
    const commands = command.split(' ');
    const ls = spawn(commands.splice(0, 1)[0], commands);

    log(ls.stdout, dataCallback);
    log(ls.stderr, dataCallback);

    ls.on('close', (code) => {
      if (code) {
        reject();
      } else {
        resolve(`Process exited with code ${code}`);
      }
    });
  });
}
