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

