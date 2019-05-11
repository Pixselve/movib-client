// Fichier qui permet d'avoir différentes variables disponible globalement.  dans notre cas il permet de savoir si le volet des menus sur mobile est ouvert ou non
export const state = () => ({
  isMobileShutterOpen: false
})
export const mutations = {
  toggleMobileShutter(state) {
    state.isMobileShutterOpen = !state.isMobileShutterOpen
  }
}
