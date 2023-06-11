<template>
    <div>
        <input v-model="search" placeholder="Start typing..." @input="fetchStates">
        <div v-for="(state, index) in states" :key="index" @click="selectState(state)">
            {{ state }}
        </div>
        
        <GmapMap
        :center="{lat: 37.0902, lng: -95.7129}"
        :zoom="4"
        map-type-id="terrain"
        style="width: 500px; height: 300px"
        >
            <GmapMarker
            v-for="(state, index) in selectedStates"
            :key="index"
            :position="state.position"
            :clickable="true"
            :draggable="true"
            @click="center=state.position"
            />
        </GmapMap>
    </div > 
</template >

<script>   
import client from '../apolloClient';
import {gql} from '@apollo/client/core';
import { gmapApi } from 'vue2-google-maps';
import { Map as GmapMap, Marker as GmapMarker } from 'vue2-google-maps';

export default {
    name: 'StateSearch',
    components: {
        GmapMap,
        GmapMarker
    },

    props: {
        selectedStates: {
            type: Array,
            required: true
        }
    },

    data() {
        return {
            search: '',
            states: []
        };
    },

    computed: {
        google: gmapApi
    },

    methods: {
        // Fetch states from the backend server
        async fetchStates() {
            if (this.search.length > 0) {
                const response = await client.query({
                    query: gql`
                        query States($name: String!) {
                            states(name: $name)
                        }`,
                    variables: {
                        name: this.search,
                    },
                });
                this.states = response.data.states;
            } else {
                this.states = [];
            }
            if (this.states.length === 1) {
                this.geocodeState(this.states[0]);
            }
        },

        // Google Geocoding API
        // get a state and emit an event to update the parent component
        async geocodeState(state) {
            try {
                const geocoder = new this.google.maps.Geocoder();
                const result = await geocoder.geocode({ address: state });
                const position = result.results[0].geometry.location;
                // Emit an event instead of mutating prop directly
                this.$emit('update:selectedStates', [{ name: state, position }]);
            } catch (error) {
                console.error('Error geocoding state:', error);
            }
        },
        
        // Select a state from the suggestion dropdown (by mouse click)
        // and emit an event to update the parent component
        async selectState(state) {
            this.search = state
            const geocoder = new this.google.maps.Geocoder();
            const result = await geocoder.geocode({ address: state });
            const position = result.results[0].geometry.location;
            this.$emit('update:selectedStates', [{ name: state, position }]);
        }
    },
    };
</script>
