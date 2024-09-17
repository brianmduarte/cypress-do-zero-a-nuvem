describe('Central de Atendimento ao Cliente TAT', () => {
    beforeEach(() => {
        cy.visit('./src/index.html')
    })

    it('CT01 - Preenchendo campos obrigatórios e enviando formulário', () =>{
        cy.get('#firstName').type('Brian Mucio')
        cy.get('#lastName').type('Duarte')
        cy.get('#email').type('braianmucioduarte@gmail.com')
        cy.get('#phone').type('973571449')
        cy.get('#product').select('Mentoria')
        cy.get('input[type="radio"][value="feedback"]').click()
        cy.get('input[type="checkbox"][value="email"]').click()
        cy.get('#open-text-area').type('O curso é excelente!')
        cy.get('button[type="submit"]').click()

        cy.get('.success').should('be.visible')
    })

    it('CT02 - Preenchendo campos obrigatórios, enviando formulário e setando tempo no campo de text', () =>{
        const longText = Cypress._.repeat('Um texto de agradecimento repetido 10 vezes!', 10)

        cy.get('#firstName').type('Brian Mucio')
        cy.get('#lastName').type('Duarte')
        cy.get('#email').type('braianmucioduarte@gmail.com')
        cy.get('#phone').type('973571449')
        cy.get('#product').select('Mentoria')
        cy.get('input[type="radio"][value="feedback"]').click()
        cy.get('input[type="checkbox"][value="email"]').click()
        cy.get('#open-text-area').type(longText, {delay: 0})
        cy.get('button[type="submit"]').click()

        cy.get('.success').should('be.visible')
    })

    it('CT03 - Mensagem de erro em caso de formulário com e-mail inválido', () =>{
        cy.get('#firstName').type('Brian Mucio')
        cy.get('#lastName').type('Duarte')
        cy.get('#email').type('braianmucioduarte')
        cy.get('#phone').type('973571449')
        cy.get('#product').select('Mentoria')
        cy.get('input[type="radio"][value="feedback"]').click()
        cy.get('input[type="checkbox"][value="email"]').click()
        cy.get('#open-text-area').type('Um texto muito longo aqui!', {delay: 10})
        cy.get('button[type="submit"]').click()

        cy.get('.error').should('be.visible')
    })

    it('CT04 - Teste para conferir se um campo numérico aceita string', () =>{
        cy.get('#firstName').type('Brian Mucio')
        cy.get('#lastName').type('Duarte')
        cy.get('#email').type('braianmucioduarte')

        cy.get('#phone').type('abc').should('have.value', '')
        
    })

    it('CT05 - Exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', () =>{
        cy.get('#firstName').type('Brian Mucio')
        cy.get('#lastName').type('Duarte')
        cy.get('#email').type('braianmucioduarte@gmail.com')
        cy.get('#product').select('YouTube')
        cy.get('input[type="radio"][value="feedback"]').check().should('be.checked')
        cy.get('input[type="checkbox"][value="phone"]').check()
        cy.get('#open-text-area').type('Um texto muito longo aqui!', {delay: 10})
        cy.get('button[type="submit"]').click()

        cy.get('.error').should('be.visible')
    })

    it('CT06 - Preenche e limpa os campos nome, sobrenome, email e telefone', () =>{
        cy.get('#firstName').type('Brian Mucio').should('have.value', 'Brian Mucio').clear().should('have.value', '')
        cy.get('#lastName').type('Duarte').should('have.value', 'Duarte').clear().should('have.value', '')
        cy.get('#email').type('braianmucioduarte@gmail.com').should('have.value', 'braianmucioduarte@gmail.com').clear().should('have.value', '')
        cy.get('#phone').type('3199999999').should('have.value', '3199999999').clear().should('have.value', '')

        cy.get('#product').select('Mentoria')
        cy.get('input[type="radio"][value="feedback"]').click()
        cy.get('input[type="checkbox"][value="phone"]').click()
        cy.get('#open-text-area').type('Um texto muito longo aqui!', {delay: 10})
        cy.get('button[type="submit"]').click()

        cy.get('.error').should('be.visible')
    })

    it('CT07 - Exibe mensagem de erro ao submeter o formulário sem preencher campos obrigatórios', () =>{
        cy.get('button[type="submit"]').click()

        cy.get('.error').should('be.visible')
    })

    it('CT08 - Envia formulário de sucesso utilizando comando customizado', () =>{
        cy.fillMandatoryFieldsAndSubmit()

        cy.get('.success').should('be.visible')
    })

    it('CT09 - Validando todas as opções de seleção do tipo radio', () =>{
        cy.get('input[type="radio"]')
        .each(TypeOfServices =>{
            cy.wrap(TypeOfServices)
            .check()
            .should('be.checked')
        })
    })
    

    it('CT10 - Marcando e desmarcando checkboxes', () => {
        cy.get('#check input[type="checkbox"]')
        .check()
        .should('be.checked')
        .first()
        .uncheck()
        .should('not.be.checked')
        
    })
    
    it('CT11 - Selecionando um arquivo da pasta fixtures', () => {
        
        cy.get('input[type="file"]').selectFile('cypress/fixtures/example.json')
        .should( input => {
            expect(input[0].files[0].name).to.equal('example.json')
        })
    })

    it.only('CT12 - Selecionando arquivo e simulando um drag-and-drop', () => {
        
        cy.get('input[type="file"]').selectFile('cypress/fixtures/example.json', { action: 'drag-drop'})
        .should( input => {
            expect(input[0].files[0].name).to.equal('example.json')
        })
    })

    it('CT13 - Selecionando um arquivo utilizando uma fixture para a qual foi dado um alias', () => {
        cy.get('input[type="file"]').selectFile('cypress/fixtures/example.json')
        
        
    })

})
