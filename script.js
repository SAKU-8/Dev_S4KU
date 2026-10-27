const secciones = document.querySelectorAll("section[id]");
const enlaces = document.querySelectorAll(".navlinks a");

const observador = new IntersectionObserver((entradas) => {
    entradas.forEach((entrada) => {
        if (entrada.isIntersecting) {
            enlaces.forEach((a) => {
                a.classList.toggle("activo", a.getAttribute("href") === "#" + entrada.target.id);
            });
        }
    });
}, { threshold: 0.5 });

secciones.forEach((s) => observador.observe(s));