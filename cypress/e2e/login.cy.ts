import { ResultStatus } from "types";

describe("Login page", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.getByTestId("pad").contains("Enter").as("enterButton");
  });

  it("show the page correctly", () => {
    cy.contains("Document");
    cy.contains("Password");
  });

  it("show an error message for invalid document or password", () => {
    cy.intercept("POST", "/api/auth", {
      statusCode: 401,
      body: {
        status: ResultStatus.WRONG_CREDENTIALS,
        data: { message: "Your document is password are incorrect" },
      },
    });

    cy.getByTestId("pad").contains("3").click();
    cy.getByTestId("pad").contains("1").click();
    cy.getByTestId("pad").contains("7").click();
    cy.getByTestId("pad").contains("4").click();
    cy.getByTestId("pad").contains("3").click();
    cy.getByTestId("pad").contains("0").click();
    cy.getByTestId("pad").contains("1").click();
    cy.getByTestId("pad").contains("1").click();
    cy.get("@enterButton").click();
    cy.getByTestId("pad").contains("1").click();
    cy.getByTestId("pad").contains("2").click();
    cy.getByTestId("pad").contains("3").click();
    cy.getByTestId("pad").contains("4").click();
    cy.get("@enterButton").click();

    cy.contains("Your document or password is incorrect");
  });

  it("redirect to extract page when login is successful", () => {
    cy.intercept("POST", "/api/auth", {
      statusCode: 200,
      body: {
        status: ResultStatus.OK,
        data: {
          name: "test user",
          id: 1,
          balance: 5000,
          accountNumber: "1234",
          document: 112233445,
        },
      },
    });

    cy.getByTestId("pad").contains("3").click();
    cy.getByTestId("pad").contains("1").click();
    cy.getByTestId("pad").contains("7").click();
    cy.getByTestId("pad").contains("4").click();
    cy.getByTestId("pad").contains("3").click();
    cy.getByTestId("pad").contains("0").click();
    cy.getByTestId("pad").contains("1").click();
    cy.getByTestId("pad").contains("1").click();
    cy.get("@enterButton").click();
    cy.getByTestId("pad").contains("1").click();
    cy.getByTestId("pad").contains("2").click();
    cy.getByTestId("pad").contains("3").click();
    cy.getByTestId("pad").contains("4").click();
    cy.get("@enterButton").click();

    cy.url().should("be.equal", `${Cypress.config("baseUrl")}/home`);
  });
});

export {};
