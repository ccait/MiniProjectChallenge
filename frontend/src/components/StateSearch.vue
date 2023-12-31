<template>
    <div>
        <div class="input-container">

        <input v-model="search" placeholder="Start typing..." @input="fetchStates" class="wide-input">
        <ul v-if="states.length > 0" class="dropdown">
            <li v-for="(state, index) in states" :key="index"
                @click="selectState(state)"
                :class="{ 'highlighted': state === selectedState }">{{ state }}
            </li>
        </ul>

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
            states: [],
            
        selectedState: null,
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
            this.selectedState = state;
            const geocoder = new this.google.maps.Geocoder();
            const result = await geocoder.geocode({ address: state });
            const position = result.results[0].geometry.location;
            this.$emit('update:selectedStates', [{ name: state, position }]);
        }
    },
    };
</script>

<style scoped>
.input-container {
    text-align: left;
    position: relative;
    margin-left: 10px;
    margin-bottom: 30px;
}

.wide-input {
    width: 400px; 
    height: 25px;
}

.highlighted {
    background-color: #4b7fad;
}

.dropdown {
    left: 20;
    top: 100%;
    margin-top: 0;
    list-style: none;
    width: 200px;  
    padding: 0; 
    background-color: #f6f6f6;
    box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2); 
    border: 1px solid #ccc;  
    border-radius: 1px; 
}
.dropdown li:hover {
    background-color: #ddd;
}

</style>
