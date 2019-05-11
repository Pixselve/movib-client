<!--Composant qui permet la présence du film en gros sur la page (première tuile sur la page d'accueil)-->
<template>
  <movie-backdrop-overlay class="header" :backdrop="movie.movie.backdrop" horizontal>
    <div class="content">
      <section class="content__text">
        <div class="content__text__type">
          Découvrir
        </div>
        <div class="content__text__title">
          {{ movie.movie.title }}
        </div>
        <div class="content__text__genres">
          <span v-for="genre in movie.movie.genres" :key="genre.id">{{ genre.name }}</span>
        </div>
        <div class="content__text__plot">
          {{ movie.movie.plot }}
        </div>
      </section>
      <section class="content__actions">
        <science action="follow" :tmdb-id="movie.movie.tmdbId">
          <mb-button
            :loading="followLoading"
            round
            :icon="movie.followed ? 'fal fa-check' : 'fal fa-plus'"
            @click="follow"
          />
        </science>
        <science action="view" :tmdb-id="movie.movie.tmdbId">
          <mbButton
            :href="`/movies/${movie.movie.tmdbId}`"
            text="En savoir plus"
            round
            icon="fal fa-arrow-right"
          />
        </science>
      </section>
    </div>
  </movie-backdrop-overlay>
</template>

<script>
import mbButton from '~/components/elements/buttons/mbButton.vue'
import science from '~/components/elements/global/science.vue'
import MovieBackdropOverlay from './MovieBackdropOverlay'

export default {
  name: 'MoviePromotion',
  components: {
    mbButton,
    science,
    MovieBackdropOverlay
  },
  props: {
    movie: { type: Object, required: true }
  },
  data: () => ({
    followLoading: false,
    isFollowed: false
  }),
  methods: {
    // Permet de follow / unfollow un film
    async follow() {
      try {
        this.followLoading = true
        const movieId = this.movie.movie._id
        await this.$axios.post(`movies/${movieId}/update`, { followed: !this.movie.followed })
        this.movie.followed = !this.movie.followed
        this.followLoading = false
      } catch (e) {
        this.followLoading = false
        this.$toast.show('Une erreur est survenue...')
      }
    }
  }
}
</script>

<style scoped lang="scss">
  .header {
    height: 100%;
    position: relative;
    padding: 200px 100px;
    @media screen and (max-width: 1000px) {
      padding: 100px 50px;
    }
    @media screen and (max-width: 420px) {
      padding: 100px 15px;
    }
  }

  .content {
    position: relative;
    z-index: 10;
    color: white;
    max-width: 500px;
  }

  .content__text__type {
    text-transform: uppercase;
    font-weight: 800;
    opacity: 0.7;
  }

  .content__text__title {
    font-size: 3rem;
    margin-bottom: 10px;
  }

  .content__text__genres {
    margin-bottom: 10px;
    opacity: 0.7;
    span {
      margin-right: 5px;
    }
  }

  .content__text__plot {
    text-overflow: ellipsis;
  }

  .content__actions {
    margin-top: 20px;
  }
</style>
