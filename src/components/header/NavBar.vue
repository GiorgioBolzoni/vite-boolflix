<template>
    <div>
        <input type="text" id="media-search-input" placeholder="Cerca film o serie TV..." v-model="searchInput" @keyup.enter="searchMedia">
        <button @click="searchMedia">Cerca</button>
        
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

</style>