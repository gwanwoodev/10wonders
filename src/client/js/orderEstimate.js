import {onlyNumberValidator} from "../../utils/validator";
import { Confirm } from 'notiflix/build/notiflix-confirm-aio';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

document.addEventListener("DOMContentLoaded", () => {
    const subtotal = document.querySelector(".subtotal--body");
    const estimateInputs = document.querySelectorAll(".estimate__input");
    const estimateSendButton = document.querySelector(".estimateSendButton");
    const estimateEmailSendButton = document.querySelector(".estimateEmailSendButton");
    let orderProducts = [];

    estimateInputs.forEach((item, i) => {
        let productQuantity = Number(item.getAttribute("productQuantity"));
        let productId = item.getAttribute("productId");
        let obj = {
            productQuantity,
            product: productId, 
            estimate: 0
        };

        orderProducts.push(obj);

        item.addEventListener("change", function() {
            let sum = 0;
            const value = Number(this.value); 
            
            if(!onlyNumberValidator(value)) {
                Notify.failure("숫자만 입력해주세요");
                this.value = "";
                this.focus();
                return;
            }

            orderProducts[i].estimate = value;

            for(let i=0; i<orderProducts.length; i++) {
                sum += orderProducts[i].estimate;
            }

            subtotal.innerHTML = `$ ${sum.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`
        })
    })

    estimateSendButton.addEventListener("click", async function() {
        const orderNumber = this.getAttribute("orderNumber");

        const apiResult = await fetch("/api/order?_method=PUT", {
            headers: {
                "Content-Type": "application/json"
            },
            method: "POST",
            body: JSON.stringify({orderNumber, orderProducts})
        });

        const resultJson = await apiResult.json();

        if(resultJson.success) {
            Notify.success("견적서가 수정되었습니다.");
            return;
        }else {
            Notify.failure("오류 발생");
            return;
        }
    });

    estimateEmailSendButton.addEventListener("click", async function() {
        const orderNumber = this.getAttribute("orderNumber");

        const apiResult = await fetch("/api/order/send", {
            headers: {
                "Content-Type": "application/json"
            },
            method: "POST",
            body: JSON.stringify({orderNumber })
        });

        const resultJson = await apiResult.json();

        if(resultJson.success) {
            Notify.success("견적서가 발송 되었습니다.");
            return;
        }else {
            Notify.failure("오류 발생");
            return;
        }
    });

});