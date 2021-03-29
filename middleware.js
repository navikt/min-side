const getDecorator = require("./decorator");

const fetchMiddleware = (podlets) => {
  return async (req, res, next) => {
    const incoming = res.locals.podium;
    const podletFetches = podlets.map((podlet) => podlet.fetch(incoming));

    Promise.all([getDecorator(), ...podletFetches])
      .then((result) => {
        const decoratorResult = result[0];
        const podletResults = result
          .slice(1)
          .reduce((acc, elem, index) => ((acc[podlets[index].name] = elem), acc), {});

        res.locals = {
          title: "Min Side",
          decorator: decoratorResult,
          podlets: podletResults,
        };
        next();
      })
      .catch((error) => {
        next(error);
      });
  }
};

module.exports = fetchMiddleware;
