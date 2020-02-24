describe("Blog app", function() {
    beforeEach(function() {
        cy.request("POST", "http://localhost:3001/api/testing/reset");
        cy.request("POST", "http://localhost:3001/api/users/", {name: "Valokoodari", username: "valokoodari", password: "TestP4ssw0rd"});
        cy.visit("http://localhost:3000");
    });

    it("Login form is shown", function() {
        cy.contains("Log in");
    });

    describe("Login", function() {
        it("succeeds with correct credentials", () => {
            cy.get("#username-input").type("valokoodari");
            cy.get("#password-input").type("TestP4ssw0rd");
            cy.get("#login-button").click();

            cy.contains("logged in as Valokoodari");
        });

        it("fails with incorrect credentials", () => {
            cy.get("#username-input").type("teamgoose");
            cy.get("#password-input").type("TestP4ssw0rd");
            cy.get("#login-button").click();

            cy.get(".error")
                .should("contain", "Invalid username or password")
                .and("have.css", "border-color", "rgb(255, 0, 0)");

            cy.get("html")
                .should("not.contain", "logged in as Valokoodari")
                .should("contain", "Log in");
        });
    });

    describe("When logged in", function() {
        beforeEach(function() {
            cy.login({ username: "valokoodari", password: "TestP4ssw0rd" });
        });

        it("a blog can be created", function() {
            cy.contains("new blog").click();

            cy.get("#title-input").type("Test Blog");
            cy.get("#author-input").type("Tester");
            cy.get("#url-input").type("https://testurl.test");
            cy.get("#submit-button").click();

            cy.contains("Test Blog, Tester");
        });

        describe("Interaction with existing blogs", function() {
            beforeEach(function() {
                cy.createBlog({ title: "Test Blog", author: "Tester", url: "https://testurl.test" });
            });

            it("a blog can be liked", function() {
                cy.contains("view").click();
                cy.get(".information")
                    .should("contain", "0");

                cy.contains("like").click();
                cy.get(".information")
                    .should("contain", "1");
            });

            it("a blog can be removed", function() {
                cy.get("#blog-container").children().should("have.length", 2);

                cy.contains("view").click();
                cy.contains("remove").click();

                cy.get("#blog-container").children().should("have.length", 1);
            });
        });

        describe("Blog display", function() {
            beforeEach(function() {
                cy.createBlog({ title: "Test Blog 0", author: "Tester", url: "https://testurl.test", likes: 0 });
                cy.createBlog({ title: "Test Blog 1", author: "Tester One", url: "https://testurl1.test", likes: 12 });
                cy.createBlog({ title: "Test Blog 2", author: "Tester Two", url: "https://testurl2.test", likes: 4 });
                cy.createBlog({ title: "Test Blog 3", author: "Tester Three", url: "https://testurl3.test", likes: 27 });
            });

            it("blogs are in correct order", function() {
                let likes = [27, 12, 4, 0];

                for (let i = 2; i <= 5; i++) {
                    cy.get(`#blog-container > :nth-child(${i})`).contains(`${likes[i-2]}`);
                }
            });
        });
    });
});