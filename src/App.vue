<template>
  <div class="backgrownd bg-gray-500 w-screen h-screen fixed top-0 overflow-auto" >
    <div class="bg-white m-auto mt-6" :class="{blurr: showModal}">

      <!-- header -->
      <div class="bg-red-700 h-20 w-10 rounded-br-2xl my-0 -mb-20 "></div>
      <div class="header flex flex-row justify-start py-10 border-b-2 border-red-700">
        <h1 class=" text-red-700  text-3xl w-5/6 border-r-2 border-solid border-red-700 pt-6 font-bold">Booking List</h1>
        <button @click="toggleModal" class=" bg-red-100 hover:bg-red-700 hover:text-white text-black p-4 ml-2 rounded-e-xl mr-4">Add reservation</button>
      </div>

      <!-- lista booking -->
      <BookingList :reservationData="reservationData" @eseguiAzioneSuEntry="handleAzioneSuEntry" v-if="reloadList"></BookingList>
      
      <!-- sorting tab -->
      <div class="bg-gray-500 font-mono bold sortingTab flex justify-center flex-row max-[600px]:flex-col mb-6">
        <div class="p-5 mx-2 my-0 bg-white hover:bg-red-100 min-[600px]:rounded-b-2xl border-t-2" @click="sortX_orario">
          <p class="m-2 border p-2 rounded-2xl hover:bg-red-700 hover:text-white shadow shadow-black hover:shadow-2xl">Ordina per orario</p>
        </div>
        <div class="p-5 mx-2 my-0 bg-white hover:bg-red-100 min-[600px]:rounded-b-2xl border-t-2" @click="sortX_coperti">
          <p class=" m-2 border p-2 rounded-2xl hover:bg-red-700 hover:text-white shadow shadow-black hover:shadow-2xl">Ordina per coperti</p>
        </div>
      </div>
      
    </div>
    <NewEntryModal v-if="showModal" @close="handleNewReservation" :currentEntryToEdit={currentEntryToEdit}></NewEntryModal>
</div>
</template>

<script>
import { compileExamples } from './compileExamples';
import BookingList from './components/booking-list.vue';
import NewEntryModal from './components/newEntry-PopUp.vue';

import { isProxy, toRaw } from 'vue'; 

export default {
  name: 'App',
  components: {
    BookingList, NewEntryModal
  },
  data(){
    return{
      showModal: false,
      reloadList: true,
      currentEntryToEdit: { nome: '', giorno: '', ora: '', coperti: "", uuid: '' },

      reservationData: [],

      arrivedList: [],

      notShownlist: [],
       
    }
  },
  methods:{
    toggleModal(){
      this.showModal = !this.showModal;
      this.forceReloadList()
    },
    handleNewReservation(nome, giorno, ora, coperti, uuid){
      this.toggleModal()
      /* this.newReservationData.nome = nome
      this.newReservationData.giorno = giorno
      this.newReservationData.ora = ora
      this.newReservationData.coperti = coperti
      console.log("new reservation made: ", 
        this.newReservationData.nome, this.newReservationData.giorno, 
        this.newReservationData.ora, this.newReservationData.coperti) */

      //It is mandatory to have at least the day and hour (if not, discard the new entry).
      if(giorno && ora){
        let tempData = {nome: nome, giorno: giorno, ora: ora, coperti: coperti, uuid: uuid}
        this.reservationData.push(tempData)
        console.log(this.reservationData)
        this.currentEntryToEdit = { nome: '', giorno: '', ora: '', coperti: "", uuid: '' }
      }
      else{
        //just escaped form

      }
      
    },
    

    handleAzioneSuEntry(codiceRichiesta, uuid){
      //DEVO TROVARE UN'ALTRO MODO NO INDEX solo tramite uuid
      //quindi mi sa che tocca scorrere tutto l array e matchare l'id
      /*  let entryPos = this.reservationData.map(e => e.uuid).indexOf(uuid)  
          console.log("posizione entry nell'array: ", entryPos) */
      
      let selectedElem = {}
      this.reservationData.forEach((elem) => {
        if(elem.uuid === uuid){
          console.log("elem trovato", elem)
          selectedElem = toRaw(elem)  //vue 3 proxy dealing method
          console.log("selectedElem", selectedElem)
        }
      });
      console.log("indice di elemento su cui agire", this.reservationData.indexOf(selectedElem))
      this.reservationData.splice(this.reservationData.indexOf(selectedElem), 1)  

      //arrivato  |aggiungo alla lista degli arrivati e lo cancello dalla totale
      if(codiceRichiesta == "Arrived"){
         this.arrivedList.push(selectedElem)
         //this.reservationData.splice(entryPos, 1)
      }
      //non presentato  |aggiungo alla lista dei non presentati e lo cancello dalla totale
      else if(codiceRichiesta == "No-Show"){
         this.notShownlist.push(selectedElem)
         //this.reservationData.splice(entryPos, 1)
      }
      //eliminato |cancello dalla lista totale
      else if(codiceRichiesta == "Delete"){
         //this.reservationData.splice(entryPos, 1)
      }
      //edit  |lo cancello dalla lista e apro form di inserimento con già i dati di quello da editare
      //      |a fine procedmento avra un nuovo uuid
      else if(codiceRichiesta == "Edit"){

        //this.currentEntryToEdit = this.reservationData.splice(entryPos, 1)
        this.currentEntryToEdit.nome = selectedElem.nome
        this.currentEntryToEdit.giorno = selectedElem.giorno
        this.currentEntryToEdit.ora = selectedElem.ora
        this.currentEntryToEdit.coperti = selectedElem.coperti
        this.currentEntryToEdit.uuid = selectedElem.uuid

        console.log("EDITING: ", this.currentEntryToEdit)
        //this.reservationData.splice(entryPos, 1)
        this.showModal = true
      }
      else{
        //trow error / do nothing
      }

      this.forceReloadList()
    },
    forceReloadList() {
        // Remove my-component from the DOM
        this.reloadList = false;

        this.$nextTick(() => {
          // Add the component back in
          this.reloadList = true;
        });
    },

    sortX_orario(){
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
      this.forceReloadList()
    },
    sortX_coperti(){
      this.reservationData = this.reservationData.sort((a, b) => a.coperti - b.coperti)
      this.forceReloadList()
    }
  },
  mounted(){
    this.reservationData = compileExamples(10)
    this.forceReloadList()
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
