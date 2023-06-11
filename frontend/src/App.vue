<template>
  <div id="app">
    <StateSearch :selectedStates="selectedStates" @update:selectedStates="updateSelectedStates"/>
  </div>
</template>

<script>
import StateSearch from './components/StateSearch.vue'

export default {
  name: 'App',
  components: {
    StateSearch
  },
  data() {
    return {
      selectedStates: []
    };
  },
  methods: {
    updateSelectedStates(newStates) {
      this.selectedStates = newStates;
    }
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
