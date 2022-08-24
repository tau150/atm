import { ResultStatus } from "../../types";

describe("Extraction flow", () => {
  beforeEach(() => {
    cy.login();
    cy.contains("Extract").click();
  });

  it("show the page correctly", () => {
    cy.contains("500");
    cy.contains("2000");
    cy.contains("3000");
    cy.contains("5000");
    cy.contains("6000");
    cy.contains("Other");
    cy.contains("Continue").should("be.disabled");
  });

  it("click on cancel button should redirect to home page", () => {
    cy.contains("Cancel").click();
    cy.url().should("be.equal", `${Cypress.config("baseUrl")}/home`);
  });

  it("click on any value should enabled the button", () => {
    cy.contains("Continue").should("be.disabled");
    cy.contains("500").click();
    cy.contains("Continue").should("be.enabled");
    cy.contains("500").click();
    cy.contains("Continue").should("be.enabled");
    cy.contains("2000").click();
    cy.contains("Continue").should("be.enabled");
    cy.contains("3000").click();
    cy.contains("Continue").should("be.enabled");
    cy.contains("5000").click();
    cy.contains("Continue").should("be.enabled");
    cy.contains("6000").click();
    cy.contains("Continue").should("be.enabled");
  });

  it("extract money shows an error when the request fails", () => {
    cy.intercept("/api/operations/extract", {
      statusCode: 500,
    }).as("extractErrorRequest");

    cy.contains("Continue").should("be.disabled");
    cy.contains("500").click();
    cy.contains("Continue").should("be.enabled");
    cy.contains("Continue").click();
    cy.wait("@extractErrorRequest");
    cy.contains("Something went wrong.");
  });

  it("show a modal indicating there is not enough founds when the extraction amount is more than the users has and click on cancel button on modal", () => {
    cy.intercept("/api/operations/extract", {
      statusCode: 200,
      body: {
        status: ResultStatus.NOT_ENOUGH_BALANCE,
      },
    });

    cy.contains("Continue").should("be.disabled");
    cy.contains("3000").click();
    cy.contains("Continue").should("be.enabled");
    cy.contains("Continue").click();
    cy.contains("Your Balance is insufficient");
    cy.getByTestId("insufficient-modal-footer").contains("Cancel").click();
    cy.getByTestId("insufficient-modal-footer").should("not.exist");
  });

  it("show a modal indicating there is not enough founds when the extraction amount is more than the users has check balance button on modal. After that click on 'No'", () => {
    cy.intercept("/api/operations/extract", {
      statusCode: 200,
      body: {
        status: ResultStatus.NOT_ENOUGH_BALANCE,
      },
    });

    cy.intercept("/api/balance/*", {
      statusCode: 200,
      body: {
        status: ResultStatus.OK,
        data: {
          balance: 3000,
        },
      },
    });

    cy.contains("Continue").should("be.disabled");
    cy.contains("3000").click();
    cy.contains("Continue").should("be.enabled");
    cy.contains("Continue").click();
    cy.contains("Your Balance is insufficient");
    cy.getByTestId("insufficient-modal-footer").contains("Check Balance").click();
    cy.url().should("be.equal", `${Cypress.config("baseUrl")}/balance`);

    cy.contains("Your Balance is:");
    cy.contains("$3,000");
    cy.contains("No").click();

    cy.url().should("be.equal", `${Cypress.config("baseUrl")}/`);
  });

  it("show a modal indicating there is not enough founds when the extraction amount is more than the users has check balance button on modal. After that click on 'Yes'", () => {
    cy.intercept("/api/operations/extract", {
      statusCode: 200,
      body: {
        status: ResultStatus.NOT_ENOUGH_BALANCE,
      },
    });

    cy.intercept("/api/balance/*", {
      statusCode: 200,
      body: {
        status: ResultStatus.OK,
        data: {
          balance: 3000,
        },
      },
    });

    cy.contains("Continue").should("be.disabled");
    cy.contains("3000").click();
    cy.contains("Continue").should("be.enabled");
    cy.contains("Continue").click();
    cy.contains("Your Balance is insufficient");
    cy.getByTestId("insufficient-modal-footer").contains("Check Balance").click();
    cy.url().should("be.equal", `${Cypress.config("baseUrl")}/balance`);

    cy.contains("Your Balance is:");
    cy.contains("$3,000");
    cy.contains("Yes").click();

    cy.url().should("be.equal", `${Cypress.config("baseUrl")}/home`);
  });

  it("show a modal indicating there is not enough founds when the extraction amount is more than the users has and click on other amount button on modal", () => {
    cy.intercept("/api/operations/extract", {
      statusCode: 200,
      body: {
        status: ResultStatus.NOT_ENOUGH_BALANCE,
      },
    });

    cy.contains("Continue").should("be.disabled");
    cy.contains("3000").click();
    cy.contains("Continue").should("be.enabled");
    cy.contains("Continue").click();
    cy.contains("Your Balance is insufficient");
    cy.getByTestId("insufficient-modal-footer").contains("Other amount").click();
    cy.url().should("be.equal", `${Cypress.config("baseUrl")}/otherAmount`);
  });

  it("extract other amount of money, not enough balance", () => {
    cy.intercept("/api/operations/extract", {
      statusCode: 200,
      body: {
        status: ResultStatus.NOT_ENOUGH_BALANCE,
      },
    });

    cy.contains("Continue").should("be.disabled");
    cy.contains("Other").click();
    cy.url().should("be.equal", `${Cypress.config("baseUrl")}/otherAmount`);
    cy.contains("1").click();
    cy.contains("3").click();
    cy.contains("5").click();
    cy.contains("0").click();
    cy.contains("Enter").click();
    cy.contains("Your Balance is insufficient");
  });

  it("extract other amount of money, with error", () => {
    cy.intercept("/api/operations/extract", {
      statusCode: 500,
    });

    cy.contains("Continue").should("be.disabled");
    cy.contains("Other").click();
    cy.url().should("be.equal", `${Cypress.config("baseUrl")}/otherAmount`);
    cy.contains("1").click();
    cy.contains("3").click();
    cy.contains("5").click();
    cy.contains("0").click();
    cy.contains("Enter").click();
    cy.contains("Something went wrong.");
  });

  it("extract other amount of money, with success and click 'Yes' ", () => {
    cy.intercept("/api/operations/extract", {
      statusCode: 200,
      body: {
        status: ResultStatus.OK,
        data: {
          rest: 2000,
        },
      },
    });

    cy.contains("Continue").should("be.disabled");
    cy.contains("Other").click();
    cy.url().should("be.equal", `${Cypress.config("baseUrl")}/otherAmount`);
    cy.getByTestId("pad").contains("1").click();
    cy.getByTestId("pad").contains("3").click();
    cy.getByTestId("pad").contains("5").click();
    cy.getByTestId("pad").contains("0").click();
    cy.getByTestId("pad").contains("Enter").click();

    cy.url().should(
      "be.equal",
      `${Cypress.config("baseUrl")}/success?operation=extraction&amount=01350`,
    );
    cy.contains("Your extraction of amount $1,350 in the account number:");
    cy.contains("Yes").click();
    cy.url().should("be.equal", `${Cypress.config("baseUrl")}/home`);
  });

  it("extract other amount of money, with success and click 'No' ", () => {
    cy.intercept("/api/operations/extract", {
      statusCode: 200,
      body: {
        status: ResultStatus.OK,
        data: {
          rest: 2000,
        },
      },
    });

    cy.contains("Continue").should("be.disabled");
    cy.contains("Other").click();
    cy.url().should("be.equal", `${Cypress.config("baseUrl")}/otherAmount`);
    cy.getByTestId("pad").contains("1").click();
    cy.getByTestId("pad").contains("3").click();
    cy.getByTestId("pad").contains("5").click();
    cy.getByTestId("pad").contains("0").click();
    cy.getByTestId("pad").contains("Enter").click();

    cy.url().should(
      "be.equal",
      `${Cypress.config("baseUrl")}/success?operation=extraction&amount=01350`,
    );
    cy.contains("Your extraction of amount $1,350 in the account number:");
    cy.contains("No").click();
    cy.url().should("be.equal", `${Cypress.config("baseUrl")}/`);
  });

  it("extract other amount of money, with success and click 'Yes' ", () => {
    cy.intercept("/api/operations/extract", {
      statusCode: 200,
      body: {
        status: ResultStatus.OK,
        data: {
          rest: 2000,
        },
      },
    });

    cy.contains("Continue").should("be.disabled");
    cy.contains("500").click();
    cy.contains("Continue").click();

    cy.url().should(
      "be.equal",
      `${Cypress.config("baseUrl")}/success?operation=extraction&amount=500`,
    );
    cy.contains("Your extraction of amount $500 in the account number:");
    cy.contains("Yes").click();
    cy.url().should("be.equal", `${Cypress.config("baseUrl")}/home`);
  });

  it("extract other amount of money, with success and click 'No' ", () => {
    cy.intercept("/api/operations/extract", {
      statusCode: 200,
      body: {
        status: ResultStatus.OK,
        data: {
          rest: 2000,
        },
      },
    });

    cy.contains("Continue").should("be.disabled");
    cy.contains("500").click();
    cy.contains("Continue").click();

    cy.url().should(
      "be.equal",
      `${Cypress.config("baseUrl")}/success?operation=extraction&amount=500`,
    );
    cy.contains("Your extraction of amount $500 in the account number:");
    cy.contains("No").click();
    cy.url().should("be.equal", `${Cypress.config("baseUrl")}/`);
  });
});
