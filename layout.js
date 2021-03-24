const express = require("express");
const Layout = require("@podium/layout");
const path = require("path");
const promClient = require("prom-client");
const PrometheusConsumer = require("@metrics/prometheus-consumer");
const axios = require("axios");
const fetchMiddleware = require("./middleware");
const { basePath, port, isDevelopmentEnv, urls } = require("./config");

const layout = new Layout({
  name: "min-side",
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
    name: "podlet-dittnav-meldinger",
    uri: urls.dittnavMeldingerUrl,
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
    name: "podlet-vta-jobb",
    uri: urls.vtaJobbUrl,
    resolveJs: true,
    resolveCss: true,
  }),
  layout.client.register({
    name: "podlet-vta-okonomi",
    uri: urls.vtaOkonomi,
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

// Context parsers
layout.context.register("authlevel", {
  parse: async function (inc) {
    try {
      const resp = await axios.get("https://innloggingsstatus.dev.nav.no/person/innloggingsstatus/auth", {
        headers: {
          cookie: inc.request.headers["cookie"],
        },
      });
      return resp.data.securityLevel;
    } catch (e) {
      console.error("Error getting security level", e);
      return "N/A";
    }
  },
});

// Set up prometheus client with podium metrics
const metricsConsumer = new PrometheusConsumer({ client: promClient });
promClient.collectDefaultMetrics({ register: metricsConsumer.registry });
metricsConsumer.on("error", (err) => console.error(err));
layout.metrics.pipe(metricsConsumer);

// Express setup
const app = express();
app.use(layout.middleware());

app.set('view engine', 'html');
app.engine('html', require('hbs').__express);
app.set("views", path.resolve(__dirname, "./build"));

app.use(`${layout.pathname()}/static`, express.static("build/static"));
app.use(`/static`, express.static("build/static"));

app.get(`${layout.pathname()}/isAlive|isReady`, (req, res) => {
  res.sendStatus(200);
});

function getAllAssetPaths(podlets) {
  if (!podlets) return [];

  const assets = Object.values(podlets).flatMap((podlet) => (podlet.css || []).concat((podlet.js || [])));
  const paths = assets.map((asset) => asset.value);
  return paths;
}

app.get(`${layout.pathname()}`, fetchMiddleware(podlets), (req, res) => {
  res.status(200);
  const assets = getAllAssetPaths(res.locals.podlets);
  if (res.push) {
    console.log('Pushing assets to client', assets);
    assets.forEach((asset) => {
      res.push(asset, {});
    })
  } else {
    console.log('Server-push not supported');
  }
  res.render("index", res.locals);
});

app.get("/metrics", async function (req, res) {
  const metrics = await metricsConsumer.metrics();
  res.set("Content-Type", metricsConsumer.contentType()).send(metrics);
});

app.use((error, req, res, next) => {
  res.status(500).send("<html><body><h1>Internal server error</h1></body></html>");
});

layout.client.refreshManifests().then(() => {
  console.log("Manifests refreshed");
});

console.log(`Starting on port ${port} with basePath ${basePath}`);
console.log(`http://localhost:${port}${basePath}`);

app.listen(7000);
