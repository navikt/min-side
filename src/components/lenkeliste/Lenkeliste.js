import React from 'react';
import { shape, arrayOf, string } from 'prop-types';
import Lenke from "./Lenke";

const Lenkeliste = ({ lenker }) => (
  <div className="flere-tjenester">
    <nav className="flere-tjenester__links">
      {lenker.map(lenke => (
        <Lenke tittel={lenke.tittel} url={lenke.url}/>
      ))}
    </nav>
  </div>
);

Lenkeliste.propTypes = {
  lenker: arrayOf(shape({
    url: string.isRequired,
    tittel: string.isRequired,
  })),
};

Lenkeliste.defaultProps = {
  lenker: [],
};

export default Lenkeliste;
