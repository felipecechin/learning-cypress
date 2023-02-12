const buildEnv = () => {
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

    cy.intercept({
        method: 'GET',
        url: '/contas',
    }, [
        { "id": 1, "nome": "Carteira", "visivel": true, "usuario_id": 1 },
        { "id": 2, "nome": "Banco", "visivel": true, "usuario_id": 1 }
    ]).as('Contas')

    cy.intercept({
        method: 'GET',
        url: '/extrato/**',
    }, [
        { "conta": "Conta para alterar", "id": 1492081, "descricao": "feaf", "envolvido": "faf", "observacao": null, "tipo": "REC", "data_transacao": "2023-02-12T03:00:00.000Z", "data_pagamento": "2023-02-12T03:00:00.000Z", "valor": "234.00", "status": false, "conta_id": 1594754, "usuario_id": 1, "transferencia_id": null, "parcelamento_id": null },
        { "conta": "Conta com movimentacao", "id": 1491237, "descricao": "Movimentacao de conta", "envolvido": "BBB", "observacao": null, "tipo": "DESP", "data_transacao": "2023-02-11T03:00:00.000Z", "data_pagamento": "2023-02-11T03:00:00.000Z", "valor": "-1500.00", "status": true, "conta_id": 1594757, "usuario_id": 1, "transferencia_id": null, "parcelamento_id": null },
        { "conta": "Conta para saldo", "id": 1491238, "descricao": "Movimentacao 1, calculo saldo", "envolvido": "CCC", "observacao": null, "tipo": "REC", "data_transacao": "2023-02-11T03:00:00.000Z", "data_pagamento": "2023-02-11T03:00:00.000Z", "valor": "3500.00", "status": false, "conta_id": 1594758, "usuario_id": 1, "transferencia_id": null, "parcelamento_id": null },
        { "conta": "Conta para saldo", "id": 1491239, "descricao": "Movimentacao 2, calculo saldo", "envolvido": "DDD", "observacao": null, "tipo": "DESP", "data_transacao": "2023-02-11T03:00:00.000Z", "data_pagamento": "2023-02-11T03:00:00.000Z", "valor": "-1000.00", "status": true, "conta_id": 1594758, "usuario_id": 1, "transferencia_id": null, "parcelamento_id": null },
        { "conta": "Conta para saldo", "id": 1491240, "descricao": "Movimentacao 3, calculo saldo", "envolvido": "EEE", "observacao": null, "tipo": "REC", "data_transacao": "2023-02-11T03:00:00.000Z", "data_pagamento": "2023-02-11T03:00:00.000Z", "valor": "1534.00", "status": true, "conta_id": 1594758, "usuario_id": 1, "transferencia_id": null, "parcelamento_id": null },
        { "conta": "Conta para extrato", "id": 1491241, "descricao": "Movimentacao para extrato", "envolvido": "FFF", "observacao": null, "tipo": "DESP", "data_transacao": "2023-02-11T03:00:00.000Z", "data_pagamento": "2023-02-11T03:00:00.000Z", "valor": "-220.00", "status": true, "conta_id": 1594759, "usuario_id": 1, "transferencia_id": null, "parcelamento_id": null }
    ])
}

export default buildEnv;