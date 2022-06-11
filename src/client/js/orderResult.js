document.addEventListener("DOMContentLoaded", () => {
    const orderCompletePopup = document.querySelector(".cart__order__complete__popup");
    const orderCompleteCloseBtn = document.querySelector(".order__complete__close--icon");
    const howtopay = document.querySelector(".howtopay");
    const ourProcessPopup = document.querySelector(".our__process__popup");
    const ourProcessBtn = document.querySelector(".ourprocess__btn");
    const ourProcessCloseBtn = document.querySelector(".our__process__close--icon");

    const ourProcessMobile = document.querySelector(".mobile__Ourprocess");

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

});