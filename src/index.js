import React from 'react';
import ReactDOM from 'react-dom';
import Login from "./components/login/Login";
import './css/index.css';
import Lenkeliste from "./components/lenkeliste/Lenkeliste";
import Personalia from "./components/personalia/Personalia";

ReactDOM.render(
  <Login />, document.getElementById('dittnav-login')
);

ReactDOM.render(
  <Personalia />, document.getElementById('dittnav-personalia')
);

ReactDOM.render(
  <Lenkeliste />, document.getElementById('dittnav-lenkeliste')
);
