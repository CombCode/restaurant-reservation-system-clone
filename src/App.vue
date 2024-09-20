<template>
  <div class="backgrownd bg-gray-500 w-screen h-screen fixed top-0 overflow-auto" >
    <div class="bg-white w-4/6 m-auto mt-6" :class="{blurr: showModal}">

      <!-- header -->
      <div class="header flex flex-row justify-center py-10 border-b-2 border-red-900">
        <!-- title -->
        <h1
        class="text-red-700 text-3xl w-3/4 border-r-2 border-solid border-red-900 pt-6 font-bold"
        >Booking List</h1>
        <!-- new reservation button -->
        <button
        class=" bg-red-100 hover:bg-red-900 hover:text-white text-black w-1/4 p-2 ml-2 rounded-e-xl mr-4"
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
