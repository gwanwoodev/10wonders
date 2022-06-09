import { emailValidator, orderNumberValidator } from "../../utils/validator";

import Notiflix from "notiflix";
document.addEventListener("DOMContentLoaded", () => {
    const emailInput = document.querySelector(".order__input--email");
    const orderNumberInput = document.querySelector(".order__input--orderNumber");
    const enterBtn = document.querySelector(".order__enter--btn");


    orderNumberInput.addEventListener("keydown", (evt) => {
        if (evt.keyCode === 13) {
            enterBtn.click();
        }
    })

    enterBtn.addEventListener("click", () => {
        if (!emailValidator(emailInput.value)) {
            Notiflix.Notify.failure("Please enter the email correctly.");
            return;
        }

        if (!orderNumberValidator(orderNumberInput.value)) {
            Notiflix.Notify.failure("Please enter the order number in 9 digits only");
            return;
        }


        const redirectUrl = `/order/result?email=${emailInput.value}&orderNumber=${orderNumberInput.value}`;
        location.href = redirectUrl;
    });
})