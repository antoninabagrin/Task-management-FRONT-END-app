/* eslint-disable testing-library/await-async-utils */
/* eslint-disable no-undef */

describe('Test dashboard page', () => {
  it('Dashboard renders correctly', () => {
    cy.visit('/protected');
    cy.get('#username').type(Cypress.env('validUserEmail'));
    cy.get('#password').clear();
    cy.get('#password').type(Cypress.env('validUserPassword'));
    cy.get('.MuiBox-root > .MuiButton-root').click();
    cy.url().should('include', '/protected');
    cy.get('#title').clear();
    cy.get('#title').type('Food');
    cy.get('#description').clear();
    cy.get('#description').type('Make dinner');
    cy.get('.css-nosrnw > .MuiBox-root > .MuiButton-root').click();
    cy.get(
      ':nth-child(7) > :nth-child(4) > .MuiButtonBase-root > [data-testid="DeleteIcon"] > path',
    ).click();
    cy.get('.MuiDialogActions-root > :nth-child(2)').click();
    cy.get(':nth-child(3) > .MuiButton-root').click();
    cy.url().should('include', '/home');
  });
});
