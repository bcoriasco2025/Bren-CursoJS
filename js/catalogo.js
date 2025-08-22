let peliculas = [];

function cargarCatalogo() {
    const catalogo = document.getElementById("catalogo");
    catalogo.innerHTML = "";
    peliculas.forEach(pelicula => {
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
                <button type="button" class="btn btn-danger btn-eliminar" data-id=${pelicula.id}>Eliminar</button>
            </div> 
        `;
        catalogo.appendChild(card);  
    });
    agregarFuncionEliminar();
}

function agregarFuncionEliminar() {
    let btnEliminar = document.querySelectorAll(".btn-eliminar");
    btnEliminar.forEach(btn => {
        btn.addEventListener("click", function() {
            Swal.fire({
                title: "Estas seguro?",
                text: "No podrás revertir esta acción!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Si, eliminar!",
                cancelButtonText: "Cancelar"
            }).then((result) => {
                if (result.isConfirmed) {
                    Swal.fire({
                    title: "Eliminado!",
                    text: "Película eliminada con éxito.",
                    icon: "success"
                    });
                    const id = this.getAttribute("data-id");
                    peliculas = peliculas.filter(pelicula => pelicula.id != id);
                    localStorage.setItem("peliculas", JSON.stringify(peliculas));
                    cargarCatalogo();
                }
            });
        });
    });
}

async function cargarPeliculas() {
    peliculas = localStorage.getItem("peliculas") ? JSON.parse(localStorage.getItem("peliculas")) : await leerPeliculas();
    cargarCatalogo();
}

cargarPeliculas();



