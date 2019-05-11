import Vue from 'vue'
import VeeValidate, { Validator } from 'vee-validate'

import fr from 'vee-validate/dist/locale/fr'
// Configuration directe de Nuxt / Vue dans notre cas,  la configuration de la validation des champs grâce à Vee-validate
const dict = {
  custom: {
    username: {
      required: 'Veuillez entrer un nom d\'utilsateur'
    },
    password: {
      required: 'Veuillez entrer un mot de passe'
    },
    firstName: {
      required: 'Veuillez entrer un prénom'
    },
    lastName: {
      required: 'Veuillez entrer un nom de famille'
    },
    birthDate: {
      required: 'Veuillez entrer une date de naissance'
    },
    email: {
      required: 'Veuillez entrer une adresse email',
      email: 'Veuillez entrer une adresse email valide'
    },
    'password-confirm': {
      required: 'Veuillez confirmer votre mot de passe',
      confirmed: 'Vos deux mot de passe de sont pas identiques'
    }
  }
}

Vue.use(VeeValidate, { validity: true })
Validator.localize('fr', fr)
Validator.localize('fr', dict)
