<!--Page du compte utilisateur-->
<template>
  <div>
    <header class="header">
      <div class="page-title">
        Bonjour <span class="user-firstname">{{ this.$auth.user.firstName }}</span> !
      </div>
      <div class="page-helper">
        Voici votre espace de paramètres.
      </div>
    </header>
    <div id="all-parameter">
      <div class="param-container">
        <div class="general-param">
          <div class="param-pre">
            Informations personnelles
          </div>
          <form>
            <label for="last-name">
              <div>
                Nom
              </div>
              <input id="last-name" :value="user.lastName" type="text" disabled>
            </label>

            <label for="first-name">
              <div>
                Prénom
              </div>
              <input id="first-name" :value="user.firstName" type="text" disabled>
            </label>

            <label for="mail">
              <div>
                Adresse mail
              </div>
              <input id="mail" v-model="user.email" type="text">
            </label>

            <label for="birth-date">
              <div>
                Date de naissance
              </div>
              <input id="birth-date" :value="birthDate" type="date" disabled>
            </label>
          </form>
        </div>

        <div class="security-param">
          <div class="param-pre">
            Paramètres de sécurité
          </div>
          <form>
            <label for="username">
              <div>
                Nom d'utilisateur
              </div>
              <input id="username" :value="user.username" type="text" disabled>
            </label>

            <label for="password">
              <div>
                Mot de passe
              </div>
              <input id="password" type="password" value="password" disabled>
            </label>

            <label for="new-password">
              <div>
                Nouveau mot de passe
              </div>
              <input
                id="new-password"
                v-model="user.newPassword"
                type="password"
                placeholder="Nouveau mot de passe"
              >
            </label>

            <label for="confirm-password">
              <div>
                Confirmation du nouveau mot de passe
              </div>
              <input
                id="confirm-password"
                v-model="user.newPasswordConfirmation"
                type="password"
                placeholder="Confirmation du nouveau mot de passe"
              >
            </label>
          </form>
        </div>

        <transition name="show">
          <div v-if="modified" class="change-container">
            <div class="not-saved-info">
              Vous avez des informations non enregistrés
            </div>
            <button @click="saveData" class="change-infos">
              Enregistrer
            </button>
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Account',
  auth: true,
  head: () => ({
    title: 'Mon compte - Movib',
    meta: [
      {
        hid: 'description',
        name: 'description',
        content:
          'Le meilleur moyen de gérer votre compte Movib.'
      }
    ]
  }),
  computed: {
    // Permet d'obtenir une date de naissance formaté
    birthDate() {
      return new Date(this.user.birthDate).toISOString().split('T')[0]
    }
  },
  data: () => ({
    user: {},
    initialized: false,
    modified: false
  }),
  watch: {
    user: {
      // Si il y a modification d'un des champs, une popup proposant de sauvegarder les paramètres s'ouvre
      handler(newVal) {
        if ((newVal.email !== this.$auth.user.email || newVal.newPassword || newVal.newPasswordConfirmation) && this.initialized) {
          this.modified = true
        } else {
          this.modified = false
        }
      },
      deep: true
    }
  },
  methods: {
    //Permet de sauvegarder les données sur le serveur
    async saveData() {
      try {
        let dataToChange = {}
        if (this.user.email !== this.$auth.user.email) {
          dataToChange.email = this.user.email
        }
        if (this.user.newPassword) {
          if (this.user.newPassword === this.user.newPasswordConfirmation) {
            dataToChange.newPassword = this.user.newPassword
          } else {
            this.$toast.error('Votre nouveau mot de passe et sa confirmation doivent être identiques.')
            return
          }
        }
        await this.$axios.put('user/', dataToChange)
        await this.$auth.fetchUser()
        this.modified = false
        this.$toast.success('Données sauvegardées')
      } catch (e) {
        this.$toast.error('Une erreur est survenue durant l\'enregistrement des données.')
      }
    }
  },
  // Recupère les données utilisateur depuis le store
  created() {
    this.user = {
      ...this.$auth.user,
      newPassword: '',
      newPasswordConfirmation: ''
    }
    this.$nextTick(() => {
      this.initialized = true
    })
  }
}
</script>

<style lang="scss" scoped>
  .header {
    padding: 150px 50px 100px;
    color: $main-text-light;
    background-color: $primary-dark;
  }

  .page-title {
    font-size: 2.5rem;
  }

  .page-helper {
    margin-top: 10px;
  }

  .user-firstname {
    text-transform: capitalize;
  }

  .welcome {
    font-size: 25px;
    font-family: "Roboto", sans-serif;
    color: #ffffff;
  }

  .hi {
    font-size: 2em;
    font-weight: bold;
  }

  .presentation {
    font-size: 1em;
  }

  .param-container {
    margin: 30px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .general-param {
    display: flex;
    flex-direction: column;
    border-top: solid 5px #818181;
    width: 50%;
    font-size: 15px;
    font-family: "Roboto", sans-serif;
    padding: 30px;
    margin-top: 20px;
  }

  .security-param {
    display: flex;
    flex-direction: column;
    border-top: solid 5px #818181;
    width: 50%;
    font-size: 15px;
    font-family: "Roboto", sans-serif;
    padding: 30px;
    margin-top: 20px;
  }

  .param-pre {
    font-size: 2em;
    color: #ffffff;
    margin-bottom: 10px;
  }

  .change-container {
    z-index: 100;
    position: fixed;
    bottom: 0;
    margin: 10px;
    padding: 15px;
    border: solid 2px #595959;
    background-color: #36393f;
    border-radius: 5px;
    display: flex;
    flex-direction: row;
    align-items: center;
    text-align: center;
    font-family: "Roboto", sans-serif;
    color: #ffffff;
  }

  .change-infos {
    text-align: center;
    font-weight: bold;
    color: #d1d1d1;
    font-size: 1rem;
    padding: 5px 10px 5px 10px;
    margin-left: 15px;
    border: none;
    outline: none;
    border-radius: 5px;
    background-color: #298300;
    cursor: pointer;
  }

  label {
    font-size: 1em;
    color: #b1b1b1;
  }

  input {
    border: none;
    margin: 10px;
    padding: 10px;
    border: 2px solid #222428;
    border-radius: 5px;
    background-color: #303339;
    transition: border-color 0.5s;
    outline: none;
    color: white;
    width: 90%;
  }

  input:focus {
    border-color: #7289da;
  }

  .show-enter-active,
  .show-leave-active {
    transition: all 0.5s ease-in-out;
  }

  .show-enter,
  .show-leave-to {
    bottom: -100px;
  }
</style>
