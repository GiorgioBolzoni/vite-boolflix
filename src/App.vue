<template>
  <header class="d-flex">
    <NavBar @search-media="functionSearchMedia" />
  </header>

  <main>
    <section id="Movie" class="container">
      <h2>Movies</h2>
      <div class="row">
        <div class="col-12 col-md-4 col-lg-3" v-for="(movie, index) in movieList" :key="movie.id">
          {{ movie.title }}
        </div>
      </div>
    </section>
    <section id="tv" class="container">
      <h2>Tv</h2>
      <div class="row">
        <div class="col-12 col-md-4 col-lg-3" v-for="(serie, index) in seriesList" :key="serie.id">
          {{ serie.name }}
          <img :src="'https://image.tmdb.org/t/p/w300' + serie.backdrop_path" alt="img">
          
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
  },
  created(){
    this.getMoviesAndSeries();
  }
}

</script>

<style lang="scss" scoped>

</style>
