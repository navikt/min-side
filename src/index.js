import React from 'react';
import ReactDOM from 'react-dom';
import * as Sentry from "@sentry/browser";
import LoginLoader from "./components/LoginLoader";
import './css/index.css';

if (process.env.NODE_ENV === "production") {
  Sentry.init({
    dsn: "https://ff3cc443e4564378b15df1731ca7861e@sentry.gc.nav.no/68",
    autoSessionTracking: false,
  });
  console.log("init sentry")
}

ReactDOM.render(
  <LoginLoader />, document.getElementById('dittnav-login-loader')
);
