"use strick";

//Event that happens when you click the addStockbtn
addStockbtn.addEventListener("click", function () {
  overlay.classList.remove("hidden");
  addStockBox.classList.remove("hidden");
  reset();
});

//Event that happens when you click the addbtn
addbtn.addEventListener("click", function () {
  stockAdded();
});

//Event that happens when you press the escape key
document.addEventListener("keydown", function (e) {
  if (
    e.key === "Escape" &&
    !addStockBox.classList.contains("hidden") &&
    errorNoItemsBox.classList.contains("hidden")
  ) {
    closeBox();
  }
});

//Event that happens when you click the cancelAdd button
cancelAdd.addEventListener("click", closeBox);
