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

document.querySelectorAll(".reveal").forEach((el) => {
    let i = 0;

    const dividir = (nodo) => {
        [...nodo.childNodes].forEach((hijo) => {
            if (hijo.nodeType === 3) {
                // es texto: lo partimos en palabras
                const fragmento = document.createDocumentFragment();
                hijo.textContent.split(/(\s+)/).forEach((parte) => {
                    if (parte.trim() === "") {
                        fragmento.append(parte);          // espacios se quedan igual
                    } else {
                        const span = document.createElement("span");
                        span.textContent = parte;
                        span.style.setProperty("--i", i++);
                        fragmento.append(span);
                    }
                });
                hijo.replaceWith(fragmento);
            } else if (hijo.nodeType === 1) {
                dividir(hijo);                            // es una etiqueta (como el <a>): entra a ella
            }
        });
    };

    dividir(el);
});