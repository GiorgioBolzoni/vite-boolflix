<template>
    <div class="container d-flex justify-content-between align-items-center">
        <h1>BOOLFLIX</h1>
    <div>
        <input type="text" id="media-search-input" placeholder="Cerca film o serie TV..." v-model="searchInput" @keyup.enter="searchMedia">
        <button @click="searchMedia" class="px-2">Cerca</button>
    </div>
    </div>
</template>

<script>
export default {
    name: 'NavBar',
    data() {
        return {
      searchInput: '',
    }
  },
  methods: {
    searchMedia() {
      this.$emit('search-media', this.searchInput);
    },
  },
}
</script>

<style lang="scss" scoped>
    h1{
        color: red;
    }
    button{
        background-color: transparent;
        color: white;
        font-weight: 600;
    }
</style>