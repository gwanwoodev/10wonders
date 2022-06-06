
document.addEventListener("DOMContentLoaded", () => {

    const pageUp = document.querySelector(".pageup--icon");
    pageUp.addEventListener("click", scrollToTop);


});

function scrollToTop() {
    window.scrollTo({
        top: '0',
        behavior: "smooth"
    });
}

