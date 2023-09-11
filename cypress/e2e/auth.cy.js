describe('Auth Module', () => {
    
    const userData = {
        name: 'John Doe',
        email: 'john@nest.test',
        password: 'Secret_123',
    }

    describe('Register', () => {
        /**
         * 1. error validation (null name, email, and password)
         * 2. error invalid email format
         * 3. error invalid password format
         * 4. registered successfull
         * 5. error duplicate entry
         */

        it('Should return any error messages for validation', () => {
            cy.request({
                method: 'POST',
                // url: 'http://localhost:3000/auth/register',
                url: '/auth/register', // Sudah disetting base URL. Cek di cypress.config.js
                failOnStatusCode: false, //untuk melanjutkan proses walaupun ada gagal di awal
            }).then((response) => {
                // expect(response.status).to.eq(400)
                // expect(response.body.error).to.eq('Bad Request')
                // expect('name should not be empty').to.be.oneOf(response.body.message)
                // expect('email should not be empty').to.be.oneOf(response.body.message)
                // expect('password should not be empty').to.be.oneOf(response.body.message)
                // Di atas sebelum diganti global function. Cek di commands.js

                cy.badRequest(response, [
                    'name should not be empty',
                    'email should not be empty',
                    'password should not be empty'
                ])
            })
        });

        it('Should return any error messages for invalid email format', () => {
            cy.request({
                method: 'POST',
                // url: 'http://localhost:3000/auth/register',
                url: '/auth/register', // Sudah disetting base URL. Cek di cypress.config.js
                failOnStatusCode: false, //untuk melanjutkan proses walaupun ada gagal di awal
                body: {
                    // name: 'John Doe',
                    // email: 'john @ nest.test', 
                    // password: 'Secret_123',
                    // Di atas adalah data lama sebelum ada userData line 3

                    name: userData.name,
                    email: 'john @ nest.test',
                    password: userData.password,
                }
            }).then((response) => {
                // expect(response.status).to.eq(400)
                // expect(response.body.error).to.eq('Bad Request')
                // expect('email must be an email').to.be.oneOf(response.body.message)
                // Di atas sebelum diganti global function. Cek di commands.js

                cy.badRequest(response, ['email must be an email'])
            })
        });

        it('Should return any error messages for invalid password format', () => {
            cy.request({
                method: 'POST',
                // url: 'http://localhost:3000/auth/register',
                url: '/auth/register', // Sudah disetting base URL. Cek di cypress.config.js
                failOnStatusCode: false, //untuk melanjutkan proses walaupun ada gagal di awal
                body: {
                    // name: 'John Doe',
                    // email: 'john@nest.test',
                    // password: 'invalidpassword',
                    // Di atas adalah data lama sebelum ada userData line 3
                    
                    name: userData.name,
                    email: userData.email,
                    password: 'invalidpassword',
                }
            }).then((response) => {
                // expect(response.status).to.eq(400)
                // expect(response.body.error).to.eq('Bad Request')
                // expect('password is not strong enough').to.be.oneOf(response.body.message)
                // Di atas sebelum diganti global function. Cek di commands.js

                cy.badRequest(response, ['password is not strong enough'])
            })
        });

        it('Should successdully registered', () => {
            cy.resetUsers() // Reset data backend. Cek global function di commands.js
            cy.request({
                method: 'POST',
                // url: 'http://localhost:3000/auth/register',
                url: '/auth/register', // Sudah disetting base URL. Cek di cypress.config.js
                // failOnStatusCode: false,
                body: {
                    // name: 'John Doe',
                    // email: 'john@nest.test',
                    // password: 'Secret_123',
                    // Di atas adalah data lama sebelum ada userData line 3

                    name: userData.name,
                    email: userData.email,
                    password: userData.password,
                }
            }).then((response) => {
                const {id, name, email, password} = response.body.data
                expect(response.status).to.eq(201)
                expect(response.body.success).to.be.true
                expect(id).not.to.be.undefined
                expect(name).to.eq('John Doe')
                expect(email).to.eq('john@nest.test')
                expect(password).to.be.undefined
            })
        });

        it('Return error on duplicate registered email', () => {
            cy.request({
                method: 'POST',
                // url: 'http://localhost:3000/auth/register',
                url: '/auth/register', // Sudah disetting base URL. Cek di cypress.config.js
                failOnStatusCode: false,
                body: {
                    // name: 'John Doe',
                    // email: 'john@nest.test',
                    // password: 'Secret_123',
                    // Di atas adalah data lama sebelum ada userData line 3

                    name: userData.name,
                    email: userData.email,
                    password: userData.password,
                }
            }).then((response) => {
                expect(response.status).to.eq(500)
                expect(response.body.success).to.be.false
                expect(response.body.message).to.eq('Email already exists')
            })
        });
    })
})