import { createApp } from 'vue'
import { Quasar } from 'quasar'
// import './style.css'
import '@quasar/extras/material-icons/material-icons.css'
import 'quasar/src/css/index.sass'
import 'quasar/dist/quasar.css'
import App from './App.vue'
import { router } from './routes/routes.js'

const myApp = createApp(App)

myApp.use(Quasar, {
  plugins: {}
})
myApp.use(router)




myApp.mount('#app')
