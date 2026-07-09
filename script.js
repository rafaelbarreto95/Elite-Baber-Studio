// ================= CURSOR =================
window.addEventListener("DOMContentLoaded", () => {

    if (window.innerWidth >= 768) {
        const cursor = document.querySelector(".cursor");

        if (cursor) {
            let mouseX = 0;
            let mouseY = 0;

            document.addEventListener("mousemove", (e) => {
                mouseX = e.clientX;
                mouseY = e.clientY;
            });

            function animateCursor() {
                cursor.style.left = mouseX + "px";
                cursor.style.top = mouseY + "px";
                requestAnimationFrame(animateCursor);
            }
            animateCursor();

            // grows slightly over links/buttons
            document.querySelectorAll("a, button").forEach((el) => {
                el.addEventListener("mouseenter", () => {
                    cursor.style.width = "32px";
                    cursor.style.height = "32px";
                });
                el.addEventListener("mouseleave", () => {
                    cursor.style.width = "20px";
                    cursor.style.height = "20px";
                });
            });
        }
    }

    // ================= MOBILE NAV =================
    const navToggle = document.getElementById("navToggle");
    const mainNav = document.getElementById("mainNav");

    if (navToggle && mainNav) {
        navToggle.addEventListener("click", () => {
            const isOpen = mainNav.classList.toggle("is-open");
            navToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
        });

        mainNav.querySelectorAll("a").forEach((link) => {
            link.addEventListener("click", () => {
                mainNav.classList.remove("is-open");
                navToggle.setAttribute("aria-expanded", "false");
            });
        });
    }

    // ================= BOOKING FORM =================
    const bookingForm = document.getElementById("bookingForm");

    if (bookingForm) {
        const dataInput = document.getElementById("bkData");
        const errorMsg = document.getElementById("bookingError");

        // impede escolher datas passadas
        if (dataInput) {
            const today = new Date();
            const yyyy = today.getFullYear();
            const mm = String(today.getMonth() + 1).padStart(2, "0");
            const dd = String(today.getDate()).padStart(2, "0");
            dataInput.min = `${yyyy}-${mm}-${dd}`;
        }

        bookingForm.addEventListener("submit", (e) => {
            e.preventDefault();

            const nome = document.getElementById("bkNome").value.trim();
            const servico = document.getElementById("bkServico").value;
            const dataValor = document.getElementById("bkData").value;
            const horario = document.getElementById("bkHorario").value;
            const obs = document.getElementById("bkObs").value.trim();

            if (!nome || !servico || !dataValor || !horario) {
                errorMsg.hidden = false;
                return;
            }
            errorMsg.hidden = true;

            // formata a data para dd/mm/aaaa
            const [ano, mes, dia] = dataValor.split("-");
            const dataFormatada = `${dia}/${mes}/${ano}`;

            let mensagem =
                `Olá! Quero agendar um horário.\n` +
                `Nome: ${nome}\n` +
                `Serviço: ${servico}\n` +
                `Data: ${dataFormatada}\n` +
                `Horário: ${horario}`;

            if (obs) {
                mensagem += `\nObservação: ${obs}`;
            }

            const url = `https://wa.me/5511983786374?text=${encodeURIComponent(mensagem)}`;
            window.open(url, "_blank", "noopener");
        });
    }

    // ================= SCROLL REVEAL =================
    const revealEls = document.querySelectorAll(".reveal");

    if ("IntersectionObserver" in window && revealEls.length) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("is-visible");
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.15 });

        revealEls.forEach((el) => observer.observe(el));
    } else {
        revealEls.forEach((el) => el.classList.add("is-visible"));
    }
});