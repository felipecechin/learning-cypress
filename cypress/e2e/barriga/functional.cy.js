/// <reference types="cypress" />

describe('Should test at a functional level', () => {
    beforeEach(() => {
        cy.visit('https://barrigareact.wcaquino.me/')
    })

    it('login', () => {
        cy.get('.input-group > .form-control').type('a@a')
        cy.get(':nth-child(2) > .form-control').type('a')
        cy.get('.btn').click()
        cy.get('.toast-message').should('contain', 'Bem vindo')
    })
})