describe(' Hotel Booking Frontend', () => {
  let baseUrl;
  before(() => {
    cy.task('startServer').then((url) => {
      baseUrl = url; // Store the base URL
      cy.visit(baseUrl);
    });
  });
  after(() => {
    return cy.task('stopServer'); // Stop the server after the report is done
  });

  it('should add a new hotel', () => {
    // Open the modal and fill in the form
    cy.get('button[data-target="#hotelModal"]').click();
    cy.get('#hotelName').type('Test Hotel', { force: true });
    cy.get('#hotelLocation').type('Test Location', { force: true });
    cy.get('#hotelDescription').type('Test Description', { force: true });
    cy.get('#hotelOwner').type('test@example.com', { force: true });

    // Click the add hotel button
    cy.get('button.btn-primary').contains('Add New Hotel').click();

  });


  it("should be unable to add hotel - empty fields", () => {
    cy.visit(baseUrl);

    cy.get('button[data-target="#hotelModal"]').click();

    // cy.get('#hotelName').type('', { force: true });
    cy.get('#hotelLocation').type('Test Location', { force: true });
    cy.get('#hotelDescription').type('Test Description', { force: true });
    cy.get('#hotelOwner').type('test@example.com', { force: true });

    cy.get('button.btn-primary').contains('Add New Hotel').click();


    // Assert that the error message is displayed with the correct text
    cy.get('#errorMessage')
      .should('be.visible') // Ensure the message is visible
      .and('have.text', 'All fields are required!'); // Check the error message text
    // Assert that the message has the "text-danger" class
    cy.get('#errorMessage')
      .should('have.class', 'text-danger');
  });

  it("should be unable to add hotel - short description", () => {
    cy.visit(baseUrl);
    // Open the modal and fill in the form
    cy.get('button[data-target="#hotelModal"]').click();
    cy.get("#hotelName").type("Test hotel", { force: true });
    cy.get("#hotelLocation").type("Test Location", { force: true });
    cy.get("#hotelDescription").type("Short", { force: true });
    cy.get("#hotelOwner").type("test@example.com", { force: true });
    // Click the add hotel button
    cy.get("button.btn-primary").contains("Add New Hotel").click();

  });

  it("should add a hotel with a long but valid description", () => {
    cy.visit(baseUrl);
  
    // Open the modal and fill in the form
    cy.get('button[data-target="#hotelModal"]').click();
  
    cy.get("#hotelName").type("Hotel with Long Description", { force: true });
    cy.get("#hotelLocation").type("Test Location", { force: true });
  
    // creating a description with a valid length
    const longDescription = "This is a valid description that is long enough but not exceeding the maximum allowed characters.".repeat(3);
    cy.get("#hotelDescription").type(longDescription, { force: true });
  
    cy.get("#hotelOwner").type("test@example.com", { force: true });
  
    // Click the add hotel button
    cy.get("button.btn-primary").contains("Add New Hotel").click();
  
  
  });
  //test case for invalid email format

  it("should be unable to add hotel - invalid email format", () => {
    cy.visit(baseUrl);
  
    cy.get('button[data-target="#hotelModal"]').click();
    cy.get("#hotelName").type("Test Hotel", { force: true });
    cy.get("#hotelLocation").type("Test Location", { force: true });
    cy.get("#hotelDescription").type("Valid Description", { force: true });
  
    // Invalid email
    cy.get("#hotelOwner").type("invalid-email", { force: true });
    
    cy.get("button.btn-primary").contains("Add New Hotel").click();
  
    // Assert error message for invalid email
    cy.get("#errorMessage")
      .should("be.visible")
      .and("have.text", "Please enter a valid email!");
  });
  

});

