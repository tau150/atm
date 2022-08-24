import { ResultStatus } from "types";

describe("Home page", () => {
  beforeEach(() => {
    cy.login();
  });

  it("show the page correctly", () => {
    cy.contains("Extract");
    cy.contains("Deposit");
    cy.contains("Balance check");
    cy.contains("Cancel");
  });

  it("logout when cancel is clicked", () => {
    cy.contains("Cancel").click();

    cy.url().should("be.equal", `${Cypress.config("baseUrl")}/`);
  });

  it("redirect to balance page when balance button is clicked", () => {
    cy.intercept("/api/balance/112233445", {
      statusCode: 200,
      body: {
        status: ResultStatus.OK,
        data: {
          balance: 5000,
        },
      },
    });

    cy.contains("Balance check").click();

    cy.url().should("be.equal", `${Cypress.config("baseUrl")}/balance`);
  });

  it("redirect to extract page when extract button is clicked", () => {
    cy.contains("Extract").click();

    cy.url().should("be.equal", `${Cypress.config("baseUrl")}/extract`);
  });

  it("redirect to deposit page when deposit button is clicked", () => {
    cy.contains("Deposit").click();

    cy.url().should("be.equal", `${Cypress.config("baseUrl")}/deposits`);
  });
});
