
document.addEventListener("DOMContentLoaded", () => {
    let index = 0;

    const pageUp = document.querySelector(".pageup--icon");
    const mainSection = document.querySelector(".main__section");
    const headerElement = document.querySelector(".header");
    const mainSectionHeads = document.querySelectorAll(".section__head--text");
    const mainSectionSubs = document.querySelectorAll(".section__subhead--text");


    pageUp.addEventListener("click", scrollToTop);
    const interval = setInterval(backgroundChange, 5000);

    function scrollToTop() {
        window.scrollTo({
            top: '0',
            behavior: "smooth"
        });
    }

    function backgroundChange() {
        const infoObj = [
            {
                image: "/static/images/main_background01.jpg",
                headerBg: "#000000",
                headText1: 'the best solar energy',
                headText2: 'equipments from Korea',
                subText1: "We provide the world's heighest quality solar energy equipments from variouis brands.",
                subText2: "Especially from Korea."
            },
            {
                image: "/static/images/main_background02.jpg",
                headerBg: "transparent",
                headText1: 'Let the sun work for you',
                headText2: 'We ship all over the world',
                subText1: "We only carry the most profitable solar energy equipment.",
                subText2: ""
            },
            {
                image: "/static/images/main_background03.jpg",
                headerBg: "transparent",
                headText1: 'We provide the easiest way to buy',
                headText2: 'solar power equipment',
                subText1: "Order, Pay and Get, Go through only 3 steps.",
                subText2: "You can have the best solar equipment, including Korean leading brands."
            }
        ];

        if (index >= infoObj.length) {
            index = 0;

        }

        mainSection.style.backgroundImage = `url('${infoObj[index].image}')`;
        headerElement.style.backgroundColor = `${infoObj[index].headerBg}`;
        mainSectionHeads[0].innerHTML = `${infoObj[index].headText1}`
        mainSectionHeads[1].innerHTML = `${infoObj[index].headText2}`
        mainSectionSubs[0].innerHTML = `${infoObj[index].subText1}`
        mainSectionSubs[1].innerHTML = `${infoObj[index].subText2}`
        index++;

    }
});