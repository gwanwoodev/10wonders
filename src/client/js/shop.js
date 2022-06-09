import { createCookie, getCookie } from "../../utils/cookies";
import Notiflix from "notiflix";
document.addEventListener("DOMContentLoaded", () => {
    const orderSheetBtns = document.querySelectorAll(".action__ordersheet--btn");
    const popupOverlay = document.getElementById("popupOverlay");
    const orderSheetCloseBtns = document.querySelectorAll(".ordersheet__close--btn");
    const addOrderSheetBtns = document.querySelectorAll(".ordersheet__add--btn");
    const orderSuccessPopup = document.querySelector(".shop__ordersheet__success__popup");
    const keepShopping = document.querySelector(".keepshoppingText");

    orderSheetBtns.forEach(item => {
        item.addEventListener("click", function () {
            const parentBox = this.parentElement.parentElement.parentElement;
            const popup = parentBox.querySelector(".shop__ordersheet__popup");
            popup.classList.remove("hidden");
            popupOverlay.style.display = "block";
        })
    })

    orderSheetCloseBtns.forEach(item => {
        item.addEventListener("click", function () {
            const parentBox = this.parentElement.parentElement;

            parentBox.classList.add("hidden");
            popupOverlay.style.display = "none";
        })
    })

    addOrderSheetBtns.forEach(item => {
        item.addEventListener("click", function () {
            const parentBox = this.parentElement.parentElement;
            const nodeBox = this.parentElement.parentElement.parentElement.parentElement;

            const productName = parentBox.querySelector(".ordersheet__popup--productName").innerText;
            const productSubHead = parentBox.querySelector(".ordersheet__popup--text").innerText;
            const productQuantity = parentBox.querySelector(".input__quantity").value;
            const productImage = nodeBox.querySelector(".ordersheet__product--img").src;
            const _id = this.getAttribute("_id");
            let prevCookies = getCookie('cart_items') ? getCookie('cart_items') : '[]';

            if (!productQuantity) {
                Notiflix.Notify.failure("Enter the quantity.");
                return;
            }

            let item = {
                productName,
                productSubHead,
                productQuantity,
                productImage,
                product: _id,
                _id
            }

            let newArray = JSON.parse(prevCookies);

            if (newArray < 2) {
                newArray = [...newArray];
            }

            const check = newArray.filter(item => {
                return item._id === _id;
            })


            if (check.length > 0) {
                Notiflix.Notify.failure("This product is Already Exists in Your cart.");
                return;
            }
            newArray.push(item);
            createCookie('cart_items', JSON.stringify(newArray), 7);

            nodeBox.classList.add("hidden");
            orderSuccessPopup.classList.remove("hidden");

        })
    })

    keepShopping.addEventListener("click", function () {
        orderSuccessPopup.classList.add("hidden");
        popupOverlay.style.display = "none";
    })
});