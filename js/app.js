
function obtenerApi() {
    const url = 'https://themealdb.com/api/json/v1/1/categories.php';
    fetch(url)
        .then(respuesta => respuesta.json())
        .then(resultado => {
            console.log(resultado);
            mostrarImagenes(resultado.categories);
        })
        .catch(error => console.error('Error:', error));
}
function mostrarImagenes(categories) {
    const bloques = document.querySelectorAll('.bloque-1, .bloque-2, .bloque-3');
    
    if (bloques.length === 0 || !categories) {
        console.error('Error: No se encontraron los bloques o no hay datos disponibles');
        return;
    }

    bloques.forEach((bloque, i) => {
        if (categories[i]) {
            bloque.innerHTML = `<img src="${categories[i].strCategoryThumb}" alt="${categories[i].strCategory}">`;
        }
    });
}

obtenerApi();

document.getElementById('list-menu').addEventListener('change', function() {
    const ingrediente = this.value;
    if (ingrediente) {
        obtenerRecetas(ingrediente);
    }
});

function obtenerRecetas(ingrediente) {
    const url = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${ingrediente}`;
    fetch(url)
        .then(respuesta => respuesta.json())
        .then(resultado => {
            console.log(resultado);
            mostrarRecetas(resultado.meals);
        })
        .catch(error => console.error('Error:', error));
}

function mostrarRecetas(meals) {
    const bloques = document.querySelectorAll('.destacados');

    if (bloques.length === 0 || !meals) {
        console.error('Error: No se encontraron los bloques o no hay datos disponibles');
        return;
    }

    // Limpiamos los bloques antes de agregar nuevos elementos
    bloques.forEach(bloque => bloque.innerHTML = '');

    // Mostrar hasta 3 recetas
    meals.slice(0, 3).forEach((meal, index) => {
        if (bloques[index]) {
            bloques[index].innerHTML = `
                <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
                
            `;
        }
    });
}
