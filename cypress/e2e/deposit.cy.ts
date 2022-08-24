import { verify } from "crypto";

import { ResultStatus } from "types";

describe("Deposit flow", () => {
  beforeEach(() => {
    cy.login();
    cy.contains("Deposit").click();
  });

  it("show the page correctly", () => {
    cy.contains("Amount of deposit");
    cy.contains("100");
    cy.contains("200");
    cy.contains("500");
    cy.contains("1000");
    cy.getByTestId("pad");
    cy.getByTestId("pad").contains("Enter").should("be.disabled");
  });

  it("click on cancel button should redirect to home page", () => {
    cy.contains("Amount of deposit");
    cy.contains("Cancel").click();
    cy.url().should("be.equal", `${Cypress.config("baseUrl")}/home`);
  });

  it("show amount properly, and update when delete button is clicked", () => {
    cy.getByTestId("input-100").click();
    cy.getByTestId("pad").contains("1").click();
    cy.contains("$100");
    cy.contains("Delete").click();
    cy.contains("$0");
  });

  it("show the correct final value when interact with multiple values", () => {
    cy.getByTestId("input-100").click();
    cy.getByTestId("pad").contains("1").click();
    cy.getByTestId("pad").contains("6").click();
    cy.getByTestId("pad").contains("8").click();
    cy.contains("$16,800");
    cy.getByTestId("input-500").click();
    cy.getByTestId("pad").contains("2").click();
    cy.contains("$17,800");
    cy.getByTestId("input-1000").click();
    cy.getByTestId("pad").contains("1").click();
    cy.getByTestId("pad").contains("1").click();
    cy.getByTestId("pad").contains("1").click();
    cy.getByTestId("pad").contains("1").click();
    cy.getByTestId("pad").contains("1").click();
    cy.contains("$1,128,800");
    cy.getByTestId("input-200").click();
    cy.getByTestId("pad").contains("2").click();
    cy.getByTestId("pad").contains("2").click();
    cy.contains("$1,133,200");
  });

  it("after set and amount and click on enter an error should be shown if something went wrong", () => {
    cy.intercept("/api/operations/deposit", {
      statusCode: 500,
    });

    cy.getByTestId("input-100").click();
    cy.getByTestId("pad").contains("1").click();
    cy.getByTestId("pad").contains("6").click();
    cy.getByTestId("pad").contains("8").click();
    cy.contains("$16,800");
    cy.contains("Enter").click();

    cy.contains("Something went wrong.");
  });

  it("after set and amount and click on enter should be redirect to success page and click 'Yes' for other operation", () => {
    cy.intercept("/api/operations/deposit", {
      statusCode: 200,
      body: {
        status: ResultStatus.OK,
        data: {
          balance: 16800,
        },
      },
    });

    cy.getByTestId("input-100").click();
    cy.getByTestId("pad").contains("1").click();
    cy.getByTestId("pad").contains("6").click();
    cy.getByTestId("pad").contains("8").click();
    cy.contains("$16,800");
    cy.contains("Enter").click();

    cy.url().should(
      "be.equal",
      `${Cypress.config("baseUrl")}/success?operation=deposit&amount=16800`,
    );
    cy.contains("Your deposit of amount $16,800 in the account number:");
    cy.contains("Yes").click();

    cy.url().should("be.equal", `${Cypress.config("baseUrl")}/home`);
  });

  it("after set and amount and click on enter should be redirect to success page and click 'No' for other operation", () => {
    cy.intercept("/api/operations/deposit", {
      statusCode: 200,
      body: {
        status: ResultStatus.OK,
        data: {
          balance: 16800,
        },
      },
    });

    cy.getByTestId("input-100").click();
    cy.getByTestId("pad").contains("1").click();
    cy.getByTestId("pad").contains("6").click();
    cy.getByTestId("pad").contains("8").click();
    cy.contains("$16,800");
    cy.contains("Enter").click();

    cy.url().should(
      "be.equal",
      `${Cypress.config("baseUrl")}/success?operation=deposit&amount=16800`,
    );
    cy.contains("Your deposit of amount $16,800 in the account number:");
    cy.contains("No").click();

    cy.url().should("be.equal", `${Cypress.config("baseUrl")}/`);
  });
});
