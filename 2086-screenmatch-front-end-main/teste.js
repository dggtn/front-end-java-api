import getDatos from "./getDatos.js";

// Mapea los elementos DOM que desea actualizar
const elementos = {
    top5: document.querySelector('[data-name="top5"]'),
    lancamentos: document.querySelector('[data-name="lanzamientos"]'),
    series: document.querySelector('[data-name="series"]')
};
// Funcion para crear la lista de peliculas 
function crearListaPeliculas(elemento, dados) {
    // Verifica si hay un elemento <ul> dentro de la seccion
    const ulExistente = elemento.querySelector('ul');

    // Si ya existe un elemento <ul> dentro de la sección, elimínelo
    if (ulExistente) {
        elemento.removeChild(ulExistente);
    }

    const ul = document.createElement('ul');
    ul.className = 'lista';
    const listaHTML = dados.slice(0, 5).map((pelicula) => `
        <li>
            <a href="/detalles.html?id=${pelicula.id}">
                <img src="${pelicula.poster}" alt="${pelicula.titulo}">
            </a>
        </li>
    `).join('');

    ul.innerHTML = listaHTML;
    elemento.appendChild(ul);
}
