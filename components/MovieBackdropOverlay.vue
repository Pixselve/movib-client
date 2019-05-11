<!--Composant qui permet d'afficher le backdrop d'un film ainsi qu'un overlay dégradé composé de la couleur domiante du backdrop-->
<template>
  <div
    v-if="backdrop.path && backdrop.color"
    class="movie"
    :style="{background: `url(${'https://image.tmdb.org/t/p/original' + backdrop.path}) center / cover no-repeat`}"
    @mouseenter="$emit('mouseenter', $event)"
    @mouseleave="$emit('mouseleave', $event)"
  >
    <div
      v-if="horizontal"
      class="overlay"
      :style="{background: `linear-gradient(90deg, ${backdrop.color} 0%, rgba(255, 255, 255, 0) 100%)`}"
    />
    <div
      v-else
      class="overlay"
      :style="{background: `linear-gradient(0, ${backdrop.color} 0%, rgba(255, 255, 255, 0) 100%)`}"
    />
    <slot/>
  </div>
  <div
    v-else
    :style="{background: `linear-gradient(0, ${randomColor} 0%, black 100%)`}"
    class="movie"
    @mouseenter="$emit('mouseenter', $event)"
    @mouseleave="$emit('mouseleave', $event)"
  >
    <slot/>
  </div>
</template>

<script>
export default {
  name: 'MovieBackdropOverlay',
  props: {
    backdrop: {type: Object, required: true},
    horizontal: {type: Boolean, default: false}
  },
  data: () => ({
    randomColor: `#${(Math.random() * 0xFFFFFF << 0).toString(16)}`
  })
}
</script>

<style lang="scss" scoped>
  .movie {
    position: relative;
    width: 100%;
    color: $main-text-light;
  }

  .overlay {
    position: absolute;
    right: 0;
    left: 0;
    bottom: 0;
    top: 0;
  }
</style>
