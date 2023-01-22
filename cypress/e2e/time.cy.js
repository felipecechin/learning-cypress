/// <reference types="cypress" />

describe('Work with time', () => {
    beforeEach(() => {
        cy.visit('https://wcaquino.me/cypress/componentes.html')
    })

    it('Going back to the past', () => {
        // cy.get('#buttonNow').click()
        // cy.get('#resultado > span').should('contain', '31/12/1969')

        // cy.clock()
        // cy.get('#buttonNow').click()
        // cy.get('#resultado > span').should('contain', '31/12/1969')

        const dt = new Date(2012, 3, 10, 15, 23, 50)
        cy.clock(dt.getTime())
        cy.get('#buttonNow').click()
        cy.get('#resultado > span').should('contain', '10/04/2012')
    })

    it.only('Goes to the future', () => {
        cy.get('#buttonTimePassed').click()
        cy.get('#resultado > span').should('contain', '16')
        cy.get('#resultado > span').invoke('text').then(parseInt).should('gt', 1674358653133)

        cy.clock()
        cy.get('#buttonTimePassed').click()
        cy.get('#resultado > span').invoke('text').then(parseInt).should('lte', 0)

        cy.tick(10000)
        cy.get('#buttonTimePassed').click()
        cy.get('#resultado > span').invoke('text').then(parseInt).should('gte', 10000)
    })
})