import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'

// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import 'vuetify/styles'
import { md3 } from 'vuetify/blueprints'

const vuetify = createVuetify({
    blueprint: md3,
    components,
    directives,
  })

  
createApp(App).use(router).use(vuetify).mount('#app')
