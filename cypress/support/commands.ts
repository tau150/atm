/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
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

Cypress.Commands.add("getByTestId", (id: string) => {
  cy.get(`[data-testid=${id}]`);
});

Cypress.Commands.add("login", () => {
  cy.intercept("POST", "/api/auth", {
    statusCode: 200,
    body: {
      status: "OK",
      data: {
        name: "test user",
        id: 1,
        balance: 5000,
        accountNumber: "1234",
        document: 112233445,
      },
    },
  });
  cy.visit("/");

  cy.getByTestId("pad").contains("3").click();
  cy.getByTestId("pad").contains("1").click();
  cy.getByTestId("pad").contains("7").click();
  cy.getByTestId("pad").contains("4").click();
  cy.getByTestId("pad").contains("3").click();
  cy.getByTestId("pad").contains("0").click();
  cy.getByTestId("pad").contains("1").click();
  cy.getByTestId("pad").contains("1").click();
  cy.getByTestId("pad").contains("Enter").click();
  cy.getByTestId("pad").contains("1").click();
  cy.getByTestId("pad").contains("2").click();
  cy.getByTestId("pad").contains("3").click();
  cy.getByTestId("pad").contains("4").click();
  cy.getByTestId("pad").contains("Enter").click();
});

// Prevent TypeScript from reading file as legacy script
export {};
