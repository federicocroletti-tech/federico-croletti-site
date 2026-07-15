const { spawn } = require('node:child_process');
const http = require('node:http');

const serverUrl = 'http://127.0.0.1:4300';
const isWindows = process.platform === 'win32';
const npmCommand = isWindows ? 'cmd.exe' : 'npm';
const npmArgs = isWindows
  ? ['/d', '/s', '/c', 'npm start -- --host 127.0.0.1 --port 4300']
  : ['start', '--', '--host', '127.0.0.1', '--port', '4300'];
const npxCommand = isWindows ? 'cmd.exe' : 'npx';
const npxArgs = isWindows
  ? ['/d', '/s', '/c', 'npx cypress run --e2e --browser electron']
  : ['cypress', 'run', '--e2e', '--browser', 'electron'];

const server = spawn(npmCommand, npmArgs, { stdio: 'inherit' });

server.on('error', (error) => {
  console.error(error);
  process.exit(1);
});

waitForServer(serverUrl)
  .then(() => runCypress())
  .then((exitCode) => stopServer().then(() => process.exit(exitCode)))
  .catch((error) => {
    console.error(error);
    stopServer().then(() => process.exit(1));
  });

function runCypress() {
  return new Promise((resolve) => {
    const cypress = spawn(npxCommand, npxArgs, { stdio: 'inherit' });

    cypress.on('close', (code) => resolve(code ?? 1));
  });
}

function waitForServer(url) {
  const deadline = Date.now() + 120000;

  return new Promise((resolve, reject) => {
    const check = () => {
      const request = http.get(url, (response) => {
        response.resume();

        if (response.statusCode && response.statusCode < 500) {
          resolve();
          return;
        }

        retry();
      });

      request.on('error', retry);
      request.setTimeout(2000, () => {
        request.destroy();
        retry();
      });
    };

    const retry = () => {
      if (Date.now() > deadline) {
        reject(new Error(`Timed out waiting for ${url}`));
        return;
      }

      setTimeout(check, 1000);
    };

    check();
  });
}

function stopServer() {
  if (server.exitCode !== null) {
    return Promise.resolve();
  }

  if (!isWindows) {
    server.kill('SIGTERM');
    return Promise.resolve();
  }

  return new Promise((resolve) => {
    const taskkill = spawn('taskkill.exe', ['/pid', String(server.pid), '/T', '/F'], {
      stdio: 'ignore',
    });

    taskkill.on('close', () => resolve());
    taskkill.on('error', () => resolve());
  });
}
