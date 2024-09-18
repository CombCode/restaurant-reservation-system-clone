
//TODO il sistema di editing delle entry

<template>
    <div>
        <!-- day chooser bar -->
        <div class="my-5 flex flex-row justify-center max-[600px]:flex-col items-center">  
            <!-- seen with the day chooser -->
            <div v-if="!showAll" class="flex flex-row flex-grow justify-center p-2 w-3/4 border-r-2 border-solid border-red-900">
                <p @click="prevDate()" class="font-mono font-bold text-2xl rounded px-2 cursor-pointer hover:bg-red-900 hover:text-white" ><</p>
                <p class="text-xl font-mono font-bold w-40">{{selectedDateLabel}}</p>   
                <p @click="nextDate()" class="font-mono font-bold text-2xl rounded px-2 cursor-pointer hover:bg-red-900 hover:text-white">></p>
            </div>
            <div class="w-1/4 flex flex-col">
                <button
                class=" bg-red-100 hover:bg-red-900 hover:text-white text-black text-sm rounded-e-xl ml-2 mr-4 my-1"
                @click="sortByTime"
                >Sort by hour</button>
                <button
                class=" bg-red-100 hover:bg-red-900 hover:text-white text-black text-sm rounded-e-xl ml-2 mr-4 my-1"
                @click="sortBySeats"
                >Sort by seats</button>
            </div>
        </div>

        <!-- legenda -->
        <div class="grid border-b-2 border-solid border-grey-200 mb-4 max-[600px]:invisible" :class="{ 'grid-cols-5' : showAll, 'grid-cols-4' : !showAll}">
            <p class="text-red-900">actions</p>
            <p class="text-red-900">name</p>
            <p class="text-red-900">hour</p>
            <p class="text-red-900">seats</p>
        </div>

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
import { ref, toRaw } from 'vue';
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

        //request reservations //TODO make this an async function
        let selectedDate_Reservations = ref()
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
            console.log("selectedDate_Reservations prePRE", selectedDate_Reservations.value)
        }
        
        //sorting logic
        function sortByTime(){
            selectedDate_Reservations.value.sort((a, b) => {
                const aHH = parseInt(a.hour.slice(0, 2))
                const bHH = parseInt(b.hour.slice(0, 2))
                const aMM = parseInt(a.hour.slice(3, 5))
                const bMM = parseInt(b.hour.slice(3, 5))
                if(aHH - bHH == 0){
                    return aMM - bMM
                }
                else{
                    return aHH - bHH
                }
            })
        }
        let toggleSortingSeatsDirection = 0
        function sortBySeats(){
            //switching sorting big->small to small->big and so on  
            if(toggleSortingSeatsDirection %2 == 0){
                selectedDate_Reservations.value.sort((a, b) => {return a.seats - b.seats})
            }
            else{
                selectedDate_Reservations.value.sort((a, b) => {return b.seats - a.seats})
            }
            toggleSortingSeatsDirection++
        }

        //--------------------------------------------------------------
        return{
            showAll,
            selectedDateLabel,
            selectedDate, selectedDate_Reservations, prevDate, nextDate,
            sortByTime, sortBySeats
        }
    },

        /* handle_azioneRichiesta(code, uuid){
            console.log("code: ", code)
            console.log("uuid: ", uuid)
            this.$emit("eseguiAzioneSuEntry", code, uuid)
        }, */

}
</script>

<style>
</style>