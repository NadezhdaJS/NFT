import * as flsFunctions from "./modules/functions.js";

flsFunctions.isWebp();
const accordion = document.getElementsByClassName("faq__header");
const plus = document.getElementsByClassName("faq__plus-vertical-line");
let i;

for (i = 0; i < accordion.length; i++) {
  accordion[i].addEventListener("click", function () {
    this.classList.toggle("faq__body--open");

    let body = this.nextElementSibling;
    if (body.style.display === "flex") {
      body.style.display = "none";
    } else {
      body.style.display = "flex";
    }
  });
}
