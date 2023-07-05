const CONTINUE_SHOPPING_BUTTON = "#continue-shopping";
const CHECKOUT_BUTTON = "#checkout";
const CART_ITEM = ".cart_item";
const QUANTITY = ".cart_quantity";
const CART = ".shopping_cart_badge";

class CartPage {
  validateCartPage() {
    cy.url().should("contains", "/cart.html");
  }

  continueShopping() {
    cy.get(CONTINUE_SHOPPING_BUTTON).click();
    cy.url().should("contains", "/inventory.html");
  }

  checkoutButton() {
    cy.get(CHECKOUT_BUTTON).click();
    cy.url().should("contains", "/checkout-step-one.html");
  }

  validateQuantityItemsVsCartItems() {
    cy.get(CART)
      .invoke("text")
      .then((cartBadgeText) => {
        const quantityProductsCart = parseInt(cartBadgeText.trim());
        let totalQuantity = 0;

        cy.get(CART_ITEM)
          .each((item) => {
            const productQuantity = parseInt(
              Cypress.$(item).find(QUANTITY).text().trim()
            );
            totalQuantity += productQuantity;
          })
          .then(() => {
            expect(totalQuantity).to.equal(quantityProductsCart);
            cy.log(
              `Total quantity: ${totalQuantity}, Quantity in cart: ${quantityProductsCart}`
            );
          });
      });
  }

  removeProductsByIndices(productIndices) {
    for (let i = 0; i < productIndices.length; i++) {
      const productIndex = productIndices[i];
      const productName = data.productName[productIndex];
      const productNameFormatted = productName
        .replace(/\s+/g, "-")
        .toLowerCase();
      const removeButtonId = cy.get(
        `button[id^="remove-${productNameFormatted}"]`
      );
      removeButtonId.click();
    }
  }
}

export default CartPage;
