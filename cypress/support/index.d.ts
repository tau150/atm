/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable<Subject = any> {
    getByTestId(id: string): Chainable<null>;
    login(): Chainable<null>;
  }
}
