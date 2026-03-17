describe('Event Page', () => {

  beforeEach(() => {
    cy.session('adminSession', () => {
      cy.visit('https://eventra.kasecode.com/')
      cy.get('input[placeholder="Email"]').type('admin@admin.com')
      cy.get('input[placeholder="Password"]').type('Admin_Pass101')
      cy.contains('button', 'Sign In').click()
      cy.url().should('not.include', '/login')
    })
    cy.visit('https://eventra.kasecode.com/event')
  })

  // ==================== Search ====================

  it('Event_Search_By_Name', () => {
    cy.get('input[placeholder="Search event..."]')
      .should('be.visible')
      .type('งานเลี้ยงส่งท้ายปีเก่า')
      .should('have.value', 'งานเลี้ยงส่งท้ายปีเก่า')
    cy.get('button[aria-label="Search"]').click()
    cy.wait(2000)
  })

  it('Event_Search_Clear', () => {
    cy.get('input[placeholder="Search event..."]').type('งานเลี้ยงส่งท้ายปีเก่า')
    cy.get('button[aria-label="Search"]').click()
    cy.wait(1000)
    cy.get('input[placeholder="Search event..."]').clear().should('have.value', '')
    cy.get('button[aria-label="Search"]').click()
    cy.wait(2000)
  })

  // ==================== Filter ====================

  it('Event_Filter_Category_All', () => {
    cy.contains('button', 'Filter').click()
    cy.contains('label', 'All').find('input').check().should('be.checked')
    cy.wait(1000)
    cy.contains('label', 'All').find('input').uncheck().should('not.be.checked')
    cy.contains('button', 'Filter').click()
  })

  it('Event_Filter_Category_ประชุม', () => {
    cy.contains('button', 'Filter').click()
    cy.contains('label', 'ประชุม').find('input').check().should('be.checked')
    cy.wait(1000)
    cy.contains('label', 'ประชุม').find('input').uncheck().should('not.be.checked')
    cy.contains('button', 'Filter').click()
  })

  it('Event_Filter_Category_สัมนา', () => {
    cy.contains('button', 'Filter').click()
    cy.contains('label', 'สัมนา').find('input').check().should('be.checked')
    cy.wait(1000)
    cy.contains('label', 'สัมนา').find('input').uncheck().should('not.be.checked')
    cy.contains('button', 'Filter').click()
  })

  it('Event_Filter_Category_อบรม', () => {
    cy.contains('button', 'Filter').click()
    cy.contains('label', 'อบรม').find('input').check().should('be.checked')
    cy.wait(1000)
    cy.contains('label', 'อบรม').find('input').uncheck().should('not.be.checked')
    cy.contains('button', 'Filter').click()
  })

  it('Event_Filter_Status_Done', () => {
    cy.contains('button', 'Filter').click()
    cy.contains('label', 'Done').find('input').check().should('be.checked')
    cy.wait(1000)
    cy.contains('label', 'Done').find('input').uncheck().should('not.be.checked')
    cy.contains('button', 'Filter').click()
  })

  it('Event_Filter_Status_Ongoing', () => {
    cy.contains('button', 'Filter').click()
    cy.contains('label', 'Ongoing').find('input').check().should('be.checked')
    cy.wait(1000)
    cy.contains('label', 'Ongoing').find('input').uncheck().should('not.be.checked')
    cy.contains('button', 'Filter').click()
  })

  it('Event_Filter_Status_Upcoming', () => {
    cy.contains('button', 'Filter').click()
    cy.contains('label', 'Upcoming').find('input').check().should('be.checked')
    cy.wait(1000)
    cy.contains('label', 'Upcoming').find('input').uncheck().should('not.be.checked')
    cy.contains('button', 'Filter').click()
  })

  // ==================== Event Detail ====================

  it('Event_Click_To_Detail', () => {
    cy.get('table tbody tr').first().find('a').first().click()
    cy.url().should('match', /\/event\/\d+/)
    cy.wait(2000)
  })

  it('Event_Detail_Back_To_List', () => {
    cy.get('table tbody tr').first().find('a').first().click()
    cy.url().should('match', /\/event\/\d+/)
    cy.wait(1000)
    cy.go('back')
    cy.url().should('include', '/event')
  })

})