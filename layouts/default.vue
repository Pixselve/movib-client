<!--Disposition de la page dans les pages utilisateurs-->
<template>
  <div class="main">
    <navbar/>
    <mobile-shutter></mobile-shutter>
    <nuxt class="page"/>
    <movibFooter></movibFooter>
  </div>
</template>

<script>
import navbar from '~/components/layout/Navbar'
import MobileShutter from '~/components/layout/MobileShutter'
import Footer from "../components/layout/Footer";

export default {
  components: {
    navbar,
    MobileShutter,
    movibFooter: Footer
  }
}
</script>

<style scoped lang="scss">
  .main {
    min-height:100vh;
    display:flex;
    flex-direction:column;
  }
  .page {
    flex-grow:1;
  }
</style>
