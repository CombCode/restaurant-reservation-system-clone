<template>
  <div class="backgrownd bg-red-200 bg-opacity-50 w-screen h-screen fixed top-0 bg-cover" @click.self="escForm">
    <div class="modal bg-red-50 my-20 mx-40 flex flex-col justify-around items-center rounded-xl shadow-2xl shadow-black max-[600px]:mx-0 " @keyup.enter="sendData">

      <h1 class=" my-5 text-3xl font-bold text-red-600 ">Dati prenotazione</h1>

      <label for="nome">nome</label>
      <input type="text" id="nome" v-model="nome" class="formInput">

      <label for="giorno">giorno</label>  
      <!-- <input type="text" id="giorno" v-model="giorno"> -->
      <VueDatePicker class="formInput" v-model="date" @update:model-value="parsingDateformat" locale="it" auto-apply :enable-time-picker="false" :format="format" input-class-name="dp-custom">
        <template #input-icon="{ clear }">
        </template>
        <template #clear-icon="{ clear }">
        </template>
      </VueDatePicker>

      <label for="ora">ora</label>
      <!-- <input type="text" id="ora" v-model="ora">  -->
      <VueDatePicker v-model="time" time-picker @update:model-value="parsingHourformat" locale="it" :start-time="startTime" minutes-increment="15" minutes-grid-increment="15" :min-time="{ hours: 12, minutes: 0 }" :max-time="{ hours: 22, minutes: 0 }" input-class-name="dp-custom" class="formInput">
        <template #input-icon="{ clear }">
        </template>
        <template #clear-icon="{ clear }">
        </template>
      </VueDatePicker>

      <label for="coperti">coperti</label>
      <input type="text" id="coperti" v-model="coperti" class="formInput">

      <!-- feedback input -->
      <p class="text-red-600 my-3 text-xs px-2 rounded-xl" v-if="feedbackInputGiorno" :class="{ glow : highLight }">{{feedbackInputGiorno}}</p>
      <p class="text-red-600 my-3 text-xs px-2 rounded-xl" v-if="feedbackInputOra" :class="{ glow : highLight }">{{feedbackInputOra}}</p>
      <p class="text-red-600 my-3 text-xs px-2 rounded-xl" v-if="feedbackInputCoperti" :class="{ glow : highLight }">{{feedbackInputCoperti}}</p>

      <button class=" bg-red-300 hover:bg-red-700 hover:text-white text-black rounded my-5 max-w-fit p-2" @click="sendDataset"> Aggiungi</button>

    </div>
  </div>
</template>
  
<script>
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';

export default {
  
  props:[
    "currentEntryToEdit"
  ],
  
  data () {
    return {
        nome: "",
        giorno: "",
        ora: "",
        coperti: "",
        uuid: "",

        feedbackInputGiorno: "",
        feedbackInputOra: "",
        feedbackInputCoperti: "",

        highLight: false,
        date: "",
        time: "",

        format: "",
        startTime: { hours: 12, minutes: 0 },
    }
  },
  mounted() {

    //check prop
    console.log("MOUNTED", JSON.parse(JSON.stringify(this.currentEntryToEdit)).currentEntryToEdit)
      if (this.currentEntryToEdit !== ""){
        let parsedEntry = JSON.parse(JSON.stringify(this.currentEntryToEdit)).currentEntryToEdit
        this.nome = parsedEntry.nome
        this.giorno = parsedEntry.giorno
        this.ora = parsedEntry.ora
        this.coperti = parsedEntry.coperti
        this.uuid = parsedEntry.uuid
      }
      else{}
    },

    //init calendar
    

  methods: {
    generaUUID(){
      if(this.uuid == ""){
        const uuid = crypto.randomUUID();
        console.log(uuid);
        //check in the data for the same uuid, if so, pick another

        this.uuid = uuid
      }
      else{}
    },

    escForm(){
      this.nome = ""
      this.ora = ""
      this.giorno = ""
      this.uuid = ""
      this.coperti = ""
      this.$emit("close")
    },


    sendDataset(){
      this.highLight_Activation()

      this.feedbackInputData = ""
      this.feedbackInputCoperti = ""

      //assegno una variabile al risultato dei controlli sennò si crea un bug nella
      //visualizzazione degli alert di errore in quanto nell'if i controlli vengono throwati non uniformemente
      const dataOk = this.checkOra()
      const giornoOk = this.checkGiorno()
      const copertiOk = this.checkCoperti()



      if(dataOk && giornoOk && copertiOk){
        console.log(this.nome, this.giorno, this.ora, this.coperti)

        //unique ID
        this.generaUUID()

        //nome fittizio in caso di campo vuoto
        if(this.nome == ""){
          this.nome = "<Nessun Nome>"
        }

        this.$emit("close", this.nome, this.giorno, this.ora, this.coperti, this.uuid)

        this.nome = ""
        this.giorno = ""
        this.ora = ""
        this.coperti = ""
        this.uuid = ""
        }
      else{}  
    },


    checkOra(){
      /* if(isNaN(this.ora) || parseInt(this.ora) < 1 || parseInt(this.ora) > 24){
        this.feedbackInputData = "inserisci un orario valido (numero da 1 a 24)"
        return false
      }
      else{
        return true
      } */
      if(this.ora == "" || this.ora == null || this.ora == " "){
        this.feedbackInputOra = "inserisci un orario valido"
        return false
      }
      else{
        this.feedbackInputOra = ""
        return true
      }
    },
    checkGiorno(){
      if(this.giorno == "" || this.giorno == null || this.giorno == " "){
        this.feedbackInputGiorno = "inserisci un giorno valido"
        return false
      }
      else{
        this.feedbackInputGiorno = ""
        return true
      }
    },
    checkCoperti(){
      if(isNaN(this.coperti) || parseInt(this.coperti) < 0 || parseInt(this.coperti) > 99){
        this.feedbackInputCoperti = "inserisci un numero di coperti da 0 a 99"
        return false
      }
      else{
        this.feedbackInputCoperti = ""
        return true
      }
    },


    parsingDateformat(){
      console.log("la data grezza è: ", this.date)
      //parsing di Date Sat Apr 06 2024 01:14:00 GMT+0200 (Ora legale dell’Europa centrale)
        //non necessario. calendario fornisce this.format come output della data (senza l'ora)
      this.format = (date) => {
        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();

        this.giorno = day + " " + month + " " + year;


        return `${day}/${month}/${year}`;
      }
    },
    parsingHourformat(){
      console.log("l' ora grezza è: ", this.time)
      //parsing di this.time

      const timeObj = JSON.parse(JSON.stringify(this.time))
      console.log("l' ora parsata è: ",timeObj)

      this.ora = timeObj.hours + ":" + timeObj.minutes

    },

    highLight_Activation(){
      this.highLight = true
      setTimeout(() => {this.highLight = false}, 2000)
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