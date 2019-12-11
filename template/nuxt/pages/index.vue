<template lang="pug">
  .container
    div
      logo
      h1.title <%= name %>
      h1.subtitle <%= description %>
      .links
        a.button--green(href="https://nuxtjs.org/", target="_blank") Documentation
        a.button--grey(href="https://github.com/nuxt/nuxt.js", target="_blank") GitHub
</template>

<script>
  import Logo from '~/components/Logo'

  export default {
    components: { Logo }
  }
</script>

<style lang="scss" scoped>
  <%_ if (ui === 'tailwind') { _%>
  /* Sample `apply` at-rules with Tailwind CSS
  .container {
    @apply min-h-screen flex justify-center items-center text-center mx-auto;
  }
  */
  <%_ } _%>
  .container {
    margin: 0 auto;
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
  }

  .title {
    font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
      'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
    display: block;
    font-weight: 300;
    font-size: 100px;
    color: #35495e;
    letter-spacing: 1px;
  }

  .subtitle {
    font-weight: 300;
    font-size: 42px;
    color: #526488;
    word-spacing: 5px;
    padding-bottom: 15px;
  }

  .links {
    padding-top: 15px;
  }
</style>
