import Vue from 'vue'
import App from './App.vue'
import * as VueGoogleMaps from 'vue2-google-maps'

Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyBQtc6tAIQkk2UbMfwhR-cuCxcAx7fhAbw', 
    libraries: 'places', 
  }
})

Vue.config.productionTip = false
new Vue({
  render: h => h(App),
}).$mount('#app')
