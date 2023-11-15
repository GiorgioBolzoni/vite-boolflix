<template>
  <header class="d-flex">
    <NavBar />
    <button type="button" class="ms-1" @click="getMoviesAndSeries()">Search</button>
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
    
  },
  created(){
    this.getMoviesAndSeries();
  }
}

</script>

<style lang="scss" scoped>

</style>
