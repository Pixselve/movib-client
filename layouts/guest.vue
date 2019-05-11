<!--Disposition de la page dans les pages non utilisateurs-->
<template>
  <div class="main">
    <nuxt/>
  </div>

</template>

<script>
  export default {
    name: 'guest'
  }
</script>
<style scoped lang="scss">
  .main {
    min-height: 100vh;
    background-color: #222220;
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>
