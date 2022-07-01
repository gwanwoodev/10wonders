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

            popup.style.display = "flex";
            popup.classList.replace("animate__fadeOut", "animate__fadeIn");
            popupOverlay.style.display = "block";
        })
    })

    orderSheetCloseBtns.forEach(item => {
        item.addEventListener("click", function () {
            const parentBox = this.parentElement.parentElement;


            parentBox.classList.replace("animate__fadeIn", "animate__fadeOut");
            parentBox.style.display = "none"
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
            console.log(typeof productQuantity);

            if(isNaN(Number(productQuantity))) {
                Notiflix.Notify.failure("Please enter a number");
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

            // step1. 중복이 있다면
            if (check.length > 0) {

                // step2. index를 찾아서
                // step3. 값 교체
                // step4. 쿠키생성

                const prevArray = JSON.parse(prevCookies);

                const findIndex = prevArray.findIndex(item => item._id === _id);
                const newQuantity = Number(productQuantity)
                const quantity = Number(prevArray[findIndex].productQuantity);
                
                newArray[findIndex].productQuantity = newQuantity + quantity;
                
            

                createCookie('cart_items', JSON.stringify(newArray), 7);

            }else {
                newArray.push(item);
                createCookie('cart_items', JSON.stringify(newArray), 7);
            }
            
        
            

            nodeBox.classList.replace("animate__fadeIn", "animate__fadeOut");
            nodeBox.style.display = "none"
            orderSuccessPopup.style.display = "flex";
            orderSuccessPopup.classList.replace("animate__fadeOut", "animate__fadeIn");

        })
    })

    keepShopping.addEventListener("click", function () {
        orderSuccessPopup.classList.replace("animate__fadeIn", "animate__fadeOut");
        orderSuccessPopup.style.display = "none"
        popupOverlay.style.display = "none";
    })
});