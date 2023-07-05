import "./commands";
import 'cypress-mochawesome-reporter/register';


before(() => {
  cy.fixture("variables").then(function (data) {
    globalThis.data = data;
  });
});

