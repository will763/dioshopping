describe('The Home Page', () => {
  it('add items to cart', () => {
    cy.visit('/')

    cy.get(':nth-child(1) > .MuiPaper-root > .MuiGrid-container > .MuiButtonBase-root > .MuiButton-label').click()
    cy.get(':nth-child(2) > .MuiPaper-root > .MuiGrid-container > .MuiButtonBase-root > .MuiButton-label').click()
    cy.get(':nth-child(1) > .MuiPaper-root > .MuiGrid-container > .MuiButtonBase-root > .MuiButton-label').click()
    cy.get(':nth-child(2) > .MuiPaper-root > .MuiGrid-container > .MuiButtonBase-root > .MuiButton-label').click()

    cy.get('.btn-info').click()
    cy.get('[colspan="3"]').should(($total) => {
       expect($total).to.contain('4 itens')
    })
  })

  it('exclude items from to cart', () => {
    cy.visit('/')

    cy.get(':nth-child(1) > .MuiPaper-root > .MuiGrid-container > .MuiButtonBase-root > .MuiButton-label').click()
    cy.get(':nth-child(2) > .MuiPaper-root > .MuiGrid-container > .MuiButtonBase-root > .MuiButton-label').click()
    cy.get(':nth-child(1) > .MuiPaper-root > .MuiGrid-container > .MuiButtonBase-root > .MuiButton-label').click()
    cy.get(':nth-child(2) > .MuiPaper-root > .MuiGrid-container > .MuiButtonBase-root > .MuiButton-label').click()

    cy.get('.btn-info').click()

    cy.get(':nth-child(1) > :nth-child(6) > .badge').click();
    cy.get(':nth-child(2) > :nth-child(6) > .badge').click();


    cy.get('[colspan="3"]').should(($total) => {
       expect($total).to.contain('2 itens')
    })

    cy.get('.modal-footer > .btn').click()

    cy.get('.btn-info > .badge').should(($total) => {
       expect($total).to.contain('2')
    })
  })

  it('title of page', () => {
    cy.visit('/')

    cy.get('.MuiGrid-align-items-xs-center > .MuiTypography-root').should(($title) => {
        expect($title).contain('Dio Shopping')
    })

  })

  it('create messages for contact contact', () => {
    cy.visit('/contato')

    cy.get('#name').type('Hello, World');
    cy.get('#message').type('testing messaging')
    cy.get('.MuiButton-contained').click();

    cy.get('.alert').get('strong').contains('Mensagem foi enviada')

    cy.get('#name').type('Hello, World');
    cy.get('#message').type('testing messaging')
    cy.get('.MuiButton-contained').click();

    cy.get(':nth-child(4) > .card-body')
    cy.get(':nth-child(5) > .card-body')

  })

  it('error message when filling in the fields', () => {
    cy.visit('/contato')

    cy.get('#name').type('Hello, World');
    cy.get('.MuiButton-contained').click();
    cy.get('.alert').get('strong').contains('Por favor preencha todos os campos!')

    cy.get('#name').clear()
    
    cy.get('#message').type('testing messaging')
    cy.get('.MuiButton-contained').click();
    cy.get('.MuiButton-contained').click();
    cy.get('.alert').get('strong').contains('Por favor preencha todos os campos!')


  })
  
})