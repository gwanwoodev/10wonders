const getPageAttribute = (val) => {
    const paramString = location.search;
    const searchParams = new URLSearchParams(paramString);
    searchParams.set("page", val);

    return `?${searchParams}`;
};

const leftArrow = document.querySelector(".left__arrow");
const rightArrow = document.querySelector(".right__arrow");
const paginationNumbers = document.querySelectorAll(".pagination__number");
if (leftArrow)
    leftArrow.href = getPageAttribute(`${leftArrow.getAttribute("page")}`);
if (rightArrow)
    rightArrow.href = getPageAttribute(`${rightArrow.getAttribute("page")}`);

if (paginationNumbers) {
    paginationNumbers.forEach((item) => {
        item.href = getPageAttribute(`${item.getAttribute("page")}`);
    });
}
