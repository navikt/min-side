import React from 'react';
import PersonIkon from '../../assets/PersonIkon.svg';

const Personalia = () => {
  const navn = 'VINAYAGUM-MASK AMIZIC';

  return (
    <div className="person-info">
      <img className="person-info__ikon" src={PersonIkon} alt="" />
      <h1>{navn}</h1>
    </div>
  );
};

export default Personalia;
