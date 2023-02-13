/// <reference types="cypress" />
import '../../support/commandsContas'

import buildEnv from '../../support/buildEnv'
import loc from "../../support/locators"

describe('Should test at a functional level', () => {
    beforeEach(() => {
        buildEnv()
        cy.login('a@a', 'senha errada')
    })

    it('Should create an account', () => {
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

    it('Should not create an account with same name', () => {
        cy.acessarMenuConta()
        cy.intercept({
            method: 'POST',
            url: '/contas',
        }, {
            statusCode: 400,
            body: { "error": "Já existe uma conta com esse nome!" }
        }).as('SalvarContaMesmoNome')

        cy.get(loc.CONTAS.NOME).type('Conta mesmo nome')
        cy.get(loc.CONTAS.BTN_SALVAR).click()
        cy.get(loc.MESSAGE).should('contain', 'code 400')
    })

    it('Should create a transaction', () => {
        cy.intercept({
            method: 'POST',
            url: '/transacoes'
        }, { "id": 1492081, "descricao": "feaf", "envolvido": "faf", "observacao": null, "tipo": "REC", "data_transacao": "2023-02-12T03:00:00.000Z", "data_pagamento": "2023-02-12T03:00:00.000Z", "valor": "234.00", "status": false, "conta_id": 1594754, "usuario_id": 1, "transferencia_id": null, "parcelamento_id": null })

        cy.intercept({
            method: 'GET',
            url: '/extrato/**',
        }, { fixture: 'movimentacaoSalva.json' })

        cy.get(loc.MENU.MOVIMENTACAO).click()
        cy.get(loc.MOVIMENTACAO.DESCRICAO).type('Desc')
        cy.get(loc.MOVIMENTACAO.VALOR).type('123')
        cy.get(loc.MOVIMENTACAO.CONTA).select('Banco')
        cy.get(loc.MOVIMENTACAO.INTERESSADO).type('Inter')
        cy.get(loc.MOVIMENTACAO.STATUS).click()
        cy.get(loc.MOVIMENTACAO.BTN_SALVAR).click()
        cy.get(loc.MESSAGE).should('contain', 'sucesso')
        cy.get(loc.EXTRATO.LINHAS).should('have.length', 7)
        cy.xpath(loc.EXTRATO.FN_XP_BUSCA_ELEMENTO('Desc', '123')).should('exist')
    })

    it('Should get balance', () => {
        cy.get(loc.MENU.HOME).click()
        cy.xpath(loc.SALDO.FN_XP_SALDO_CONTA('Banco')).should('contain', '100.000,00')
    })

    it('Should remove a transaction', () => {
        cy.intercept({
            method: 'DELETE',
            url: '/transacoes/**',
        }, { statusCode: 204 }).as('DeleteMovimentacao')

        cy.get(loc.MENU.EXTRATO).click()
        cy.xpath(loc.EXTRATO.FN_XP_REMOVER_ELEMENTO('Movimentacao para extrato')).click()
        cy.get(loc.MESSAGE).should('contain', 'sucesso')
    })

    it('Should validate data send to create an account', () => {
        cy.intercept({
            method: 'POST',
            url: '/contas',
        }, (req) => {
            req.reply({ "id": 3, "nome": "Conta de teste", "visivel": true, "usuario_id": 1 })
            expect(req.body.nome).to.be.not.empty
            expect(req.headers).to.have.property('authorization')
        }).as('SaveConta')

        cy.acessarMenuConta()

        cy.intercept({
            method: 'GET',
            url: '/contas',
        }, [
            { "id": 1, "nome": "Carteira", "visivel": true, "usuario_id": 1 },
            { "id": 2, "nome": "Banco", "visivel": true, "usuario_id": 1 },
            { "id": 3, "nome": "Conta de teste", "visivel": true, "usuario_id": 1 }
        ]).as('ContasSave')
        cy.inserirConta('teste')
        // cy.wait('@SaveConta').its('request.body.nome').should('not.be.empty')
        cy.get(loc.MESSAGE).should('contain', 'Conta inserida com sucesso')
    })

    it('Should test colors', () => {
        cy.intercept({
            method: 'GET',
            url: '/extrato/**',
        }, [
            { "conta": "Conta para alterar", "id": 1492081, "descricao": "Receita paga", "envolvido": "faf", "observacao": null, "tipo": "REC", "data_transacao": "2023-02-12T03:00:00.000Z", "data_pagamento": "2023-02-12T03:00:00.000Z", "valor": "234.00", "status": true, "conta_id": 1594754, "usuario_id": 1, "transferencia_id": null, "parcelamento_id": null },
            { "conta": "Conta com movimentacao", "id": 1491237, "descricao": "Receita pendente", "envolvido": "BBB", "observacao": null, "tipo": "REC", "data_transacao": "2023-02-11T03:00:00.000Z", "data_pagamento": "2023-02-11T03:00:00.000Z", "valor": "-1500.00", "status": false, "conta_id": 1594757, "usuario_id": 1, "transferencia_id": null, "parcelamento_id": null },
            { "conta": "Conta para saldo", "id": 1491238, "descricao": "Despesa paga", "envolvido": "CCC", "observacao": null, "tipo": "DESP", "data_transacao": "2023-02-11T03:00:00.000Z", "data_pagamento": "2023-02-11T03:00:00.000Z", "valor": "3500.00", "status": true, "conta_id": 1594758, "usuario_id": 1, "transferencia_id": null, "parcelamento_id": null },
            { "conta": "Conta para saldo", "id": 1491239, "descricao": "Despesa pendente", "envolvido": "DDD", "observacao": null, "tipo": "DESP", "data_transacao": "2023-02-11T03:00:00.000Z", "data_pagamento": "2023-02-11T03:00:00.000Z", "valor": "-1000.00", "status": false, "conta_id": 1594758, "usuario_id": 1, "transferencia_id": null, "parcelamento_id": null },
        ])

        cy.get(loc.MENU.EXTRATO).click()
        cy.xpath(loc.EXTRATO.FN_XP_LINHA('Receita paga')).should('have.class', 'receitaPaga')
        cy.xpath(loc.EXTRATO.FN_XP_LINHA('Receita pendente')).should('have.class', 'receitaPendente')
        cy.xpath(loc.EXTRATO.FN_XP_LINHA('Despesa paga')).should('have.class', 'despesaPaga')
        cy.xpath(loc.EXTRATO.FN_XP_LINHA('Despesa pendente')).should('have.class', 'despesaPendente')
    })

    it('Should test the responsiveness', () => {
        cy.get('[data-test=menu-home]').should('exist').and('be.visible')
        cy.viewport(500, 700)
        cy.get('[data-test=menu-home]').should('exist').and('be.not.visible')
    })
})