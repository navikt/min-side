import React from 'react';
import {Undertittel} from "nav-frontend-typografi";
import Lenkeliste from "./Lenkeliste";
import {generelleLenker} from "../../utils/lenker";

const LenkelisteContainer = () => (
  <>
    <Undertittel className="flere-tjenester__subheader">
      Flere tjenester
    </Undertittel>
    <Lenkeliste lenker={generelleLenker}/>
  </>
);

export default LenkelisteContainer;
