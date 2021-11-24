"use strict";

//Event that happens when you click the sellStockbtn
sellStockbtn.addEventListener("click", function () {
  overlay.classList.remove("hidden");
  removeStockBox.classList.remove("hidden");
  reset();
});

//Event that happens when you click the shipbtn
shipbtn.addEventListener("click", function () {
  shippedStock();
});

//Event that happens when you press the escape key
document.addEventListener("keydown", function (e) {
  if (
    e.key === "Escape" &&
    !removeStockBox.classList.contains("hidden") &&
    errorNoItemsBox.classList.contains("hidden")
  ) {
    closeBox();
  }
});

//Event that happens when you click the cancelAdd button
cancelSell.addEventListener("click", closeBox);
