import Notiflix from "notiflix";

document.addEventListener("DOMContentLoaded", () => {
    const loginBtn = document.querySelector(".loginButton");
    const inputId = document.querySelector(".inputId")
    const inputPw = document.querySelector(".inputPw")

    inputPw.addEventListener("keypress", (evt) => {
        if (evt.keyCode === 13) {
            loginBtn.click();
        }
    });

    loginBtn.addEventListener("click", async () => {


        if (!inputId) {
            Notiflix.Notify.failure("아이디를 입력해주세요");
            return;
        }

        if (!inputPw) {
            Notiflix.Notify.failure("패스워드를 입력해주세요");
            return;
        }

        const response = await fetch("/api/login", {
            headers: {
                "Content-Type": "application/json"
            },
            method: "POST",
            body: JSON.stringify({
                userId: inputId.value,
                userPw: inputPw.value
            })
        });

        const apiResult = await response.json();

        if (apiResult.success) {
            location.href = "/admin/dashboard";
            return;
        } else {
            Notiflix.Notify.failure("일치하는 정보가 없습니다");
            return;
        }
    })
});