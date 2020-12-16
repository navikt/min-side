import React from 'react';
import {Undertittel} from "nav-frontend-typografi";
import Lenkeliste from "./Lenkeliste";

const lenker = [
  {
    url: "https://test-url",
    tittel: "Lenke A",
  },
  {
    url: "https://test-url",
    tittel: "Lenke B",
  }];

const LenkelisteContainer = () => (
  <>
    <Undertittel className="flere-tjenester__subheader">
      Flere tjenester
    </Undertittel>
    <Lenkeliste lenker={lenker}/>
  </>
);

export default LenkelisteContainer;
