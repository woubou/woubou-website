import { spawn } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const viteEntry = path.join(projectRoot, 'node_modules', 'vite', 'bin', 'vite.js');
const apiPort = process.env.API_PORT || '3001';
const webPort = process.env.VITE_PORT || '3000';

const api = spawn(process.execPath, ['server.js'], {
  cwd: projectRoot,
  env: { ...process.env, PORT: apiPort },
  stdio: 'inherit'
});

const web = spawn(process.execPath, [viteEntry, '--port', webPort, '--host', '0.0.0.0'], {
  cwd: projectRoot,
  env: { ...process.env, API_PORT: apiPort },
  stdio: 'inherit'
});

let shuttingDown = false;

function shutdown(exitCode = 0) {
  if (shuttingDown) return;
  shuttingDown = true;
  api.kill();
  web.kill();
  process.exitCode = exitCode;
}

api.on('exit', (code, signal) => {
  if (!shuttingDown) {
    console.error(`API arrêtée${signal ? ` (${signal})` : ` avec le code ${code}`}.`);
    shutdown(code || 1);
  }
});

web.on('exit', (code, signal) => {
  if (!shuttingDown) {
    console.error(`Vite arrêté${signal ? ` (${signal})` : ` avec le code ${code}`}.`);
    shutdown(code || 1);
  }
});

process.on('SIGINT', () => shutdown());
process.on('SIGTERM', () => shutdown());
