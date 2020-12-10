const express = require("express");
const Layout = require("@podium/layout");
const path = require("path");
const getDecorator = require("./decorator");

const basePath = process.env.BASE_PATH || "/person/layout-dittnav";
const port = process.env.PORT || 7000;
const isDevelopmentEnv = true;
const dittnavPersonaliaUrl = process.env.DITTNAV_PERSONALIA_URL || "http://localhost:7300/person/podlet-dittnav-personalia/manifest.json";
const dittnavGenerelleFliserUrl = process.env.DITTNAV_GENERELLE_FLISER_URL || "http://localhost:7400/person/podlet-dittnav-generelle-fliser/manifest.json";
const vtaUrl = process.env.VTA_URL || "http://localhost:7100/arbeid/podlet-veientilarbeid/manifest.json";
const vtaSituasjonUrl = process.env.VTA_SITUASJON_URL || "http://localhost:7200/arbeid/podlet-vta-situasjon/manifest.json";

const layout = new Layout({
  name: "layout-dittnav",
  pathname: "/",
  development: isDevelopmentEnv,
  logger: console,
});

const podlets = [
  layout.client.register({
    name: "dittnav-personalia",
    uri: dittnavPersonaliaUrl,
    resolveJs: true,
    resolveCss: true,
  }),
  layout.client.register({
    name: "vta-situasjon",
    uri: vtaSituasjonUrl,
    resolveJs: true,
    resolveCss: true,
  }),
  layout.client.register({
    name: "dittnav-generelle-fliser",
    uri: dittnavGenerelleFliserUrl,
    resolveJs: true,
    resolveCss: true,
  }),
  layout.client.register({
    name: "vta",
    uri: vtaUrl,
    resolveJs: true,
    resolveCss: true,
  }),
];

const app = express();
app.use(layout.middleware());

app.set("view engine", "hbs");
app.set("views", path.resolve(__dirname, "./views/"));

// isAlive/isReady route for Nais
app.get(`${basePath}/isAlive|isReady`, (req, res) => res.sendStatus(200));

app.get(
  `${basePath}${layout.pathname()}`,
  async (req, res, next) => {
    const incoming = res.locals.podium;

    const podletFetches = podlets.map((podlet) => podlet.fetch(incoming));

    Promise.all([getDecorator(), ...podletFetches])
      .then((result) => {
        console.log(result);

        const podletResults = {};
        const decoratorResult = result[0];
        for (let i = 1; i < result.length; i++) {
          podletResults[podlets[i - 1].name] = result[i];
        }

        res.locals = {
          title: "Dittnav - Layout",
          decorator: decoratorResult,
          podlets: podletResults,
        };
        next();
      })
      .catch(error => {
        next(error);
      });
  },
  (req, res) => {
    res.status(200).render("index", res.locals);
  }
);

app.use((error, req, res, next) => {
  console.error(error);
  res.status(500).send(
    '<html><body><h1>Internal server error</h1></body></html>',
  );
});

console.log(`Starting on port ${port} with basePath ${basePath}`);
console.log(`http://localhost:${port}${basePath}`);

app.listen(7000);
