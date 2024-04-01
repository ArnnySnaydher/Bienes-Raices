import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

//Firebase
import { VueFire, VueFireAuth } from 'vuefire'
import { firebaseApp } from './config/firebase'

import App from './App.vue'
import router from './router'
import './assets/main.css'
import '@mdi/font/css/materialdesignicons.css'

const app = createApp(App)

//vuetify
const vuetify = createVuetify({
  components,
  directives
})

app.use(VueFire, {
  // imported above but could also just be created here
  firebaseApp,
  modules: [
    // we will see other modules later on
    VueFireAuth()
  ]
})
app.use(createPinia())
app.use(router)
app.use(vuetify)

app.mount('#app')
