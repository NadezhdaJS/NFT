import * as flsFunctions from "./modules/functions.js";

flsFunctions.isWebp();

const accordion = document.getElementsByClassName("faq__header");

for (let i = 0; i < accordion.length; i++) {
  accordion[i].addEventListener("click", function () {
    const box = this.closest('.faq__box');
    const plus = box.querySelector('.faq__plus-vertical-line');
    const body = box.querySelector('.faq__body');

    plus.classList.toggle("faq__plus-vertical-line--open");
    body.classList.toggle("faq__body--open");
  });
}
