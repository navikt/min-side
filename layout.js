const express = require("express");
const Layout = require("@podium/layout");
const fs = require("fs");
const path = require("path");
const getDecorator = require("./decorator");


const basePath = process.env.BASE_PATH || "/arbeid/layout-dittnav";
const port = process.env.PORT || 7000;
const isDevelopmentEnv = true;
const vtaUrl = process.env.VTA_URL || "http://localhost:7100/arbeid/podlet-veientilarbeid/manifest.json";

const layout = new Layout({
  name: "layout-dittnav",
  pathname: "/",
  development: true,
  logger: console
});

const vta = layout.client.register({
  name: "vta",
  uri: vtaUrl,
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
      [vta.fetch(incoming), getDecorator()]
    )
      .then(result => {
        console.log(result);
        res.locals = {
          title: "Dittnav - Layout",
          podlets: {
            vta: result[0],
            decorator: result[1]
          }
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
