/* =========================================================
   CONFIGURACIÓN
========================================================= */


/*
    ========================================================
    NÚMERO DE WHATSAPP
    ========================================================
*/

const WHATSAPP_NUMBER = "524111742093";


/* =========================================================
   ELEMENTOS DE LA PÁGINA
========================================================= */

const menuToggle =
    document.getElementById("menuToggle");

const navMenu =
    document.getElementById("navMenu");

const backToTop =
    document.getElementById("backToTop");

const quoteForm =
    document.getElementById("quoteForm");

const fechaInput =
    document.getElementById("fecha");

const currentYear =
    document.getElementById("currentYear");

const dateDisplay = document.getElementById("dateDisplay");

if (fecha && dateDisplay) {

    fecha.addEventListener("change", function () {

        if (this.value) {

            const [year, month, day] = this.value.split("-");

            dateDisplay.textContent =
                `${day}/${month}/${year}`;

            dateDisplay.classList.add("has-date");

        } else {

            dateDisplay.textContent =
                "Selecciona una fecha...";

            dateDisplay.classList.remove("has-date");

        }

    });

}


/* =========================================================
   MENÚ RESPONSIVE
========================================================= */

if (menuToggle && navMenu) {

    menuToggle.addEventListener(
        "click",
        function () {

            const abierto =
                navMenu.classList.toggle("active");


            menuToggle.classList.toggle(
                "active",
                abierto
            );


            menuToggle.setAttribute(
                "aria-expanded",
                abierto.toString()
            );

        }
    );


    /*
        Cerrar menú al seleccionar
        una sección.
    */

    const menuLinks =
        navMenu.querySelectorAll("a");


    menuLinks.forEach(
        function (link) {

            link.addEventListener(
                "click",
                function () {

                    navMenu.classList.remove(
                        "active"
                    );


                    menuToggle.classList.remove(
                        "active"
                    );


                    menuToggle.setAttribute(
                        "aria-expanded",
                        "false"
                    );

                }
            );

        }
    );

}


/* =========================================================
   CERRAR MENÚ AL CAMBIAR A ESCRITORIO
========================================================= */

window.addEventListener(
    "resize",
    function () {

        if (window.innerWidth > 768) {

            if (navMenu) {

                navMenu.classList.remove(
                    "active"
                );

            }


            if (menuToggle) {

                menuToggle.classList.remove(
                    "active"
                );


                menuToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );

            }

        }

    }
);


/* =========================================================
   FECHA MÍNIMA
========================================================= */

function establecerFechaMinima() {

    if (!fechaInput) {
        return;
    }


    const hoy =
        new Date();


    const year =
        hoy.getFullYear();


    const month =
        String(
            hoy.getMonth() + 1
        ).padStart(2, "0");


    const day =
        String(
            hoy.getDate()
        ).padStart(2, "0");


    const fechaHoy =
        `${year}-${month}-${day}`;


    fechaInput.min =
        fechaHoy;

}


establecerFechaMinima();


/* =========================================================
   ELEMENTOS DEL FORMULARIO
========================================================= */

const nombreInput =
    document.getElementById("nombre");

const tipoEventoInput =
    document.getElementById("tipoEvento");

const horaInput =
    document.getElementById("hora");


const nombreError =
    document.getElementById("nombreError");

const tipoEventoError =
    document.getElementById(
        "tipoEventoError"
    );

const fechaError =
    document.getElementById(
        "fechaError"
    );

const horaError =
    document.getElementById(
        "horaError"
    );


/* =========================================================
   MOSTRAR ERROR
========================================================= */

function mostrarError(
    elemento,
    mensajeElemento,
    mensaje
) {

    if (elemento) {

        elemento.classList.add(
            "error"
        );

    }


    if (mensajeElemento) {

        mensajeElemento.textContent =
            mensaje;

    }

}


/* =========================================================
   LIMPIAR ERROR
========================================================= */

function limpiarError(
    elemento,
    mensajeElemento
) {

    if (elemento) {

        elemento.classList.remove(
            "error"
        );

    }


    if (mensajeElemento) {

        mensajeElemento.textContent =
            "";

    }

}


/* =========================================================
   VALIDAR NOMBRE
========================================================= */

function validarNombre() {

    if (!nombreInput) {
        return false;
    }


    const nombre =
        nombreInput.value.trim();


    if (nombre.length === 0) {

        mostrarError(
            nombreInput,
            nombreError,
            "Escribe tu nombre completo."
        );

        return false;

    }


    if (nombre.length < 3) {

        mostrarError(
            nombreInput,
            nombreError,
            "El nombre es demasiado corto."
        );

        return false;

    }


    limpiarError(
        nombreInput,
        nombreError
    );


    return true;

}


/* =========================================================
   VALIDAR TIPO DE EVENTO
========================================================= */

function validarTipoEvento() {

    if (!tipoEventoInput) {
        return false;
    }


    if (
        tipoEventoInput.value === ""
    ) {

        mostrarError(
            tipoEventoInput,
            tipoEventoError,
            "Selecciona el tipo de evento."
        );

        return false;

    }


    limpiarError(
        tipoEventoInput,
        tipoEventoError
    );


    return true;

}


/* =========================================================
   VALIDAR FECHA
========================================================= */

function validarFecha() {

    if (!fechaInput) {
        return false;
    }


    if (fechaInput.value === "") {

        mostrarError(
            fechaInput,
            fechaError,
            "Selecciona una fecha."
        );

        return false;

    }


    const fechaSeleccionada =
        new Date(
            fechaInput.value +
            "T12:00:00"
        );


    const hoy =
        new Date();


    hoy.setHours(
        0,
        0,
        0,
        0
    );


    if (
        fechaSeleccionada < hoy
    ) {

        mostrarError(
            fechaInput,
            fechaError,
            "Selecciona una fecha futura."
        );

        return false;

    }


    limpiarError(
        fechaInput,
        fechaError
    );


    return true;

}


/* =========================================================
   VALIDAR HORA
========================================================= */

function validarHora() {

    if (!horaInput) {
        return false;
    }


    if (
        horaInput.value === ""
    ) {

        mostrarError(
            horaInput,
            horaError,
            "Selecciona un horario."
        );

        return false;

    }


    limpiarError(
        horaInput,
        horaError
    );


    return true;

}


/* =========================================================
   FORMATEAR FECHA
========================================================= */

function formatearFecha(
    fecha
) {

    const fechaObjeto =
        new Date(
            fecha +
            "T12:00:00"
        );


    return fechaObjeto.toLocaleDateString(
        "es-MX",
        {
            day: "numeric",
            month: "long",
            year: "numeric"
        }
    );

}


/* =========================================================
   CREAR MENSAJE DE WHATSAPP
========================================================= */

function crearMensajeWhatsApp() {

    const nombre =
        nombreInput.value.trim();


    const tipoEvento =
        tipoEventoInput.value;


    const fecha =
        fechaInput.value;


    const hora =
        horaInput.value;


    const fechaFormateada =
        formatearFecha(
            fecha
        );


    const mensaje =

`Hola, me gustaría solicitar una cotización para mi evento.

*Nombre:* ${nombre}

*Servicio:* ${tipoEvento}

*Fecha y hora:* ${fechaFormateada} a las ${hora}`;


    return mensaje;

}


/* =========================================================
   ENVÍO DEL FORMULARIO
========================================================= */

if (quoteForm) {

    quoteForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            const nombreValido =
                validarNombre();


            const tipoEventoValido =
                validarTipoEvento();


            const fechaValida =
                validarFecha();


            const horaValida =
                validarHora();


            /*
                Si existe algún error,
                detenemos el proceso.
            */

            if (
                !nombreValido ||
                !tipoEventoValido ||
                !fechaValida ||
                !horaValida
            ) {

                return;

            }


            /*
                Crear mensaje.
            */

            const mensaje =
                crearMensajeWhatsApp();


            /*
                Crear enlace de WhatsApp.
            */

            const url =
                "https://wa.me/" +
                WHATSAPP_NUMBER +
                "?text=" +
                encodeURIComponent(
                    mensaje
                );


            /*
                Abrir WhatsApp.
            */

            window.open(
                url,
                "_blank"
            );

        }
    );

}


/* =========================================================
   LIMPIAR ERRORES AL ESCRIBIR
========================================================= */

if (nombreInput) {

    nombreInput.addEventListener(
        "input",
        function () {

            limpiarError(
                nombreInput,
                nombreError
            );

        }
    );

}


if (tipoEventoInput) {

    tipoEventoInput.addEventListener(
        "change",
        function () {

            limpiarError(
                tipoEventoInput,
                tipoEventoError
            );

        }
    );

}


if (fechaInput) {

    fechaInput.addEventListener(
        "change",
        function () {

            limpiarError(
                fechaInput,
                fechaError
            );

        }
    );

}


if (horaInput) {

    horaInput.addEventListener(
        "change",
        function () {

            limpiarError(
                horaInput,
                horaError
            );

        }
    );

}


/* =========================================================
   BOTÓN VOLVER ARRIBA
========================================================= */

function controlarBotonArriba() {

    if (!backToTop) {
        return;
    }


    if (
        window.scrollY > 500
    ) {

        backToTop.classList.add(
            "show"
        );

    } else {

        backToTop.classList.remove(
            "show"
        );

    }

}


window.addEventListener(
    "scroll",
    controlarBotonArriba,
    {
        passive: true
    }
);


if (backToTop) {

    backToTop.addEventListener(
        "click",
        function () {

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        }
    );

}


/* =========================================================
   AÑO AUTOMÁTICO DEL FOOTER
========================================================= */

if (currentYear) {

    currentYear.textContent =
        new Date().getFullYear();

}


/* =========================================================
   ANIMACIONES AL HACER SCROLL
========================================================= */

const elementosAnimados =
    document.querySelectorAll(
        ".section-heading, " +
        ".about-grid, " +
        ".video-card, " +
        ".quote-card, " +
        ".social-link"
    );


/*
    Preparar elementos.
*/

elementosAnimados.forEach(
    function (elemento) {

        elemento.style.opacity =
            "0";

        elemento.style.transform =
            "translateY(25px)";

        elemento.style.transition =
            "opacity 0.7s ease, " +
            "transform 0.7s ease";

    }
);


/* =========================================================
   INTERSECTION OBSERVER
========================================================= */

if (
    "IntersectionObserver" in window
) {

    const observer =
        new IntersectionObserver(
            function (entradas) {

                entradas.forEach(
                    function (entrada) {

                        if (
                            entrada.isIntersecting
                        ) {

                            entrada.target.style.opacity =
                                "1";


                            entrada.target.style.transform =
                                "translateY(0)";


                            observer.unobserve(
                                entrada.target
                            );

                        }

                    }
                );

            },
            {
                threshold: 0.12
            }
        );


    elementosAnimados.forEach(
        function (elemento) {

            observer.observe(
                elemento
            );

        }
    );


} else {

    /*
        Compatibilidad con navegadores
        antiguos.
    */

    elementosAnimados.forEach(
        function (elemento) {

            elemento.style.opacity =
                "1";

            elemento.style.transform =
                "translateY(0)";

        }
    );

}


/* =========================================================
   MENSAJE DE COMPROBACIÓN
========================================================= */

console.log(
    "Landing Page cargada correctamente."
);