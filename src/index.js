import 'babel-polyfill'

import Vue from 'vue'
import store from './store/index'
import App from './components/app'

new Vue({
    el: "#app",
    store,
    render: h => h(App)
})
