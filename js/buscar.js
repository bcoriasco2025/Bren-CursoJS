function borrarResultadoBusqueda() {
    const resultado = document.querySelector("#resultadosBusqueda");
    if (resultado) {
        resultado.remove();
    }
}

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
    } else {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Debes completar el valor a buscar.",
        });
    }
});