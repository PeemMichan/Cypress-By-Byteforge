describe('Eventra Management System', () => {

  it('Login_Email_Is_Required', () => {
    cy.visit('https://eventra.kasecode.com/')

    // กรอกเฉพาะรหัสผ่าน
    cy.get('input[placeholder="Password"]')
      .type('Admin_Pass101')
      .should('have.value', 'Admin_Pass101')

    cy.contains('button', 'Sign In')
      .should('not.be.disabled')
      .click()

    cy.wait(3000)
  })


  it('Login_Password_Is_Required', () => {
    cy.visit('https://eventra.kasecode.com/')

    // กรอกเฉพาะอีเมล
    cy.get('input[placeholder="Email"]')
      .type('admin@admin.com')
      .should('have.value', 'admin@admin.com')

    cy.contains('button', 'Sign In')
      .should('not.be.disabled')
      .click()

    cy.wait(3000)
  })


  it('Login_Email&Pass_Incorrect', () => {
    cy.visit('https://eventra.kasecode.com/')

    cy.get('input[placeholder="Email"]')
      .type('peem@gmail.com')
      .should('have.value', 'peem@gmail.com')

    cy.get('input[placeholder="Password"]')
      .type('peem1234')
      .should('have.value', 'peem1234')

    cy.contains('button', 'Sign In')
      .should('not.be.disabled')
      .click()

    cy.wait(3000)
  })


 it('Login_Forgot_password', () => {
  cy.visit('https://eventra.kasecode.com/')

  cy.contains('forgot password')
    .should('be.visible')
    .click()

  // ตรวจสอบว่าเข้าหน้า Forgot Password แล้ว
  cy.contains('Forgot your password?').should('be.visible')

  cy.wait(2000)

  // กดปุ่มย้อนกลับ
  cy.contains('Forgot your password?')
    .parents('div')
    .find('button')
    .click()

  // ตรวจสอบว่ากลับมาหน้า Sign In
  cy.contains('Sign In').should('be.visible')
})


  it('Login_Email&Pass_correct', () => {
    cy.visit('https://eventra.kasecode.com/')

    cy.get('input[placeholder="Email"]')
      .type('admin@admin.com')
      .should('have.value', 'admin@admin.com')

    cy.get('input[placeholder="Password"]')
      .type('Admin_Pass101')
      .should('have.value', 'Admin_Pass101')

    cy.contains('button', 'Sign In')
      .should('not.be.disabled')
      .click()

    cy.wait(3000)

  })

})