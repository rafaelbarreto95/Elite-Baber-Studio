// ================= CURSOR SIMPLES =================
window.addEventListener("DOMContentLoaded", () => {

    // desativa no mobile
    if (window.innerWidth < 768) return;

    const cursor = document.querySelector(".cursor");
    if (!cursor) return;

    let mouseX = 0;
    let mouseY = 0;

    document.addEventListener("mousemove", (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    function animate() {
        cursor.style.left = mouseX + "px";
        cursor.style.top = mouseY + "px";
        requestAnimationFrame(animate);
    }

    animate();
});