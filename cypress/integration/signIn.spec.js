/* eslint-disable testing-library/await-async-utils */
/* eslint-disable no-undef */

describe('Test signin page', () => {
  it('focus for every textField', () => {
    cy.visit('/signin');
    cy.get('input').first().focus();
  });
  it('redirect to signup from signin page', () => {
    cy.visit('/signin');
    cy.get('.css-13i4rnv-MuiGrid-root > .MuiTypography-root').click();
    cy.url().should('include', '/signup');
  });
  it('signin with a invalid user ', () => {
    cy.visit('/signin');
    cy.url().should('include', '/signin');
    cy.get('#username').clear();
    cy.get('#username').type((Math.random() + 1).toString(36).substring(7));
    cy.get('#password').clear();
    cy.get('#password').type((Math.random() + 1).toString(36).substring(7));
    cy.get('.MuiBox-root > .MuiButton-root').click();
    cy.url().should('include', '/signin');
    cy.on('uncaught:exception', (err, runnable) => {
      return false;
    });
  });
  it('signin with a valid user ', () => {
    cy.visit('/signin');
    cy.url().should('include', '/signin');
    cy.get('#username').clear();
    cy.get('#username').type(Cypress.env('validUserEmail'));
    cy.get('#password').clear();
    cy.get('#password').type(Cypress.env('validUserPassword'));
    cy.get('[type="checkbox"]').check();
    cy.get('.MuiBox-root > .MuiButton-root').click();
    cy.url().should('include', '/protected');
  });
});
