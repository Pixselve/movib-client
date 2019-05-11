<!--La page de connexion-->
<template>
  <box :loading="loading" @submit.prevent="login">
    <template v-slot:title>
      Bon retour parmi nous !
    </template>
    <template v-slot:subtitle>
      Il vous suffit juste de remplir les trucs en dessous pour arriver à votre espace
    </template>
    <template v-slot:content>
      <div class="full-input">
        <label>
          Nom d'utilisateur
          <input v-model="username" v-validate="'required'" name="username" type="text">
        </label>
        <div v-if="errors.first('username')" class="errormessage">
          {{ errors.first('username') }}
        </div>
      </div>
      <div class="full-input">
        <label>
          Mot de passe
          <input v-model="password" v-validate="'required'" name="password" type="password">
        </label>
        <div v-if="errors.first('password')" class="errormessage">
          {{ errors.first('password') }}
        </div>
      </div>
    </template>
    <template v-slot:actions>
      <button class="button button--flat button--large" type="submit">
        Se connecter
      </button>
      <nuxt-link class="other-option-button" to="/signup">
        Créer un compte
      </nuxt-link>
    </template>
  </box>
</template>

<script>

import Box from '../components/forms/Box'

export default {
  name: 'Signin',
  layout: 'guest',
  head: () => ({
    title: 'Se connecter - Movib',
    meta: [
      {
        hid: 'description',
        name: 'description',
        content: 'Connectez vous à votre compte Movib.'
      }
    ]
  }),
  components: {
    Box
  },
  data: () => ({
    username: '',
    password: '',
    loading: false
  }),
  methods: {
    // Toute la logique de connexion qui est essentiellement gérée grâce à la bibliothèque d'authentification officielle de Nuxt.
    async login() {
      try {
        this.loading = true
        const valid = await this.$validator.validate()
        if (valid) {
          await this.$auth.loginWith('local', {
            data: {
              username: this.username,
              password: this.password
            }
          })
          this.loading = false
        }
        this.loading = false
      } catch (e) {
        this.loading = false
        if (e.response.status === 404) {
          this.$toast.error('Nous ne reconnaissons pas ce nom d\'utilisateur, êtes-vous inscrit ?')
        }
        if (e.response.status === 403) {
          this.$toast.error('Mot de passe incorrect')
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  label {
    color: #b7b7b7;
    text-transform: uppercase;
    padding: 10px 0;
  }

  input {
    margin: 10px 0;
    padding: 10px;
    border: 2px solid rgb(34, 36, 40);
    border-radius: 5px;
    background-color: rgb(48, 51, 57);
    transition: box-shadow 0.5s;
    outline: none;
    color: white;
    width: 100%;
    box-sizing: border-box;

    &:invalid {
      border-color: #ce1818;
      animation: fadeerror 0.5s;
    }
  }

  a {
    color: inherit;
    font-weight: bold;
  }

  input:focus {
    animation: fadeinput 0.25s;
    border: 2px solid rgb(114, 137, 218);
  }

  .errormessage {
    padding: 5px;
    margin-bottom: 10px;
    text-align: center;
    border-radius: 5px;
    font-family: sans-serif;
    font-size: 15px;
    color: #d1d1d1;
    background-color: #ce1818;
  }

  .button {
    text-align: center;
    font-weight: bold;
    color: #d1d1d1;
    font-size: 1rem;
    border: none;
    cursor: pointer;
  }

  .button--flat {
    padding: 15px;
    background-color: rgb(114, 137, 218);
    border-radius: 5px;
  }

  .button--large {
    width: 100%;
  }

  .other-option-button {
    font-family: sans-serif;
    font-size: 15px;
    color: #838383;
    text-align: center;
    margin-top: 10px;
    text-decoration: none;
    display: block;
  }

  .confirm {
    margin-top: 5%;
    margin-bottom: 0;
    text-align: center;
    font-family: sans-serif;
    font-size: 30px;
    color: #838383;
    animation: fadeinbox 1s;
  }

  .form-line {
    @media screen and (min-width: 500px) {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      grid-gap: 10px;
    }
  }

  @keyframes fadeinput {
    from {
      border: 2px solid rgb(34, 36, 40);
    }

    to {
      border: 2px solid rgb(114, 137, 218);
    }
  }

  @keyframes fadeerror {
    from {
      border-color: rgb(34, 36, 40);
    }

    to {
      border-color: #ce1818;
    }
  }

  @keyframes fadeinbox {
    from {
      opacity: 0;
    }

    to {
      opacity: 1;
    }
  }

</style>
