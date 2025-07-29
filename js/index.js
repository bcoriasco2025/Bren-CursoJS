let peliculas = [
{
    nombre: "El Padrino",
    imagen: "./img/ElPadrino.png",
    anioEstreno: 1972,
    descripcion: "Una saga mafiosa que retrata la vida de la familia Corleone y su lucha por el poder en los Estados Unidos."
},
{
    nombre: "Forrest Gump",
    imagen: "./img/ForrestGump.png",
    descripcion: "La historia de un hombre con un bajo coeficiente intelectual que influye en varios eventos históricos sin proponérselo."
},
{
    nombre: "Inception",
    imagen: "./img/Inception.png",
    anioEstreno: 2010,
    descripcion: "Un ladrón que roba secretos a través de los sueños debe implantar una idea en la mente de un empresario."
},
{
    nombre: "Parasite",
    imagen: "./img/Parasite.png",
    anioEstreno: 2019,
    descripcion: "Una familia pobre se infiltra en la vida de una familia rica, dando lugar a una serie de eventos inesperados."
},
{
    nombre: "Titanic",
    imagen: "./img/Titanic.png",
    anioEstreno: 1997,
    descripcion: "Una historia de amor trágica a bordo del famoso barco que se hundió en su viaje inaugural."
},
{
    nombre: 'El Secreto de Sus Ojos',
    imagen: "./img/ElSecretodesus Ojos.png",
    anioEstreno: 2009,
    descripcion: "Un ex oficial de justicia investiga un caso de asesinato mientras lidia con su propio pasado."
},
{
    nombre: 'Nueve Reinas',
    imagen: "./img/NueveReinas.png",
    anioEstreno: 2000,
    descripcion: "Dos estafadores de poca monta se ven envueltos en una gran operación de fraude."
},
{
    nombre: 'Relatos Salvajes',
    imagen: "./img/RelatosSalvajes.png",
    anioEstreno: 2014,
    descripcion: "Seis historias de ira, venganza y violencia en la vida moderna argentina."
},
{
    nombre: 'La Historia Oficial',
    imagen: "./img/LaHistoriaOficial.png",
    anioEstreno: 1985,
    descripcion: "Una profesora descubre la verdad sobre la adopción de su hija durante la dictadura militar."
},
{
    nombre: 'El Hijo de la Novia',
    imagen: "./img/elhijodelanovia.png",
    anioEstreno: 2001,
    descripcion: "Un hombre en crisis redescubre el valor de la vida, la familia y el amor verdadero."
}
];

function cargarPeliculasDesdeLocalStorage() {
    const peliculasGuardadas = localStorage.getItem("peliculas");
    if (peliculasGuardadas) {
        peliculas = JSON.parse(peliculasGuardadas);
    }
}

function generarNumerosUnicos(cantidad, max) {
    const numerosUnicos = new Set();
    while (numerosUnicos.size < cantidad) {
        const numero = Math.floor(Math.random() * max) + 1;
        numerosUnicos.add(numero);
    }
    return Array.from(numerosUnicos);
}

function cargarPresentacion() {
    const presentacion = document.getElementById("presentacion");
    let numerosUnicos = generarNumerosUnicos(4, peliculas.length - 1);
    for(let i=0; i < 4; i++) {
        const pelicula = peliculas[numerosUnicos[i]];
        const card = document.createElement("div");
        card.className = "card";
        card.style.width = "12rem";
        card.style.margin = "1rem";

        card.innerHTML = `
            <img src="${pelicula.imagen}" class="card-img-top" alt="${pelicula.nombre}">
            <div class="card-body">
                <h5 class="card-title">${pelicula.nombre}</h5>
                <p class="card-text"><small class="text-muted">Año: ${pelicula.anioEstreno}</small></p>
                <p class="card-text">${pelicula.descripcion}</p>
            </div> 
        `;
        presentacion.appendChild(card);    
    }
}

function borrarResultadoFormulario() {
    const resultado = document.querySelector("#resultado");
    if (resultado) {
        resultado.remove();
    }
}

function borrarResultadoBusqueda() {
    const resultado = document.querySelector("#resultadosBusqueda");
    if (resultado) {
        resultado.remove();
    }
}

cargarPeliculasDesdeLocalStorage();
cargarPresentacion();

const formBoton = document.getElementById("formBoton");
formBoton.addEventListener("click", (event) => {
    event.preventDefault();
    borrarResultadoFormulario();
    let formTitulo = document.getElementById("formTitulo").value;
    let formAnio = document.getElementById("formAnio").value;
    let formImagen = document.getElementById("formImagen").value;
    let formDescripcion = document.getElementById("formDescripcion").value;
    const formulario = document.getElementById("formulario");

    if (formTitulo && formAnio && formImagen && formDescripcion) {
        const nuevaPelicula = {
            nombre: formTitulo,
            imagen: formImagen,
            anioEstreno: parseInt(formAnio),
            descripcion: formDescripcion
        };
        peliculas.push(nuevaPelicula);
        localStorage.setItem("peliculas", JSON.stringify(peliculas));
        formulario.reset();
        const resultado = document.createElement("p");
        resultado.textContent = `Película agregada: ${nuevaPelicula.nombre}`;
        resultado.className = "text-success mt-3";
        resultado.id = "resultado";
        formulario.appendChild(resultado);
    } else {
        const resultado = document.createElement("p");
        resultado.textContent = "Por favor, completa todos los campos.";
        resultado.className = "text-danger mt-3";
        resultado.id = "resultado";
        formulario.appendChild(resultado);
    }
});

const btnBuscar = document.getElementById("btnBuscar");
btnBuscar.addEventListener("click", (event) => {
    borrarResultadoBusqueda();
    event.preventDefault();

    let inputBuscar = document.getElementById("inputBuscar");
    inputBuscar.classList.remove("border-danger");

    if(inputBuscar.value) {
        const resultados = peliculas.filter(pelicula => 
            pelicula.nombre.toLowerCase().includes(inputBuscar.value.toLowerCase()) || 
            pelicula.descripcion.toLowerCase().includes(inputBuscar.value.toLowerCase())
        );
        const main = document.getElementById("main");
        const divisorPrimerSeccion = document.getElementById("divisorPrimerSeccion");
        if(resultados.length > 0) {
            const sectionResultados = document.createElement("section");
            sectionResultados.id = "resultadosBusqueda";
            sectionResultados.className = "d-flex flex-wrap justify-content-center my-5";
            const textoResultadoBusqueda = document.createElement("p");
            textoResultadoBusqueda.textContent = "El resultado de tu búsqueda es:";
            textoResultadoBusqueda.className = "text-center mb-4 text-success w-100";
            sectionResultados.appendChild(textoResultadoBusqueda);
            resultados.forEach(pelicula => {
                const card = document.createElement("div");
                card.className = "card";
                card.style.width = "12rem";
                card.style.margin = "1rem";

                card.innerHTML = `
                <img src="${pelicula.imagen}" class="card-img-top" alt="${pelicula.nombre}">
                <div class="card-body">
                    <h5 class="card-title">${pelicula.nombre}</h5>
                    <p class="card-text"><small class="text-muted">Año: ${pelicula.anioEstreno}</small></p>
                    <p class="card-text">${pelicula.descripcion}</p>
                </div> 
                `;
                sectionResultados.appendChild(card);
            });
            main.insertBefore(sectionResultados, divisorPrimerSeccion);
        } else {
            let inputBuscar = document.getElementById("inputBuscar");
            inputBuscar.classList.add("border-danger");
        }
    }
});