# Demo Cypress 

Test Cases with Cypress and some validations for the page "Sauce Demo".


##   Data

1.  Test page used: [saucedemo](https://www.saucedemo.com/)
2.  Operating System: Windows 10.
3.  Browsers available in Cypress: Chrome, Edge, Electron, and Firefox.
4.  IDE: Visual Studio Code.
5.  The project has screenshots in .png format that are saved only if the test fails. By default, they are saved in the "screenshots" folder.
6.  The option to generate videos is disabled by default, but it can be enabled from the Cypress configuration file.
7.  Used report: Mochawesome.

## Installations performed

-   [Nodejs](https://nodejs.org/es/download). Configure the path to the "nodejs" folder in the Windows environment variables. This will allow us to use the npm command to check the versions:

```
$ node -v
```
```
$ npm -v
```

-   Cypress: Install from the project folder. This will generate the node_modules folder.
```
$ npm  install cypress --save-dev
```
-   npx library (set of commands to execute scripts).

```
$ npm  install -g npx
```

-   For the mochawesome plugin: [https://www.npmjs.com/package/cypress-mochawesome-reporter](https://www.npmjs.com/package/cypress-mochawesome-reporter)

## Project Structure

-   [cypress](cypress) - Cypress folder with the following subfolders:
-   [e2e](cypress/e2e) - Contains 3 files with some test cases. They include validation tests.
-   [reports](cypress/reports) - "index.html" report of the tests.
-   [fixtures](cypress/fixtures) - "variables.json" file used with variables in the tests.
-   [support](cypress/support) - commands.js file generated by Cypress (to store custom JavaScript or TypeScript functions). e2e.js file with commands and instructions used by the tests.
-   [videos] - .mp4 format videos of the tests.
-   [pages](pages) - Folder with POM (Page Object Model) and locators.
-   [cypress.config.js](cypress.config.js) - Cypress configuration file with general settings.
-   [package.json](package.json) - In this file, shortcuts can be configured to execute scripts and run tests. It also contains the versions of dependencies used in the project.


## Commands

This command allows opening the Cypress interface window and selecting the test type (e2e, browser, and spec, which represents the test to be executed).
```
$ npm run open
```
Alternatively, if you want to run a specific testcase, for example, the login test, without opening the Cypress interface:
```
$ cypress run --spec cypress/e2e/test_login.cy.js --browser chrome
```
To execute tests through the console without opening the browser or the Cypress interface:
```
$ npm run test
```