<template lang="pug">
  section.section
    .container
      .columns.is-multiline
        card.is-6-tablet.is-3-desktop(title="Free", icon="github", icon-pack="fab")
          | Open source on&nbsp;
          a(href="https://github.com/buefy/buefy") GitHub
        card.is-6-tablet.is-3-desktop(title="Responsive", icon="laptop-code")
          b.has-text-grey Every
          |  component is responsive
        card.is-6-tablet.is-3-desktop(title="Modern", icon="handshake")
          | Built with&nbsp;
          a(href="https://vuejs.org/") Vue.js
          | &nbsp;and&nbsp;
          a(href="http://bulma.io/") Bulma
        card.is-6-tablet.is-3-desktop(title="Lightweight", icon="object-ungroup")
          | No other internal dependency
</template>

<script>
  import Card from '~/components/Card'

  export default {
    components: { Card }
  }
</script>
