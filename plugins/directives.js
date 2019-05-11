import Vue from 'vue'
import axios from 'axios'
// Importe et utilise une directive qui permet de détecter lorsqu'un clic effectué à l'extérieur d'un élément
import vClickOutside from 'v-click-outside'
Vue.use(vClickOutside)

// Directive qui permet d'effectuer une requête au serveur lorsqu'un clic effectué sur un élément.
Vue.directive('track', {
  bind: (el, binding) => {
    el.addEventListener('click', async () => {
      try {
        const {action, tmdbId} = binding.value
        if (action && tmdbId) {
          const timestamp = new Date()
          await axios.post('http://localhost:3001/api/1/science', {event: {action, tmdbId, timestamp}})
        }
      } catch (e) {
        console.log(e)
      }
    })
  }
})
