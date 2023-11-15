// store.js
import { reactive } from "vue";

export const store = reactive({
    apiUrl: "https://api.themoviedb.org/3/",
    endPoint:{
        movies: "search/movie",
        series: "search/tv"
    },
    

    params:{
        api_key: "dd8632c96ea36b7d4a328927b9660600",
        query: "a",
    },

    error: "",
    loading: true,
    movieList: [],
    seriesList:[],
});
