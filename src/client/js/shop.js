document.addEventListener("DOMContentLoaded", () => {
    const orderSheetBtns = document.querySelectorAll(".action__ordersheet--btn");
    const popupOverlay = document.getElementById("popupOverlay");
    const orderSheetCloseBtns = document.querySelectorAll(".ordersheet__close--btn");

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
            parentBox.style.display = "none";
            popupOverlay.style.display = "none";
        })
    })
});