const CART = ".shopping_cart_link";
const ADD_TO_CART_BUTTON = ".btn_inventory";

//Validation of Low to High filter
Cypress.Commands.add("validateOrderingLoHi", { prevSubject: false }, (arr) => {
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] < arr[i - 1]) {
      return false;
    }
  }
  return true;
});

//Validation of High to Low filter
Cypress.Commands.add("validateOrderingHiLo", { prevSubject: false }, (arr) => {
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] > arr[i - 1]) {
      return false;
    }
  }
  return true;
});

//Quantity of icon Cart
Cypress.Commands.add("getCartProductCount", () => {
  return cy
    .get(CART)
    .invoke("text")
    .then((cartBadgeText) => {
      return parseInt(cartBadgeText.trim());
    });
});

//Quantity of Removes buttons
Cypress.Commands.add("countRemoveButtons", () => {
  return cy
    .get(ADD_TO_CART_BUTTON)
    .filter(':contains("Remove")')
    .its("length")
    .then((removeButtonCount) => {
      cy.log(`Remove Button Count: ${removeButtonCount}`);
      return removeButtonCount;
    });
});


