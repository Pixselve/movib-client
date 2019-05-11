<!--La page bibliothèque.-->
<template>
  <div class="content">
    <header class="header">
      <div class="page-title">
        Ma Bibliotèque
      </div>
      <div class="page-helper">
        Utilisez le bouton
        <mb-button round icon="fal fa-plus" />
        pour ajouter un film à votre bibliotèque
      </div>
    </header>
    <main class="movie-grid">
      <movie-card v-for="movie in movies" :key="movie._id" :movie="movie" @unfollowed="unfollow($event)" />
    </main>
  </div>
</template>

<script>
import mbButton from '../components/elements/buttons/mbButton'
import MovieCard from '../components/MovieCard'

export default {
  name: 'Library',
  auth: true,
  head: () => ({
    title: 'Ma Bibliotèque - Movib',
    meta: [
      {
        hid: 'description',
        name: 'description',
        content:
          'Votre bibliothèque personnelle de films.'
      }
    ]
  }),
  components: {
    mbButton,
    MovieCard
  },
  // Récupérer la liste de tous les films de la bibliothèque.
  async asyncData({ $axios }) {
    const { data } = await $axios.$get(
      'movies'
    )
    return { movies: data }
  },
  // Permet de ne plus suivre un film.
  methods: {
    unfollow(id) {
      this.movies = this.movies.filter(el => el.movie._id !== id)
    }
  }
}
</script>

<style lang="scss" scoped>
  .header {
    padding: 150px 50px 100px;
    color: $main-text-light;
    background-color: $primary-dark;
  }

  .page-title {
    font-size: 2.5rem;
  }

  .page-helper {
    margin-top: 10px;
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
</style>
