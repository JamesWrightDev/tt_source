<template>
    <div class='card'>
        <div class="card__icon--delete">
            <img src="../assets/cancel.svg"  alt="" @click='itemClicked(i)'>
        </div>
        <div> 
            <h5 class='card__text--secondary'>Updated {{update | moment("from", "now")}}</h5>
            <h4 class='card__text--primary'>{{place}}</h4>
            <p>in {{city}}, United Kingdom</p>
            <div class="card__values">
                <ul>
                    <li class='card__values--title'>Values:</li>
                    <!-- Rounding values up, as show on the design -->
                    <li class='card__values--stats' 
                    v-for="(item, index) in values" 
                    :key=index>
                        {{item.parameter}}: {{Math.round(item.value)}}
                    </li>
                </ul>
            </div>  
        </div>   
    </div>
</template>
<script>
import EventBus from '../event-bus.js';
export default {
    data(){
        return{

        }
    },
    props:['place','city', 'update', 'values', 'i'], 
    methods:{
        itemClicked(index){
            EventBus.$emit('removeCity', index);
        }
    }
}
</script>
<style lang='scss' scoped>
.card{
    max-width: 360px;
    min-height: 150px;
    background-color: $col-white;
    padding: 10px 25px 15px 25px;
    border-radius: 10px;
    margin: 1em auto;
        @media screen and (min-width: $brkpoint-md ) {
            width: 400px;
        }
    &__icon--delete{
        width: 18px;
        position: relative;
        left: 97%;
        top: 6px;
            :hover{
                cursor: pointer;
            }
    }
    &__text{
        &--primary{
            color: $col-purple;
            font-weight: $font-bold;
            font-size: em(20px);
        }
        &--secondary{
            font-weight: $font-medium;
            text-transform: uppercase;
        }
    }
    &__values{
        display: flex; 
        &--stats{
            text-transform: uppercase;
            &::after{
                content: ',';   
            }
            &:last-child:after{
                content: '';
            }
        }
    }
}
  
ul li{
    display: inline;
    margin: 0 2px;
    font-weight: 600;
    font-size: em(16px);
}
    
</style>
