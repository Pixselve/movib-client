<!--Composant qui permet d'attribuer une note en 1 et 5 avec des étoiles-->
<template>
  <div>
    <input
      id="-1"
      value="-1"
      class="star-input far fa-star"
      name="rating"
      type="radio"
      v-model="rating"
      @change="input"
    >
    <label class="star-input__label" for="1"><i class="fas fa-star" /></label>
    <input
      id="1"
      value="1"
      class="star-input far fa-star"
      name="rating"
      type="radio"
      v-model="rating"
      @change="input"
    >
    <label class="star-input__label" for="2"><i class="fas fa-star" /></label>
    <input
      id="2"
      value="2"
      class="star-input far fa-star"
      name="rating"
      type="radio"
      v-model="rating"
      @change="input"
    >
    <label class="star-input__label" for="3"><i class="fas fa-star" /></label>
    <input
      id="3"
      value="3"
      class="star-input far fa-star"
      name="rating"
      type="radio"
      v-model="rating"
      @change="input"
    >
    <label class="star-input__label" for="4"><i class="fas fa-star" /></label>
    <input
      id="4"
      value="4"
      class="star-input far fa-star"
      name="rating"
      type="radio"
      v-model="rating"
      @change="input"
    >
    <label class="star-input__label" for="5"><i class="fas fa-star" /></label>
    <input
      id="5"
      value="5"
      class="star-input far fa-star"
      name="rating"
      type="radio"
      v-model="rating"
      @change="input"
    >
  </div>
</template>

<script>
export default {
  name: 'Rating',
  props: ['value'],
  data() {
    return {
      rating: this.value
    }
  },
  methods: {
    input() {
      this.$emit('input', this.rating)
    }
  }
}
</script>

<style lang="scss" scoped>
  .star-input {
    display: none;
  }

  .star-input__label {
    cursor: pointer;
    color: yellow;
    font-size: 1.5rem;
    display: inline-block;
    transition: transform 0.15s ease-in-out;
    &:hover {
      transform: scale(1.15);
    }
  }

  .star-input:checked ~ label {
    color: $main-text-light;
  }
</style>
