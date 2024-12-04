describe(' Hotel Booking Frontend', () => {
  let baseUrl;
  before(() => {
    cy.task('startServer').then((url) => {
      baseUrl = url; 
      cy.visit(baseUrl);
    });
  });
  after(() => {
    return cy.task('stopServer'); 
  });


//test case for adding new hotel
  it('should add a new hotel', () => {
    // opening modal to fill in the from
    cy.get('button[data-target="#hotelModal"]').click();
    cy.get('#hotelName').type('Test Hotel', { force: true });
    cy.get('#hotelLocation').type('Test Location', { force: true });
    cy.get('#hotelDescription').type('Test Description', { force: true });
    cy.get('#hotelOwner').type('test@example.com', { force: true });

    //button click
    cy.get('button.btn-primary').contains('Add New Hotel').click();

  });

//test case for empty field
  it("should be unable to add hotel: empty fields", () => {
    cy.visit(baseUrl);

    cy.get('button[data-target="#hotelModal"]').click();

    // cy.get('#hotelName').type('', { force: true });
    cy.get('#hotelLocation').type('Test Location', { force: true });
    cy.get('#hotelDescription').type('Test Description', { force: true });
    cy.get('#hotelOwner').type('test@example.com', { force: true });

    cy.get('button.btn-primary').contains('Add New Hotel').click();


    //errorr message asserting 
    cy.get('#errorMessage')
      .should('be.visible') //making sure the message is visible
      .and('have.text', 'All fields are required!');
    
    cy.get('#errorMessage')
      .should('have.class', 'text-danger');
  });


  //test case for short description
  it("should be unable to add hotel: short description", () => {
    cy.visit(baseUrl);
    
    cy.get('button[data-target="#hotelModal"]').click();
    cy.get("#hotelName").type("Test hotel", { force: true });
    cy.get("#hotelLocation").type("Test Location", { force: true });
    cy.get("#hotelDescription").type("Short", { force: true });
    cy.get("#hotelOwner").type("test@example.com", { force: true });
    
    cy.get("button.btn-primary").contains("Add New Hotel").click();

  });

  //test case for long valid description
  it("should add a hotel with a long but valid description", () => {
    cy.visit(baseUrl);
  
    
    cy.get('button[data-target="#hotelModal"]').click();
  
    cy.get("#hotelName").type("Hotel with long description", { force: true });
    cy.get("#hotelLocation").type("Test Location", { force: true });
  
    // creating a description with a valid length
    const longDescription = "This is a description that is long enough and valid.";
    cy.get("#hotelDescription").type(longDescription, { force: true });
  
    cy.get("#hotelOwner").type("test@example.com", { force: true });
  
    
    cy.get("button.btn-primary").contains("Add New Hotel").click();
  
  
  });
  
  //test case for invalid email format
  it("should be unable to add hotel: invalid email format", () => {
    cy.visit(baseUrl);
  
    cy.get('button[data-target="#hotelModal"]').click();
    cy.get("#hotelName").type("Test Hotel", { force: true });
    cy.get("#hotelLocation").type("Test Location", { force: true });
    cy.get("#hotelDescription").type("Valid Description", { force: true });
  
    // invalid email
    cy.get("#hotelOwner").type("invalid-email", { force: true });
    
    cy.get("button.btn-primary").contains("Add New Hotel").click();
  
    //error message
    cy.get("#errorMessage")
      .should("be.visible")
      .and("have.text", "Please enter a valid email!");
  });
  

});

