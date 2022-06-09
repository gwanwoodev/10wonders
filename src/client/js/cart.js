import { createCookie, getCookie } from "../../utils/cookies";

document.addEventListener("DOMContentLoaded", () => {
    const qtyUpBtns = document.querySelectorAll(".qtyUp--btn");
    const qtyDownBtns = document.querySelectorAll(".qtyDown--btn");
    const tdDelBtns = document.querySelectorAll(".tdDel--btn");

    qtyUpBtns.forEach(item => {
        item.addEventListener("click", function () {
            const parentBox = this.parentElement.parentElement;
            const qtyInput = parentBox.querySelector("input");
            let qtyValue = Number(qtyInput.value);

            qtyInput.value = qtyValue + 1;

            const _id = this.getAttribute("_id");

            updateCartItems(_id, qtyInput.value);

        });
    })

    qtyDownBtns.forEach(item => {
        item.addEventListener("click", function () {
            const parentBox = this.parentElement.parentElement;
            const qtyInput = parentBox.querySelector("input");
            let qtyValue = Number(qtyInput.value);

            if (qtyValue - 1 < 1) {
                qtyValue = 2;
            }

            qtyInput.value = qtyValue - 1;

            const _id = this.getAttribute("_id");
            updateCartItems(_id, qtyInput.value);
        });
    })

    tdDelBtns.forEach(item => {
        item.addEventListener("click", function () {
            const parentBox = this.parentElement.parentElement;
            parentBox.remove();

            const _id = this.getAttribute("_id");
            deleteCartItem(_id);
        });
    })

    function updateCartItems(_id, qtyValue) {
        const cartItems = JSON.parse(getCookie("cart_items"));

        const findIndex = cartItems.findIndex(item => item._id === _id);
        cartItems[findIndex].orderQuantity = qtyValue;

        createCookie("cart_items", JSON.stringify(cartItems));
    }

    function deleteCartItem(_id) {
        const cartItems = JSON.parse(getCookie("cart_items"));
        const filteredItems = cartItems.filter(item => {
            return item._id !== _id
        });

        createCookie("cart_items", JSON.stringify(filteredItems));
    }
});