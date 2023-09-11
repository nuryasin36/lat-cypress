// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
Cypress.Commands.add('resetUsers', () => {
    cy.request('DELETE', 'http://localhost:3000/auth/reset') // Untuk reset data backend agar tidak perlu memasukkan data baru terus menerus.
})

Cypress.Commands.add('badRequest', (response, message = []) => {
    expect(response.status).to.eq(400)
    expect(response.body.error).to.eq('Bad Request')
    message.forEach((message) => {
        expect(message).to.be.oneOf(response.body.message)
    })
})