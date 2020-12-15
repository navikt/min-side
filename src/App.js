import React from 'react';
import { EnforceLoginLoader } from "@navikt/nav-dekoratoren-moduler";
import { isProduction } from "./utils";
import Panel from "nav-frontend-paneler";

const App = () => (
  <div className="App">
    <Panel border>
      Hello layout!
    </Panel>
  </div>
);

export default App;
