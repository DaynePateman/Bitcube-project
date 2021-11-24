"use strict";

// Define all buttons
const addStockbtn = document.querySelector(".add-stock");
const sellStockbtn = document.querySelector(".remove-stock");
const addbtn = document.querySelector(".add");
const shipbtn = document.querySelector(".remove");
const cancelAdd = document.getElementById("cancelAdd");
const cancelSell = document.getElementById("cancelSell");
const cancelError = document.getElementById("cancelerror");

// Define all Pop-up Boxes and overlay
const overlay = document.querySelector(".overlay");
const addStockBox = document.querySelector(".add-stock-box");
const removeStockBox = document.querySelector(".remove-stock-box");
const errorNoItemsBox = document.querySelector(".error-no-items-box");

//Functions

//Define user input for stockAdded Function and shipStock Function
let product;
let itemQuantity;
let itemPrice;
let tempEmail;

//Define display of the prices and quantities of the products
let product1Count = Number(document.getElementById("counter1").innerHTML); // product1List.length;
let product1Price = Number(document.getElementById("counter-price1").innerHTML);
let product2Count = Number(document.getElementById("counter2").innerHTML); // product2List.length;
let product2Price = Number(document.getElementById("counter-price2").innerHTML);
let product3Count = Number(document.getElementById("counter3").innerHTML); // product3List.length;
let product3Price = Number(document.getElementById("counter-price3").innerHTML);

// Full list of each purchase, which contains product name, quantity and price
let product1List = [];
let product2List = [];
let product3List = [];

// List of email addresses used for selling
let emailList = [];

//Function to close the pop-up box of the addStockBox and the removeStockBox
const closeBox = function () {
  console.log("Close button clicked");
  overlay.classList.add("hidden");
  removeStockBox.classList.add("hidden");
  addStockBox.classList.add("hidden");
};

// Function that changes(Displays the changes) the values of products(Quantity and Price) as they are added or removed
const displayMessage = function (value1, value2) {
  if (product == "product1") {
    document.getElementById("counter1").textContent = value1;
    document.getElementById("counter-price1").textContent = value2;
    console.log(value1, value2);
  } else if (product == "product2") {
    document.getElementById("counter2").textContent = value1;
    document.getElementById("counter-price2").textContent = value2;
    console.log(value1, value2);
  } else if (product == "product3") {
    document.getElementById("counter3").textContent = value1;
    document.getElementById("counter-price3").textContent = value2;
    console.log(value1, value2);
  }
};

// Function that resets all the values(quantities, prices, products, errors...)
const reset = function () {
  document.querySelector(".item-quantity").value = "";
  document.querySelector(".item-price").value = "";
  document.querySelector(".items-bought").value = "";
  document.querySelector(".email-address").value = "";
  document.getElementById("product-code1").value = "choose";
  document.getElementById("not-selected1").textContent = "";
  document.getElementById("product-code1").style.borderColor = "";
  document.querySelector(".valid-email").classList.add("hidden");
  document.getElementById("emailAddress").style.borderColor = "";
  document.getElementById("product-code2").value = "choose";
  document.getElementById("not-selected2").textContent = "";
  document.getElementById("product-code2").style.borderColor = "";
  document.getElementById("invalid-email").classList.add("hidden");
};

//Function that happens when you click the addbtn
const stockAdded = function () {
  //Save input values of the user
  product = document.getElementById("product-code1").value;
  itemQuantity = Number(document.querySelector(".item-quantity").value);
  itemPrice = Number(document.querySelector(".item-price").value);
  console.log(product, itemQuantity, itemPrice);

  // Store what was purchased in a temp variable
  let temp = {
    product: product,
    quantity: itemQuantity,
    price: itemPrice,
  };

  // Add temp variable data to the correct product array list
  if (product == "product1") {
    product1Count += itemQuantity;
    product1Price = (product1Price + itemPrice) / 2;
    displayMessage(product1Count, product1Price);
    product1List.push(temp);
    closeBox();
  } else if (product == "product2") {
    product2Count += itemQuantity;
    product2Price = (product2Price + itemPrice) / 2;
    displayMessage(product2Count, product2Price);
    product2List.push(temp);
    closeBox();
  } else if (product == "product3") {
    product3Count += itemQuantity;
    product3Price = (product3Price + itemPrice) / 2;
    displayMessage(product3Count, product3Price);
    product3List.push(temp);
    closeBox();
  } else {
    document.getElementById("not-selected1").textContent =
      "Please select an product code";
    document.getElementById("product-code1").style.borderColor = "red";
  }
  return;
};

// Function that happens when you click the shipbtn
const shippedStock = function () {
  //Save input values of the user
  product = document.getElementById("product-code2").value;
  tempEmail = document.querySelector(".email-address").value;
  itemQuantity = Number(document.querySelector(".items-bought").value);

  // Function that checks that there is enough stock
  const itemAmountError = function (errorMessege) {
    errorNoItemsBox.classList.remove("hidden");
    document.getElementById(
      "productError"
    ).textContent = `The arn't ${itemQuantity} items of ${product} currently available. 
    There are only ${errorMessege} items of ${product}  available.`;

    //Event that happens when you click the cancelError button
    cancelError.addEventListener("click", function () {
      errorNoItemsBox.classList.add("hidden");
    });
    //Event that happens when you press the escape key
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && !errorNoItemsBox.classList.contains("hidden")) {
        errorNoItemsBox.classList.add("hidden");
        removeStockBox.classList.remove("hidden");
      }
    });
  };

  // if statement that checks if the email was already used
  if (emailList.indexOf(tempEmail) == -1) {
    // Add temp variable data to the correct product array list
    if (product == "product1" && product1Count >= itemQuantity) {
      product1Count -= itemQuantity;
      displayMessage(product1Count, product1Price);
      emailList.push(tempEmail);
      closeBox();
    } else if (product == "product2" && product2Count >= itemQuantity) {
      product2Count -= itemQuantity;
      displayMessage(product2Count, product2Price);
      emailList.push(tempEmail);
      closeBox();
    } else if (product == "product3" && product3Count >= itemQuantity) {
      product3Count -= itemQuantity;
      displayMessage(product3Count, product3Price);
      emailList.push(tempEmail);
      closeBox();
    } else if (product == "choose") {
      document.getElementById("not-selected2").textContent =
        "Please select an product code";
      document.getElementById("product-code2").style.borderColor = "red";
    } else {
      if (product == "product1") {
        itemAmountError(product1Count);
      } else if (product == "product2") {
        itemAmountError(product2Count);
      } else if (product == "product3") {
        itemAmountError(product3Count);
      }
    }

    // Email address has already been used, inform user
  } else {
    let em = document.getElementById("errorMsg");
    document.getElementById("emailAddress").style.borderColor = "red";
    em.classList.remove("hidden");
  }

  return;
};
