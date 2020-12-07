const express = require("express");
const Layout = require("@podium/layout");
const fs = require("fs");

const basePath = process.env.BASE_PATH || "/person/dittnav";
const port = process.env.PORT || 7000;
const isDevelopmentEnv = true;

const layout = new Layout({
  name: 'dittnav',
  pathname: '/',
  development: true,
  logger: console,
});

const vta = layout.client.register({
  name: 'vta',
  uri: process.env.VTA_URL,
});

const app = express();
app.use(layout.middleware());

// isAlive/isReady route for Nais
app.get(`${basePath}/isAlive|isReady`, (req, res) => res.sendStatus(200));

app.get(`${basePath}${layout.pathname()}`, async (req, res, next) => {
  const incoming = res.locals.podium;

  const content = await Promise.all([
    vta.fetch(incoming),
  ]);

  incoming.podlets = content;

  res.podiumSend(`
        <section>${content[0]}</section>
    `);
});

console.log(`Starting on port ${port} with basePath ${basePath}`);

app.listen(7000);
