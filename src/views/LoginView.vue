<script setup>
import { loginSchema as validationSchema } from '../validations/loginSchema'
import { useForm, useField } from 'vee-validate'
import { useAuthStore } from '../stores/auth'

const { handleSubmit } = useForm({ validationSchema })
const auth = useAuthStore()

const email = useField('email')
const password = useField('password')
const submit = handleSubmit((values) => {
  auth.login(values)
})
</script>

<template>
  <v-card flat max-width="600" class="mx-auto my-10">
    <v-card-title class="text-h4 font-weight-bold" tag="h3"> Iniciar Sesion </v-card-title>
    <v-card-subtitle class="text-5">Iniciar sesion con tu cuenta</v-card-subtitle>

    <v-alert v-if="auth.hasError" class="my-5" :title="auth.errorMsg" type="error"></v-alert>

    <v-form class="mt-5">
      <v-text-field
        type="email"
        label="Email"
        bg-color="blue-grey-lighten-5"
        class="mb-3"
        v-model="email.value.value"
        :error-messages="email.errorMessage.value"
      ></v-text-field>
      <v-text-field
        type="password"
        label="Password"
        bg-color="blue-grey-lighten-5"
        class="mb-3"
        v-model="password.value.value"
        :error-messages="password.errorMessage.value"
      ></v-text-field>
      <v-btn block class="mb-5" color="pink-accent-3" @click="submit">Iniciar Sesion</v-btn>
    </v-form>
  </v-card>
</template>
