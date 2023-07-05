import LoginPage from "../../pages/LoginPage";
import InventoryPage from "../../pages/InventoryPage"

const login = new LoginPage();
const inventory = new InventoryPage();

before("A user opens the saucedemo website", () => {
  login.navigateToLoginPage(data.loginPageTitle);
});

describe("Login Test Suite", () => {
  it("Success Login", () => {
    cy.log(
      "The user enters a valid username, password and press the login button"
    );
    login.submitLogin(data.username[0], data.password[0]);
    cy.log("The url will contains the inventory subdirectory");
    inventory.inventoryPageValidation();
    cy.log("Logout");
    inventory.openSideBar();
    inventory.clickLogoutButton();
  });

  it("Incorrect Login without passing username and password", () => {
    cy.log(
      "The user clicks on the login button without passing username and password"
    );
    login.clickLoginButton();
    cy.log(
      "I should see error message: 'Epic sadface: Username is required'"
    );
    login.loginErrorMessage(data.loginErrorMessages[0]);
  });

  it("Incorrect Login without passing a password", () => {
    cy.log("The user enters the valid username");
    login.typeUsername(data.username[0]);
    cy.log("Click on the login button");
    login.clickLoginButton();
    cy.log(
      "I should see error message: 'Epic sadface: Password is required'"
    );
    login.loginErrorMessage(data.loginErrorMessages[1]);
  });

  it("Incorrect Login invalid password", () => {
    cy.log("The user enters the valid username and a invalid password");
    login.typeUsername(data.username[0]);
    login.typePassword(data.password[1]);
    cy.log("Click on the login button");
    login.clickLoginButton();
    cy.log(
      "I should see error message:'Epic sadface: Username and password do not match any user in this service'"
    );
    login.loginErrorMessage(data.loginErrorMessages[2]);
  });

  it("Incorrect Login with blocked user", () => {
    cy.log("The user enters a blocked username and valid password");
    login.typeUsername(data.username[2]);
    login.typePassword(data.password[0]);
    cy.log("Click on the login button");
    login.clickLoginButton();
    cy.log(
      "I should see error message:'Epic sadface: Sorry, this user has been locked out.'"
    );
    login.loginErrorMessage(data.loginErrorMessages[3]);
  });
});
