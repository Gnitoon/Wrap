import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'


Vue.config.productionTip = false

// import VueAnalytics from 'vue-analytics'

// Vue.use(VueAnalytics, {
//   id: 'UA--1',
//   router
// })

new Vue({
	router,
	render: h => h(App)
}).$mount('#app')
