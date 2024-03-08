// Função para verificar se um filme é favorito
function isFilmeFavorito(movieId) {
    const favoritos = JSON.parse(localStorage.getItem('filmesFavoritos')) || [];
    return favoritos.includes(movieId.toString());
}

// Função para adicionar um filme aos favoritos
function adicionarFilmeFavorito(movieId) {
    const favoritos = JSON.parse(localStorage.getItem('filmesFavoritos')) || [];
    favoritos.push(movieId.toString());
    localStorage.setItem('filmesFavoritos', JSON.stringify(favoritos));
}

// Função para remover um filme dos favoritos
function removerFilmeFavorito(movieId) {
    let favoritos = JSON.parse(localStorage.getItem('filmesFavoritos')) || [];
    favoritos = favoritos.filter(id => id !== movieId.toString());
    localStorage.setItem('filmesFavoritos', JSON.stringify(favoritos));
}

const inputCheck = document.getElementById('favoritos');

inputCheck.addEventListener('change', verificarCheckbox);

async function verificarCheckbox() {
    const isChecked = inputCheck.checked;
    if (isChecked) {
        cleanAllMovies();
        const favoritos = JSON.parse(localStorage.getItem('filmesFavoritos')) || [];
        const filmesFavoritos = await getFavoriteMovies(favoritos);
        criarFilme(filmesFavoritos);
    } else {
        cleanAllMovies();
        exibirFilmes();
    }
}

async function getFavoriteMovies(favoritos) {
    const allMovies = await getPopularMovies();
    const favoriteMovies = allMovies.filter(movie => favoritos.includes(movie.id.toString()));//retorna um array que contém somente os filmes com o id que está armazenado no array favoritos
    return favoriteMovies;}

    