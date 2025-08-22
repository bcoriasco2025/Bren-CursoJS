let URL = "";

if (window.location.pathname.includes("catalogo")) {
    URL = "../js/movies.json";
} else {
    URL = "./js/movies.json";
}

async function leerPeliculas(){
    try {
        const response = await fetch(URL);
        const peliculas = await response.json();
        return peliculas;
    } catch (error) {
        return [];
    }
}