<!--Composant qui sert de volet pour afficher les différents menus sur mobile-->
<template>
  <nav :class="{'mobile-shutter': true, 'mobile-shutter--closed': !isOpen}">
    <div class="mobile-shutter__section mobile-shutter__section--top">
      <nuxt-link to="/" @click.native="close">
        <img class="mobile-shutter__logo" src="~/static/logo_white.svg" alt="Movib.">
      </nuxt-link>
      <button class="mobile-shutter__close-button" @click="close">
        <i class="fas fa-times" />
      </button>
    </div>
    <div class="mobile-shutter__section">
      <nuxt-link exact class="mobile-shutter__link mobile-shutter__link--accent" to="/" @click.native="close">
        <i class="fas fa-home mobile-shutter__link__icon" />
        <span class="mobile-shutter__link__text">Accueil</span>
      </nuxt-link>
      <nuxt-link exact class="mobile-shutter__link" to="/library" @click.native="close">
        <i class="far fa-books mobile-shutter__link__icon" />
        <span class="mobile-shutter__link__text">Ma bibliothèque</span>
      </nuxt-link>
      <nuxt-link exact class="mobile-shutter__link" to="/search" @click.native="close">
        <i class="fal fa-search mobile-shutter__link__icon" />
        <span class="mobile-shutter__link__text">Rechercher</span>
      </nuxt-link>
    </div>
  </nav>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'MobileShutter',
  data: () => ({}),
  computed: {
    ...mapState({ isOpen: state => state.layout.isMobileShutterOpen })
  },
  methods: {
    close() {
      this.$store.commit('layout/toggleMobileShutter')
    }
  }
}
</script>

<style lang="scss" scoped>

  .mobile-shutter {
    position: fixed;
    z-index: 1000;
    background-color: #222220;
    top: 0;
    bottom: 0;
    width: 300px;
    overflow-y: auto;
    display: block;
    transition: all 0.15s ease-in-out;
  }

  .mobile-shutter--closed {
    transform: translateX(-100%);
  }

  .mobile-shutter__section--top {
    padding: 20px 20px;
    display: flex;
    justify-content: space-between;
  }

  .mobile-shutter__logo {
    width: 100px;
  }

  .mobile-shutter__close-button {
    background: none;
    border: none;
    color: white;
    font-size: 1.5rem;
    outline: none;
    cursor: pointer;
  }

  .mobile-shutter__link {
    color: white;
    display: block;
    text-decoration: none;
    padding: 15px 20px;
    width: 95%;
    border-top-right-radius: 50px;
    border-bottom-right-radius: 50px;

    &.nuxt-link-active {
      background-color: lighten(#222220, 5);
    }
  }

  .mobile-shutter__link__text {
    margin-left: 10px;
  }

  .mobile-shutter__link--accent {
    &.nuxt-link-active {
      color: #f4a442;
      background-color: transparentize(#f4a442, 0.9);
    }
  }
</style>
