<!--La page de recherche de films.-->
<template>
  <div class="container">
    <div class="search" v-click-outside="() => {focus = false}">
      <input id="search-input" @focus="focus = true" v-model="searchText" type="text" placeholder="Rechercher un film" @input="search">
      <div v-if="searchText" id="search-list" :class="[{'hidden': !focus}]">
        <div v-if="searchData.length === 0" class="movie">
          Pas de résultats pour "{{ searchText }}"
        </div>
        <nuxt-link class="movie" v-for="data in searchDisplay" :key="data._id" :to="`/movies/${data.movie.tmdbId}`">
          {{ data.movie.title }}
        </nuxt-link>
        <button @click="moreView = true" v-if="searchData.length > 5" class="more-choice">
          Voir tout les films correspondant
        </button>
      </div>
      <main class="movie-grid " v-if="moreView">
        <movie-card :movie="movieData" :key="movieData.movie._id" v-for="movieData in searchData"></movie-card>
      </main>
    </div>
  </div>
</template>

<script>
import MovieCard from '../components/MovieCard'

export default {
  name: 'Search',
  data: () => ({
    searchText: '',
    searchTimeout: null,
    searchData: [],
    focus: false,
    moreView: false
  }),
  components: {
    MovieCard
  },
  computed: {
    // Permet d'afficher au maximum 5 films.
    searchDisplay() {
      return this.searchData.slice(0, 5)
    }
  },
  methods: {
    // Effectue une recherche en fonction de ce qui est entrée dans la barre de recherche.  Une protection a été mise en place afin de ne pas effectuer une requête à chaque touche pressée.  De ce fait une requête est effectuée toutes les 500 millisecondes lorsque aucune touche est pressé.
    search() {
      // Réinitialise le TimeOut
      clearTimeout(this.timeout)
      // Relance le TimeOut
      this.timeout = setTimeout(async () => {
        if (this.searchText.length > 3) {
          const data = await this.$axios.get('/movies/search', { params: {
            q: this.searchText
          } })
          this.searchData = data.data.data
        }
      }, 500)
    }
  }
}
</script>

<style lang="scss" scoped>
  .container {
    padding: 100px 20px 0;
  }
  .search {
    position: relative;
  }

  #search-input {
    padding: 5px;
    font-size: 2rem;
    color: #cccccc;
    outline: none;
    background: none;
    border: none;
    width: 100%;
    border-bottom: solid 2px #adadad;
  }

  #search-list {
    position: absolute;
    background-color: $primary-dark;
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
    overflow: hidden;
    right: 0;
    left: 0;
    z-index: 200;
  }

  .movie {
    font-size: 1rem;
    padding: 10px;
    display: block;
    text-decoration: none;
    color: $main-text-light;
    &:hover {
      background-color: lighten($primary-dark, 5);
    }
  }
    .more-choice {
      display: block;
      width: 100%;
      text-align: left;
    border: none;
    background: none;
    outline: none;
    font-size: 1rem;
    font-weight: bold;
    padding: 10px;
    color: $main-text-light;
    &:hover {
      background-color: lighten($primary-dark, 5);
    }
  }

  .more-choice:hover {
    cursor: pointer;
  }
  .movie-grid {
    padding: 50px 30px;
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    grid-gap: 20px 3px;
    @media screen and (max-width: 1500px) {
      grid-template-columns: repeat(4, 1fr);
    }
    @media screen and (max-width: 1100px) {
      grid-template-columns: repeat(3, 1fr);
    }
    @media screen and (max-width: 800px) {
      grid-template-columns: repeat(2, 1fr);
    }
    @media screen and (max-width: 550px) {
      grid-template-columns: repeat(1, 1fr);
    }
  }
  .hidden {
    display: none;
  }
</style>
