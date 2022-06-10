import {onlyNumberValidator} from "../../utils/validator";
import { Confirm } from 'notiflix/build/notiflix-confirm-aio';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

document.addEventListener("DOMContentLoaded", () => {
    const subtotal = document.querySelector(".subtotal--body");
    const estimateInputs = document.querySelectorAll(".estimate__input");
    let estimateArray = [];
    estimateInputs.forEach((item, i) => {
        item.addEventListener("change", function() {
            let sum = 0;
            const value = Number(this.value); 
            
            if(!onlyNumberValidator(value)) {
                Notify.failure("숫자만 입력해주세요");
                this.value = "";
                this.focus();
                return;
            }

            estimateArray[i] = value;

            for(let i=0; i<estimateArray.length; i++) {
                sum += estimateArray[i];
            }

            subtotal.innerHTML = `$ ${sum.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`
        })
    })

});