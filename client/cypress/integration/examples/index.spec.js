///<reference types="cypress" />

describe("", () => {
  it("Search and add two countries to the list", () => {
    // Visit localhost
    cy.visit("http://localhost:3000");

    // Wait until the token was set
    cy.wait(1000);

    // Get the input and type Mexico
    cy.get("input[name='search']").type("Mexico");

    // Click to search for the country named Mexico
    cy.get("button[name='search']").click();

    // Find the add button and click it to select Mexico
    cy.contains("Add").click();

    // Get the input and type United States
    cy.get("input[name='search']").clear().type("United States of America");

    // Click to search for the country named United States
    cy.get("button[name='search']").click();

    // Find the add button and click it to select United States
    cy.contains("Add").click();

    // Make sure Mexico was added to the list.
    cy.get(".App > :nth-child(5)").contains("Mexico");

    // Convert 500 SEK to all countrie's currencies
    cy.get("input[type='number']").clear().type(500);
  });

  it("Search for an unknown country", () => {
    // Visit localhost
    cy.visit("http://localhost:3000");

    // Wait until the token was set
    cy.wait(1000);

    // Get the input and type Unknown
    cy.get("input[name='search']").type("Unknown");

    // Click to search for the country named Mexico
    cy.get("button[name='search']").click();

    // Make sure the error message is shown
    cy.contains("No results found for search: Unknown");
  });
});
