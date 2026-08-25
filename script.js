/* =========================================================
   CONFIGURACIÓN
========================================================= */

const WHATSAPP_NUMBER = "524111742093";


/* =========================================================
   ELEMENTOS GENERALES
========================================================= */

const menuToggle =
    document.getElementById("menuToggle");

const navMenu =
    document.getElementById("navMenu");

const backToTop =
    document.getElementById("backToTop");

const quoteForm =
    document.getElementById("quoteForm");

const currentYear =
    document.getElementById("currentYear");


/* =========================================================
   ELEMENTOS DEL FORMULARIO
========================================================= */

const tipoEventoInput =
    document.getElementById("tipoEvento");

const fechaInput =
    document.getElementById("fecha");

const dateDisplay =
    document.getElementById("dateDisplay");

const horaInicioInput =
    document.getElementById("horaInicio");

const horaFinInput =
    document.getElementById("horaFin");

const servicioInput =
    document.getElementById("servicio");

const ubicacionInput =
    document.getElementById("ubicacion");

const nombreLugarInput =
    document.getElementById("nombreLugar");

const tipoLugarInput =
    document.getElementById("tipoLugar");

const invitadosInput =
    document.getElementById("invitados");

const nombreInput =
    document.getElementById("nombre");

const telefonoInput =
    document.getElementById("telefono");

const comentariosInput =
    document.getElementById("comentarios");


/* =========================================================
   ELEMENTOS AUXILIARES
========================================================= */

const durationBox =
    document.getElementById("durationBox");

const durationText =
    document.getElementById("durationText");

const mapsPreview =
    document.getElementById("mapsPreview");

const mapsPreviewText =
    document.getElementById("mapsPreviewText");

const mapsLink =
    document.getElementById("mapsLink");

const comentariosCounter =
    document.getElementById("comentariosCounter");


/* =========================================================
   ERRORES
========================================================= */

const tipoEventoError =
    document.getElementById("tipoEventoError");

const fechaError =
    document.getElementById("fechaError");

const horaInicioError =
    document.getElementById("horaInicioError");

const horaFinError =
    document.getElementById("horaFinError");

const servicioError =
    document.getElementById("servicioError");

const ubicacionError =
    document.getElementById("ubicacionError");

const nombreLugarError =
    document.getElementById("nombreLugarError");

const tipoLugarError =
    document.getElementById("tipoLugarError");

const nombreError =
    document.getElementById("nombreError");

const telefonoError =
    document.getElementById("telefonoError");


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


    fechaInput.min =
        `${year}-${month}-${day}`;

}


establecerFechaMinima();


/* =========================================================
   MOSTRAR FECHA SELECCIONADA
========================================================= */

if (fechaInput && dateDisplay) {

    fechaInput.addEventListener(
        "change",
        function () {

            if (this.value) {

                const partes =
                    this.value.split("-");


                const year =
                    partes[0];

                const month =
                    partes[1];

                const day =
                    partes[2];


                dateDisplay.textContent =
                    `${day}/${month}/${year}`;


                dateDisplay.classList.add(
                    "has-date"
                );

            } else {

                dateDisplay.textContent =
                    "Selecciona una fecha...";


                dateDisplay.classList.remove(
                    "has-date"
                );

            }

        }
    );

}


/* =========================================================
   CONVERTIR HORA A MINUTOS
========================================================= */

function convertirHoraAMinutos(
    horaTexto
) {

    if (!horaTexto) {
        return null;
    }


    const partes =
        horaTexto.trim().split(" ");


    if (partes.length !== 2) {
        return null;
    }


    const horaMinuto =
        partes[0].split(":");


    let hora =
        parseInt(
            horaMinuto[0],
            10
        );


    const minutos =
        parseInt(
            horaMinuto[1],
            10
        );


    const periodo =
        partes[1].toUpperCase();


    if (
        Number.isNaN(hora) ||
        Number.isNaN(minutos)
    ) {

        return null;

    }


    if (periodo === "AM") {

        if (hora === 12) {
            hora = 0;
        }

    } else if (periodo === "PM") {

        if (hora !== 12) {
            hora += 12;
        }

    }


    return (
        hora * 60
        + minutos
    );

}


/* =========================================================
   CALCULAR DURACIÓN
========================================================= */

function calcularDuracion() {

    if (
        !horaInicioInput ||
        !horaFinInput ||
        !durationText ||
        !durationBox
    ) {

        return null;

    }


    const inicio =
        convertirHoraAMinutos(
            horaInicioInput.value
        );


    const finOriginal =
        convertirHoraAMinutos(
            horaFinInput.value
        );


    if (
        inicio === null ||
        finOriginal === null
    ) {

        durationText.textContent =
            "Selecciona el horario del evento";


        durationBox.classList.remove(
            "active"
        );


        return null;

    }


    let fin =
        finOriginal;


    /*
       Si la hora de término es menor
       o igual que la de inicio,
       asumimos que termina después
       de medianoche.
    */

    if (fin <= inicio) {

        fin += 24 * 60;

    }


    const diferencia =
        fin - inicio;


    const horas =
        Math.floor(
            diferencia / 60
        );


    const minutos =
        diferencia % 60;


    let texto =
        "";


    if (horas > 0) {

        texto +=
            `${horas} ${
                horas === 1
                    ? "hora"
                    : "horas"
            }`;

    }


    if (minutos > 0) {

        if (texto !== "") {
            texto += " ";
        }


        texto +=
            `${minutos} ${
                minutos === 1
                    ? "minuto"
                    : "minutos"
            }`;

    }


    if (texto === "") {

        texto =
            "Horario no válido";

    }


    durationText.textContent =
        texto;


    durationBox.classList.add(
        "active"
    );


    return {
        inicio,
        fin,
        diferencia,
        texto
    };

}


/* =========================================================
   ACTUALIZAR DURACIÓN
========================================================= */

if (horaInicioInput) {

    horaInicioInput.addEventListener(
        "change",
        function () {

            calcularDuracion();

            limpiarError(
                horaInicioInput,
                horaInicioError
            );

        }
    );

}


if (horaFinInput) {

    horaFinInput.addEventListener(
        "change",
        function () {

            calcularDuracion();

            limpiarError(
                horaFinInput,
                horaFinError
            );

        }
    );

}


/* =========================================================
   GOOGLE MAPS
========================================================= */

function actualizarGoogleMaps() {

    if (
        !ubicacionInput ||
        !nombreLugarInput ||
        !mapsLink ||
        !mapsPreviewText
    ) {

        return;

    }


    const ubicacion =
        ubicacionInput.value.trim();


    const nombreLugar =
        nombreLugarInput.value.trim();


    if (
        ubicacion === "" ||
        nombreLugar === ""
    ) {

        mapsPreviewText.textContent =
            "Completa la ciudad y el nombre del lugar para generar el enlace.";


        mapsLink.href =
            "#";


        mapsLink.classList.remove(
            "active"
        );


        return;

    }


    const busqueda =
        `${nombreLugar}, ${ubicacion}`;


    const url =
        "https://www.google.com/maps/search/?api=1&query=" +
        encodeURIComponent(
            busqueda
        );


    mapsLink.href =
        url;


    mapsLink.classList.add(
        "active"
    );


    mapsPreviewText.textContent =
        busqueda;

}


if (ubicacionInput) {

    ubicacionInput.addEventListener(
        "input",
        function () {

            actualizarGoogleMaps();

            limpiarError(
                ubicacionInput,
                ubicacionError
            );

        }
    );

}


if (nombreLugarInput) {

    nombreLugarInput.addEventListener(
        "input",
        function () {

            actualizarGoogleMaps();

            limpiarError(
                nombreLugarInput,
                nombreLugarError
            );

        }
    );

}


/* =========================================================
   CONTADOR DE COMENTARIOS
========================================================= */

if (
    comentariosInput &&
    comentariosCounter
) {

    comentariosInput.addEventListener(
        "input",
        function () {

            comentariosCounter.textContent =
                this.value.length;

        }
    );

}


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


    if (
        fechaInput.value === ""
    ) {

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
   VALIDAR HORA DE INICIO
========================================================= */

function validarHoraInicio() {

    if (!horaInicioInput) {
        return false;
    }


    if (
        horaInicioInput.value === ""
    ) {

        mostrarError(
            horaInicioInput,
            horaInicioError,
            "Selecciona la hora de inicio."
        );

        return false;

    }


    limpiarError(
        horaInicioInput,
        horaInicioError
    );


    return true;

}


/* =========================================================
   VALIDAR HORA DE TÉRMINO
========================================================= */

function validarHoraFin() {

    if (!horaFinInput) {
        return false;
    }


    if (
        horaFinInput.value === ""
    ) {

        mostrarError(
            horaFinInput,
            horaFinError,
            "Selecciona la hora de término."
        );

        return false;

    }


    limpiarError(
        horaFinInput,
        horaFinError
    );


    return true;

}


/* =========================================================
   VALIDAR HORARIO COMPLETO
========================================================= */

function validarHorario() {

    if (
        !horaInicioInput ||
        !horaFinInput
    ) {

        return false;

    }


    const inicio =
        convertirHoraAMinutos(
            horaInicioInput.value
        );


    const fin =
        convertirHoraAMinutos(
            horaFinInput.value
        );


    if (
        inicio === null ||
        fin === null
    ) {

        return false;

    }


    /*
       Permitimos eventos que terminen
       después de medianoche.
    */

    let diferencia =
        fin - inicio;


    if (diferencia <= 0) {

        diferencia +=
            24 * 60;

    }


    /*
       Evitamos horarios absurdos
       de 24 horas.
    */

    if (
        diferencia > 12 * 60
    ) {

        mostrarError(
            horaFinInput,
            horaFinError,
            "El horario seleccionado supera las 12 horas."
        );

        return false;

    }


    return true;

}


/* =========================================================
   VALIDAR SERVICIO
========================================================= */

function validarServicio() {

    if (!servicioInput) {
        return false;
    }


    if (
        servicioInput.value === ""
    ) {

        mostrarError(
            servicioInput,
            servicioError,
            "Selecciona el servicio que necesitas."
        );

        return false;

    }


    limpiarError(
        servicioInput,
        servicioError
    );


    return true;

}


/* =========================================================
   VALIDAR UBICACIÓN
========================================================= */

function validarUbicacion() {

    if (!ubicacionInput) {
        return false;
    }


    const valor =
        ubicacionInput.value.trim();


    if (valor.length < 3) {

        mostrarError(
            ubicacionInput,
            ubicacionError,
            "Escribe la ciudad o comunidad del evento."
        );

        return false;

    }


    limpiarError(
        ubicacionInput,
        ubicacionError
    );


    return true;

}


/* =========================================================
   VALIDAR NOMBRE DEL LUGAR
========================================================= */

function validarNombreLugar() {

    if (!nombreLugarInput) {
        return false;
    }


    const valor =
        nombreLugarInput.value.trim();


    if (valor.length < 2) {

        mostrarError(
            nombreLugarInput,
            nombreLugarError,
            "Escribe el nombre del lugar del evento."
        );

        return false;

    }


    limpiarError(
        nombreLugarInput,
        nombreLugarError
    );


    return true;

}


/* =========================================================
   VALIDAR TIPO DE LUGAR
========================================================= */

function validarTipoLugar() {

    if (!tipoLugarInput) {
        return false;
    }


    if (
        tipoLugarInput.value === ""
    ) {

        mostrarError(
            tipoLugarInput,
            tipoLugarError,
            "Selecciona el tipo de lugar."
        );

        return false;

    }


    limpiarError(
        tipoLugarInput,
        tipoLugarError
    );


    return true;

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
   VALIDAR TELÉFONO
========================================================= */

function validarTelefono() {

    if (!telefonoInput) {
        return false;
    }


    const telefono =
        telefonoInput.value.trim();


    const digitos =
        telefono.replace(
            /\D/g,
            ""
        );


    if (digitos.length < 10) {

        mostrarError(
            telefonoInput,
            telefonoError,
            "Escribe un número de WhatsApp válido de al menos 10 dígitos."
        );

        return false;

    }


    limpiarError(
        telefonoInput,
        telefonoError
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
            weekday: "long",
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


    const telefono =
        telefonoInput.value.trim();


    const tipoEvento =
        tipoEventoInput.value;


    const fecha =
        fechaInput.value;


    const horaInicio =
        horaInicioInput.value;


    const horaFin =
        horaFinInput.value;


    const servicio =
        servicioInput.value;


    const ubicacion =
        ubicacionInput.value.trim();


    const nombreLugar =
        nombreLugarInput.value.trim();


    const tipoLugar =
        tipoLugarInput.value;


    const invitados =
        invitadosInput
            ? invitadosInput.value
            : "";


    const comentarios =
        comentariosInput
            ? comentariosInput.value.trim()
            : "";


    const fechaFormateada =
        formatearFecha(
            fecha
        );


    const duracion =
        calcularDuracion();


    const duracionTexto =
        duracion
            ? duracion.texto
            : "No especificada";


    /*
       Crear enlace de Google Maps.
    */

    const busquedaMaps =
        `${nombreLugar}, ${ubicacion}`;


    const mapsUrl =
        "https://www.google.com/maps/search/?api=1&query=" +
        encodeURIComponent(
            busquedaMaps
        );


    /*
       Mensaje final.
    */

    let mensaje =

`Hola, me gustaría solicitar una cotización para mi evento.

━━━━━━━━━━━━━━━━━━
📋 DATOS DEL EVENTO
━━━━━━━━━━━━━━━━━━

*Tipo de evento:* ${tipoEvento}

*Fecha:* ${fechaFormateada}

*Horario:* ${horaInicio} a ${horaFin}

*Duración aproximada:* ${duracionTexto}

*Servicio solicitado:* ${servicio}

━━━━━━━━━━━━━━━━━━
📍 UBICACIÓN
━━━━━━━━━━━━━━━━━━

*Ciudad / comunidad:* ${ubicacion}

*Lugar:* ${nombreLugar}

*Tipo de lugar:* ${tipoLugar}

*Ubicación en Google Maps:*
${mapsUrl}`;


    if (invitados) {

        mensaje +=

`

*Invitados aproximados:* ${invitados}`;

    }


    mensaje +=

`

━━━━━━━━━━━━━━━━━━
👤 DATOS DE CONTACTO
━━━━━━━━━━━━━━━━━━

*Nombre:* ${nombre}

*WhatsApp:* ${telefono}`;


    if (comentarios) {

        mensaje +=

`

━━━━━━━━━━━━━━━━━━
📝 COMENTARIOS
━━━━━━━━━━━━━━━━━━

${comentarios}`;

    }


    mensaje +=

`

━━━━━━━━━━━━━━━━━━

Entiendo que esta solicitud no representa una reservación y que la disponibilidad y cotización final deberán ser confirmadas por la agrupación.

¡Gracias!`;



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


            const tipoEventoValido =
                validarTipoEvento();


            const fechaValida =
                validarFecha();


            const horaInicioValida =
                validarHoraInicio();


            const horaFinValida =
                validarHoraFin();


            const horarioValido =
                validarHorario();


            const servicioValido =
                validarServicio();


            const ubicacionValida =
                validarUbicacion();


            const nombreLugarValido =
                validarNombreLugar();


            const tipoLugarValido =
                validarTipoLugar();


            const nombreValido =
                validarNombre();


            const telefonoValido =
                validarTelefono();


            if (
                !tipoEventoValido ||
                !fechaValida ||
                !horaInicioValida ||
                !horaFinValida ||
                !horarioValido ||
                !servicioValido ||
                !ubicacionValida ||
                !nombreLugarValido ||
                !tipoLugarValido ||
                !nombreValido ||
                !telefonoValido
            ) {

                /*
                   Llevar al primer error visible.
                */

                const primerError =
                    quoteForm.querySelector(
                        ".error"
                    );


                if (primerError) {

                    primerError.scrollIntoView({
                        behavior: "smooth",
                        block: "center"
                    });

                }


                return;

            }


            const mensaje =
                crearMensajeWhatsApp();


            const url =
                "https://wa.me/" +
                WHATSAPP_NUMBER +
                "?text=" +
                encodeURIComponent(
                    mensaje
                );


            window.open(
                url,
                "_blank"
            );

        }
    );

}


/* =========================================================
   LIMPIAR ERRORES
========================================================= */

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


if (servicioInput) {

    servicioInput.addEventListener(
        "change",
        function () {

            limpiarError(
                servicioInput,
                servicioError
            );

        }
    );

}


if (tipoLugarInput) {

    tipoLugarInput.addEventListener(
        "change",
        function () {

            limpiarError(
                tipoLugarInput,
                tipoLugarError
            );

        }
    );

}


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


if (telefonoInput) {

    telefonoInput.addEventListener(
        "input",
        function () {

            limpiarError(
                telefonoInput,
                telefonoError
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


controlarBotonArriba();


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
   AÑO AUTOMÁTICO
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
   COMPROBACIÓN
========================================================= */

console.log(
    "Landing Page cargada correctamente."
);

console.log(
    "Formulario de cotización actualizado."
);