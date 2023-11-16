<template>
  <header class="d-flex p-3">
    <NavBar @search-media="functionSearchMedia" />
  </header>

  <main class="py-3">
      <section id="Movie" class="container">
        <h2>Movies</h2>
        <div class="row">
          <div
            class="col-12 col-md-4 col-lg-3 my-3 card-total overflow-hidden"
            v-for="(movie, index) in filteredMovies"
            :key="movie.id"
            style="cursor: pointer;"
            @mouseover="showInfo(index)"
            @mouseout="hideInfo()"
          >
            <img :src="'https://image.tmdb.org/t/p/w342' + movie.poster_path" alt="img" class="poster" style="cursor: pointer;">
            
            <div :class="{ 'd-none': !isInfoVisible || currentIndex !== index, 'result-card': true, 'card-info': true }">
              <div>
                <div class="text-center p-2 card-title mb-3 fs-5">
                  <strong>{{ movie.title }}</strong>
                </div>
                <div class="container">
                  <div class="py-2">
                  <strong>Titolo originale:</strong> {{ movie.original_title }}
                </div>

                  <div>
                  <strong>Data di uscita:</strong> {{ movie.release_date }}
                </div>
                <div id="len" >
                  <strong>Lingua:</strong> <img :src="getFlagUrl(movie.original_language)" alt="Flag">
                </div>
                <div class="py-2">
                  <strong>Voto:</strong> {{ convertRatingToStars(movie.vote_average) }} {{ movie.vote_count }} recensioni
                </div>
                <div class="py-2">
                  <strong>Overview:</strong> {{ movie.overview }}
                </div>
                </div>
                
              </div>
            </div>
          </div>
        </div>
      </section>
    <section id="tv" class="container">
      <h2>TV Series</h2>
        <div class="row">
          <div
            class="col-12 col-md-4 col-lg-3 my-3 card-total overflow-hidden"
            v-for="(serie, index) in filteredSeries"
            :key="serie.id"
            style="cursor: pointer;"
            @mouseover="showInfo(index)"
            @mouseout="hideInfo()"
          >
            <img :src="'https://image.tmdb.org/t/p/w300' + serie.poster_path" alt="img" class="poster" style="cursor: pointer;">
            
            <div :class="{ 'd-none': !isInfoVisible || currentIndex !== index, 'result-card': true, 'card-info': true }">
              <div>
                <div class="text-center p-2 card-title mb-3 fs-5">
                  <strong>{{ serie.name }}</strong>
                </div>
                <div class="container py-2">
                  <strong>Titolo originale:</strong> {{ serie.original_name }}
                <div id="len" >
                  <strong>Lingua:</strong> <img :src="getFlagUrl(serie.original_language)" alt="Flag">
                </div>
                <div class="py-2">
                  <strong>Voto:</strong> {{ convertRatingToStars(serie.vote_average) }} {{ serie.vote_count }} recensioni
                </div>
                <div class="py-2 overflow-y-auto">
                  <strong>Overview:</strong> {{ serie.overview }}
                </div>
                </div>
              </div>
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
      isInfoVisible: false,
      currentIndex: -1,
    }
  },
  computed: {
    filteredMovies() {
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
  showInfo(index) {
      this.isInfoVisible = true;
      this.currentIndex = index;
    },
    hideInfo() {
      this.isInfoVisible = false;
      this.currentIndex = -1;
    }
  },
  created(){
    this.getMoviesAndSeries();
  }
}

</script>

<style lang="scss" scoped>
  strong{
    font-size: larger;
  }
</style>
