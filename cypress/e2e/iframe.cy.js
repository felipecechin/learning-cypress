/// <reference types="cypress" />

describe('Working with iframe', () => {
    it('Testing iframe', () => {
        cy.visit('https://wcaquino.me/cypress/componentes.html')
        cy.get('#frame1').then(iframe => {
            const body = iframe.contents().find('body')
            cy.wrap(body).find('#tfield').type('funciona?')
                .should('have.value', 'funciona?')
        })
    })

    it('Testing iframe directly', () => {
        cy.visit('https://wcaquino.me/cypress/frame.html')
        cy.on('window:alert', msg => {
            console.log(msg)
            expect(msg).to.be.equal('Click OK!')
        })
        cy.get('#otherButton').click()
    })
})
