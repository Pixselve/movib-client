<!--Composant boite (pour le login et signup)-->
<template>
  <div class="box">
    <div v-if="loading" class="overlay">
      <i class="overlay__spinner fas fa-spinner-third"></i>
    </div>
    <form @submit.prevent="$emit('submit', $event)">
      <header class="box__header">
        <h1 class="box__header__title">
          <slot name="title"></slot>
        </h1>
        <h2 class="box__header__sub-title">
          <slot name="subtitle"></slot>
        </h2>
      </header>
      <main class="box__main">
        <slot name="content"></slot>
      </main>
      <footer class="box__actions">
        <slot name="actions"></slot>
      </footer>
    </form>
  </div>
</template>

<script>
export default {
  name: 'Box',
  props: {
    loading: Boolean
  }
}
</script>

<style lang="scss" scoped>
  .box {
    position: relative;
    padding: 40px 20px;
    border: #595959 solid 5px;
    border-radius: 10px;
    max-height: 100%;
    background-color: rgb(54, 57, 63);
    box-sizing: border-box;
    overflow-y: auto;
    @media screen and (max-width: 800px) {
      width: 100%;
      border: none;
      border-radius: 0;
    }
  }

  .box__header__title {
    margin: 0;
    text-align: center;
    font-family: sans-serif;
    font-size: 30px;
    color: #d1d1d1;
  }

  .box__header__sub-title {
    margin: 0;
    text-align: center;
    font-family: sans-serif;
    font-size: 15px;
    color: #838383;
  }
  .box__main {
    margin: 30px 0;
  }
  .overlay {
    position: absolute;
    background-color: rgba(0, 0, 0, 0.54);
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    animation: fadeIn ease-in-out 0.5s;
  }
  .overlay__spinner {
    position: absolute;
    top: 50%;
    right: 50%;
    font-size: 5rem;
    color: rgb(115, 139, 217);
    animation: spin infinite ease-in-out 0.7s;
  }
  @keyframes spin {
    100% {
      transform: rotate(360deg);
    }
  }
  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
</style>
