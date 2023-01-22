/// <reference types="cypress" />

describe('Working with popup', () => {
    it('Testing popup directly', () => {
        cy.visit('https://wcaquino.me/cypress/frame.html')
        cy.on('window:alert', msg => {
            console.log(msg)
            expect(msg).to.be.equal('Click OK!')
        })
        cy.get('#otherButton').click()
    })

    it('Should verify if popup was invoked', () => {
        cy.visit('https://wcaquino.me/cypress/componentes.html')
        cy.window().then(win => {
            cy.stub(win, 'open').as('winOpen')
        })
        cy.get('#buttonPopUp').click()
        cy.get('@winOpen').should('be.called')
    })

    describe("With links", () => {
        beforeEach(() => {
            cy.visit('https://wcaquino.me/cypress/componentes.html')
        })

        it('Check popup with links', () => {
            cy.contains('Popup2')
                .should('have.prop', 'href')
                .and('equal', 'https://wcaquino.me/cypress/frame.html')
        })

        it('Should access popup dinamically', () => {
            cy.contains('Popup2').then($a => {
                const href = $a.prop('href')
                cy.visit(href)
                cy.get('#tfield').type('funciona')
            })
        })

        it('Should force link on same page', () => {
            cy.contains('Popup2')
                .invoke('removeAttr', 'target')
                .click()
            cy.get('#tfield').type('funciona')
        })
    })
})
