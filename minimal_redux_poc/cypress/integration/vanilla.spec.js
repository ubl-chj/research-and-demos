/* global cy */
describe('Plain JavaScript example', () => {
  it('has the correct page title', () => {
    cy.visit('http://localhost:4444/cypress/public/vanilla/');
    cy.get('title').should('contain', 'Examples');
  });
  it('loads a manifest and displays it', () => {
    cy.visit('http://localhost:4444/cypress/public/vanilla/');
    cy.get('#manifestURL').type('http://localhost:5000/sn904cj3429-manifestV2.json');
    cy.get('#fetchBtn').click();
    cy.get('#exampleManifest').should('contain', 'http://iiif.io/api/presentation/2/context.json');
  });
});
