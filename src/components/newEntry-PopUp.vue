<template>

  <!-- blurred container -->
  <div 
  class="backgrownd bg-red-200 bg-opacity-50 w-screen h-screen fixed top-0 bg-cover"
  @click.self="escForm">

    <!-- modal window -->
    <div 
    class="modal bg-red-50 my-20 mx-40 flex flex-col justify-around items-center rounded-xl shadow-2xl shadow-black 
    max-[600px]:mx-0"
    @keypress.enter="saveReservation">
      
      <!-- title -->
      <h1 
      class="my-5 text-3xl font-bold text-red-600"
      >New Reservation</h1>

      <!-- name input -->
      <label for="nome">name</label>
      <input type="text" id="nome" v-model="newName" class="formInput">

      <!-- day input -->
      <label for="giorno">date</label>
      <VueDatePicker class="formInput" v-model="newDate" locale="it" auto-apply :enable-time-picker="false" input-class-name="dp-custom">
        <template #input-icon="{ clear }"></template>
        <template #clear-icon="{ clear }"></template>
      </VueDatePicker>

      <!-- hour input -->
      <label for="ora">hour</label>
      <VueDatePicker v-model="newHour" time-picker locale="it" minutes-increment="15" minutes-grid-increment="15" :min-time="{ hours: 12, minutes: 0 }" :max-time="{ hours: 22, minutes: 0 }" input-class-name="dp-custom" class="formInput">
        <template #input-icon="{ clear }"></template>
        <template #clear-icon="{ clear }"></template>
      </VueDatePicker>

      <!-- seats input -->
      <label for="coperti">seats</label>
      <input type="text" id="coperti" v-model="newSeats" class="formInput">

      <!-- feedback output -->
      <p class="text-red-600 my-3 text-xs px-2 rounded-xl"
      :class="{ glow : errorGlow }"
      v-if="alertToggle"
      >{{error}}</p>
     
      <!-- send data button-->
      <button 
      class=" bg-red-300 hover:bg-red-700 hover:text-white text-black rounded my-5 max-w-fit p-2"
      @click="saveReservation">Save</button>

    </div>
  </div>
</template>
  
<script>
import { Reservation } from '@/modules/Reservations';
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';
import { ref, toRaw } from 'vue';

export default {
  
  props:["currentEntryToEdit"],

  setup(props, { emit }){
    
    let newName = ref()
    let newDate = ref()
    let newHour = ref()
    let newSeats = ref()

    function saveReservation(){
      try{
        let reservation = new Reservation(newName.value, newDate.value, toRaw(newHour.value), newSeats.value)
        escForm()
      }
      catch(errorObj){
        manageError(errorObj.message)
      }
    }

    //error alerts logic
    let alertToggle = ref(false)
    let error = ref()
    let errorGlow = ref(false)
    function manageError(errorLog){
      //show error alert
      alertToggle.value = true
      error.value = errorLog
      //glow alert for 2 seconds
      errorGlow.value = true
      setTimeout(() => {errorGlow.value = false}, 2000)
    }

    //close form
    function escForm(){
      emit("close")
    }

    return{
      newName, newDate, newHour, newSeats,
      escForm, saveReservation,
      alertToggle, error, errorGlow
    }
  }
}
</script>
  
<style scoped>
  label, input {
    padding: 5px
  }
  label{
    margin-top:20px ;
    color: rgb(99, 99, 99)
  }
  .formInput{ 
    width: 50%;
    border-bottom: 1px;
    border-style: solid;
    border-color: grey;

    border-left: none;
    border-right: none;
    border-top: none;
    border-radius: 0%;

    height: 40px;
  }

  .glow {
    animation: glowing 2s infinite;
  }
  @keyframes glowing {
    0% {filter: drop-shadow(0 0px 0px rgb(255 0 0 / 0));}
    50% {filter: drop-shadow(0 1px 2px rgb(255 0 0 / 1));}
    100% {filter: drop-shadow(0 0px 0px rgb(255 0 0 / 0));}
  }
</style>