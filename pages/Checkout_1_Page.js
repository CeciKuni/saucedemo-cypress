const FIRSTNAME = "#first-name";
const LASTNAME = "#last-name";
const ZIP = "#postal-code";
const CANCEL_BUTTON = "#cancel";
const CONTINUE_BUTTON = "#continue";
const CHECKOUT_1_ERROR_MSG = "h3[data-test='error']";

class Checkout_1_Page {
    validateCheckout1Page() {
        cy.url().should("contains", "/checkout-step-one.html");
    }

    typeFirstName(firstname) {
        cy.get(FIRSTNAME).clear().type(firstname);
    }

    typeLastName(lastname) {
        cy.get(LASTNAME).clear().type(lastname);
    }

    typeZipCode(zipcode) {
        cy.get(ZIP).clear().type(zipcode);
    }

    clickCancelButton() {
        cy.get(CANCEL_BUTTON).click();
        cy.url().should("contains", "/cart.html");
    }

    clickContinueButton() {
        cy.get(CONTINUE_BUTTON).click();
    }

    checkout1ErrorMessage(errorMsg) {
        cy.get(CHECKOUT_1_ERROR_MSG).should("have.text", errorMsg);
    }
}

export default Checkout_1_Page;