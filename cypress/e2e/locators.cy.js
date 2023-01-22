/// <reference types="cypress" />

describe('Work with basic elements', () => {
    beforeEach(() => {
        cy.visit('https://wcaquino.me/cypress/componentes.html')
    })

    it('Using jquery selectors', () => {
        cy.get('table#tabelaUsuarios tbody > tr:eq(0) td:nth-child(3) > input')
            .click()
        cy.get('[onclick*=\'Francisco\']')
            .click()
        cy.get('#tabelaUsuarios td:contains(\'Doutorado\'):eq(0) ~ td:eq(3) > input')
            .click()
        cy.get('#tabelaUsuarios tr:contains(\'Doutorado\'):eq(0) td:eq(6) > input')
            .click()
    })

    it('Using xpath selectors', () => {
        cy.xpath('//input[contains(@onclick, \'Francisco\')]')
            .click()
        cy.xpath('//table[@id=\'tabelaUsuarios\']//td[contains(text(), \'Doutorado\')]/following-sibling::td[3]/input')
            .click()
    })
})