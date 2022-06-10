import { Confirm } from 'notiflix/build/notiflix-confirm-aio';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import {orderNumberValidator} from "../../utils/validator";

document.addEventListener("DOMContentLoaded", () => {
    const searchInput = document.querySelector(".search__input");
    const sendEstimateBtns = document.querySelectorAll(".sendEstimate");
    const checkPaymentBtns = document.querySelectorAll(".checkPayment");
    const shippingBtns = document.querySelectorAll(".shippingBtn");

    searchInput.addEventListener("keydown", (evt) => {
        if(evt.keyCode === 13) {
            const keyword = `${searchInput.value}`;
            if(!orderNumberValidator(Number(keyword))) {
                Notify.failure("주문번호는 9자리 숫자로만 입력해주세요");
                
                return;
            }

            location.href = `?keyword=${searchInput.value}`;
        }
    })

    sendEstimateBtns.forEach(item => {
       
        item.addEventListener("click",function() {
            const orderNumber = this.getAttribute("orderNumber");
            location.href =`/admin/order/estimate?_id=${orderNumber}`;
        });
    });

    checkPaymentBtns.forEach(item => {
        item.addEventListener("click", function() {
            const orderNumber = Number(this.getAttribute("orderNumber"));
            const process = 2;
            Confirm.show(
                '10WGE Confirm',
                '입금을 확인 하셨습니까?',
                'Yes',
                'No',
                async () => {
                    const apiResult = await fetch("/api/order/process?_method=PUT", {
                        headers: {
                            "Content-Type": "application/json"
                        },
                        method: "POST",
                        body: JSON.stringify({ orderNumber, process })
                    });

                    const resultJson = await apiResult.json();

                    if (resultJson.success) {
                        Notify.success("상태가 변경되었습니다.");
                        setTimeout(() => {
                            location.reload();
                        }, 1000);
                        
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
                    fontFamily: "SDGothicR"
                }
            )
        });
    })

    shippingBtns.forEach(item => {
        item.addEventListener("click", function() {
            const orderNumber = Number(this.getAttribute("orderNumber"));
            const process = 3;
            Confirm.show(
                '10WGE Confirm',
                '배송처리 하시겠습니까?',
                'Yes',
                'No',
                async () => {
                    const apiResult = await fetch("/api/order/process?_method=PUT", {
                        headers: {
                            "Content-Type": "application/json"
                        },
                        method: "POST",
                        body: JSON.stringify({ orderNumber, process })
                    });

                    const resultJson = await apiResult.json();

                    if (resultJson.success) {
                        Notify.success("상태가 변경되었습니다.");
                        setTimeout(() => {
                            location.reload();
                        }, 1000);
                        
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
                    fontFamily: "SDGothicR"
                }
            )
        });
    })
});