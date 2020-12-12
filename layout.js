const express = require("express");
const Layout = require("@podium/layout");
const path = require("path");
const getDecorator = require("./decorator");
const { basePath, port, isDevelopmentEnv, urls } = require("./config");

const layout = new Layout({
  name: "layout-dittnav",
  pathname: basePath,
  development: isDevelopmentEnv,
  logger: console,
});

const podlets = [
  layout.client.register({
    name: "podlet-dittnav-personalia",
    uri: urls.dittnavPersonaliaUrl,
    resolveJs: true,
    resolveCss: true,
  }),
  layout.client.register({
    name: "podlet-vta-situasjon",
    uri: urls.vtaSituasjonUrl,
    resolveJs: true,
    resolveCss: true,
  }),
  layout.client.register({
    name: "podlet-dittnav-generelle-fliser",
    uri: urls.dittnavGenerelleFliserUrl,
    resolveJs: true,
    resolveCss: true,
  }),
  layout.client.register({
    name: "podlet-veientilarbeid",
    uri: urls.vtaUrl,
    resolveJs: true,
    resolveCss: true,
  }),
  layout.client.register({
    name: "podlet-dittnav-lenkeliste",
    uri: urls.dittnavLenkelisteUrl,
    resolveJs: true,
    resolveCss: true,
  }),
];

const app = express();
app.use(layout.middleware());

app.set("view engine", "hbs");
app.set("views", path.resolve(__dirname, "./views/"));

app.get(`${basePath}/isAlive|isReady`, (req, res) => res.sendStatus(200));

app.get(
  `${layout.pathname()}`,
  async (req, res, next) => {
    const incoming = res.locals.podium;
    const podletFetches = podlets.map((podlet) => podlet.fetch(incoming));

    Promise.all([getDecorator(), ...podletFetches])
      .then((result) => {
        const decoratorResult = result[0];

        const podletResults = result
          .slice(1)
          .reduce((acc, elem, index) => ((acc[podlets[index].name] = elem), acc), {});

        res.locals = {
          title: "Dittnav - Layout",
          decorator: decoratorResult,
          podlets: podletResults,
        };
        next();
      })
      .catch((error) => {
        next(error);
      });
  },
  (req, res) => {
    res.status(200).render("index", res.locals);
  }
);

app.use(`${layout.pathname()}/assets`, express.static("assets"));

app.use((error, req, res, next) => {
  console.error(error);
  res.status(500).send("<html><body><h1>Internal server error</h1></body></html>");
});

layout.client.refreshManifests().then(() => {
  console.log("Manifests refreshed");
});

console.log(`Starting on port ${port} with basePath ${basePath}`);
console.log(`http://localhost:${port}${basePath}`);

app.listen(7000);
