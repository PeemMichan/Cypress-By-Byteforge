describe('Delete Category Page', () => {

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

  it('Delete_Category', () => {
    // กดปุ่ม Delete ของแถวแรก
    cy.get('button[aria-label="delete"]').first().click()
    cy.wait(1000)

    // ตรวจสอบว่า Modal ยืนยันการลบปรากฏขึ้น
    cy.contains('Confirm Delete').should('be.visible')
    cy.wait(1000)

    // กด Delete เพื่อยืนยัน
    cy.contains('button', 'Delete').click()
    cy.wait(1000)

    // ตรวจสอบว่าลบสำเร็จ
    cy.contains('Category deleted successfully.').should('be.visible')
    cy.wait(1000)
    cy.contains('button', 'OK').click()
    cy.wait(2000)
  })

  it('Delete_Category_Cancel', () => {
    // กดปุ่ม Delete ของแถวแรก
    cy.get('button[aria-label="delete"]').first().click()
    cy.wait(1000)

    // ตรวจสอบว่า Modal ยืนยันการลบปรากฏขึ้น
    cy.contains('Confirm Delete').should('be.visible')
    cy.wait(1000)

    // กด Cancel เพื่อยกเลิก
    cy.contains('button', 'Cancel').click()
    cy.wait(1000)

    // ตรวจสอบว่า Modal ปิดและข้อมูลยังอยู่
    cy.contains('Confirm Delete').should('not.exist')
    cy.wait(2000)
  })

})