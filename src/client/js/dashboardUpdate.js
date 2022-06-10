import { getExtention, imageExtensionChecker, blankValidator } from "../../utils/validator";
import { Notify } from 'notiflix/build/notiflix-notify-aio';

document.addEventListener("DOMContentLoaded", () => {
    const productImagePreview = document.querySelector(".product__image--preview");
    const productHiddenFile = document.querySelector(".product__image__hidden--file");
    const productDatasheetFile = document.querySelector(".product__datasheet--file");
    const productAddButton = document.querySelector(".productAddButton");
    const productType = document.querySelector(".product__type--select");
    // const productMaker = document.querySelector(".inverter__maker");
    const inverterMaker = document.querySelector(".inverter__maker");
    const moduleMaker = document.querySelector(".module__maker");
    const optimizeMaker = document.querySelector(".optimize__maker");
    const productName = document.querySelector(".product__add--name");
    const productSubHead = document.querySelector(".product__add--subHead");
    const productSpecsTitle = document.querySelectorAll(".product__add__spec--title");
    const productSpecsSubTitle = document.querySelectorAll(".product__spec__textarea");

    const formData = new FormData();



    productImagePreview.addEventListener("click", () => {
        productHiddenFile.click();
    })

    productHiddenFile.addEventListener("change", function (e) {
        const file = e.target.files[0];
        if (!file) {
            return;
        }

        if (!imageAcceptChecker(file, this)) {
            return;
        }

        const fakeURL = URL.createObjectURL(file);
        productImagePreview.src = fakeURL;

        formData.append("image", file);
    });

    productType.addEventListener("change", function () {

        const selectedValue = this.value;

        if (selectedValue === "inverter") {
            inverterMaker.style.display = "block";
            moduleMaker.style.display = "none";
            optimizeMaker.style.display = "none";
        } else if (selectedValue === "module") {
            inverterMaker.style.display = "none";
            moduleMaker.style.display = "block";
            optimizeMaker.style.display = "none";
        } else if (selectedValue === "optimize") {
            inverterMaker.style.display = "none";
            moduleMaker.style.display = "none";
            optimizeMaker.style.display = "block";
        }

        inverterMaker.selectedIndex = 0;
        moduleMaker.selectedIndex = 0;
        optimizeMaker.selectedIndex = 0;
    })

    productDatasheetFile.addEventListener("change", function (e) {
        const file = e.target.files[0];
        if (!file) {
            return;
        }
        formData.append("sheet", file);
    });

    productAddButton.addEventListener("click", async function () {
        const _id = this.getAttribute("_id");
        let maker = document.querySelector(`.${productType.value.trim()}__maker`)

        if (productType.selectedIndex === 0) {
            Notify.failure("타입을 선택 해주세요");
            return;
        }

        if (maker.selectedIndex === 0) {
            Notify.failure("제조사를 선택 해주세요");
            return;
        }

        if (blankValidator(productName.value)) {
            Notify.failure("상품명을 입력해주세요");
            return;
        }
        if (blankValidator(productSubHead.value)) {
            Notify.failure("상품 부가설명을 입력해주세요");
            return;
        }


        formData.append("productId", _id);
        formData.append("productType", productType.value.trim());
        formData.append("productMaker", maker.value.trim());
        formData.append("productName", productName.value.trim());
        formData.append("productSubHead", productSubHead.value.trim());


        productSpecsTitle.forEach((item, i) => {
            formData.append(`productSpecs[${i}][specTitle]`, item.value.trim() || '');
            formData.append(`productSpecs[${i}][specSubTitle]`, productSpecsSubTitle[i].value.trim() || '');
        });



        const apiResult = await fetch("/api/product?_method=PUT", {
            method: "POST",
            body: formData
        });

        const resultJson = await apiResult.json();

        if (resultJson.success) {
            Notify.success("수정이 완료되었습니다. 3초 후 대시보드로 이동합니다.");

            setTimeout(() => {
                location.href = "/admin/dashboard";
            }, 3000);
        } else {
            Notify.failure("오류가 발생하였습니다.");
            return;
        }



    })

    function imageAcceptChecker(file, dom) {
        try {
            const fileExt = getExtention(file.name);
            if (!fileExt) {
                Notify.failure("정상적인 파일이 아닙니다.");
                if (dom) dom.value = "";
                return false;
            }

            if (!imageExtensionChecker(fileExt)) {
                Notify.failure("허용되지 않은 확장자 입니다.");
                if (dom) dom.value = "";
                return false;
            }

            if (file.size > 10485760) {
                Notify.failure("10MB까지만 업로드 가능합니다.");
                if (dom) dom.value = "";
                return false;
            }
        } catch (e) {
            console.log(e);
            Notify.failure("정상적인 파일이 아닙니다.");
            if (dom) dom.value = "";
            return false;
        }

        return true;
    };


});