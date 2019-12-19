<template lang="pug">
  #app
    b-navbar(fixed-top, shadow)
      template(slot="brand")
        b-navbar-item(tag="router-link", to="/")
          img(src="~/assets/buefy.png", alt="Lightweight UI components for Vue.js based on Bulma", height="28")
      template(slot="start")
        b-navbar-item(tag="router-link", :to="item.to", exact-active-class="is-active", :key="key", v-for="(item, key) of items")
          | {{ item.title }}
        b-navbar-dropdown(label="Info")
          b-navbar-item(href="#")
            | About
          b-navbar-item(href="#")
            | Contact
      template(slot="end")
        b-navbar-item(tag="div")
          .buttons
            a.button.is-primary
              strong Sign up
            a.button.is-light
              | Log in
    nuxt
</template>

<script>
  export default {
    data () {
      return {
        items: [
          { title: 'Home', to: '/' },
          { title: 'Inspire', to: '/inspire' }
        ]
      }
    }
  }
</script>

<style lang="scss">
  body {
    padding-top: 3.25rem;
  }
</style>
