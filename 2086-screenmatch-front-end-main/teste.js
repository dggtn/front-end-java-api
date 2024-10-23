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
// Función genérica para manejo de errores.
function tratarErrores(mensajeError) {
    console.error(mensajeError);
}

function limpiarErrores() {
    for (const section of sectionsParaOcultar) {
        section.classList.toggle('hidden')
    }
}

const categoriaSelect = document.querySelector('[data-categorias]');
const sectionsParaOcultar = document.querySelectorAll('.section'); // Adicione a classe CSS 'hide-when-filtered' a las seccione o títulos que desea ocultar.

categoriaSelect.addEventListener('change', async function handleMudancaCategoria() {
    const categoriaSelecionada = categoriaSelect.value;

    if (categoriaSelecionada === 'todos') {
        // recarga los datos originales
        limpiarErrores();
    } else {
        limpiarErrores();
        // Realizar una solicitud al punto final con la categoría seleccionada
        try {
            const data = await getDatos(`/series/categoria/${categoriaSelecionada}`);
            crearListaPeliculas(categoria, data);
        } catch (error) {
            tratarErrores("Se produjo un error al cargar los datos de la categoría..");
        }
    }
});