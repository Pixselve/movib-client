<!--Composant NavBar (en haut de page)-->
<template>
  <nav :class="{nav: true, 'nav--scrolled': scrolled}">
    <section class="nav__section">
      <div class="nav__element nav__element--mobile">
        <button class="nav__link nav__link--button" @click="openShutter">
          <i class="nav__link__icon fas fa-bars" />
        </button>
      </div>
      <div class="nav__element">
        <nuxt-link class="nav__link" to="/">
          <img height="25px" class="nav__link__image" src="~/static/logo_white.svg" alt="Movib">
        </nuxt-link>
      </div>
      <div class="nav__element nav__element--hide-mobile">
        <nuxt-link class="nav__link" to="/library">
          <i class="far fa-books nav__link__icon" />
          <span class="nav__link__text">Ma bibliotèque</span>
        </nuxt-link>
      </div>
    </section>
    <section class="nav__section">
      <div class="nav__element nav__element--hide-mobile">
        <nuxt-link class="nav__link" to="/search">
          <i class="far fa-search nav__link__icon" />
          <span class="nav__link__text">Rechercher</span>
        </nuxt-link>
      </div>
      <div class="nav__element">
        <div class="menu-button">
          <button class="nav__link nav__link--button">
            <img :src="profilePicture" class="nav__avatar">
            <span class="nav__link__text">{{ this.$auth.user.firstName }}</span>
          </button>
          <div class="menu-button__content">
            <nuxt-link class="menu-button__content__link" to="/account">
              Mon compte
            </nuxt-link>
            <button @click="logout" class="menu-button__content__link">
              Déconnexion
            </button>
          </div>
        </div>
      </div>
    </section>
  </nav>
</template>

<script>
export default {
  components: {},
  data: () => ({
    scrolled: false
  }),
  beforeMount() {
    window.addEventListener('scroll', this.scroll)
  },
  computed: {
    profilePicture() {
      return this.$auth.user.profilePicture ? this.$auth.user.profilePicture : '/Portrait_Placeholder.png'
    }
  },
  methods: {
    scroll() {
      this.scrolled = window.scrollY > 0
    },
    openShutter() {
      this.$store.commit('layout/toggleMobileShutter')
    },
    // Methode qui permet la déconnexion
    async logout() {
      try {
        await this.$auth.logout()
      } catch (e) {
        console.log(e)
      }
    }
  }
}
</script>

<style scoped lang="scss">
  .nav {
    color: white;
    position: fixed;
    height: 70px;
    top: 0;
    left: 0;
    right: 0;
    z-index: 100;
    display: flex;
    align-items: center;
    justify-content: space-between;
    transition: background-color 0.50s ease-in-out;
    padding: 0 25px;
    @media screen and (max-width: 490px) {
      padding: 0;
    }
  }

  .nav--scrolled {
    background-color: $primary-dark;
  }

  .nav__section {
    display: flex;
    height: 100%;
  }

  .nav__element {
    padding: 0 25px;
    height: 100%;
    display: flex;
    align-items: center;
  }

  .nav__element--mobile {
    padding: 0 10px;
    display: none;
    @media screen and (max-width: 730px) {
      display: flex;
    }
  }

  .nav__element--hide-mobile {
    @media screen and (max-width: 730px) {
      display: none;
    }
  }

  .nav__link {
    display: flex;
    align-items: center;
    text-decoration: none;
    text-transform: uppercase;
    color: inherit;
    transition: opacity 0.20s ease-in-out;
    cursor: pointer;
    font-weight: 800;
    outline: none;

    &:hover {
      opacity: 0.7;
    }
  }

  .nav__link--button {
    background: none;
    border: none;
  }

  .nav__link__icon {
    font-size: 1.5rem;
    vertical-align: middle;
  }

  .nav__link__text {
    vertical-align: center;
    margin-left: 10px;
    @media screen and (max-width: 750px) {
      display: none;
    }
  }

  .nav__avatar {
    background-color: rgba(256, 256, 256, 0.1);
    height: 35px;
    width: 35px;
    border-radius: 50%;
    display: inline-block;
    object-fit: cover;
    object-position: center;
  }

  .menu-button {
    display: flex;
    position: relative;

    &:hover {
      .menu-button__content {
        display: flex;
      }
    }
  }

  .menu-button__content {
    transition: all 0.15s ease-in-out;
    top: 100%;
    display: none;
    position: absolute;
    background-color: $darker-primary-dark;
    padding: 20px;
    width: 200px;
    right: 0;
    flex-direction: column;
  }

  .menu-button__content__link {
    background: none;
    color: $main-text-light;
    border: none;
    text-decoration: none;
    font-size: 1rem;
    cursor: pointer;
    display: block;
    text-align: left;
    padding: 5px 0;
    opacity: 0.8;
    transition: all 0.15s ease-in-out;
    outline: none;

    &:hover {
      opacity: 1;
    }
  }
</style>
