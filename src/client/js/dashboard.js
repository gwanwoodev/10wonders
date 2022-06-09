import { Confirm } from 'notiflix/build/notiflix-confirm-aio';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { blankValidator } from "../../utils/validator";
document.addEventListener("DOMContentLoaded", () => {
    const productDelBtns = document.querySelectorAll(".product__del--btn ");
    const searchInput = document.querySelector(".search__input");

    productDelBtns.forEach(item => {
        item.addEventListener("click", async function () {
            const _id = this.getAttribute("_id");
            const parentBox = this.parentElement.parentElement;
            Confirm.show(
                '10WGE Confirm',
                '이 상품을 삭제하시겠습니까?',
                'Yes',
                'No',
                async () => {
                    const apiResult = await fetch("/api/product?_method=DELETE", {
                        headers: {
                            "Content-Type": "application/json"
                        },
                        method: "POST",
                        body: JSON.stringify({ productId: _id })
                    });

                    const resultJson = await apiResult.json();

                    if (resultJson.success) {
                        Notify.success("삭제되었습니다.");
                        parentBox.remove();
                        return;
                    } else {
                        Notify.failure("오류발생");
                        return;
                    }
                },
                () => {
                    return;
                },
                {
                    okButtonBackground: "#CE3226",
                    fontFamily: "SDGothicR"
                }
            )
        })
    });

    searchInput.addEventListener("keydown", function (evt) {
        if (evt.keyCode === 13) {
            if (blankValidator(this.value)) {
                Notify.failure("공백은 입력 할 수 없습니다.");
                return;
            }

            location.href = `?keyword=${this.value}`;
        }
    })
})