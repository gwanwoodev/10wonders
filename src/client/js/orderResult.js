document.addEventListener("DOMContentLoaded", () => {
    const orderCompletePopup = document.querySelector(".cart__order__complete__popup");
    const orderCompleteCloseBtn = document.querySelector(".order__complete__close--icon");
    const howtopay = document.querySelector(".howtopay");


    howtopay.addEventListener("click", () => {
        orderCompletePopup.style.display = "block";
        orderCompletePopup.classList.replace("animate__fadeOut", "animate__fadeIn");
        popupOverlay.style.display = "block";
    })


    orderCompleteCloseBtn.addEventListener("click", () => {
        orderCompletePopup.classList.replace("animate__fadeIn", "animate__fadeOut");
        orderCompletePopup.style.display = "none"
        popupOverlay.style.display = "none";
    });

});