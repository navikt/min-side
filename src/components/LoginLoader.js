import React from 'react';
import { EnforceLoginLoader } from "@navikt/nav-dekoratoren-moduler";

const LoginLoader = () => {
  return(
  <React.Fragment>
    <EnforceLoginLoader />
    <button onClick={methodDoesNotExist}>Test sentry</button>;
  </React.Fragment>
  );
};

export default LoginLoader;
