/* eslint-disable testing-library/await-async-utils */
/* eslint-disable no-undef */

describe('Renders the home page', () => {

  it('valid sign in', function() {
    cy.visit('http://localhost:8080/');
    cy.get('[href="/signin"] > .MuiButton-root').click();

    cy.get('#username').clear();
    cy.get('#username').type(Cypress.env('validUserEmail'));
    cy.get('#password').clear();
    cy.get('#password').type(Cypress.env('validUserPassword'));
    cy.get('.MuiBox-root > .MuiButton-root').click();

    cy.url().should('include', '/protected');
  });

});
