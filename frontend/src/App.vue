<template>
  <div id="app">
    <TypeAhead />
  </div>
</template>

<script>
import TypeAhead from './components/TypeAhead.vue'

export default {
  components: {
    TypeAhead
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
