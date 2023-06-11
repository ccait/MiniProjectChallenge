<template>
    <div>
        <input v-model="search" placeholder="Start typing..." @input="fetchStates">
        <div v-for="state in states" :key="state">
        {{ state }}
    </div>

    <GmapMap
    :center="{lat: 37.0902, lng: -95.7129}"
    :zoom="4"
    map-type-id="terrain"
    style="width: 500px; height: 300px"
    >
        <GmapMarker
        v-for="state in selectedStates"
        :key="state.name"
        :position="state.position"
        :clickable="true"
        :draggable="true"
        @click="center=state.position"
        />
    </GmapMap>

  </div >
  
</template >

<script>
    import {ref} from 'vue';
    import client from '../apolloClient';
    import {gql} from '@apollo/client/core';

    export default {
        name: 'StateSearch',
        setup() {
        const search = ref('');
        const states = ref([]);
        const fetchStates = async () => {
            if (search.value.length > 0) {
                const response = await client.query({
                    query: gql`
                    query States($name: String!) {
                        states(name: $name)
                    }`,
                    variables: {
                        name: search.value,
                    },
                });
                states.value = response.data.states;
            } else {
                states.value = [];
            }
        };
        return {search, states, fetchStates};
    },
    };
</script>
