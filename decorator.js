const jsdom = require("jsdom");
const axios = require("axios");
const NodeCache = require("node-cache");
const { JSDOM } = jsdom;

const SECONDS_PER_MINUTE = 60;
const SECONDS_PER_HOUR = SECONDS_PER_MINUTE * 60;
const DECORATOR_URL = process.env.DECORATOR_URL || 'http://localhost:8100/dekoratoren';
const DITTNAV_URL = process.env.DITTNAV_URL || 'https://localhost:7000/person/min-side';

// Refresh cache every hour
const cache = new NodeCache({
  stdTTL: SECONDS_PER_HOUR,
  checkperiod: SECONDS_PER_MINUTE,
});

const getDecorator = async () => {
  const decorator = cache.get("main-cache");
  if (decorator) {
    return decorator;
  } else {
    const params = {
      enforceLogin: true,
      level: "Level4",
      redirectToApp: true,
      breadcrumbs: JSON.stringify([
        { url: `${DITTNAV_URL}`, title: "Min side" },
      ]),
    };
    console.log(`Loading decorator from ${DECORATOR_URL} with params ${JSON.stringify(params)}`);
    const url = `${DECORATOR_URL}/?${Object.entries(params)
      .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
      .join("&")}`;

    const { data: result } = await axios(url);
    const { document } = new JSDOM(result).window;
    const prop = "innerHTML";
    const data = {
      HEADER: document.getElementById("header-withmenu")[prop],
      STYLES: document.getElementById("styles")[prop],
      FOOTER: document.getElementById("footer-withmenu")[prop],
      SCRIPTS: document.getElementById("scripts")[prop],
    };
    cache.set("main-cache", data);
    return data
  }
};

module.exports = getDecorator;
