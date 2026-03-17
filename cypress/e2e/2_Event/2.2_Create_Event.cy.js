describe('Create Event Page', () => {

  beforeEach(() => {
    cy.session('adminSession', () => {
      cy.visit('https://eventra.kasecode.com/')
      cy.get('input[placeholder="Email"]').type('admin@admin.com')
      cy.get('input[placeholder="Password"]').type('Admin_Pass101')
      cy.contains('button', 'Sign In').click()
      cy.url().should('not.include', '/login')
    })
    cy.visit('https://eventra.kasecode.com/add-event')
  })

  // ==================== Validation ====================

  it('CreateEvent_Submit_Empty_Form', () => {
    cy.contains('button', 'Create').click()
    cy.wait(1000)
    cy.contains('Required Field').should('be.visible')
    cy.wait(2000)
  })

  it('CreateEvent_Validation_Title_Required', () => {
    cy.contains('button', 'Create').click()
    cy.wait(1000)
    cy.get('input[placeholder="Name this event"]')
      .parents('div')
      .contains('Required Field')
      .should('be.visible')
    cy.wait(2000)
  })

  it('CreateEvent_Validation_Category_Required', () => {
    cy.contains('button', 'Create').click()
    cy.wait(1000)
    cy.contains('Required Select').should('be.visible')
    cy.wait(2000)
  })

  it('CreateEvent_Validation_Description_Required', () => {
    cy.contains('button', 'Create').click()
    cy.wait(1000)
    cy.get('textarea[placeholder*="Write some description"]')
      .parents('div')
      .contains('Required Field')
      .should('be.visible')
    cy.wait(2000)
  })

  it('CreateEvent_Validation_Location_Required', () => {
    cy.contains('button', 'Create').click()
    cy.wait(1000)
    cy.get('input[placeholder="Location/Building/Room Name"]')
      .parents('div')
      .contains('Required Field')
      .should('be.visible')
    cy.wait(2000)
  })

  // ==================== Fill Form ====================

  it('CreateEvent_Fill_Title', () => {
    cy.get('input[placeholder="Name this event"]')
      .type('Test Event', { delay: 80 })
    cy.wait(1000)
    cy.get('input[placeholder="Name this event"]')
      .should('have.value', 'Test Event')
    cy.wait(2000)
  })

  it('CreateEvent_Fill_Category', () => {
    cy.get('select').select(1)
    cy.wait(1000)
    cy.get('select').should('not.have.value', '')
    cy.wait(2000)
  })

  it('CreateEvent_Fill_Description', () => {
    cy.get('textarea[placeholder*="Write some description"]')
      .type('This is a test event description', { delay: 80 })
    cy.wait(1000)
    cy.get('textarea[placeholder*="Write some description"]')
      .should('have.value', 'This is a test event description')
    cy.wait(2000)
  })

  it('CreateEvent_Fill_Location', () => {
    cy.get('input[placeholder="Location/Building/Room Name"]')
      .type('Meeting Room A', { delay: 80 })
    cy.wait(1000)
    cy.get('input[placeholder="Location/Building/Room Name"]')
      .should('have.value', 'Meeting Room A')
    cy.wait(2000)
  })

  // ==================== Time Picker ====================

  it('CreateEvent_Time_Select_Start', () => {
    cy.contains('button', 'Start').click()
    cy.wait(1000)
    cy.contains('.tp-item', '09').click()
    cy.wait(500)
    cy.contains('.tp-item', '00').click()
    cy.wait(1000)
    cy.contains('button', /09:00/).should('be.visible')
    cy.wait(2000)
  })

  it('CreateEvent_Time_Select_End', () => {
    cy.contains('button', 'End').click()
    cy.wait(1000)
    cy.contains('.tp-item', '10').click()
    cy.wait(500)
    cy.contains('.tp-item', '00').click()
    cy.wait(1000)
    cy.contains('button', /10:00/).should('be.visible')
    cy.wait(2000)
  })

  it('CreateEvent_Time_Duration_Auto_Fill', () => {
    cy.contains('button', 'Start').click()
    cy.wait(1000)
    cy.contains('.tp-item', '09').click()
    cy.wait(500)
    cy.contains('.tp-item', '00').click()
    cy.wait(1000)

    cy.contains('button', 'End').click()
    cy.wait(1000)
    cy.contains('.tp-item', '10').click()
    cy.wait(500)
    cy.contains('.tp-item', '30').click()
    cy.wait(1000)

    cy.get('input[placeholder="Auto fill   Hour"]')
      .should('have.value', '1 Hour 30 Min')
    cy.wait(2000)
  })

  it('CreateEvent_Time_End_Before_Start_Error', () => {
    cy.contains('button', 'Start').click()
    cy.wait(1000)
    cy.contains('.tp-item', '10').click()
    cy.wait(500)
    cy.contains('.tp-item', '00').click()
    cy.wait(1000)

    cy.contains('button', 'End').click()
    cy.wait(1000)
    cy.contains('.tp-item', '09').click()
    cy.wait(500)
    cy.contains('.tp-item', '00').click()
    cy.wait(1000)

    cy.contains('End time must be after start time').should('be.visible')
    cy.wait(2000)
  })

  // ==================== File Upload ====================

  it('CreateEvent_Upload_Valid_File', () => {
    cy.get('input[type="file"]').selectFile(
      { contents: Cypress.Buffer.from('test content'), fileName: 'test.pdf', mimeType: 'application/pdf' },
      { force: true }
    )
    cy.wait(1000)
    cy.contains('test.pdf').should('be.visible')
    cy.wait(2000)
  })

  it('CreateEvent_Upload_Invalid_File_Type', () => {
    cy.get('input[type="file"]').selectFile(
      { contents: Cypress.Buffer.from('test'), fileName: 'test.exe', mimeType: 'application/octet-stream' },
      { force: true }
    )
    cy.wait(1000)
    cy.contains('Unsupported file type').should('be.visible')
    cy.wait(2000)
  })

  it('CreateEvent_Remove_Uploaded_File', () => {
    cy.get('input[type="file"]').selectFile(
      { contents: Cypress.Buffer.from('test content'), fileName: 'test.pdf', mimeType: 'application/pdf' },
      { force: true }
    )
    cy.wait(1000)
    cy.contains('test.pdf').should('be.visible')
    cy.wait(1000)
    cy.get('button[aria-label="Remove file"]').click()
    cy.wait(1000)
    cy.contains('test.pdf').should('not.exist')
    cy.wait(2000)
  })

  // ==================== Guest Search ====================

  it('CreateEvent_Guest_Search', () => {
    cy.get('input[placeholder="Search ID / Name / Nickname"]')
      .type('สมชาย', { delay: 80 })
    cy.wait(1000)
    cy.get('button[aria-label="Search"]').click()
    cy.wait(2000)
  })

  it('CreateEvent_Guest_Select', () => {
    cy.get('table tbody tr').first()
      .find('input[type="checkbox"]')
      .check()
    cy.wait(1000)
    cy.contains('Selected Guests').should('be.visible')
    cy.wait(2000)
  })

  // ==================== Cancel ====================

  it('CreateEvent_Cancel_Empty_Form', () => {
    cy.contains('button', 'Cancel').click()
    cy.wait(1000)
    cy.url().should('include', '/event')
    cy.wait(2000)
  })

  it('CreateEvent_Cancel_Dirty_Form_Leave', () => {
    cy.get('input[placeholder="Name this event"]')
      .type('Test Event', { delay: 80 })
    cy.wait(1000)
    cy.contains('button', 'Cancel').click()
    cy.wait(1000)
    cy.contains('DO YOU WANT TO LEAVE THIS CHANGE?').should('be.visible')
    cy.wait(1000)
    cy.contains('button', 'Ok').click()
    cy.wait(1000)
    cy.url().should('include', '/event')
    cy.wait(2000)
  })

  it('CreateEvent_Cancel_Dirty_Form_Stay', () => {
    cy.get('input[placeholder="Name this event"]')
      .type('Test Event', { delay: 80 })
    cy.wait(1000)
    cy.contains('button', 'Cancel').click()
    cy.wait(1000)
    cy.contains('DO YOU WANT TO LEAVE THIS CHANGE?').should('be.visible')
    cy.wait(1000)
    cy.contains('button', 'Cancel').last().click()
    cy.wait(1000)
    cy.url().should('include', '/add-event')
    cy.wait(2000)
  })

  // ==================== Create Success ====================

  it('CreateEvent_Create_Success', () => {
    cy.get('input[placeholder="Name this event"]')
      .type('Cypress Test Event', { delay: 80 })
    cy.wait(500)

    cy.get('select').select(1)
    cy.wait(500)

    cy.get('textarea[placeholder*="Write some description"]')
      .type('Test Description', { delay: 80 })
    cy.wait(500)

    cy.get('input[placeholder="Location/Building/Room Name"]')
      .type('Room A', { delay: 80 })
    cy.wait(500)

    cy.get('input[type="date"]').type('2026-12-31', { force: true })
    cy.wait(500)

    cy.contains('button', 'Start').click()
    cy.wait(1000)
    cy.contains('.tp-item', '09').click()
    cy.wait(500)
    cy.contains('.tp-item', '00').click()
    cy.wait(500)

    cy.contains('button', 'End').click()
    cy.wait(1000)
    cy.contains('.tp-item', '10').click()
    cy.wait(500)
    cy.contains('.tp-item', '00').click()
    cy.wait(1000)

    cy.contains('button', 'Create').click()
    cy.wait(1000)
    cy.contains('Confirm Creation').should('be.visible')
    cy.wait(1000)
    cy.contains('button', 'OK').click()
    cy.wait(3000)
    cy.contains('New event has been created').should('be.visible')
    cy.wait(1000)
    cy.contains('button', 'OK').click()
    cy.wait(1000)
    cy.url().should('include', '/event')
    cy.wait(2000)
  })

})