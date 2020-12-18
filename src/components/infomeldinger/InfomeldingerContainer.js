import React from 'react';
import InfoMeldinger from "./Infomeldinger";
import Providers from "../../context/Providers";

const InfomelingerContainer = () => (
  <Providers>
    <InfoMeldinger/>
  </Providers>
);

export default InfomelingerContainer;
