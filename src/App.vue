<template>
  <div class="backgrownd bg-gray-500 w-screen h-screen fixed top-0 overflow-auto" >
    <div class="bg-white w-4/6 m-auto mt-6" :class="{blurr: showModal}">

      <!-- header -->
      <div class="header flex flex-row justify-start py-10 border-b-2 border-red-900">
        <!-- title -->
        <h1
        class="text-red-700  text-3xl w-5/6 border-r-2 border-solid border-red-900 pt-6 font-bold"
        >Booking List</h1>
        <!-- new reservation button -->
        <button
        class=" bg-red-100 hover:bg-red-900 hover:text-white text-black p-4 ml-2 rounded-e-xl mr-4"
        @click="toggleModal"
        >Add reservation</button>
      </div>

      <!-- sorting tab -->
      <div class=" font-mono bold sortingTab flex justify-center flex-row max-[600px]:flex-col mb-6">
       <!--  <div class="p-1 bg-white w-1/2" @click="sortX_orario"> //TODO redo sorting logic
          <p class="m-4 border rounded-2xl hover:bg-red-900 hover:text-white shadow shadow-black hover:shadow-2xl">sort by hour</p>
        </div>
        <div class="p-1 bg-white w-1/2" @click="sortX_coperti"> //TODO redo sorting logic
          <p class="m-4 border rounded-2xl hover:bg-red-900 hover:text-white shadow shadow-black hover:shadow-2xl">sort by seats</p>
        </div> -->
      </div>

      <!-- lista booking -->
      <BookingList :reservationData="reservationData" @eseguiAzioneSuEntry="handleAzioneSuEntry" v-if="showBookingList"></BookingList>
 
    </div>
    
    <!-- newEntryModal -->
    <NewEntryModal v-if="showModal" @close="toggleModal" :currentEntryToEdit={currentEntryToEdit}></NewEntryModal>
  </div>
</template>

<script>
/* import { compileExamples } from './compileExamples'; */
import BookingList from './components/booking-list.vue';
import NewEntryModal from './components/newEntry-PopUp.vue';

export default {
  name: 'App',
  components: {
    BookingList, NewEntryModal
  },
  data(){
    return{
      showModal: false,
      showBookingList: true,  
    }
  },
  methods:{
    toggleModal(){
      this.showModal = !this.showModal;
      if(this.showModal == false){
        this.forceReloadList()   
      }
      
    },
    forceReloadList() {
        // Remove my-component from the DOM
        this.showBookingList = false;

        this.$nextTick(() => {
          // Add the component back in
          this.showBookingList = true;
        });
    },

    /* sortX_orario(){
      this.reservationData = this.reservationData.sort((a, b) => {

        //se le ore sono uguali passo ai minuti
        if(a.ora.match(/\d+/g)[0] == b.ora.match(/\d+/g)[0]){
          return parseInt(a.ora.match(/\d+/g)[1]) - parseInt(b.ora.match(/\d+/g)[1])
        }
        //senno confronto le ore
        else{
          return parseInt(a.ora.match(/\d+/g)[0]) - parseInt(b.ora.match(/\d+/g)[0])
        }   
      })
      this.forceShowBookingList()
    },
    sortX_coperti(){
      this.reservationData = this.reservationData.sort((a, b) => a.coperti - b.coperti)
      this.forceShowBookingList()
    } */
  },
  /* mounted(){
    this.reservationData = compileExamples(10)  //TODO set a examples creator
    this.forceShowBookingList()
  } */
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
