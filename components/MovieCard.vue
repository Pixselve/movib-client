<!--Carte de film présent par exemple dans la bibliothèque-->
<template>
  <div class="card">
    <div
      v-if="movie.movie.backdrop.path"
      class="cover"
      :style="{ backgroundImage: `url(${'https://image.tmdb.org/t/p/original' + movie.movie.backdrop.path})` }"
    >
      <div class="cover__content">
        <science action="unfollow" :tmdb-id="movie.movie.tmdbId">
          <mb-button filled :href="`/movies/${movie.movie.tmdbId}`" round icon="fal fa-arrow-right" />
        </science>
        <science action="view" :tmdb-id="movie.movie.tmdbId">
          <mb-button
            :loading="loading"
            class="cover__top-button"
            filled
            round
            :icon="movie.followed ? 'fal fa-minus' : 'fal fa-plus'"
            @click="toggleFollow"
          />
        </science>
      </div>
    </div>
    <div v-else class="cover" :style="{background: `linear-gradient(0, ${randomColor} 0%, black 100%)`}">
      <div class="cover__content">
        <science action="unfollow" :tmdb-id="movie.movie.tmdbId">
          <mb-button filled :href="`/movies/${movie.movie.tmdbId}`" round icon="fal fa-arrow-right" />
        </science>
        <science action="view" :tmdb-id="movie.movie.tmdbId">
          <mb-button
            :loading="loading"
            class="cover__top-button"
            filled
            round
            :icon="movie.followed ? 'fal fa-minus' : 'fal fa-plus'"
            @click="toggleFollow"
          />
        </science>
      </div>
    </div>
    <div class="sub">
      <nuxt-link class="movie-name" to="qzd">
        {{ movie.movie.title }}
      </nuxt-link>
    </div>
  </div>
</template>

<script>
import mbButton from './elements/buttons/mbButton'
import Science from './elements/global/science'

export default {
  name: 'MovieCard',
  components: {
    Science,
    mbButton
  },
  props: {
    movie: { type: Object, required: true }
  },
  data: () => ({
    loading: false,
    randomColor: `#${(Math.random() * 0xFFFFFF << 0).toString(16)}`
  }),
  methods: {
    // Permet de follow / unfollow un film
    async toggleFollow() {
      try {
        const followed = this.movie.followed
        this.loading = true
        const movieId = this.movie.movie._id
        await this.$axios.post(`movies/${movieId}/update`, { followed: !followed })
        followed ? this.$emit('unfollowed', movieId) : this.$emit('followed', movieId)
        this.movie.followed = !this.movie.followed
        this.loading = false
      } catch (e) {
        this.loading = false
        this.$toast.show('Une erreur est survenue...')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .card {
    cursor: pointer;
  }

  .cover {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 200px;
    background: rgb(131, 58, 180);
    background: linear-gradient(
        135deg,
        rgba(131, 58, 180, 1) 0%,
        rgba(253, 29, 29, 1) 50%,
        rgba(252, 176, 69, 1) 100%
    );
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;

    &:hover {
      .cover__content {
        display: block;
        animation: fadeIn 0.5s;
      }
    }
  }

  .cover__content {
    display: none;
  }

  .sub {
    margin-top: 15px;
  }

  .movie-name {
    color: $main-text-light;
    font-size: 1.3rem;
    display: block;
    text-decoration: none;
    transition: opacity 0.15s ease-in-out;

    &:hover {
      opacity: 0.8;
    }
  }

  .cover__top-button {
    position: absolute;
    top: 5px;
    left: 5px;
  }

  @keyframes fadeIn {
    0% {
      display: none;
      opacity: 0;
    }
    1% {
      display: block;
    }
    100% {
      opacity: 1;
    }
  }
</style>
