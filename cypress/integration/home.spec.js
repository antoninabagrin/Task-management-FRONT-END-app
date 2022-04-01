/* eslint-disable testing-library/await-async-utils */
/* eslint-disable no-undef */

describe('Renders the home page', () => {
  it('Home renders correctly', () => {
    cy.visit('/home');
  });
});
