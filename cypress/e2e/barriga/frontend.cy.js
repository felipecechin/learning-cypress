/// <reference types="cypress" />
import '../../support/commandsContas'

import loc from "../../support/locators"

describe('Should test at a functional level', () => {
    beforeEach(() => {
        cy.intercept({
            method: 'POST',
            url: '/signin',
        }, { "id": 1, "nome": "a", "token": "Uma string muito grande" }).as('Signin')

        cy.intercept({
            method: 'GET',
            url: '/saldo',
        }, [{ "conta_id": 999, "conta": "Conta falsa 1", "saldo": "100.00" },
        { "conta_id": 9909, "conta": "Banco", "saldo": "100000.00" }
        ]).as('Saldo')
        cy.login('a@a', 'senha errada')
    })

    it('Should create an account', () => {
        cy.intercept({
            method: 'GET',
            url: '/contas',
        }, [
            { "id": 1, "nome": "Carteira", "visivel": true, "usuario_id": 1 },
            { "id": 2, "nome": "Banco", "visivel": true, "usuario_id": 1 }
        ]).as('Contas')

        cy.intercept({
            method: 'POST',
            url: '/contas',
        }, { "id": 3, "nome": "Conta de teste", "visivel": true, "usuario_id": 1 }).as('SaveConta')

        cy.acessarMenuConta()

        cy.intercept({
            method: 'GET',
            url: '/contas',
        }, [
            { "id": 1, "nome": "Carteira", "visivel": true, "usuario_id": 1 },
            { "id": 2, "nome": "Banco", "visivel": true, "usuario_id": 1 },
            { "id": 3, "nome": "Conta de teste", "visivel": true, "usuario_id": 1 }
        ]).as('ContasSave')
        cy.inserirConta('Conta de teste')
        cy.get(loc.MESSAGE).should('contain', 'Conta inserida com sucesso')
    })

    it('Should update an account', () => {
        cy.intercept({
            method: 'GET',
            url: '/contas',
        }, [
            { "id": 1, "nome": "Carteira", "visivel": true, "usuario_id": 1 },
            { "id": 2, "nome": "Banco", "visivel": true, "usuario_id": 1 }
        ]).as('Contas')

        cy.intercept({
            method: 'PUT',
            url: '/contas/**',
        }, { "id": 1, "nome": "Conta alterada", "visivel": true, "usuario_id": 1 }).as('SaveConta')

        cy.acessarMenuConta()
        cy.xpath(loc.CONTAS.FN_XP_BTN_ALTERAR('Carteira')).click()
        cy.get(loc.CONTAS.NOME)
            .clear()
            .type('Conta alterada')
        cy.get(loc.CONTAS.BTN_SALVAR).click()
        cy.get(loc.MESSAGE).should('contain', 'Conta atualizada com sucesso')
    })

    // it('Should not create an account with same name', () => {
    //     cy.acessarMenuConta()
    //     cy.get(loc.CONTAS.NOME).type('Conta mesmo nome')
    //     cy.get(loc.CONTAS.BTN_SALVAR).click()
    //     cy.get(loc.MESSAGE).should('contain', 'code 400')
    // })

    // it('Should create a transaction', () => {
    //     cy.get(loc.MENU.MOVIMENTACAO).click()
    //     cy.get(loc.MOVIMENTACAO.DESCRICAO).type('Desc')
    //     cy.get(loc.MOVIMENTACAO.VALOR).type('123')
    //     cy.get(loc.MOVIMENTACAO.CONTA).select('Conta para movimentacoes')
    //     cy.get(loc.MOVIMENTACAO.INTERESSADO).type('Inter')
    //     cy.get(loc.MOVIMENTACAO.STATUS).click()
    //     cy.get(loc.MOVIMENTACAO.BTN_SALVAR).click()
    //     cy.get(loc.MESSAGE).should('contain', 'sucesso')

    //     cy.get(loc.EXTRATO.LINHAS).should('have.length', 7)
    //     cy.xpath(loc.EXTRATO.FN_XP_BUSCA_ELEMENTO('Desc', '123')).should('exist')
    // })

    // it('Should get balance', () => {
    //     cy.get(loc.MENU.HOME).click()
    //     cy.xpath(loc.SALDO.FN_XP_SALDO_CONTA('Conta para saldo')).should('contain', '534,00')
    // })

    // it('Should remove a transaction', () => {
    //     cy.get(loc.MENU.EXTRATO).click()
    //     cy.xpath(loc.EXTRATO.FN_XP_REMOVER_ELEMENTO('Movimentacao para exclusao')).click()
    //     cy.get(loc.MESSAGE).should('contain', 'sucesso')
    // })
})