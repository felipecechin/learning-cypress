/// <reference types="cypress" />

describe('Sending form', () => {
    beforeEach(() => {
        cy.visit('https://wcaquino.me/cypress/componentes.html')
    })

    it('Validating form', () => {
        const stub = cy.stub().as('alerta')
        cy.on('window:alert', stub)
        cy.get('#formCadastrar').click().then(() => {
            expect(stub.getCall(0)).to.be.calledWith('Nome eh obrigatorio')
        })

        cy.get('#formNome').type('Cypress Test')
        cy.get('#formCadastrar').click().then(() => {
            expect(stub.getCall(1)).to.be.calledWith('Sobrenome eh obrigatorio')
        })
        cy.get('[data-cy="dataSobrenome"]').type('Sobrenome')
        cy.get('#formCadastrar').click().then(() => {
            expect(stub.getCall(2)).to.be.calledWith('Sexo eh obrigatorio')
        })
        cy.get('#formSexoFem').click()
        cy.get('#formCadastrar').click()
        cy.get('#resultado > span').should('have.text', 'Cadastrado!')
    })
})