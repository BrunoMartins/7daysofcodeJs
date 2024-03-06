function criarFilme (movies){
    const movieElement = document.querySelector('.filmes__main')
    movies.forEach(movie => {
        movieElement.innerHTML += `
        <div class="filmes__container">
        <div class="filmes__principal">
            <img src="${movie.image}" alt="Imagem filme" class="filmes__imagens">
            <div class="filmes__info">
                <span class="filmes__titulo">${movie.title} (${movie.year})</span>
                <div class="filmes__avaliacao">
                    <div>
                        <img src="images/Star.svg" alt="">
                        <span class="filmes__span">${movie.rating}</span>
                    </div>
                    <div>
                        <img src="${movie.isFavorited ? 'images/Vector.svg' : 'images/heart.svg'}" alt="" class="filmes__favoritos-botao">
                        <span class="filmes__span">Favoritar</span>
                    </div>
                </div>
            </div>
        </div>
        <span class="filmes__descrição">${movie.description}</span>
    </div>`
        
    });
    
}





