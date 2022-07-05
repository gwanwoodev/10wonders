import { Notify } from 'notiflix/build/notiflix-notify-aio';

document.addEventListener("DOMContentLoaded", () => {
    const modifyBtn = document.querySelector(".modifyShippingInfo");
    const companyInput = document.querySelector(".company__input");
    const trackingInput = document.querySelector(".tracking__input");

    modifyBtn.addEventListener("click", async function() {
        const orderNumber = Number(this.getAttribute("orderNumber"));
        let process = 3;
        const company = companyInput.value || '';
        const trackingNumber = Number(trackingInput.value) || 0; 

        const apiResult = await fetch("/api/order/process?_method=PUT", {
            headers: {
                "Content-Type": "application/json"
            },
            method: "POST",
            body: JSON.stringify({orderNumber, process, company, trackingNumber})
        });

        const resultJson = await apiResult.json();

        if(resultJson.success) {
            Notify.success("변경완료 되었습니다.");
            return;
        }else {
            Notify.failure("오류발생");
            return;
        }



    });
});