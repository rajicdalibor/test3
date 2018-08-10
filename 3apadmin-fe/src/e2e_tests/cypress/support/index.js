// ***********************************************************
// This example support/index.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands';

// Alternatively you can use CommonJS syntax:
// require('./commands')

// use `Cypress` instead of `cy` so this persists across all tests
// This disable the browser fetch API so that we force the usage of XHR (Cypress cannot stub the fetch API)
// see https://github.com/cypress-io/cypress/issues/95#issuecomment-281273126
Cypress.on('window:before:load', win => {
  win.fetch = null;
});
// don't clear these cookies between tests
// not be cleared before each test runs
Cypress.Cookies.defaults({
  whitelist: ['JSESSIONID', 'connect.sid']
});
