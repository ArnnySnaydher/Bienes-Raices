<script setup>
import { useForm, useField } from 'vee-validate'
import { validationSchema, imageSchema } from '@/validations/propiedadSchema'

import { collection, addDoc } from 'firebase/firestore'
import { useFirestore } from 'vuefire'
import { useRouter } from 'vue-router'

import useImage from '@/composables/useImage'

const {uploadImage,image,url} = useImage()

const router = useRouter()
const db = useFirestore()

const items = [1, 2, 3, 4, 5]
const { handleSubmit } = useForm({
  validationSchema: {
    ...validationSchema,
    ...imageSchema
  }
})

const titulo = useField('titulo')
const imagen = useField('imagen')
const precio = useField('precio')
const habitaciones = useField('habitaciones')
const wc = useField('wc')
const estacionamiento = useField('estacionamiento')
const descripcion = useField('descripcion')
const piscina = useField('piscina',null,{initialValue:false})

const submit = handleSubmit( async (values) => {
  const {imagen, ...propiedad} = values

  //GEneracion de Collection "propiedades"
  const docRef = await addDoc(collection(db, 'propiedades'), 
    {
      ...propiedad,
      imagen : url.value
    }
  )
  if(docRef.id){
    router.push({name:'admin-propiedades'})
  }
})
</script>

<template>
  <v-card max-width="800" flat class="mx-auto my-10">
    <v-card-title class="text-h4 font-weight-bold" tag="h3"> Nueva Propiedad </v-card-title>
    <v-card-subtitle class="text-h5 py-5"
      >Crea una nueva Propiedad llenando el siguiente formulario</v-card-subtitle
    >

    <v-form class="mt-10">
      <v-text-field
        class="mb-5"
        label="Titulo Propiedad"
        v-model="titulo.value.value"
        :error-messages="titulo.errorMessage.value"
      ></v-text-field>
      <v-file-input
        accept="image/jpeg"
        label="Fotografia"
        prepend-icon="mdi-camera"
        class="mb-5"
        v-model="imagen.value.value"
        :error-messages="imagen.errorMessage.value"
        @change="uploadImage"
      ></v-file-input>
      <div v-if="image">
        <p class="font-weight-bold">Imagen Propiedad:</p>
        <img class="w-50" :src="image">
      </div>

      <v-text-field
        class="mb-5"
        label="Precio"
        v-model="precio.value.value"
        :error-messages="precio.errorMessage.value"
      ></v-text-field>

      <v-row>
        <v-col cols="12" md="4">
          <v-select
            label="Habitaciones"
            class="mb-5"
            :items="items"
            v-model="habitaciones.value.value"
            :error-messages="habitaciones.errorMessage.value"
          ></v-select
        ></v-col>
        <v-col cols="12" md="4"
          ><v-select
            label="WC"
            class="mb-5"
            :items="items"
            v-model="wc.value.value"
            :error-messages="wc.errorMessage.value"
          ></v-select
        ></v-col>
        <v-col cols="12" md="4"
          ><v-select
            label="Lugares Estacionamientos"
            class="mb-5"
            :items="items"
            v-model="estacionamiento.value.value"
            :error-messages="estacionamiento.errorMessage.value"
          ></v-select
        ></v-col>
      </v-row>
      <v-textarea
        class="mb-5"
        label="Descripcion"
        v-model="descripcion.value.value"
        :error-messages="descripcion.errorMessage.value"
      ></v-textarea>
      <v-checkbox label="Piscina" v-model="piscina.value.value"
        :error-messages="piscina.errorMessage.value"></v-checkbox>

      <v-btn
        color="pink-accent-3"
        block
        @click="submit"
        
      >
        Agregar Propiedad
      </v-btn>
    </v-form>
  </v-card>
</template>
