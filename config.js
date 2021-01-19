const basePath = process.env.BASE_PATH || "/person/layout-dittnav";
const port = process.env.PORT || 7000;
const isDevelopmentEnv = true;

const urls = {
  dittnavPersonaliaUrl: process.env.DITTNAV_PERSONALIA_URL
    || "http://localhost:7300/person/podlet-dittnav-personalia/manifest.json",
  dittnavGenerelleFliserUrl:process.env.DITTNAV_GENERELLE_FLISER_URL
    || "http://localhost:7400/person/podlet-dittnav-generelle-fliser/manifest.json",
  dittnavLenkelisteUrl:process.env.DITTNAV_LENKELISTE_URL
    || "http://localhost:7600/person/podlet-dittnav-lenkeliste/manifest.json",
  vtaUrl: process.env.VTA_URL
    || "http://localhost:7100/arbeid/podlet-veientilarbeid/manifest.json",
  vtaJobbUrl: process.env.VTA_JOBB_URL
    || "http://localhost:7300/arbeid/podlet-vta-jobb/manifest.json",
  vtaSituasjonUrl: process.env.VTA_SITUASJON_URL
    || "http://localhost:7200/arbeid/podlet-vta-situasjon/manifest.json",
  vtaOkonomi: process.env.VTA_OKONOMI_URL
    || "http://localhost:7500/person/podlet-vta-okonomi/manifest.json",
};

module.exports = {
  basePath,
  port,
  isDevelopmentEnv,
  urls,
};
