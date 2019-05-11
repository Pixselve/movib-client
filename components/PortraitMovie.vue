<!--Composant qui permet d'afficher un film au format portrait (page accueil)-->
<template>
  <MovieBackdropOverlay
    :class="{portrait: true, 'portrait--hover': isHovered}"
    :backdrop="movie.movie.backdrop"
    @mouseenter="isHovered = true"
    @mouseleave="isHovered = false"
  >
    <div :class="{content: true, 'content--hover': isHovered}">
      <div class="content__text">
        <div class="content__text__type">
          Découvrez ce nouveau film
        </div>
        <div class="content__text__title">
          {{ movie.movie.title }}
        </div>
        <div class="content__text__genres">
          <span v-for="genre in movie.movie.genres" :key="genre.id">{{ genre.name }}</span>
        </div>
        <transition name="slideup">
          <div
            :class="{content__text__plot: true, 'content__text__plot--hover': isHovered}"
          >
            {{ movie.movie.plot | clamp(200) }}
          </div>
        </transition>
      </div>
      <div :class="{content__actions: true, 'content__actions--hover': isHovered}">
        <science action="view" :tmdb-id="movie.movie.tmdbId">
          <mb-button :href="`/movies/${movie.movie.tmdbId}`" round icon="fal fa-arrow-right" />
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
    </div>
  </MovieBackdropOverlay>
</template>

<script>
import mbButton from '~/components/elements/buttons/mbButton.vue'
import science from '~/components/elements/global/science.vue'
import MovieBackdropOverlay from './MovieBackdropOverlay'

export default {
  name: 'PortraitMovie',
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
  props: {
    movie: { type: Object, required: true }
  },
  data: () => ({
    isHovered: false,
    followLoading: false,
    isFollowed: false
  }),
  mounted() {
    this.isFollowed = this.movie.followed
  },
  methods: {
    // Permet de follow / unfollow un film
    async follow() {
      try {
        this.followLoading = true
        const movieId = this.movie.movie._id
        await this.$axios.post(`movies/${movieId}/update`, { followed: !this.isFollowed })
        this.isFollowed = !this.isFollowed
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
  .portrait--hover {
    @media (hover: hover) and (pointer: fine) {
      z-index: 50 !important;
      transform: scale(1.05);
      box-shadow: 0 0 50px rgba(0, 0, 0, 0.5);
    }
  }

  .portrait {
    width: 100%;
    height: 550px;
    position: relative;
    transition: all 0.4s ease-in-out;
    z-index: 2;
    background-color: #ef5d60;
    padding: 40px;
    color: white;
    display: flex;
    align-items: flex-end;
    cursor: pointer;
    overflow: hidden;
  }

  .content {
    z-index: 10;
    transition: all 0.5s ease-in-out;
    @media (hover: hover) and (pointer: fine) {
      transform: translateY(calc(100% - 130px));
    }

  }

  .content--hover {
    transform: translateY(0);
  }

  .content__text__type {
    text-transform: uppercase;
    opacity: 0.7;
    font-weight: 800;
  }

  .content__text__title {
    font-size: 2rem;
    margin-bottom: 20px;
  }

  .content__text__genres {
    margin-bottom: 10px;

    span {
      margin-right: 5px;
    }
  }

  .content__text__plot {
    transition: all 0.5s ease-in-out;
    @media (hover: hover) and (pointer: fine) {
      opacity: 0;
    }
  }

  .content__text__plot--hover {
    opacity: 1;
  }

  .content__actions {
    margin-top: 20px;
    @media (hover: hover) and (pointer: fine) {
      opacity: 0;
    }
    transition: all 0.5s ease-in-out;
  }

  .content__actions--hover {
    opacity: 1;
  }

  .content__actions__outline-btn {
    background: none;
    border: 2px solid rgba(255, 255, 255, 0.5);
    border-radius: 50%;
    padding: 0;
    color: white;
    cursor: pointer;
    outline: none;
    display: inline-block;
    position: relative;
    text-align: center;
    vertical-align: middle;
    font-size: 1.3rem;
    height: 40px;
    width: 40px;
    transition: border 0.15s ease-in-out;

    &:hover {
      border: 2px solid white;
    }
  }

  .slideup-enter-active {
    animation: slideup 0.5s;
  }

  .button-loading {
    i {
      animation: loading 1s linear infinite;

      &:before {
        content: '';
      }
    }
  }

  .followed {
    i {
      &:before {
        content: '';
      }
    }
  }

  @keyframes slideup {
    0% {
      transform: rotate(0) translateY(10px);
      opacity: 0;
    }
    100% {
      transform: rotate(0) translateY(0);
      opacity: 1;
    }
  }

  @keyframes loading {
    100% {
      transform: rotate(360deg);
    }
  }
</style>
