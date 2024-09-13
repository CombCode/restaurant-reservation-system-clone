<template>

  <!-- blurred container -->
  <div 
  class="backgrownd bg-red-200 bg-opacity-50 w-screen h-screen fixed top-0 bg-cover"
  @click.self="escForm">

    <!-- modal window -->
    <div 
    class="modal bg-red-50 my-20 mx-40 flex flex-col justify-around items-center rounded-xl shadow-2xl shadow-black 
    max-[600px]:mx-0"
    @keyup.enter="sendData">
      
      <!-- title -->
      <h1 
      class="my-5 text-3xl font-bold text-red-600"
      >Dati prenotazione</h1>

      <!-- name input -->
      <label for="nome">nome</label>
      <input type="text" id="nome" v-model="nome" class="formInput">

      <!-- day input -->
      <label for="giorno">giorno</label>
      <VueDatePicker class="formInput" v-model="date" @update:model-value="parsingDateformat" locale="it" auto-apply :enable-time-picker="false" :format="format" input-class-name="dp-custom">
        <template #input-icon="{ clear }">
        </template>
        <template #clear-icon="{ clear }">
        </template>
      </VueDatePicker>

      <!-- hour input -->
      <label for="ora">ora</label>
      <VueDatePicker v-model="time" time-picker @update:model-value="parsingHourformat" locale="it" :start-time="startTime" minutes-increment="15" minutes-grid-increment="15" :min-time="{ hours: 12, minutes: 0 }" :max-time="{ hours: 22, minutes: 0 }" input-class-name="dp-custom" class="formInput">
        <template #input-icon="{ clear }">
        </template>
        <template #clear-icon="{ clear }">
        </template>
      </VueDatePicker>

      <!-- seats input -->
      <label for="coperti">coperti</label>
      <input type="text" id="coperti" v-model="coperti" class="formInput">

      <!-- feedback output -->
      <p class="text-red-600 my-3 text-xs px-2 rounded-xl" v-if="feedbackInputgiorno" :class="{ glow : highLight }">{{feedbackInputgiorno}}</p>
      <p class="text-red-600 my-3 text-xs px-2 rounded-xl" v-if="feedbackInputOra" :class="{ glow : highLight }">{{feedbackInputOra}}</p>
      <p class="text-red-600 my-3 text-xs px-2 rounded-xl" v-if="feedbackInputCoperti" :class="{ glow : highLight }">{{feedbackInputCoperti}}</p>

      <!-- send data -->
      <button class=" bg-red-300 hover:bg-red-700 hover:text-white text-black rounded my-5 max-w-fit p-2" @click="sendDataset"> Aggiungi</button>

    </div>
  </div>
</template>
  
<script>
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';
import { ref } from 'vue';

export default {
  
  props:["currentEntryToEdit"],
  setup(){
    let nome = ref("")
    let giorno = ref("")
    let ora = ref("")
    let coperti = ref("")
    let uuid = ref("")

    let feedbackInputgiorno = ref("")
    let feedbackInputOra = ref("")
    let feedbackInputCoperti = ref("")

    let highLight = ref(false)
    let date = ref("")
    let time = ref("")

    let format = ""
    let startTime = { hours: 12, minutes: 0 }

    /* //check prop
    console.log("MOUNTED", JSON.parse(JSON.stringify(this.currentEntryToEdit)).currentEntryToEdit)
      if (this.currentEntryToEdit !== ""){
        let parsedEntry = JSON.parse(JSON.stringify(this.currentEntryToEdit)).currentEntryToEdit
        this.nome.value = parsedEntry.nome
        this.giorno.value = parsedEntry.giorno
        this.ora.value = parsedEntry.ora
        this.coperti.value = parsedEntry.coperti
        this.uuid.value = parsedEntry.uuid
      }
      else{} */

    function generaUUID(){
      if(this.uuid.value == ""){
        const uuid = crypto.randomUUID();
        console.log(uuid);
        //check in the data for the same uuid, if so, pick another

        this.uuid.value = uuid
      }
      else{}
    }

    function escForm(){
      this.nome.value = ""
      this.ora.value = ""
      this.giorno.value = ""
      this.uuid.value = ""
      this.coperti.value = ""
      this.$emit("close")
    }

    function sendDataset(){
      this.highLight_Activation()

      this.feedbackInputData = ""
      this.feedbackInputCoperti = ""

      //assegno una variabile al risultato dei controlli sennò si crea un bug nella
      //visualizzazione degli alert di errore in quanto nell'if i controlli vengono throwati non uniformemente
      const dataOk = this.checkOra()
      const giornoOk = this.checkgiorno()
      const copertiOk = this.checkCoperti()

      if(dataOk && giorno.valueOk && copertiOk){
        console.log(this.nome.value, this.giorno.value, this.ora.value, this.coperti.value)

        //unique ID
        this.generaUUID()

        //nome fittizio in caso di campo vuoto
        if(this.nome.value == ""){
          this.nome.value = "<Nessun Nome>"
        }

        this.$emit("close", this.nome.value, this.giorno.value, this.ora.value, this.coperti.value, this.uuid.value)

        this.nome.value = ""
        this.giorno.value = ""
        this.ora.value = ""
        this.coperti.value = ""
        this.uuid.value = ""
        }
      else{}  
    }

    function checkOra(){
      /* if(isNaN(this.ora) || parseInt(this.ora) < 1 || parseInt(this.ora) > 24){
        this.feedbackInputData = "inserisci un orario valido (numero da 1 a 24)"
        return false
      }
      else{
        return true
      } */
      if(this.ora.value == "" || this.ora.value == null || this.ora.value == " "){
        this.feedbackInputOra = "inserisci un orario valido"
        return false
      }
      else{
        this.feedbackInputOra = ""
        return true
      }
    }

    function checkgiorno(){
      if(this.giorno.value == "" || this.giorno.value == null || this.giorno.value == " "){
        this.feedbackInputgiorno.value = "inserisci un giorno valido"
        return false
      }
      else{
        this.feedbackInputgiorno = ""
        return true
      }
    }

    function checkCoperti(){
      if(isNaN(this.coperti.value) || parseInt(this.coperti.value) < 0 || parseInt(this.coperti.value) > 99){
        this.feedbackInputCoperti = "inserisci un numero di coperti da 0 a 99"
        return false
      }
      else{
        this.feedbackInputCoperti = ""
        return true
      }
    }

    function parsingDateformat(){
      console.log("la data grezza è: ", this.date)
      //parsing di Date Sat Apr 06 2024 01:14:00 GMT+0200 (Ora legale dell’Europa centrale)
        //non necessario. calendario fornisce this.format come output della data (senza l'ora)
      this.format = (date) => {
        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();

        this.giorno.value = day + " " + month + " " + year;


        return `${day}/${month}/${year}`;
      }
    }

    function parsingHourformat(){
      console.log("l' ora grezza è: ", this.time)
      //parsing di this.time

      const timeObj = JSON.parse(JSON.stringify(this.time))
      console.log("l' ora parsata è: ",timeObj)

      this.ora.value = timeObj.hours + ":" + timeObj.minutes

    }

    function highLight_Activation(){
      this.highLight = true
      setTimeout(() => {this.highLight = false}, 2000)
    }
    
    return{
      nome, giorno, ora, coperti, uuid,
      generaUUID, escForm, sendDataset,
      checkOra, checkgiorno, checkCoperti,
      parsingDateformat, parsingHourformat, highLight_Activation
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
    0% {background-color: white;}
    50% {background-color: rgba(255, 0, 0, 0.5);}
    100% {background-color: white;}
  }
</style>