const header = document.querySelector(".header");
const headerLogo = header.querySelector(".header__logo");
const headerLink = header.querySelector(".header__link--text");
const headerIcon = header.querySelector(".header__icon");

const headerHeight = header.getBoundingClientRect().height;

window.addEventListener("scroll", () => {


    if(window.pageYOffset >= headerHeight) {
        header.style.backgroundColor = "black";

        headerLogo.src = "/static/images/logo.png";
        headerLink.style.color = "white";
        headerIcon.src = "/static/images/cart_icon.png";
        

    }else {
        header.style.backgroundColor = "transparent";
        
        headerLogo.src = "/static/images/logo_dark.png";
        headerLink.style.color = "black";
        headerIcon.src = "/static/images/cart_icon_black.png";
    }
})