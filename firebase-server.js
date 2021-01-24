const { https } = require('firebase-functions');
const { default: next } = require('next');

const app = next({
  conf: {
    compress: false,
  },
});

const handle = app.getRequestHandler();
exports.nextServer = https.onRequest((req, res) => app.prepare().then(() => handle(req, res)));
