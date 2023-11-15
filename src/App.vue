<template>
  <header class="d-flex p-3">
    <NavBar @search-media="functionSearchMedia" />
  </header>

  <main>
    <section id="Movie" class="container">
      <h2>Movies</h2>
      <div class="row">
        <div class="col-12 col-md-4 col-lg-3 py-3" v-for="(movie, index) in filteredMovies" :key="movie.id">
          <strong>{{ movie.title }}</strong>
          <img :src="'https://image.tmdb.org/t/p/w300' + movie.poster_path" alt="img">
          <strong>Titolo originale:</strong> {{ movie.original_title }}
            <div id="len">
              <strong>Lingua:</strong> <img :src="getFlagUrl(movie.original_language)" alt="Flag">
            </div>
            <div>
              <strong>Voto:</strong> {{ convertRatingToStars(movie.vote_average) }}
            </div>
            
        </div>
      </div>
    </section>
    <section id="tv" class="container">
      <h2>Tv</h2>
      <div class="row">
        <div class="col-12 col-md-4 col-lg-3 py-3" v-for="(serie, index) in filteredSeries" :key="serie.id">
          <strong>{{ serie.name }}</strong>
          <img :src="'https://image.tmdb.org/t/p/w300' + serie.poster_path" alt="img">
          <strong>Titolo originale:</strong> {{ serie.original_name }}
            <div id="len">
              <strong>Lingua:</strong> <img :src="getFlagUrl(serie.original_language)" alt="Flag">
            </div>
            <div>
              <strong>Voto:</strong> {{ convertRatingToStars(serie.vote_average) }}
            </div>
        </div>
      </div>
    </section>
  </main>
</template>


<script>
import { store } from './data/store'; 
import axios from 'axios';
import NavBar from './components/header/NavBar.vue'; 

  export default {
    name: 'App',
    components: {
      NavBar,
  },
  data() {
    return {
      store,
      searchInput: '',
    }
  },
  computed: {
    filteredMovies() {
      // Filtra film in base alla ricerca
      return this.store.movieList.filter(movie => movie.title.toLowerCase().includes(this.searchInput.toLowerCase()));
    },
    filteredSeries() {
      // Filtra serie TV in base alla ricerca
      return this.store.seriesList.filter(serie => serie.name.toLowerCase().includes(this.searchInput.toLowerCase()));
    },
  },
  methods: {
    getMoviesAndSeries(){
      const movieurl = store.apiUrl + this.store.endPoint.movies;
    // + '?api_key='+ store.api_key + 

      axios.get(movieurl, {params: this.store.params}).then((res) => {
        console.log(res.data.results);
        this.store.movieList= res.data.results;
      });
      const tvurl = store.apiUrl + this.store.endPoint.series;
    // + '?api_key='+ store.api_key + 

      axios.get(tvurl, {params: this.store.params}).then((res) => {
        console.log(res.data.results);
        this.store.seriesList= res.data.results;
      });
    },
    functionSearchMedia(searchInput) {
      this.store.params.query = searchInput;
      this.getMoviesAndSeries();
    },
    getFlagUrl(language) {
    switch (language) {
      case 'it':
        return './images/it.svg'; 
      case 'en':
        return './images/gb.svg'; 
      case 'jp':
        return './images/jp.svg'; 
      case 'de':
        return './images/de.svg'; 
      case 'fr':
        return './images/fr.svg'; 
      case 'kr':
        return './images/kr.svg'; 
      case 'us':
        return './images/us.svg'; 
      default:
        return './images/it.svg'; 
    }
  },
  convertRatingToStars(rating) {
    const roundedRating = Math.ceil(rating / 2); 
    // const fullStars = `<i class="fa-solid fa-star" style="color: #fff71a;"></i>`.repeat(roundedRating);
    // const emptyStars = `<i class="fa-regular fa-star"></i>`.repeat(5 - roundedRating);
    // return fullStars + emptyStars;
    return '⭐'.repeat(roundedRating) + '☆'.repeat(5 - roundedRating);
  },
  },
  created(){
    this.getMoviesAndSeries();
  }
}

</script>

<style lang="scss" scoped>
  #len{

    img{
      width: 20px;
    }
  }
</style>
