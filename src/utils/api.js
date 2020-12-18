export const buildApiUrl = (path) => {
  const apiBaseUrl = process.env.DITTNAV_API_URL;

  return `${apiBaseUrl}${path || ''}`;
};

export const buildTestProducerUrl = (path) => {
  const testProducerBaseUrl = process.env.EVENT_TEST_PRODUCER_URL;

  return `${testProducerBaseUrl}${path || ''}`;
};

export const buildTidslinjeUrl = (path, queryString) => {
  const tidslinjeBaseUrl = process.env.TIDSLINJE_URL;

  return `${tidslinjeBaseUrl}${path || ''}${queryString || ''}`;
};

export const buildNavNoUrl = (path) => {
  const navNoBaseUrl = process.env.NAVNO_URL;

  return `${navNoBaseUrl}${path || ''}`;
};

export const buildLoginserviceUrl = (level) => {
  const loginserviceUrl = process.env.LOGIN_URL;
  const loginServiceLevelFourUrl = process.env.LOGIN_LEVEL_4_URL;

  return level ? loginServiceLevelFourUrl : loginserviceUrl;
};
