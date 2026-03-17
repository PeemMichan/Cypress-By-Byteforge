describe('Category Page', () => {

  beforeEach(() => {
    cy.session('adminSession', () => {
      cy.visit('http://eventra.kasecode.com/')
      cy.get('input[placeholder="Email"]').type('admin@admin.com')
      cy.get('input[placeholder="Password"]').type('Admin_Pass101')
      cy.contains('button', 'Sign In').click()
      cy.url().should('not.include', '/login')
    })
    cy.visit('http://eventra.kasecode.com/categories')
    cy.wait(2000)
  })

  it('Create_Category', () => {
    cy.get('section > div').first().find('button').last().click()
    cy.wait(1000)

    cy.get('input:visible').last()
      .type('Test Category Cypress', { delay: 80 })
    cy.wait(1000)

    cy.contains('button', 'Create').click()
    cy.wait(1000)

    cy.contains('Category created successfully.').should('be.visible')
    cy.wait(1000)
    cy.contains('button', 'OK').click()
    cy.wait(2000)
  })

})