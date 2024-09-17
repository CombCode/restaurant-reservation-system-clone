ci sono essenzialmente 3 funzioni
1) visualizzare la lista, con lo showAll che però va reimplementato
2) il sistema di sorting 
3) il sistema di editing delle entry

iniziamo a settorializzarle


<template>
    <div>
        <!-- day chooser bar -->
        <div class="my-5 flex flex-row justify-center max-[600px]:flex-col">  
            <!-- seen with the day chooser -->
            <div v-if="!showAll" class="flex flex-row flex-grow justify-center">
                <p @click="prevDate()" class="font-mono font-bold text-2xl rounded px-2 cursor-pointer hover:bg-red-900 hover:text-white" ><</p>
                <p class="text-xl font-mono font-bold w-40">{{selectedDateLabel}}</p>   
                <p @click="nextDate()" class="font-mono font-bold text-2xl rounded px-2 cursor-pointer hover:bg-red-900 hover:text-white">></p>
            </div>
            <!-- seen of all reservation. deprecated -->
            <!-- <div class="flex flex-row justify-right mx-10">
                <input type="checkbox" id="showAll" class="py-auto" v-model="showAll">
                <label for="showAll" class="pt-1">Show All</label>
            </div> -->

        </div>

        <!-- legenda -->
        <div class="grid border-b-2 border-solid border-grey-200 mb-4 max-[600px]:invisible" :class="{ 'grid-cols-5' : showAll, 'grid-cols-4' : !showAll}">
            <p class="text-red-900">actions</p>
            <p class="text-red-900">name</p>
            <p class="text-red-900">hour</p>
            <p class="text-red-900">seats</p>
        </div>

  
        <!-- list -->
        <!-- vista con tutte le prenotazioni -->
        <!-- <div v-if="showAll">
            <ul v-for="(entry, index) in reservationData" :key="entry.uuid" class="grid grid-cols-5 py-2 h-auto hover:bg-gray-200 items-center max-[600px]:grid-cols-1 max-[600px]:border max-[600px]:border-red-900">
                <actionsOnEntry @azioneRichiesta="handle_azioneRichiesta($event,entry.uuid)"></actionsOnEntry>
                <li>{{entry.nome}}</li>
                <li v-if="giornoLook == 'data'">{{entry.giorno}}</li>
                <li v-if="giornoLook == 'giorno'">{{giorniDellaSettimanaArray[index]}}</li>
                <li>{{entry.ora}}</li>
                <li>{{entry.coperti}}</li>
            </ul>
        </div> -->

        <!-- selected day reservation -->
        <div v-if="!showAll">
            <ul v-for="reservation of selectedDate_Reservations" :key="reservation.uid" 
            class="grid grid-cols-4 py-2 h-auto
            hover:bg-gray-200 items-center 
            max-[600px]:grid-cols-1 max-[600px]:border max-[600px]:border-red-900">
                <actionsOnEntry> <!-- @azioneRichiesta="handle_azioneRichiesta($event,reservation.uid)" --></actionsOnEntry>
                <li>{{reservation.name}}</li>
                <li>{{reservation.hour}}</li>
                <li>{{reservation.seats}}</li>
            </ul>
        </div> 
    </div>
</template>

<script>
import actionsOnEntry from './actionsOnEntry.vue';
import { isProxy, toRaw, ref } from 'vue';
import { Reservation } from '@/modules/Reservations';

export default {
    components: {
        actionsOnEntry
    },

    setup(){
        let showAll = ref(false)    //TODO delete in a close future


        //date to show logic
        let selectedDate = ref(new Date()) //init at today
        let selectedDateLabel = ref("")
        updateLabel()

        //request reservations
        let selectedDate_Reservations = ref([])
        getSelectedDateReservations()

        function nextDate(){
            //make the selected day the next
            selectedDate.value.setDate(selectedDate.value.getDate() + 1)
            updateLabel()
            getSelectedDateReservations()
        }
        function prevDate(){
            //make the selected day the previous
            selectedDate.value.setDate(selectedDate.value.getDate() - 1)
            updateLabel()
            getSelectedDateReservations()
        }
        
        //select date lable handling
        function updateLabel(){
            selectedDateLabel.value = weekDayConverter(selectedDate.value.getDay()) + " " + selectedDate.value.getDate() + "/" + selectedDate.value.getMonth()
        }
        function weekDayConverter(n){
            switch(n){
                case 0: return "Sunday"   
                case 1: return "Monday"
                case 2: return "Tuesday"
                case 3: return "Wednesday"
                case 4: return "Thursday"
                case 5: return "Friday"
                case 6: return "Saturday"
            }
        }

        //reservation list handling
        function getSelectedDateReservations(){
            selectedDate_Reservations.value = Reservation.getSpecificDateReservations(selectedDate.value) //objects array
        }
       

        //--------------------------------------------------------------
        return{
            showAll,
            selectedDateLabel,
            selectedDate, selectedDate_Reservations, prevDate, nextDate,
        }
    },

    /* watch: {
        reservationData(newValue, oldValue) {
            console.log("rimontando la lista")
            //this.$forceUpdate()
            
        }
    }, */

        /* handle_azioneRichiesta(code, uuid){
            console.log("code: ", code)
            console.log("uuid: ", uuid)
            this.$emit("eseguiAzioneSuEntry", code, uuid)
        }, */

        /* changeGiornoLook(){
            if(this.giornoLook == "giorno"){
                this.giornoLook = "data"
            }
            else if(this.giornoLook == "data"){
                this.giornoLook = "giorno"
                this.popolate_giorniDellaSettimanaArray()
            }
        }, */

        /* popolate_giorniDellaSettimanaArray(){
            this.giorniDellaSettimanaArray = []

            this.reservationData.forEach((element) => {
                console.log("popolamento giorni della settimana")
                console.log(toRaw(element.giorno))
                let date = toRaw(element.giorno)
                let dateObj = new Date((date.match(/\d+/g)[2]), (date.match(/\d+/g)[1]-1), (date.match(/\d+/g)[0]))    //(year, monthIndex, day)
                console.log(dateObj)
                let dayOfTheWeek = this.findDayOfWeek(dateObj.getDay())
                console.log("dayOfTheWeek", dayOfTheWeek)
                console.log("giorniDellaSettimanaArray", this.giorniDellaSettimanaArray)
                this.giorniDellaSettimanaArray.push(dayOfTheWeek)
            }); */
}
</script>

<style>
</style>