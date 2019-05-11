<!--Page détails d'un film-->
<template>
  <div>
    <movie-backdrop-overlay class="header" :backdrop="movie.movie.backdrop">
      <div class="header__content">
        <img class="movie-poster" :src="`https://image.tmdb.org/t/p/original${movie.movie.poster.path}`" alt="Poster">
        <div class="header__content__movie-information">
          <div class="header__content__movie-information__title">
            {{ movie.movie.title }}
          </div>
          <div class="header__content__movie-information__genres">
            <span v-for="genre in movie.movie.genres" :key="genre.id">{{ genre.name }}</span>
          </div>
          <div class="header__content__movie-information__plot">
            {{ movie.movie.plot }}
          </div>
          <div class="header__content__movie-information__actions">
            <science action="follow" :tmdb-id="movie.movie.tmdbId">
              <mb-button
                :loading="followLoading"
                round
                :text="movie.followed ? 'Ajouté' : 'Ajouter le film à ma bibliotèque'"
                :icon="movie.followed ? 'fal fa-check' : 'fal fa-plus'"
                @click="follow"
              />
            </science>
            <science action="follow" :tmdb-id="movie.movie.tmdbId">
              <mb-button
                :loading="watchLoading"
                round
                :text="movie.watched ? 'Je n\'ai pas vu' : 'J\'ai vu'"
                :icon="movie.watched ? 'fal fa-eye-slash' : 'fal fa-eye'"
                @click="watch"
              />
            </science>
            <rating :value="movie.rating" class="rating" @input="rating" />
          </div>
        </div>
      </div>
    </movie-backdrop-overlay>
    <main class="details">
      <div class="details__title">
        En savoir plus
      </div>
      <div class="details__content">
        <movie-detail v-if="movie.movie.originalTitle" name="Titre original" :content="movie.movie.originalTitle" />
        <movie-detail v-if="movie.movie.originalLanguage" name="Langue originale" :content="parseLang(movie.movie.originalLanguage)" />
        <movie-detail v-if="movie.movie.releaseDate" name="Date de sortie" :content="new Date(movie.movie.releaseDate).toLocaleDateString('fr-FR')" />
        <movie-detail v-if="movie.movie.budget" name="Budget" :content="new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'USD' }).format(movie.movie.budget)" />
        <movie-detail v-if="movie.movie.revenue" name="Revenue généré par le film" :content="new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'USD' }).format(movie.movie.revenue)" />
        <movie-detail v-if="movie.movie.runtime" name="Durée du film" :content="`${movie.movie.runtime} minutes`" />
      </div>
    </main>
  </div>
</template>

<script>
import science from '../../components/elements/global/science'
import mbButton from '../../components/elements/buttons/mbButton'
import Rating from '../../components/elements/Rating'
import MovieDetail from '../../components/MovieDetail'
import MovieBackdropOverlay from '../../components/MovieBackdropOverlay'

export default {
  name: 'MoviePage',
  auth: true,
  components: {
    MovieDetail,
    mbButton,
    science,
    Rating,
    MovieBackdropOverlay
  },
  data() {
    return {
      followLoading: false,
      watchLoading: false
    }
  },
  head: () => ({
    title: `Movie - Movib`,
    meta: [
      {
        hid: 'description',
        name: 'description',
        content:
          'Le meilleur moyen de gérer votre compte Movib.'
      }
    ]
  }),
  // Récupère les données depuis notre API
  async asyncData({ params, error, $axios }) {
    const movieData = await $axios.$get(`movies/${params.id}`)
    return { movie: movieData }
  },
  methods: {
    // Permet de follow / unfollow un film
    async follow() {
      try {
        this.followLoading = true
        const movieId = this.movie.movie._id
        await this.$axios.post(`movies/${movieId}/update`, { followed: !this.movie.followed })
        this.movie.followed = !this.movie.followed
      } catch (e) {
        this.$toast.error('Une erreur s\'est produite lors de l\'enregistrement des données.')
      }
      this.followLoading = false
    },
    async watch() {
      // Permet de marqué un film comme vu / non vu
      try {
        this.watchLoading = true
        const movieId = this.movie.movie._id
        await this.$axios.post(`movies/${movieId}/update`, { watched: !this.movie.watched })
        this.movie.watched = !this.movie.watched
      } catch (e) {
        this.$toast.error('Une erreur s\'est produite lors de l\'enregistrement des données.')
      }
      this.watchLoading = false
    },
    // Permet d'attribuer une note à un film
    async rating(rating) {
      try {
        const movieId = this.movie.movie._id
        await this.$axios.post(`movies/${movieId}/update`, { rating: rating })
        this.movie.rating = rating
      } catch (e) {
        this.$toast.error('Une erreur s\'est produite lors de l\'enregistrement des données.')
      }
    },
    // Permet d'afficher une langue en toute lettres
    parseLang(lang) {
      switch (lang) {
        case 'en':
          return 'Anglais'
        case 'fr':
          return 'Français'
        case 'de':
          return 'Allemand'
        default:
          return lang
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .header {
    position: relative;
    padding: 150px 50px 100px;
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
  }

  .overlay {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    width: 100%;
  }

  .header__content {
    position: relative;
    z-index: 10;
    display: flex;
    align-items: flex-end;
    max-width: 1200px;
  }

  .movie-poster {
    height: 450px;
    box-shadow: rgba(0, 0, 0, 0.52) 0 0 40px 1px;
  }

  .header__content__movie-information {
    margin-left: 20px;
    color: $main-text-light;
  }

  .header__content__movie-information__title {
    font-size: 2.5rem;
  }

  .header__content__movie-information__genres {
    margin-top: 20px;
    margin-bottom: 10px;
    font-weight: 800;

    span {
      margin-right: 10px;
    }
  }

  .header__content__movie-information__actions {
    margin-top: 20px;

    * {
      margin-right: 10px;
    }
  }

  .rating {
    display: inline-block;
  }

  .details {
    padding: 20px 40px;
    color: $main-text-light;
  }

  .details__title {
    font-size: 2rem;
  }

  .details__content {
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    grid-gap: 10px;
    margin-top: 20px;
  }
</style>
