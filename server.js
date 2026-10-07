const path = require('path');
const os = require('os');
const Pinokiod = require('pinokiod');
const config = require('./config');

const PORT = parseInt(process.env.PORT || '3000', 10);

// Configure web mode
config.agent = 'web';
config.port = PORT;

// Set default home directory if not configured yet
if (!process.env.PINOKIO_HOME) {
  const defaultHome = path.resolve(os.homedir(), 'pinokio');
  process.env.PINOKIO_HOME = defaultHome;
}

const pinokiod = new Pinokiod(config);
pinokiod.port = PORT;

console.log(`[Pinokio Web] Starting Pinokio server on port ${PORT}...`);

pinokiod.start({
  debug: true
}).then(() => {
  console.log(`[Pinokio Web] Server listening on http://0.0.0.0:${PORT}`);
}).catch((err) => {
  console.error('[Pinokio Web] Failed to start Pinokio server:', err);
  process.exit(1);
});
