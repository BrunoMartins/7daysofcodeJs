    const inputCheckAvaliacao = document.getElementById('avaliacao');

    inputCheckAvaliacao.addEventListener('change', ordenarAvaliacao);


    async function ordenarAvaliacao (){
        const isChecked = inputCheckAvaliacao.checked;
        const inputPesquisa = document.getElementById('movie-name').value;
        let movies;
        if(isChecked){
            cleanAllMovies();
            if (inputPesquisa != '') {
                movies = await searchMovieByName(inputPesquisa);
            } else {
                movies = await getPopularMovies();
            }
            
                filmesOrdenados = movies.sort((a,b) => b.vote_average - a.vote_average);
                criarFilme(filmesOrdenados);
           
        } else {

            if (inputPesquisa != ''){
                cleanAllMovies();
                moviesPesquisados = await searchMovieByName(inputPesquisa);
                criarFilme(moviesPesquisados);
                }else{

                    cleanAllMovies();
            exibirFilmes();
                }
            
        }   
    }

