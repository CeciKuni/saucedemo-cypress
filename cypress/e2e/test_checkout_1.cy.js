import CartPage from "../../pages/CartPage";
import InventoryPage from "../../pages/InventoryPage";
import LoginPage from "../../pages/LoginPage";
import Checkout_1_Page from "../../pages/Checkout_1_Page";
import Checkout_2_Page from "../../pages/Checkout_2_Page";

const login = new LoginPage();
const inventory = new InventoryPage();
const cart = new CartPage();
const checkout_1 = new Checkout_1_Page();
const checkout_2 = new Checkout_2_Page();

before("Login and add some products in the cart", () => {
  login.navigateToLoginPage(data.loginPageTitle);
  login.submitLogin(data.username[0], data.password[0]);
});

describe("Checkout one Page - Test Suite", () => {
  it("Purchase some items", () => {
    inventory.validateAndClickRemoveButtons();
    const productIndices = [1, 2];
    inventory.addProductsByNames(productIndices);
    inventory.clickCartIcon();
    cart.validateCartPage();
    cart.checkoutButton();
    checkout_1.validateCheckout1Page();
  });
  it("Validate required inputs 'Firstname, Lastname and Zip code'", () => {
    checkout_1.clickContinueButton();
    cy.log("I should see error message: 'Error: First Name is required'");
    checkout_1.checkout1ErrorMessage(data.checkoutErrorMessages[0]);
    checkout_1.typeFirstName(data.firstname);
    checkout_1.clickContinueButton();
    cy.log("I should see error message: 'Error: Last Name is required'");
    checkout_1.checkout1ErrorMessage(data.checkoutErrorMessages[1]);
    checkout_1.typeFirstName(data.firstname);
    checkout_1.typeLastName(data.lastname);
    checkout_1.clickContinueButton();
    cy.log("I should see error message: 'Error: Postal Code is required'");
    checkout_1.checkout1ErrorMessage(data.checkoutErrorMessages[2]);
    cy.log("Cancel the purchase");
    checkout_1.clickCancelButton();
    cart.validateCartPage();
    cy.log("Logout");
    inventory.openSideBar();
    inventory.clickLogoutButton();
  });
});
