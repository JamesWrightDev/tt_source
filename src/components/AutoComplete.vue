<template>
    <div class="search__wrapper">
        <div class="search__container">
            <img class='search__icon' src="../assets/search.svg" alt="">
            <input 
                class='search__input' 
                type="text" 
                v-model='query' 
                placeholder='Enter city name...'
                @keyup.up='up'
                @keydown.down='down'
                @keydown.enter='itemClicked(selected)'>
        </div>  
          <div v-if='matches' class="search__options" ref='searchOptions' v-show="matches.length > 0">
              <ul>
                  <li class='search__listitem' v-for="(match, index) in matches"
                     :class = "{'search__listitem--selected': (selected == index)}" 
                      v-text="match"
                      @click='itemClicked(index)'
                      :key="match">
                  </li>
              </ul>
          </div>
    </div>
</template>
<script>
import EventBus from '../event-bus.js';
export default {
    props:['cities'],
    data(){
        return{
            visable: false,
            selected: null,
            query: '',
        }
    },
    methods:{
        itemClicked(index){
            if(!this.matches[index]){
                return;
            }
            EventBus.$emit('searchCity', this.matches[index]);
            // Clear the search box when option is selected. 
            this.query = '';
            this.selected = 0;
        },
        // Keyboard press up method. Reduce the selected value by 1. 
        up(){
            if(this.selected <= 0){
                return;
            }
            this.selected --;
            this.scrollToItem();
        },
        // Keyboard press up method. Increase the selected value by 1. 
        down(){
            if(this.selected === this.matches.length - 1){
                return;
            }
            this.selected ++;
            this.scrollToItem();
        },
        // Scoll the options window based on the current selected option.
        scrollToItem(){
            this.$refs.searchOptions.scrollTop = this.selected * 32;
        }

    },
    computed:{
        // The matches method filters the Cities props based on the users current input. This creates a new array of matches cities. 
        matches(){
            // If the query field is blank, return empty array.
            if(this.query == ''){
                return [];
            }
            // Set the selected item to first in array.
            this.selected = 0;
            // Returns the filtered array. 
            return this.cities.filter((item) => item.toLowerCase().startsWith(this.query.toLowerCase()));
        }
    }
}
</script>
<style lang='scss' scoped>

.search{
    &__wrapper{
        max-width: 400px;
        width: 100%;
        margin: 0 auto;
    }
    &__container{
        width: inherit;
        height: 50px;
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        border: 2px solid $col-slate;
        border-radius: 10px;
        background: $col-white;;
        position: relative;
        z-index: 100;
    }
    &__icon{
        width: 18px;
        margin: 0 10px;
        z-index: 11;
    }
    &__input{
        border: none;
        z-index: 10;
        font-family: $font-sans;
        background: none;
        flex-grow:2;
    }
    &__options{
        width: 100%;
        max-height: 150px;
        border-radius: 0 0 10px 10px;
        overflow-y: scroll;
        position: relative;
        left: 0px; 
        top: -7px; 
        background-color: $col-white;;
        padding: 20px 0 5px 0;
            ul{
                text-align: left;
                background-color:$col-white;
            }
    }
    &__listitem{
        list-style-type: none;
        cursor: pointer;
        margin: 0px 0;
        padding: 2.5px 0 2.5px 20px;
        font-family: 'Open Sans', Arial, Helvetica, sans-serif;
        color: #000;
        font-weight: 400;
        width: auto;
    }
    &__listitem--selected, &__listitem:hover{
        background-color: #f2f2f2;
    }   

}

input::placeholder{
    color: black;
    font-size: 15px;
    padding-bottom: 100px;
    font-family: $font-sans;
}

input:focus{
    outline: none;
}

// Remove default scroll styles, Not compatible with Firefox.
::-webkit-scrollbar {
width: 20px;
}

::-webkit-scrollbar-thumb {
  background: #C9C9C9;
  border-radius: 10px;
  background-clip: content-box;
  border: 7px solid transparent;
}

</style>
