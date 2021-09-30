import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from './router'
import firebase from "firebase/compat";

Vue.config.productionTip = false

const firebaseConfig = {
  apiKey: "AIzaSyCtTL1UiQe0eATjGpFOVhFF5c5i34j3qAo",
  authDomain: "raze-chat-37c27.firebaseapp.com",
  projectId: "raze-chat-37c27",
  storageBucket: "raze-chat-37c27.appspot.com",
  messagingSenderId: "286184256621",
  appId: "1:286184256621:web:3e46bea1b6e5a42f1afb64"
};

firebase.initializeApp(firebaseConfig)

firebase.auth().onAuthStateChanged(() => new Vue({
  vuetify,
  router,
  render: h => h(App)
}).$mount('#app'))


