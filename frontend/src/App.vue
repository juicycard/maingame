<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
  import Vue from 'vue'
  import BootstrapVue from 'bootstrap-vue'
  import 'bootstrap/dist/css/bootstrap.css'
  import 'bootstrap-vue/dist/bootstrap-vue.css'
  import 'vue-awesome/icons'
  import Icon from 'vue-awesome/components/Icon'

  Vue.component('icon', Icon)
  Vue.use(BootstrapVue)

  export default {
    name: 'App'
  }
</script>

<style lang="scss">
  h1, h2, p {
    font-family: 'Coming Soon', cursive;
  }
</style>
