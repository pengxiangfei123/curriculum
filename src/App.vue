<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App',
  mounted () {
    var token = this.$cookie.get('token')
    if (token) {
      this.$store.state.token = token
    }
  }
}
</script>

<style>
body,
html,
#app,
#box,
#allmap {
  height: 100%;
}
ul,
ol,
p {
  padding: 0;
  margin: 0;
}
</style>
