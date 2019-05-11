<!--Composant qui permet d'afficher les détails suplémentaires d'un film-->
<template>
  <div class="details__content__element">
    <div class="details__content__name">
      {{ name }}
    </div>
    <div class="details__content__content">
      {{ content }}
    </div>
  </div>
</template>
<script>
export default {
  name: 'MovieDetail',
  props: {
    name: { type: String, required: true },
    content: { type: String, required: true }
  }
}
</script>
<style lang="scss" scoped>

  .details__content__name {
    font-weight: 800;
  }
</style>
