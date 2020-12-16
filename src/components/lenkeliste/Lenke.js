import React from 'react';
import {Normaltekst} from "nav-frontend-typografi";

const Lenke = ({ tittel, url }) => (
  <div className="flere-tjenester__link-container" key={url}>
    <Normaltekst>
      <a href={url} className="lenke flere-tjenester__link">
        {tittel}
      </a>
    </Normaltekst>
  </div>
);

export default Lenke;
