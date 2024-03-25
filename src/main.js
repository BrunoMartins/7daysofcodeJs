


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
                                <img src="images/Star.svg" alt="" class="filmes__avaliacao-botao">
                                <span class="filmes__span">${movie.vote_average}</span>
                            </div>
                            <div>
                                <img src="${isFavorited ? 'images/heart-fill.svg' : 'images/heart.svg'}" alt="" class="filmes__favoritos-botao" id="${movie.id}">
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
            const movie = movies.find(movie => movie.id === parseInt(movieId));//precisa da conversao para ser tratado como um número inteiro
            const isFavorited = isFilmeFavorito(movie.id);

            if (isFavorited) {
                removerFilmeFavorito(movie);
            } else {
                adicionarFilmeFavorito(movie);
            }

            botao.src = isFavorited ? 'images/heart.svg' : 'images/heart-fill.svg';//atualiza a imagem do favorito
        });
    });

   
}

const botaoFiltrar = document.getElementById('limpar-filtro');

botaoFiltrar.addEventListener('click',()=>{
    cleanAllMovies();
    inputPesquisa.value = "";
    pesquisaAtiva = false;
    inputCheckAvaliacao.checked = false;
    inputCheckFavoritos.checked = false;
    updateMovies();
})


const botaoLimparFavorito = document.getElementById('limpar-favoritos');

botaoLimparFavorito.addEventListener('click', limpaFavoritos)

function limpaFavoritos() {
    let favoritos = [];
    localStorage.setItem('filmesFavoritos', JSON.stringify(favoritos));

    // Atualizar a imagem de todos os botões de favoritos
    const botoesFavoritos = document.querySelectorAll('.filmes__favoritos-botao');
    botoesFavoritos.forEach(botao => {
        botao.src =  'images/heart.svg';
    });
}

const botaoInicio = document.getElementById('inicio');

botaoInicio.addEventListener('click', voltarInicio);

 function voltarInicio(){
    cleanAllMovies();
    currentPage = 1;
    pesquisaAtiva = false;
    inputPesquisa.value = "";
    inputCheckAvaliacao.checked = false;
    inputCheckFavoritos.checked = false;
    updateMovies();

}