import { createCookie, getCookie } from "../../utils/cookies";
import Notiflix from "notiflix";
import { emailValidator, blankValidator } from "../../utils/validator";

document.addEventListener("DOMContentLoaded", () => {
    const qtyUpBtns = document.querySelectorAll(".qtyUp--btn");
    const qtyDownBtns = document.querySelectorAll(".qtyDown--btn");
    const tdDelBtns = document.querySelectorAll(".tdDel--btn");
    const estimateBtn = document.querySelector(".request__estimate--btn");
    const orderCompletePopup = document.querySelector(".cart__order__complete__popup");
    const orderCompleteCloseBtn = document.querySelector(".order__complete__close--icon");
    const orderCompleteYesBtn = document.querySelector(".order__complete--yes");

    const popupOverlay = document.querySelector("#popupOverlay");

    estimateBtn.addEventListener("click", async () => {
        const emailValue = document.querySelector("input[name=email]").value;
        const depositerValue = document.querySelector("input[name=depositer]").value;
        const addressValue = document.querySelector("input[name=address]").value;

        if (!emailValidator(emailValue)) {
            Notiflix.Notify.failure("Please enter the email correctly.");
            return;
        }


        if (blankValidator(depositerValue) || blankValidator(addressValue)) {
            Notiflix.Notify.failure("You cannot enter spaces.");
            return;
        }

        const apiResult = await fetch("/api/order", {
            headers: {
                "Content-Type": "application/json"
            },
            method: "POST",
            body: JSON.stringify({
                clientEmail: emailValue,
                clientName: depositerValue,
                clientAddress: addressValue
            })
        });

        const resultJson = await apiResult.json();

        if (resultJson.success) {
            orderCompletePopup.style.display = "block";
            orderCompletePopup.classList.replace("animate__fadeOut", "animate__fadeIn");
            popupOverlay.style.display = "block";

            orderCompleteYesBtn.setAttribute("clientEmail", emailValue);
            orderCompleteYesBtn.setAttribute("orderNumber", resultJson.orderNumber);
        } else {
            Notiflix.Notify.failure("Server Error.");
            return;
        }


    });

    orderCompleteCloseBtn.addEventListener("click", () => {
        orderCompletePopup.classList.replace("animate__fadeIn", "animate__fadeOut");
        orderCompletePopup.style.display = "none;"
        popupOverlay.style.display = "none";
    });

    orderCompleteYesBtn.addEventListener("click", function () {
        const email = this.getAttribute("clientEmail");
        const orderNumber = this.getAttribute("orderNumber");

        const redirectUrl = `/order?email=${email}&orderNumber=${orderNumber}`;
        location.href = redirectUrl;
    })

    qtyUpBtns.forEach(item => {
        item.addEventListener("click", function () {
            const parentBox = this.parentElement.parentElement;
            const qtyInput = parentBox.querySelector("input");
            let qtyValue = Number(qtyInput.value);

            qtyInput.value = qtyValue + 1;

            const _id = this.getAttribute("_id");

            updateCartItems(_id, qtyInput.value);

        });
    })

    qtyDownBtns.forEach(item => {
        item.addEventListener("click", function () {
            const parentBox = this.parentElement.parentElement;
            const qtyInput = parentBox.querySelector("input");
            let qtyValue = Number(qtyInput.value);

            if (qtyValue - 1 < 1) {
                qtyValue = 2;
            }

            qtyInput.value = qtyValue - 1;

            const _id = this.getAttribute("_id");
            updateCartItems(_id, qtyInput.value);
        });
    })

    tdDelBtns.forEach(item => {
        item.addEventListener("click", function () {
            const parentBox = this.parentElement.parentElement;
            parentBox.remove();

            const _id = this.getAttribute("_id");
            deleteCartItem(_id);
        });
    })

    function updateCartItems(_id, qtyValue) {
        const cartItems = JSON.parse(getCookie("cart_items"));

        const findIndex = cartItems.findIndex(item => item._id === _id);
        cartItems[findIndex].orderQuantity = qtyValue;

        createCookie("cart_items", JSON.stringify(cartItems));
    }

    function deleteCartItem(_id) {
        const cartItems = JSON.parse(getCookie("cart_items"));
        const filteredItems = cartItems.filter(item => {
            return item._id !== _id
        });

        createCookie("cart_items", JSON.stringify(filteredItems));
    }
});