<!--Composant qui permet d'afficher une tuile plus ou moins grosse d'un film (page accueil)-->
<template>
  <div :class="['movie', {'movie--hover': hover}]" @mouseenter="hover = true" @mouseleave="hover = false">
    <movie-backdrop-overlay :class="['movie-cover', {'movie-cover--big': big}]" :backdrop="movie.movie.backdrop">
      <div v-if="big" class="movie-cover__details">
        <div class="movie-cover__details__move">
          <div class="movie-reason">
            {{ reason }}
          </div>
          <div class="movie-title">
            {{ movie.movie.title }}
          </div>
        </div>
        <div class="movie-cover__details__genres">
          <span v-for="genre in movie.movie.genres" :key="genre.id">{{ genre.name }}</span>
        </div>
      </div>
    </movie-backdrop-overlay>
    <section :style="{backgroundColor: movie.movie.backdrop.color}" class="movie-details">
      <div :class="['movie-details__content', {'movie-details__content': big}]">
        <div class="movie-cover__details__genres">
          <span v-for="genre in movie.movie.genres" :key="genre.id">{{ genre.name }}</span>
        </div>
        <div class="movie-details__plot">
          {{ movie.movie.plot | clamp(200) }}
        </div>
        <div class="movie-details__actions"/>
        <science action="view" :tmdb-id="movie.movie.tmdbId">
          <mb-button :href="`/movies/${movie.movie.tmdbId}`" round icon="fal fa-arrow-right"/>
        </science>
        <science action="follow" :tmdb-id="movie.movie.tmdbId">
          <mb-button
            :loading="followLoading"
            round
            :icon="isFollowed ? 'fal fa-check' : 'fal fa-plus'"
            @click="follow"
          />
        </science>
      </div>
    </section>
    <section v-if="!big" class="bellow-details">
      <div class="movie-reason">
        {{ reason }}
      </div>
      <div class="movie-title movie-title--small">
        {{ movie.movie.title }}
      </div>
    </section>
  </div>
</template>

<script>
import mbButton from './elements/buttons/mbButton'
import science from './elements/global/science'
import MovieBackdropOverlay from './MovieBackdropOverlay'

export default {
  name: 'MovieCardPromotion',
  filters: {
    // Permet de réduire la taille d'une chaine de caractère
    clamp(value, length) {
      const string = value.toString()
      if (string.length > length) {
        return `${string.slice(0, length)}...`
      } else {
        return string
      }
    }
  },
  components: {
    mbButton,
    science,
    MovieBackdropOverlay
  },
  methods: {
    // Permet de follow / unfollow un film
    async follow() {
      try {
        this.loading = true
        const movieId = this.movie.movie._id
        await this.$axios.post(`movies/${movieId}/update`, {followed: !this.isFollowed})
        this.isFollowed = !this.isFollowed
        this.loading = false
      } catch (e) {
        this.loading = false
        this.$toast.show('Une erreur est survenue...')
      }
    }
  },
  mounted() {
    this.isFollowed = this.movie.followed
  },
  props: {
    movie: {type: Object, required: true},
    reason: {type: String, default: 'à découvrir'},
    big: {type: Boolean, default: false}
  },
  data: () => ({
    hover: false,
    followLoading: false,
    isFollowed: false
  })
}
</script>

<style lang="scss" scoped>
  .movie--hover {

    z-index: 50 !important;
    transform: scale(1.05);
    box-shadow: 0 0 50px rgba(0, 0, 0, 0.5);
  }

  .movie {
    cursor: pointer;
    transition: transform 0.4s ease-in-out;

    &:not(:hover) {
      transition: transform 0.4s ease-in-out, z-index 0.4s ease 0.3s;
    }

    z-index: 0;
    position: relative;

    &:hover {
      .movie-details {
        display: block;
        max-height: 300px;
      }

      .movie-cover {
        .movie-cover__details {
          .movie-cover__details__move {
            transform: translateY(30px);
          }

          .movie-cover__details__genres {
            opacity: 0;
          }
        }
      }

      .bellow-details {
        opacity: 0;
      }

    }
  }

  .movie-cover__details__genres {
    span {
      margin-right: 10px;
    }

    transition: all ease-in-out 0.5s;
  }

  .movie-cover {
    position: relative;
    width: 100%;
    height: 150px;
    padding: 25px;
    color: $main-text-light;
    display: flex;
    align-items: flex-end;
  }

  .movie-cover--big {
    height: 350px;
  }

  .movie-cover__overlay {
    position: absolute;
    right: 0;
    left: 0;
    bottom: 0;
    top: 0;
  }

  .movie-cover__details {
    position: relative;
  }

  .movie-reason {
    text-transform: uppercase;
    font-weight: 800;
    font-size: 0.8rem;
    opacity: 0.7;
    color: $main-text-light;
  }

  .movie-title {
    font-size: 2rem;
    color: $main-text-light;
  }

  .movie-title--small {
    font-size: 1.5rem;
    color: $main-text-light;
  }

  .movie-details {
    position: absolute;
    left: 0;
    right: 0;
    display: block;
    overflow: hidden;
    max-height: 0;
    box-sizing: border-box;
    transition: all ease-in-out 0.5s;
  }

  .movie-details__content {
    padding: 10px 20px;
    color: $main-text-light;
  }

  .movie-details__content--big {
    padding: 20px 40px;
  }

  .movie-cover__details__move {
    transition: all ease-in-out 0.5s;
  }

  .movie-details__actions {
  }

  .movie-details__plot {
    margin: 15px 0;
  }

  .bellow-details {
    transition: all ease-in-out 0.5s;
    margin-top: 15px;
  }
</style>
