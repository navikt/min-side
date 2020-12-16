import React from 'react';
import ReactDOM from 'react-dom';
import Login from "./components/login/Login";
import './css/index.css';
import Personalia from "./components/personalia/Personalia";
import LenkelisteContainer from "./components/lenkeliste/LenkelisteContainer";

ReactDOM.render(
  <Login />, document.getElementById('dittnav-login')
);

ReactDOM.render(
  <Personalia />, document.getElementById('dittnav-personalia')
);

ReactDOM.render(
  <LenkelisteContainer />, document.getElementById('dittnav-lenkeliste')
);
