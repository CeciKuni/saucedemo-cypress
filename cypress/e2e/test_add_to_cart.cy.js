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

beforeEach("A user opens the saucedemo website", () => {
  login.navigateToLoginPage(data.loginPageTitle);
  login.submitLogin(data.username[0], data.password[0]);
});

describe("Add to Cart - Test Suite", () => {
  it("Inventory Page - Validate products filter", () => {
    cy.log("Select the option 'Price low to high' and validate");
    inventory.selectFilterLowToHigh();
    inventory.validateLoHiOrder();
    cy.log("Select the option 'HighToLow' and validate");
    inventory.selectFilterHighToLow();
    inventory.validateHiLoOrder();
    cy.log("Select the option 'AtoZ' and validate");
    inventory.selectFilterAtoZ();
    inventory.validateAZorder();
    cy.log("Select the option 'ZtoA' and validate");
    inventory.selectFilterZtoA();
    inventory.validateZAorder();
  });
  it("Add to Cart all the products and purchase", () => {
    inventory.validateAndClickRemoveButtons();
    inventory.addToCartAllItems();
    inventory.validateCartIconQtyVsRemoveItems();
    inventory.clickCartIcon();
    cart.validateCartPage();
    cart.validateQuantityItemsVsCartItems();
    cart.checkoutButton();
    checkout_1.validateCheckout1Page();
    checkout_1.typeFirstName(data.firstname);
    checkout_1.typeLastName(data.lastname);
    checkout_1.typeZipCode(data.zipcode);
    checkout_1.clickContinueButton();
    checkout_2.validateCheckout2Page();
    checkout_2.calculateAndCompareTotal();
    checkout_2.clickFinishButton();
    checkout_2.clickBackHomeButton();
    inventory.openSideBar();
    inventory.clickLogoutButton();
  });
  it("Add to Cart some items, remove and purchase", () => {
    inventory.validateAndClickRemoveButtons();
    const productIndices1 = [1, 2];
    inventory.addProductsByNames(productIndices1);
    inventory.validateCartIconQtyVsRemoveItems();
    inventory.clickCartIcon();
    cart.validateCartPage();
    const productIndices2 = [1];
    cart.removeProductsByIndices(productIndices2);
    cart.validateQuantityItemsVsCartItems();
    cart.checkoutButton();
    checkout_1.validateCheckout1Page();
    checkout_1.typeFirstName(data.firstname);
    checkout_1.typeLastName(data.lastname);
    checkout_1.typeZipCode(data.zipcode);
    checkout_1.clickContinueButton();
    checkout_2.validateCheckout2Page();
    checkout_2.calculateAndCompareTotal();
    checkout_2.clickFinishButton();
    checkout_2.clickBackHomeButton();
    inventory.openSideBar();
    inventory.clickLogoutButton();
  });
  it("Add to Cart some items and continues shopping", () => {
    inventory.validateAndClickRemoveButtons();
    const productIndices = [1, 2];
    inventory.addProductsByNames(productIndices);
    inventory.validateCartIconQtyVsRemoveItems();
    inventory.clickCartIcon();
    cart.validateCartPage();
    cart.continueShopping();
    inventory.openSideBar();
    inventory.clickLogoutButton();
  });
  it("Add to Cart some items and cancel complete information", () => {
    inventory.validateAndClickRemoveButtons();
    const productIndices = [3, 5];
    inventory.addProductsByNames(productIndices);
    inventory.validateCartIconQtyVsRemoveItems();
    inventory.clickCartIcon();
    cart.validateCartPage();
    cart.validateQuantityItemsVsCartItems();
    cart.checkoutButton();
    checkout_1.clickCancelButton();
    inventory.openSideBar();
    inventory.clickLogoutButton();
  });
  it("Add to Cart some items and cancel finish the purchase", () => {
    inventory.validateAndClickRemoveButtons();
    const productIndices = [3, 0];
    inventory.addProductsByNames(productIndices);
    inventory.validateCartIconQtyVsRemoveItems();
    inventory.clickCartIcon();
    cart.validateCartPage();
    cart.validateQuantityItemsVsCartItems();
    cart.checkoutButton();
    checkout_1.typeFirstName(data.firstname);
    checkout_1.typeLastName(data.lastname);
    checkout_1.typeZipCode(data.zipcode);
    checkout_1.clickContinueButton();
    checkout_2.validateCheckout2Page();
    checkout_2.calculateAndCompareTotal();
    checkout_2.clickCancelButton();
    inventory.openSideBar();
    inventory.clickLogoutButton();
  });
});
