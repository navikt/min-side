import React from 'react';
import { EnforceLoginLoader } from "@navikt/nav-dekoratoren-moduler";
import { isProduction } from "./utils";

const App = () => (
  <div className="App">
    {isProduction ? <EnforceLoginLoader/> : null}
  </div>
);

export default App;
