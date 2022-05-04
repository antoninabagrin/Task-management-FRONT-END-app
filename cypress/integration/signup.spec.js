/* eslint-disable testing-library/await-async-utils */
/* eslint-disable no-undef */

describe('Renders the signUp page', () => {
  it('SignUp renders correctly', () => {
    cy.visit('/signUp');
    cy.get('[data-testid="required-email"]').clear();
    cy.get('[data-testid="required-email"]').type('antonia_bagrin@gmail.com');
    cy.get('[data-testid="required-firstName"]').clear();
    cy.get('[data-testid="required-firstName"]').type('Anto');
    cy.get('[data-testid="required-lastName"]').clear();
    cy.get('[data-testid="required-lastName"]').type('Bagrin');
    cy.get('[data-testid="required-username"]').clear();
    cy.get('[data-testid="required-username"]').type('antonina10');
    cy.get('[data-testid="required-password"]').clear();
    cy.get('[data-testid="required-password"]').type('Antonina10');
    cy.get('[data-testid="required-confirmPassword"]').clear();
    cy.get('[data-testid="required-confirmPassword"]').type('Antonina10');
    cy.get('.PrivateSwitchBase-input').check();
    cy.get('.MuiDialogActions-root > :nth-child(2)').click();
    cy.get('[data-testid="joinButton"]').click();
    // cy.get('[data-testid="required-email"]').clear();
    // cy.get('[data-testid="required-email"]').type('antonia_bagrin@gmail.com');
    // cy.get('.PrivateSwitchBase-input').check();
    // cy.get('.MuiDialogActions-root > :nth-child(2)').click();
    // cy.get('[data-testid="joinButton"]').click();
    // cy.get('[data-testid="required-firstName"]').clear();
    // cy.get('[data-testid="required-firstName"]').type('Anto');
    // cy.get('.css-pqi8h6 > .MuiBox-root > :nth-child(3)').click();
    // cy.get('[data-testid="required-lastName"]').clear();
    // cy.get('[data-testid="required-lastName"]').type('Bagrin');
    // cy.get('[data-testid="required-username"]').clear();
    // cy.get('[data-testid="required-username"]').type('antonina10');
    // cy.get('[data-testid="joinButton"]').click();
    // cy.get('[data-testid="signUp"]').click();
    // cy.get('[data-testid="required-confirmPassword"]').clear();
    // cy.get('[data-testid="required-confirmPassword"]').type('oo');
    // cy.get('[data-testid="joinButton"]').click();
    // cy.get('[data-testid="required-password"]').clear();
    // cy.get('[data-testid="required-password"]').type('pp');
    // cy.get('[data-testid="joinButton"]').click();
    // cy.get('[style="color: red;"]').click();
    // cy.get('[data-testid="required-confirmPassword"]').clear();
    // cy.get('[data-testid="required-confirmPassword"]').type('pp');
    // cy.get('[data-testid="joinButton"]').click();
  });
});
