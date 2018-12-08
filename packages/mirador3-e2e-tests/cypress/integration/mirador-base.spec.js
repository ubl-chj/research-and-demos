/* global cy */
describe('Mirador Base', () => {
  it('Visits Mirador Base', () => {
    cy.visit('http://localhost:4000/mirador3-base');
    cy.get('title').contains('Mirador');
    cy.get('#manifestURL').type('https://purl.stanford.edu/sn904cj3429/iiif/manifest');
    cy.get('#fetchBtn').click();
    cy.get('li').contains('https://purl.stanford.edu/sn904cj3429/iiif/manifest');
    cy.get('h3').contains('Peter\'s San Francisco Locator. The Birds-Eye-View Map of the Exposition City. Published by Locator Publishing Co');
    cy.get('li').find('>button').click();
  });
});
