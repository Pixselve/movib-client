<!--Page d'accueil-->
<template>
  <div v-if="windowWidth > 1000">
    <movie-promotion :movie="movies[0]" />
    <div class="content">
      <section class="slider-promotion">
        <portrait-movie
          v-for="i in maxPortraitMovie"
          :key="i"
          :movie="movies[i]"
        />
      </section>
      <section class="other-movies">
        <section v-if="lastFollowed.length > 0" class="movie-section">
          <div class="movie-section__title">
            Films récemment suivis
          </div>
          <main class="movie-section__content">
            <movie-card-promotion
              v-for="movie in lastFollowed"
              :key="movie._id"
              :movie="movie"
              reason="Vous avez déjà vu"
            />
          </main>
        </section>
        <section v-if="noSeenLibrary.length > 0" class="movie-section">
          <div class="movie-section__title">
            Films non vu dans votre bibliotèque
          </div>
          <main class="movie-section__content">
            <movie-card-promotion
              v-for="movie in noSeenLibrary"
              :key="movie._id"
              :movie="movie"
              reason="Dans votre bibliotèque"
            />
          </main>
        </section>
        <section v-if="newMovies.length >= 9" class="movie-section">
          <div class="movie-section__title">
            Dernières sorties
          </div>
          <main class="movie-section__content">
            <movie-card-promotion
              v-for="i in maxBigTitle"
              :key="newMovies[i]._id"
              class="movie--big"
              :big="true"
              :movie="newMovies[i]"
              reason="Sorti récemment"
            />
            <movie-card-promotion
              v-for="i in 6"
              :key="newMovies[i + 3]._id"
              :movie="newMovies[i + 3]"
              reason="Sorti récemment"
            />
          </main>
        </section>
      </section>
    </div>
  </div>

  <div v-else>
    <full-page :options="fullscreenOptions">
      <div v-for="movie in movies" :key="movie._id" class="section">
        <movie-promotion :movie="movie" />
      </div>
    </full-page>
  </div>
</template>

<script>
import MoviePromotion from '~/components/MoviePromotion.vue'
import PortraitMovie from '~/components/PortraitMovie.vue'
import MovieCardPromotion from '../components/MovieCardPromotion'

export default {
  name: 'Home',
  auth: true,
  head: () => ({
    title: 'Accueil - Movib',
    meta: [
      {
        hid: 'description',
        name: 'description',
        content:
          'Votre accueil personnel où vous pouvez découvrir les dernières sorties.'
      }
    ]
  }),
  components: {
    MoviePromotion,
    PortraitMovie,
    MovieCardPromotion
  },
  data: () => ({
    windowWidth: 1000,
    fullscreenOptions: {
      dragAndMove: true,
      licenseKey: 'XXXXXXXX-XXXXXXXX-XXXXXXXX-XXXXXXXX',
      fadingEffect: true
    }
  }),
  computed: {
    // Permet d'afficher un nombre spécifique de tuiles au format portrait en fonction des dimensions du navigateur
    maxPortraitMovie() {
      const maxElement = Math.floor((this.windowWidth - 30) / 320)
      return maxElement <= 6 ? maxElement : 6
    },
    // Permet d'afficher un nombre spécifique de grosse tuiles en fonction des dimensions du navigateur
    maxBigTitle() {
      if (this.windowWidth <= 1100) {
        return 1
      } else if (this.windowWidth <= 1700) {
        return 2
      } else {
        return 3
      }
    }
  },
  // Récupère les différentes données des films grâce à notre API.  les données récupérées sont: les recommandations qui vont être affiché en haut de page mais aussi les différents films non vu mais présent dans la bibliothèque, ceux suivi récemment et les dernières sorties
  async asyncData({ $axios }) {
    const [movies, noSeenLibrary, lastFollowed, newMovies] = await Promise.all([$axios.$get(
      'movies/recommendations'
    ), $axios.$get(
      'movies/recommendations', { params: { content: 'no-seen-library', limit: 6 } }
    ), $axios.$get(
      'movies/recommendations', { params: { content: 'last-followed', limit: 6 } }
    ), $axios.$get(
      'movies/recommendations', { params: { content: 'new' } }
    )])
    return { movies: movies, noSeenLibrary, lastFollowed, newMovies }
  },
  // Logique permettant d'obtenir la taille du navigateur même si celui-ci est redimensionnée
  mounted() {
    this.$nextTick(() => {
      this.getWindowWidth()
    })
    window.addEventListener('resize', () => {
      this.getWindowWidth()
    })
  },
  // Méthode qui permet d'obtenir la taille du navigateur
  methods: {
    getWindowWidth() {
      this.windowWidth = window.innerWidth
    }
  }
}
</script>
<style scoped lang="scss">
  .content {
    width: 95%;
    margin: auto;
  }

  .slider-promotion {
    display: flex;
  }

  .movie--big {
    grid-column: span 2 / auto;
    @media screen and (max-width: 500px) {
      grid-column: span 1 / auto;
    }
  }

  .movie-section {
    padding: 0 0 50px 0;
  }

  .movie-section__title {
    text-transform: uppercase;
    font-weight: 800;
    font-size: 1.2rem;
    margin-bottom: 5px;
    color: $main-text-light;
  }

  .movie-section__content {
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    grid-gap: 5px 0;
    @media screen and (max-width: 1700px) {
      grid-template-columns: repeat(4, 1fr);
    }
    @media screen and (max-width: 1100px) {
      grid-template-columns: repeat(2, 1fr);
    }
    @media screen and (max-width: 500px) {
      grid-template-columns: repeat(1, 1fr);
    }
  }

  .other-movies {
    padding: 100px 0;
  }
</style>
<style>
  body {
    background: #222220;
  }
</style>
