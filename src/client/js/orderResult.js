document.addEventListener("DOMContentLoaded", () => {
    const orderCompletePopup = document.querySelector(".howtopaypopup");
    const orderCompleteCloseBtn = document.querySelector(".order__complete__close--icon");
    const howtopay = document.querySelector(".howtopay");
    const ourProcessPopup = document.querySelector(".our__process__popup");
    const ourProcessBtn = document.querySelector(".ourprocess__btn");
    const ourProcessCloseBtn = document.querySelector(".our__process__close--icon");

    const shipping = document.querySelector(".shipping");
    const shippingPopup = document.querySelector(".shpping__popup");
    const shippingPopupClose = document.querySelector(".shipping__info__close--icon");

    const ourProcessMobile = document.querySelector(".mobile__Ourprocess");

    const accountInfopopup = document.querySelector(".accountInfopopup");
    const stepAccountInfo = document.querySelector(".step__accountInfo");
    const accountInfoCloseBtn = document.querySelector(".accountInfoPopupClose");


    stepAccountInfo.addEventListener("click", () => {
        ourProcessPopup.classList.replace("animate__fadeIn", "animate__fadeOut");
        ourProcessPopup.style.display = "none"

        accountInfopopup.style.display = "block";
        accountInfopopup.classList.replace("animate__fadeOut", "animate__fadeIn");
    });

    accountInfoCloseBtn.addEventListener("click", () => {
        accountInfopopup.classList.replace("animate__fadeIn", "animate__fadeOut");
        accountInfopopup.style.display = "none"
        popupOverlay.style.display = "none";
    })

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

    ourProcessBtn.addEventListener("click", () => {
        ourProcessPopup.style.display = "block";
        ourProcessPopup.classList.replace("animate__fadeOut", "animate__fadeIn");
        popupOverlay.style.display = "block";
    })

    ourProcessCloseBtn.addEventListener("click", () => {
        ourProcessPopup.classList.replace("animate__fadeIn", "animate__fadeOut");
        ourProcessPopup.style.display = "none"
        popupOverlay.style.display = "none";
    });

    ourProcessMobile.addEventListener("click", () => {
        ourProcessBtn.click();
    })

    shipping.addEventListener("click", () => {
        shippingPopup.style.display = "block";
        shippingPopup.classList.replace("animate__fadeOut", "animate__fadeIn");
        popupOverlay.style.display = "block";
    });

    shippingPopupClose.addEventListener("click", () => {
        shippingPopup.classList.replace("animate__fadeIn", "animate__fadeOut");
        shippingPopup.style.display = "none"
        popupOverlay.style.display = "none";
    })



});