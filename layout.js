const express = require("express");
const Layout = require("@podium/layout");
const path = require("path");
const getDecorator = require("./decorator");

const basePath = process.env.BASE_PATH || "/arbeid/layout-dittnav";
const port = process.env.PORT || 7000;
const isDevelopmentEnv = true;
const vtaUrl = process.env.VTA_URL || "http://localhost:7100/arbeid/podlet-veientilarbeid/manifest.json";
const vtaSituasjonUrl = process.env.VTA_SITUASJON_URL || "http://localhost:7200/arbeid/podlet-vta-situasjon/manifest.json";

const layout = new Layout({
  name: "layout-dittnav",
  pathname: "/",
  development: isDevelopmentEnv,
  logger: console
});

const vta = layout.client.register({
  name: "vta",
  uri: vtaUrl,
  resolveJs: true,
  resolveCss: true
});

const vtaSituasjon = layout.client.register({
  name: "vta-situasjon",
  uri: vtaSituasjonUrl,
  resolveJs: true,
  resolveCss: true
});

const app = express();
app.use(layout.middleware());

app.set("view engine", "hbs");
app.set("views", path.resolve(__dirname, "./views/"));

// isAlive/isReady route for Nais
app.get(`${basePath}/isAlive|isReady`, (req, res) => res.sendStatus(200));

app.get(`${basePath}${layout.pathname()}`,
  async (req, res, next) => {
    const incoming = res.locals.podium;
    Promise.all(
      [
        getDecorator(),
        vta.fetch(incoming),
        vtaSituasjon.fetch(incoming),
      ]
    )
      .then(result => {
        console.log(result);
        res.locals = {
          title: "Dittnav - Layout",
          decorator: result[0],
          podlets: {
            vta: result[1],
            vtaSituasjon: result[2],
          },
        };
        next();
      });
  },
  (req, res) => {
    res.locals.css = layout.client.css();
    res.locals.js = layout.client.js();
    res.status(200).render("index", res.locals);
  }
);

console.log(`VTA: ${vta}`);
console.log(`Starting on port ${port} with basePath ${basePath}`);

app.listen(7000);
