<!-- 
Next TODOS
1) swipe animation for reservations list and label
2) mobile screen adaptation
 -->

<template>
  <div class="backgrownd bg-gray-500 w-screen h-screen fixed top-0 overflow-auto" >
    <div 
    class="bg-white w-11/12 m-auto mt-6
    md:w-4/6" 
    :class="{blurr: showModal}">

      <!-- header -->
      <div 
      class="header flex flex-col justify-center items-center py-4 border-b-2 border-red-900
      md:flex-row md:py-10">
        <!-- title -->
        <h1
        class="text-red-700 text-3xl w-3/4 border-solid border-red-900 pt-6 font-bold
        md:border-r-2"
        >Booking List</h1>
        <!-- new reservation button -->
        <button
        class="bg-red-100 hover:bg-red-900 hover:text-white text-black p-2 m-4
        md:rounded-e-xl md:mr-4 md:ml-2 md:w-1/4 md:p-4 md:text-xl"
        @click="toggleModal"
        >Add reservation</button>
      </div>

      <!-- lista booking -->
      <BookingList @editReservation="handleEditReservation"></BookingList>
    </div>
    
    <!-- newEntryModal -->
    <NewEntryModal v-if="showModal" @close="toggleModal" :reservationToEdit="reservationToEdit"></NewEntryModal>
  </div>
</template>

<script>
/* import { compileExamples } from './compileExamples'; */
import BookingList from './components/booking-list.vue';
import NewEntryModal from './components/newEntry-PopUp.vue';

import { ref } from 'vue'
import { createExamples } from '@/modules/examplesMaker.js'

export default {
  name: 'App',
  components: { BookingList, NewEntryModal },
  setup(){

    //popolate reservation example DB
    createExamples()

    //show new reserv. modal logic
    let showModal = ref(false)
    function toggleModal(){
      showModal.value = !showModal.value
      
    }
    //modify a reservation logic
    let reservationToEdit = ref()
    function handleEditReservation(reservation){
      console.log("handling the modif in app.vue", reservation)
      reservationToEdit.value = reservation
      toggleModal()
    }

    return{showModal, toggleModal, handleEditReservation, reservationToEdit}
  }
}

</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  margin-top: 60px;
}
.blurr {
  filter: blur(5px)
}
</style>
