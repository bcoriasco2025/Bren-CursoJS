let peliculas = [];

async function cargarPeliculas() {
    peliculas = localStorage.getItem("peliculas") ? JSON.parse(localStorage.getItem("peliculas")) : await leerPeliculas();
    cargarPresentacion(peliculas.length);
}

function generarNumerosUnicos(cantidad, max) {
    const numerosUnicos = new Set();
    while (numerosUnicos.size < cantidad) {
        const numero = Math.floor(Math.random() * max);
        numerosUnicos.add(numero);
    }
    return Array.from(numerosUnicos);
}

function cargarPresentacion(mostrarCantidad) {
    const presentacion = document.getElementById("presentacion");
    mostrarCantidad = mostrarCantidad < 4 ? mostrarCantidad : 4;
    let numerosUnicos = generarNumerosUnicos(mostrarCantidad, peliculas.length);

    for(let i=0; i < mostrarCantidad; i++) {
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

cargarPeliculas();

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
            descripcion: formDescripcion,
            id: peliculas.length + 1
        };
        peliculas.push(nuevaPelicula);
        localStorage.setItem("peliculas", JSON.stringify(peliculas));
        formulario.reset();
        Swal.fire({
            title: "Excelente!",
            text: `Película "${nuevaPelicula.nombre}" agregada correctamente!`,
            icon: "success"
        });
    } else {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Debes completar todos los campos del formulario.",
        });
    }
});