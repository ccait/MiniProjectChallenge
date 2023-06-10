<template>
  <div>
    <input v-model="search" type="text" @input="searchStates">
    <ul v-if="states.length">
      <li v-for="state in states" :key="state">{{ state }}</li>
    </ul>
  </div>
</template>

<script>
import gql from 'graphql-tag'

export default {
  data() {
    return {
      search: '',
      states: [],
    }
  },
  methods: {
    searchStates() {
      this.$apollo.query({
        query: gql`
          query States($name: String!) {
            states(name: $name)
          }
        `,
        variables: {
          name: this.search
        },
      }).then((res) => {
        this.states = res.data.states
      })
    },
  },
}
</script>
