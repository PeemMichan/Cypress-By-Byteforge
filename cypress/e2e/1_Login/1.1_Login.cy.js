describe('Eventra Management System', () => {
  it('Login_Email_Is_Required', () => {
    cy.visit('http://dekdee2.informatics.buu.ac.th:7111/login')
    // cy.get('input[placeholder="Email"]') 
    //   .type('admin@admin.com')
    //   .should('have.value', 'admin@admin.com')

    cy.get('input[placeholder="Password"]')
      .type('admin1234')
      .should('have.value', 'admin1234')

    cy.contains('button', 'Sign In').should('not.be.disabled').click()
    cy.wait(3000)
  })

  it('Login_Password_Is_Required', () => {
    cy.visit('http://dekdee2.informatics.buu.ac.th:7111/login')
    cy.get('input[placeholder="Email"]')
      .type('admin@admin.com')
      .should('have.value', 'admin@admin.com')

    // cy.get('input[placeholder="Password"]')
    //   .type('peem1234')
    //   .should('have.value', 'peem1234')

    cy.contains('button', 'Sign In').should('not.be.disabled').click()
    cy.wait(3000)
  }) 

    it('Login_Email&Pass_Incorrect', () => {
    cy.visit('http://dekdee2.informatics.buu.ac.th:7111/login')
    cy.get('input[placeholder="Email"]')
      .type('peem@gmail.com')
      .should('have.value', 'peem@gmail.com')

    cy.get('input[placeholder="Password"]')
      .type('peem1234')
      .should('have.value', 'peem1234')

    cy.contains('button', 'Sign In').should('not.be.disabled').click()
    cy.wait(3000)
  }) 

  it('Login_Forgot_password', () => {
  cy.visit('http://dekdee2.informatics.buu.ac.th:7111/login')

  cy.contains('forgot password')
    .should('be.visible')
    .click()

  cy.url().should('include', '/forgot-password')
})

    it('Login_Email&Pass_correct', () => {
    cy.visit('http://dekdee2.informatics.buu.ac.th:7111/login')
    cy.get('input[placeholder="Email"]')
      .type('admin@admin.com')
      .should('have.value', 'admin@admin.com')

    cy.get('input[placeholder="Password"]')
      .type('password')
      .should('have.value', 'password')

    cy.contains('button', 'Sign In').should('not.be.disabled').click()
    cy.wait(3000)

   
    cy.visit('http://dekdee2.informatics.buu.ac.th:7111/event')

  
  })
})