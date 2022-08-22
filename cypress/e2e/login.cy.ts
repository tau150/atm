describe("empty spec", () => {
  it("passes", () => {
    cy.visit("http://localhost:3000/", { failOnStatusCode: false });
  });
});

export {};
