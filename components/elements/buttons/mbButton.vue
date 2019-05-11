<!--Composant bouton custom-->

<template>
  <nuxt-link
    v-if="href"
    :disabled="loading"
    :to="href"
    :style="{color: color}"
    :class="{'rounded-button': round, 'button': true}"
    @click="click"
  >
    <div :class="['button__icon', {'rounded-icon': round}, {filled}]">
      <i v-if="icon" :class="[icon]" />
    </div>
    <span v-if="text" class="button-text">{{ text }}</span>
  </nuxt-link>
  <button v-else :disabled="loading" :style="{color: color}" :class="{'rounded-button': round, 'button': true}" @click="click">
    <div :class="['button__icon', {'rounded-icon': round}, {filled}]">
      <i v-if="loading" class="loader-icon fal fa-spinner-third" />
      <i v-else :class="[icon]" />
    </div>
    <span v-if="text" class="button-text">{{ text }}</span>
  </button>
</template>

<script>
export default {
  name: 'Button',
  props: {
    icon: { type: String },
    href: { type: String },
    round: { type: Boolean, default: false },
    loading: { type: Boolean, default: false },
    color: { type: String, default: 'white' },
    text: { type: String },
    filled: { type: Boolean, default: false }
  },
  methods: {
    click(e) {
      this.$emit('click', e)
    }
  }
}
</script>

<style lang="scss" scoped>
  .button {
    background: none;
    border: none;
    font-size: 1rem;
    cursor: pointer;
    outline: none;
    padding: 0;
    text-decoration: none;
    &:hover:not(:disabled) {
      .rounded-icon {
        transform: scale(1.1);
        border: 2px solid rgba(265, 265, 265, 1);
      }
    }
  }

  .rounded-icon {
    height: 2.5rem;
    width: 2.5rem;
    vertical-align: middle;
    border: 2px solid rgba(265, 265, 265, 0.5);
    border-radius: 50%;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    position: relative;
    font-size: 1.5rem;
    transition: all 0.15s ease-in-out;

    i {
      color: inherit;
    }
  }
  .loader-icon {
    animation: spin infinite ease-in-out 0.7s;
  }
  .button-text {
    margin-left: 10px;
  }
  @keyframes spin {
    100% {
      transform: rotate(360deg);
    }
  }
  .filled {
    background-color: rgba(0,0,0,0.56);
  }
</style>
