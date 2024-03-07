const movieElement = document.querySelector('.filmes__main');

function criarFilme(movies) {
    movies.forEach(movie => {
        const year = new Date(movie.release_date).getFullYear();
        const isFavorited = isFilmeFavorito(movie.id); 

        movieElement.innerHTML += `
            <div class="filmes__container">
                <div class="filmes__principal">
                    <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title} Poster" class="filmes__imagens">
                    <div class="filmes__info">
                        <span class="filmes__titulo">${movie.title} (${year})</span>
                        <div class="filmes__avaliacao">
                            <div>
                                <img src="images/Star.svg" alt="">
                                <span class="filmes__span">${movie.vote_average}</span>
                            </div>
                            <div>
                                <img src="${isFavorited ? 'images/Vector.svg' : 'images/heart.svg'}" alt="" class="filmes__favoritos-botao" id="${movie.id}">
                                <span class="filmes__span">Favoritar</span>
                            </div>
                        </div>
                    </div>
                </div>
                <span class="filmes__descrição">${movie.overview}</span>
            </div>`;
    });

    // Pegar todos os botões de favoritos
    const botoesFavoritos = document.querySelectorAll('.filmes__favoritos-botao');

    // Adicionar evento de clique a cada botão
    botoesFavoritos.forEach(botao => {
        botao.addEventListener('click', () => {
            const movieId = botao.id;
            const isFavorited = isFilmeFavorito(movieId);

            if (isFavorited) {
                removerFilmeFavorito(movieId);
            } else {
                adicionarFilmeFavorito(movieId);
            }

            botao.src = isFavorited ? 'images/heart.svg' : 'images/Vector.svg';//atualiza a imagem do favorito
        });
    });
}

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