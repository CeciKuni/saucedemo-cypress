const USERNAME_INPUT = "#user-name"
const PASSWORD_INPUT = "#password"
const LOGIN_BUTTON = "#login-button"
const ERROR_MESSAGE = "h3[data-test='error']"

class LoginPage {
    navigateToLoginPage(title){
        cy.visit("/");
        cy.title().should("eq", title);
    }

    typeUsername(username) {
        cy.get(USERNAME_INPUT).clear().type(username);
    }

    typePassword(password) {
        cy.get(PASSWORD_INPUT).clear().type(password);
    }

    clickLoginButton() {
        cy.get(LOGIN_BUTTON).click({ force: true });
    }

    submitLogin(username, password) {
        cy.get(USERNAME_INPUT).clear().type(username);
        cy.get(PASSWORD_INPUT).clear().type(password);
        cy.get(LOGIN_BUTTON).click({ force: true });
    }

    loginErrorMessage(errorMsg) {
        cy.get(ERROR_MESSAGE).should("have.text", errorMsg);
    }
}

export default LoginPage;