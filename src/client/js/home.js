

document.addEventListener("DOMContentLoaded", () => {

    function preloadImages(urls, allImagesLoadedCallback){
        var loadedCounter = 0;
      var toBeLoadedNumber = urls.length;
      urls.forEach(function(url){
        preloadImage(url, function(){
            loadedCounter++;
                console.log('Number of loaded images: ' + loadedCounter);
          if(loadedCounter == toBeLoadedNumber){
            allImagesLoadedCallback();
          }
        });
      });
      function preloadImage(url, anImageLoadedCallback){
          var img = new Image();
          img.onload = anImageLoadedCallback;
          img.src = url;
      }
    }
    
    
    // Let's call it:
    preloadImages([
        '/static/images/main_background01.jpg',
      '/static/images/main_background02.jpg',
      '/static/images/main_background03.jpg'
    ], function(){
        const interval = setInterval(backgroundChange, 5000);
        console.log(interval);
        console.log('interval start');
    });



    if(window.innerWidth <= 425) {
        let scroll2 = document.querySelector(".scroll2");
        let scroll3 = document.querySelector(".scroll3");

        scroll2.remove();
        scroll3.remove();

    }

    

    let index = 1;

    const pageUp = document.querySelector(".pageup--icon");
    const mainSection = document.querySelector(".main__section");
    const headerElement = document.querySelector(".header");
    const mainSectionHeads = document.querySelectorAll(".section__head--text");
    const mainSectionSubs = document.querySelectorAll(".section__subhead--text");

    /* Popups */
    const popupOverlay = document.getElementById("popupOverlay");
    const accountPopup = document.querySelector(".process__account--popup");
    const accountPopupBtn = document.querySelector(".process__child__sub--popup");
    const accountPopupCloseBtn = document.querySelector(".account__close--icon");

    const $sections = $(".wheelSection");
    const header = document.querySelector(".header");

    const skipSection = document.querySelector(".scroll__skip__section");

    let currentIndex = 0;
    let isAnimating = false; 

    let stopAnimation = function() {
        setTimeout(function() {
            isAnimating = false;
        }, 300);
    };

    let bottomIsReached = function($elem) {
        let rect = $elem[0].getBoundingClientRect();
        return rect.bottom <= $(window).height();
    }

    let topIsReached = function($elem) {
        let rect = $elem[0].getBoundingClientRect();
        return rect.top >= 0;
    }

    window.addEventListener("scroll", () => {
        if(window.pageYOffset >= 120) {
            header.style.backgroundColor = "rgba(0, 0, 0, 80%)";
            pageUp.style.opacity = "1";
        }else {
            header.style.backgroundColor = "transparent";
            pageUp.style.opacity = "0";
        }
    })



    document.addEventListener("mousewheel", function(event) {

        if(isAnimating) {
            event.preventDefault();
            return;
        }

        let $currentSection = $($sections[currentIndex]);

        let direction  = event.deltaY;

        if(direction > 0) {
            if (currentIndex + 1 >=  $sections.length) return;
            if(!bottomIsReached($currentSection)) return;
            currentIndex++;

            let $nextSection = $($sections[currentIndex]);
            let offsetTop = $nextSection.offset().top;
            event.preventDefault();
            isAnimating = true;
            $("html, body").animate({scrollTop: offsetTop}, 1000, stopAnimation);



        }else {
            if(currentIndex - 1 < 0) return;
            if (!topIsReached($currentSection)) return;
            currentIndex--;

            let $previousSection = $($sections[currentIndex]);
            let offsetTop = $previousSection.offset().top;
            event.preventDefault();
            isAnimating = true;
            $("html, body").animate({scrollTop: offsetTop}, 1000, stopAnimation);
        }

        if(currentIndex >= 1) {
            header.style.backgroundColor = "black";
        }else if(currentIndex === 0) {
            header.style.backgroundColor = "transparent";

        }
    }, {passive: false});


    skipSection.addEventListener("click", () => {
        const offsetTop = $(".slice__section").offset().top;
        direction = 4;
        currentIndex = 4;
        $("html, body").animate({scrollTop: offsetTop}, 1000, stopAnimation);
    });


    accountPopupBtn.addEventListener("click", () => {
        accountPopup.classList.remove("hide");
        accountPopup.style.display = "block";
        accountPopup.classList.replace("animate__fadeOut", "animate__fadeIn");
        popupOverlay.style.display = "block";
       

    })

    accountPopupCloseBtn.addEventListener("click", () => {
        accountPopup.classList.replace("animate__fadeIn", "animate__fadeOut");
        accountPopup.style.display = "none";
        accountPopup.classList.add("hide");
        popupOverlay.style.display = "none";
    })

    pageUp.addEventListener("click", scrollToTop);
    

    function scrollToTop() {
        direction = 0;
        currentIndex = 0;
        header.style.backgroundColor = "transparent";
        $("html, body").animate({scrollTop: 0}, 1000, stopAnimation);
    }

    function backgroundChange() {
        const infoObj = [
            {
                image: "/static/images/main_background01.jpg",
                headText1: 'The best solar energy',
                headText2: 'equipments from Korea',
                subText1: "We provide the world's highest quality solar energy equipments from various brands.",
                subText2: "Especially from Korea."
            },
            {
                image: "/static/images/main_background02.jpg",
                headText1: 'Let the sun work for you',
                headText2: 'We ship all over the world',
                subText1: "We only carry the most profitable solar energy equipment.",
                subText2: ""
            },
            {
                image: "/static/images/main_background03.jpg",
                headText1: 'We provide the easiest way to buy',
                headText2: 'solar power equipment',
                subText1: "Order, Pay and Get, Go through only 3 steps.",
                subText2: "You can have the best solar equipment, including Korea's leading brands."
            }
        ];

        if (index >= infoObj.length) {
            index = 0;

        }

        let current = infoObj[index].image;

        mainSection.style.backgroundImage = `url('${current}')`;
        mainSectionHeads[0].innerHTML = `${infoObj[index].headText1}`
        mainSectionHeads[1].innerHTML = `${infoObj[index].headText2}`
        mainSectionSubs[0].innerHTML = `${infoObj[index].subText1}`
        mainSectionSubs[1].innerHTML = `${infoObj[index].subText2}`
        index++;

    }
});