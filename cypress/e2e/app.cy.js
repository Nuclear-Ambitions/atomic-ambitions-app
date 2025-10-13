describe('Navigation', () => {
  it('should open on the home page', () => {
    cy.visit('http://localhost:3000')
    cy.contains('Welcome to the Atomic Future')
  })

  it('should navigate to the about page', () => {
    cy.visit('http://localhost:3000')
    cy.get('button[aria-label="Toggle navigation menu"]').click()
    cy.get('a[href="/join"]').click()
    cy.url().should('include', '/join')
    cy.get('[data-aa="page-heading"]').should(
      'contain',
      'Join the Atomic Ambitions Community'
    )
  })
})