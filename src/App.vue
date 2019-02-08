<template>
    <div class="wrapper">
      <div class="container">
        <div class="grid__row mb-3 mt-3">
          <div class="grid__col--12">
            <div>
              <h1 class='headline--primary'>Compare your Air</h1>
              <h3 class='headline--secondary'>Compare the air quality between cities in the UK.</h3>
              <h3 class='headline--secondary'>Select cities to compare using the search tool below.</h3>
            </div>
          </div>
      </div>
      <div class="grid__row centered mb-3">
        <div class="grid__col--8">
          <auto-complete :cities='this.cities'></auto-complete>  
        </div>
      </div>
      <div v-if='this.error' class="grid__row">
        <div class="grid__col--12">
          <h3 class='headline--secondary__error'>Error: {{this.error_content}}</h3>
        </div>
      </div>
      <div 
      v-if='this.results.length > 0'
      class="grid__row centered" >
        <div class="grid__col--11">
            <result-card
              v-for="(item, index) in this.results"
              :key = index
              :i = index
              :update='item.updated' 
              :place='item.location' 
              :city='item.city' 
              :values='item.measurements'>
              </result-card>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
import axios from 'axios';
import AutoComplete from './components/AutoComplete'
import ResultCard from './components/ResultCard'
import EventBus from './event-bus.js';

export default {
  name: 'app',
  components: {
    AutoComplete,
    ResultCard
  },
  data(){
    return{
      cities:[],
      results:[],
      error: false,
      error_content:'',
    }
  },
  methods:{
    searchCity: function(params){
      // Search for the lates stats of the request City
      axios.get('https://api.openaq.org/v1/latest/',{
          params:{
            city: params
          }
        })
        .then((response)=>{
          this.error = false;

          // Select the first location in the response. Design breif does not specify how to handle multple locations in one City.
          const result = response.data.results[0];
          // Store that result into the Results array, using unshift to place the begining of the.
          this.results.unshift({
            location: result.location,
            city: result.city,
            updated: result.measurements[0].lastUpdated,
            measurements: result.measurements,
          })
        })
        .catch(()=>{
          // Catch error in th event Open AQ has missing data for a city. 
          this.error = true;
          this.error_content = 'There is no data avalible for that city.'
        })
      },
    removeCity: function(params){
      this.results.splice(params, 1);
    }
  },
  mounted(){
    // Once mounted, automatically fetch the latest list of citys in the UK. 
    axios.get('https://api.openaq.org/v1/cities/',{
      params:{
        country: 'GB',
        limit: 500,
      }
    })
      .then((response) => {
        this.error = false;
        const resultCities = response.data.results;
        // Instantiate a new array
        const array = [];
          // Push the results of the City fetch into the above array.
          resultCities.forEach(function(item){
            array.push(item.city);
          })
        this.cities = array;
      })
      .catch(() => {
        // Catch error in th even Open AQ is unavalible. 
        this.error = true;
        this.error_content = 'Services are currently unavailable'
      });

    // Global component event listeners. 
    EventBus.$on('searchCity', (params) => {
                this.searchCity(params);
            });
    EventBus.$on('removeCity', (params) => {
                this.removeCity(params);
            });
  }
}
</script>

<style lang='scss'>
@import url('https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700');

h1,h3{
  text-align: center;
  margin-bottom: 10px;
}

html{
  background: rgb(112,63,171);
  background: linear-gradient(135deg, rgba(112,63,171,1) 38%, rgba(55,102,167,1) 72%) no-repeat center center fixed;
  height: 100%;
}


</style>
