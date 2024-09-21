<template>
    <div>
        <!-- day chooser bar -->
        <div class=" flex justify-center flex-col items-center
        md:flex-row md:my-5">  
            <!-- day chooser label -->
            <div class="flex flex-row justify-center items-center py-6 w-3/4
            md:border-r-2 md:border-solid md:border-red-900">
                <p @click="prevDate()" 
                class="border-red-200 rounded font-mono font-bold text-2xl  rounded-l-xl px-2 cursor-pointer hover:bg-red-900 hover:text-white
                md:border-0" ><</p>
                <p 
                class="text-xl font-mono font-bold w-40 mx-6
                md:mx-0">{{selectedDateLabel}}</p>   
                <p @click="nextDate()" 
                class="border-red-200 font-mono font-bold text-2xl rounded-r-xl px-2 cursor-pointer hover:bg-red-900 hover:text-white
                md:border-0">></p>
            </div>
            <!-- sorting buttons -->
            <div class="w-full rounded-e-xl flex flex-row justify-evenly
            md:flex-col md:w-1/4 md:ml-2 md:mr-4">
                <button
                class=" bg-red-100 hover:bg-red-900 hover:text-white text-black text-sm my-1 p-4 rounded
                md:rounded-e-xl md:p-0"
                @click="sortByTime"
                >Sort by hour</button>
                <button
                class=" bg-red-100 hover:bg-red-900 hover:text-white text-black text-sm my-1 p-4 rounded
                md:rounded-e-xl md:p-0"
                @click="sortBySeats"
                >Sort by seats</button>
                <!-- show all button -->
                <button
                class="text-sm my-1 p-4 rounded
                md:rounded-e-xl md:p-0"
                :class="{'bg-red-900 text-white ': showAll, 'bg-red-100 text-black': !showAll}"
                @click="toggleShowAll"
                >Show all</button>
            </div>
        </div>

        <!-- legenda -->
        <div class="grid border-b-2 border-solid border-grey-200 mb-4 invisible grid-cols-4
        md:visible">
            <p class="text-red-900">actions</p>
            <p class="text-red-900">name</p>
            <p class="text-red-900">hour</p>
            <p class="text-red-900">seats</p>
        </div>

        <!-- selected day reservations -->
        <div>
            <ul v-for="reservation of selectedDate_Reservations" :key="reservation.uid">
                <div 
                class="grid py-2 h-auto grid-cols-2 grid-rows-3 border-t border-red-900 mx-5
                hover:bg-gray-200 items-center 
                md:grid-cols-4 md:grid-rows-1 md:border-t-0 md:mx-0"
                :class="{'bg-green-200': reservation.tag == 'arrived', 'bg-orange-200': reservation.tag == 'noShow'}">
                    <actionsOnEntry @actionOnReservation="(action) => handleActionOnReservation(action, reservation)"
                    class="col-span-1 row-span-3"
                    :class="{'pointer-events-none': reservation.tag}">
                    </actionsOnEntry>
                    <li class="grid grid-cols-2 grid-rows-1 md:grid-cols-1">
                        <p class="text-sm text-gray-500 md:invisible">name:</p>
                        <p>{{reservation.name}}</p>
                    </li>
                    <li class="grid grid-cols-2 grid-rows-1 md:grid-cols-1">
                        <p class="text-sm text-gray-500 md:invisible">hour:</p>
                        <p>{{reservation.hour}}</p>
                    </li>
                    <li class="grid grid-cols-2 grid-rows-1 md:grid-cols-1">
                        <p class="text-sm text-gray-500 md:invisible">seats:</p>
                        <p>{{reservation.seats}}</p>
                    </li>
                </div>

            </ul>
        </div>
    </div>
</template>

<script>
import actionsOnEntry from './actionsOnEntry.vue';
import { ref, toRaw } from 'vue';
import { Reservation } from '@/modules/Reservations';
import { ComputedReservation } from '@/modules/ComputedReserations';

export default {
    components: {
        actionsOnEntry
    },

    setup(props, { emit }){

        //date to show logic
        let selectedDate = ref(new Date()) //init at today
        let selectedDateLabel = ref("")
        updateLabel()

        //request reservations //TODO make this an async function
        let selectedDate_Reservations = ref()   //list view reload when this var change
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

        //Actions on reservations handling
        function handleActionOnReservation(action, reservation){
            switch(action){
                case "arrived" : {
                    //new computedReservation object
                    let computedReservation
                    try{
                        computedReservation = new ComputedReservation(reservation.name, selectedDate.value, reservation.hour, reservation.seats, "arrived")
                    }
                    catch(error){
                        console.log("error")
                        //TODO
                    }
                    //save the new object on computed DB
                    ComputedReservation.pushToDB(computedReservation)
                    //delete from general DB
                    Reservation.deleteFromDB(reservation)
                    break
                }
                case "noShow" : {
                    //new computedReservation object
                    let computedReservation 
                    try{
                        computedReservation = new ComputedReservation(reservation.name, selectedDate.value, reservation.hour, reservation.seats, "noShow")    
                    }
                    catch(error){
                        console.log("error")
                        //TODO
                    }
                    //save the new object on computed DB
                    ComputedReservation.pushToDB(computedReservation)
                    //delete from general DB
                    Reservation.deleteFromDB(reservation)
                    break
                }
                case "edit" : {
                    //delegate to App.js and than to newEntry-PopUp the creation of
                    //a new sobstitute reservation 
                    emit("editReservation", reservation)
                    //delete from general DB the wrong one
                    Reservation.deleteFromDB(reservation)
                    break
                }
                case "delete" : {
                    Reservation.deleteFromDB(reservation)
                    break
                }
            }
            //trigger the reload of list view
            getSelectedDateReservations()
        }

        //show All function handling
        let showAll = ref(false)
        function toggleShowAll(){

            showAll.value = !showAll.value

            //computed reservation objs array
            let computed_reservations = ComputedReservation.getSpecificDateReservations(selectedDate.value) //objects array

            if(showAll.value){ 
                //adding the computed reservations to the view selected date reservations array
                selectedDate_Reservations.value = selectedDate_Reservations.value.concat(computed_reservations)
            }
            else{
                //subtract the computed reservations to the view selected date reservations array
                selectedDate_Reservations.value = selectedDate_Reservations.value.filter(res => !computed_reservations.includes(toRaw(res)))
            }
        }


        //--------------------------------------------------------------
        return{
            showAll, toggleShowAll,
            selectedDateLabel,
            selectedDate, selectedDate_Reservations, prevDate, nextDate,
            sortByTime, sortBySeats,
            handleActionOnReservation  
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