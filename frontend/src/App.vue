<template>
  <div id="app">
    <StateSearch />
  </div>
</template>

<script>
import StateSearch from './components/StateSearch.vue'

export default {
  name: 'App',
  components: {
    StateSearch
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
