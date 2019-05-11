<!--Page de création de compte-->
<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <!--Boîte de signup-->
  <box :loading="loading" @submit="submit">
    <template v-slot:title>
      Créez maintenant un compte Movib
    </template>
    <template v-slot:subtitle>
      Dites nous qui vous êtes pour obtenir votre espace privilégié
    </template>
    <template v-slot:content>
      <div class="form-line">
        <div class="full-input">
          <label>
            Prénom
            <input v-model="firstName" v-validate="'required'" name="firstName" type="text">
          </label>
          <div v-if="errors.first('firstName')" class="errormessage">
            {{ errors.first('firstName') }}
          </div>
        </div>
        <div class="full-input">
          <label>
            Nom de famille
            <input v-model="lastName" v-validate="'required'" name="lastName" type="text">
          </label>
          <div v-if="errors.first('lastName')" class="errormessage">
            {{ errors.first('lastName') }}
          </div>
        </div>
      </div>
      <div class="full-input">
        <label>
          Date de naissance
          <input v-model="birthDate" v-validate="'required'" name="birthDate" type="date">
        </label>
        <div v-if="errors.first('birthDate')" class="errormessage">
          {{ errors.first('birthDate') }}
        </div>
      </div>
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
          Adresse email
          <input v-model="email" v-validate="'required|email'" name="email" type="email">
        </label>
        <div v-if="errors.first('email')" class="errormessage">
          {{ errors.first('email') }}
        </div>
      </div>

      <div class="form-line">
        <div class="full-input">
          <label>
            Mot de passe
            <input ref="password" v-model="password" v-validate="'required'" name="password" type="password">
          </label>
          <div v-if="errors.first('password')" class="errormessage">
            {{ errors.first('password') }}
          </div>
        </div>
        <div class="full-input">
          <label>
            Confirmez votre mot de passe
            <input v-validate="'required|confirmed:password'" name="password-confirm" type="password">
          </label>
          <div v-if="errors.first('password-confirm')" class="errormessage">
            {{ errors.first('password-confirm') }}
          </div>
        </div>
      </div>
    </template>
    <template v-slot:actions>
      <button class="button button--flat button--large" type="submit">
        Créer mon compte
      </button>
      <nuxt-link class="other-option-button" to="/signin">
        Se connecter
      </nuxt-link>
    </template>
  </box>
</template>

<script>
import Box from '../components/forms/Box'

export default {
  name: 'Signup',
  layout: 'guest',
  auth: false,
  head: () => ({
    title: 'Créer un compte - Movib',
    meta: [
      {
        hid: 'description',
        name: 'description',
        content: 'Commencez l\'aventure Movib dès maintenant.'
      }
    ]
  }),
  components: {
    Box
  },
  data: () => ({
    username: '',
    password: '',
    email: '',
    birthDate: '',
    firstName: '',
    lastName: '',
    loading: false
  }),
  // Si l'utilisateur est connecté il y a redirection automatique vers l'accueil
  fetch({ redirect, store }) {
    if (store.$auth.$state.loggedIn) redirect(301, '/')
  },
  // Toute la logique d'inscription qui est géré essentiellement par la bibliothèque d'authentification de Nuxt.
  methods: {
    async submit() {
      try {
        const valid = await this.$validator.validate()
        if (valid) {
          const { username, password, email, birthDate, firstName, lastName } = this
          await this.$axios.post('register', { username, password, email, birthDate, firstName, lastName })
          await this.$auth.loginWith('local', {
            data: {
              username,
              password
            }
          })
          if (this.$auth.loggedIn) this.$router.push('/')
        }
      } catch (e) {
        const { message } = e.response.data.error
        if (message.startsWith('E11000')) {
          this.$toast.error('Il existe déjà un compte avec ce nom d\'utilisateur ou cette adresse email.')
        } else {
          this.$toast.error('Une erreur est survenue.')
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
