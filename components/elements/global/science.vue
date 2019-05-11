<!--Composant qui permet d'envoyer en requête au serveur dès qu'un utilisateur effectue une action dans laquelle ce composant est utilisé-->
<template>
  <span @click="track">
    <slot/>
  </span>
</template>

<script>
export default {
  name: 'Science',
  props: {
    action: {type: String, required: true},
    tmdbId: {type: Number, required: true}
  },
  methods: {
    async track() {
      try {
        if (this.action && this.tmdbId) {
          const timestamp = new Date()
          await this.$axios.$post('science', {
            event: {
              action: this.action,
              tmdbId: this.tmdbId,
              timestamp
            }
          })
        }
      } catch (e) {
        console.log(e)
      }
    }
  }
}
</script>
