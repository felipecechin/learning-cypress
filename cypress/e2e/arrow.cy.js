/// <reference types="cypress" />

it('nada agora', function() {})

const soma = () => 5 +5
console.log(soma())

it('function test', function() {
    console.log('Function', this)
})