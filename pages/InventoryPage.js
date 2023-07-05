const MENU_BUTTON = "#react-burger-menu-btn";
const LOGOUT_BUTTON = "#logout_sidebar_link";
const FILTER_BUTTON = "[data-test='product_sort_container']";
const PRICE_LOW_TO_HIGH = "Price (low to high)";
const NAME_Z_TO_A = "Name (Z to A)";
const NAME_A_TO_Z = "Name (A to Z)";
const PRICE_HIGH_TO_LOW = "Price (high to low)";
const ADD_TO_CART_BUTTON = ".btn_inventory";
const ITEMS_PRICES = ".inventory_item_price";
const ITEMS_NAMES = ".inventory_item_name";
const CART = ".shopping_cart_link";

class InventoryPage {
  inventoryPageValidation() {
    cy.url().should("contains", "/inventory.html");
  }

  openSideBar() {
    cy.get(MENU_BUTTON).click();
  }

  clickLogoutButton() {
    cy.get(LOGOUT_BUTTON).click();
  }

  selectFilterLowToHigh() {
    cy.get(FILTER_BUTTON).should("be.visible");
    cy.get(FILTER_BUTTON).select(PRICE_LOW_TO_HIGH);
    cy.get(FILTER_BUTTON).should("have.value", "lohi");
  }

  validateLoHiOrder() {
    let priceArray = [];
    cy.get(ITEMS_PRICES)
      .each(($price) => {
        //Get the text price and delete the "$"
        const priceText = $price.text().replace("$", "");
        // Parse the text to number and add to the array
        priceArray.push(Number(priceText));
      })
      .then(() => {
        console.log(priceArray);
        cy.wrap(priceArray);
        cy.validateOrderingLoHi(priceArray).should("be.true");
      });
  }

  selectFilterHighToLow() {
    cy.get(FILTER_BUTTON).should("be.visible");
    cy.get(FILTER_BUTTON).select(PRICE_HIGH_TO_LOW);
    cy.get(FILTER_BUTTON).should("have.value", "hilo");
  }

  validateHiLoOrder() {
    let priceArray = [];
    cy.get(ITEMS_PRICES)
      .each(($price) => {
        //Get the text price and delete the "$"
        const priceText = $price.text().replace("$", "");
        // Parse the text to number and add to the array
        priceArray.push(Number(priceText));
      })
      .then(() => {
        console.log(priceArray);
        cy.wrap(priceArray);
        cy.validateOrderingHiLo(priceArray).should("be.true");
      });
  }

  selectFilterAtoZ() {
    cy.get(FILTER_BUTTON).should("be.visible");
    cy.get(FILTER_BUTTON).select(NAME_A_TO_Z);
    cy.get(FILTER_BUTTON).should("have.value", "az");
  }

  validateAZorder() {
    let nameArray = [];
    cy.get(ITEMS_NAMES)
      .each(($name) => {
        const name = $name.text();
        nameArray.push(name);
      })
      .then(() => {
        cy.wrap(nameArray).then((names) => {
          const sortedNames = [...names].sort();
          expect(names).to.deep.equal(sortedNames);
        });
      });
  }

  selectFilterZtoA() {
    cy.get(FILTER_BUTTON).should("be.visible");
    cy.get(FILTER_BUTTON).select(NAME_Z_TO_A);
    cy.get(FILTER_BUTTON).should("have.value", "za");
  }

  validateZAorder() {
    let nameArray = [];
    cy.get(ITEMS_NAMES)
      .each(($name) => {
        const name = $name.text();
        nameArray.push(name);
      })
      .then(() => {
        cy.wrap(nameArray).then((names) => {
          const sortedNames = [...names].sort().reverse();
          expect(names).to.deep.equal(sortedNames);
        });
      });
  }

  addToCartAllItems() {
    cy.get(ADD_TO_CART_BUTTON).each((btn) => {
      cy.wrap(btn)
        .invoke("text")
        .then((txtbtn) => {
          if (txtbtn.includes("Add to cart")) {
            cy.wrap(btn).click();
          }
        });
    });
  }

  addProductsByNames(productIndices) {
    for (let i = 0; i < productIndices.length; i++) {
      const productIndex = productIndices[i];
      const productName = data.productName[productIndex];
      const productNameFormatted = productName
        .replace(/\s+/g, "-")
        .toLowerCase();
      const addButton = cy.get(
        `[data-test="add-to-cart-${productNameFormatted}"]`
      );
      addButton.click();
    }
  }

  validateAndClickRemoveButtons() {
    const pathRemove = 'button[id^="remove-"]:contains("Remove")';

    cy.get(ADD_TO_CART_BUTTON).then(($buttons) => {
      const removeButtons = $buttons.filter(':contains("Remove")');
  
      if (removeButtons.length === 0) {
        cy.log("All the buttons are available");
      } else {
        cy.get(pathRemove).each(($button) => {
          cy.wrap($button).click();
        });
      }
      // Continuar con los demás tests
    });

  }

  validateCartIconQtyVsRemoveItems() {
    cy.get(CART)
      .invoke("text")
      .then((textoIcono) => {
        const quantityProductsCart = parseInt(textoIcono.trim());
        cy.get(ADD_TO_CART_BUTTON)
          .filter(':contains("Remove")')
          .its("length")
          .then((removeButtonCount) => {
            cy.log(`Remove Button Count: ${removeButtonCount}`);
            expect(removeButtonCount).to.eq(quantityProductsCart);
          });
      });
  }

  clickCartIcon() {
    cy.get(CART).click();
  }
}

export default InventoryPage;
