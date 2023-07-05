const CANCEL_BUTTON = "#cancel";
const FINISH_BUTTON = "#finish";
const CART_ITEMS = ".cart_item";
const CART_QUANTITY = ".cart_quantity";
const PRODUCT_NAME = ".inventory_item_name";
const SUBTOTAL = ".summary_subtotal_label";
const ITEMS_PRICES = ".inventory_item_price";
const TAX = ".summary_tax_label";
const TOTAL = ".summary_total_label";
const COMPLETE_HEADER = ".complete-header";
const BACK_HOME_BUTTON = "#back-to-products";
const CART = ".shopping_cart_link";

class Checkout_2_Page {
  validateCheckout2Page() {
    cy.url().should("contains", "/checkout-step-two.html");
  }
  calculateAndCompareTotal() {
    let calculatedSubtotal = 0;
    let calculatedTax = 0;
    let calculatedTotal = 0;

    cy.get(CART_ITEMS).each(($item) => {
      const quantity = parseInt($item.find(CART_QUANTITY).text());
      const priceText = $item.find(ITEMS_PRICES).text();
      const price = parseFloat(priceText.replace("$", ""));
      const subtotal = quantity * price;
      calculatedSubtotal += subtotal;

      cy.log(`Product: ${$item.find(PRODUCT_NAME).text()}`);
      cy.log(`Quantity: ${quantity}`);
      cy.log(`Price: ${price}`);
      cy.log(`Subtotal: ${subtotal}`);
    });

    cy.get(SUBTOTAL)
      .invoke("text")
      .then((subtotalText) => {
        const subtotalPrice = parseFloat(
          subtotalText.replace("Item total: $", "")
        );
        calculatedSubtotal = subtotalPrice;

        cy.log(`Obtained subtotal price: ${subtotalPrice}`);
      });

    cy.get(TAX)
      .invoke("text")
      .then((taxText) => {
        const taxPrice = parseFloat(taxText.replace("Tax: $", ""));
        calculatedTax = taxPrice;

        cy.log(`Obtained tax price: ${taxPrice}`);
      });

    cy.get(TOTAL)
      .invoke("text")
      .then((totalText) => {
        const totalPrice = parseFloat(totalText.replace("Total: $", ""));
        calculatedTotal = calculatedSubtotal + calculatedTax;

        cy.log(`Calculated total: ${calculatedTotal}`);
        cy.log(`Obtained total: ${totalPrice}`);

        expect(calculatedTotal.toFixed(2)).to.equal(totalPrice.toFixed(2));
      });
  }

  clickCancelButton() {
    cy.get(CANCEL_BUTTON).click();
    cy.url().should("contains", "/inventory.html");
  }

  clickFinishButton() {
    cy.get(FINISH_BUTTON).click();
    cy.url().should("contains", "/checkout-complete.html");
    cy.get(COMPLETE_HEADER).should("have.text", "Thank you for your order!");
  }

  clickBackHomeButton() {
    cy.get(BACK_HOME_BUTTON).click();
    cy.url().should("contain", "/inventory.html");
    cy.get(CART)
      .invoke("text")
      .then((textoIcono) => {
        const quantityCart = parseInt(textoIcono.trim());
        expect(Number.isNaN(quantityCart)).to.be.true;
      });
  }
  
}

export default Checkout_2_Page;
