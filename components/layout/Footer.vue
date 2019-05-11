<!--Composant Footer (en bas de page)-->
<template>
  <div class="footer">
    <section>Made with <span class="red-heart">❤</span> in Bretagne by KERICHARD Mael & GUYON Pascal</section>
    <section>Movib.</section>
  </div>
</template>

<script>
export default {
  name: 'Footer'
}
</script>

<style lang="scss" scoped>
.footer {
  background-color: $primary-dark;
  padding: 20px 40px;
  color: $main-text-light;
  display: flex;
  justify-content: space-between;
}
  .red-heart {
    color: #ff3f36;
  }
</style>
