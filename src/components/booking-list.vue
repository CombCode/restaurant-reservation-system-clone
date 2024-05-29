<template>
    <div>
        <!-- day chooser bar -->
        <div class="my-5 flex flex-row justify-center max-[600px]:flex-col">
            
            <div v-if="!showAll" class="flex flex-row flex-grow justify-center">
                <p @click="changeDay('down')" class="font-mono font-bold text-2xl rounded px-2 cursor-pointer hover:bg-red-900 hover:text-white" ><</p>
                <p class="text-xl font-mono font-bold">{{requestedWeekDay}} {{requestedDay}}</p>   
                <p @click="changeDay('up')" class="font-mono font-bold text-2xl rounded px-2 cursor-pointer hover:bg-red-900 hover:text-white">></p>
            </div>

            <div class="flex flex-row justify-right mx-10">
                <input type="checkbox" id="showAll" class="py-auto" v-model="showAll">
                <label for="showAll" class="pt-1">Show All</label>
            </div>

        </div>

        <!-- header legenda -->
        <div class="grid border-b-2 border-solid border-grey-200 mb-4 max-[600px]:invisible" :class="{ 'grid-cols-5' : showAll, 'grid-cols-4' : !showAll}">
            <p class="text-red-900">azioni</p>
            <p class="text-red-900">nome</p>
            <div v-if="showAll" class="flex flex-row justify-center">
                <p @click="changeGiornoLook" class="text-red-900 font-bold rounded px-2 cursor-pointer hover:bg-red-900 hover:text-white" ><</p>
                <p class="text-red-900 mx-1">{{giornoLook}}</p>
                <p @click="changeGiornoLook" class="text-red-900 font-bold rounded px-2 cursor-pointer hover:bg-red-900 hover:text-white">></p>
            </div>
            <p class="text-red-900">ora</p>
            <p class="text-red-900">coperti</p>
        </div>


        <!-- lista -->
            <!-- vista con tutte le prenotazioni -->
        <div v-if="showAll">
            <ul v-for="(entry, index) in reservationData" :key="entry.uuid" class="grid grid-cols-5 py-2 h-auto hover:bg-gray-200 items-center max-[600px]:grid-cols-1 max-[600px]:border max-[600px]:border-red-900">
                <actionsOnEntry @azioneRichiesta="handle_azioneRichiesta($event,entry.uuid)"></actionsOnEntry>
                <li>{{entry.nome}}</li>
                <li v-if="giornoLook == 'data'">{{entry.giorno}}</li>
                <li v-if="giornoLook == 'giorno'">{{giorniDellaSettimanaArray[index]}}</li>
                <li>{{entry.ora}}</li>
                <li>{{entry.coperti}}</li>
            </ul>
        </div>
            <!-- vista con solo le prenot del giorno -->
        <div v-if="!showAll">
            <ul v-for="entry of reservationData_SelectedDay" :key="entry.uuid" class="grid grid-cols-4 py-2 h-auto hover:bg-gray-200 items-center max-[600px]:grid-cols-1 max-[600px]:border max-[600px]:border-red-900">
                <actionsOnEntry @azioneRichiesta="handle_azioneRichiesta($event,entry.uuid)"></actionsOnEntry>
                <li>{{entry.nome}}</li>
               <!--  <li>{{entry.giorno}}</li> -->
                <li>{{entry.ora}}</li>
                <li>{{entry.coperti}}</li>
            </ul>
        </div>
        
    </div>
</template>

<script>
import actionsOnEntry from './actionsOnEntry.vue';
import { isProxy, toRaw } from 'vue';

    export default {
        components: {
            actionsOnEntry
        },
        props: [
            "reservationData"
        ],
        data(){
            return{ 

                giornoLook: "data",
                giorniDellaSettimanaArray: [],

                requestedWeekDay: "",
                requestedDay: "",

                showAll: false,

                reservationData_SelectedDay: [],
            }
        },
        mounted() {
            const d = new Date()
            const weekDay = d.getDay()  //day of te week from 0 to 6
            
            let weekDayW = this.findDayOfWeek(weekDay)

            const day = d.getDate()
            const month = d.getMonth() + 1 // .getUTCMonth non usa la timezone locale ma la +00
            const year = d.getFullYear()

            this.requestedWeekDay = weekDayW
            console.log("giorno della settimana on mount num: ", weekDay)
            console.log("giorno della settimana on mount parola: ", weekDayW)
            this.requestedDay = day + "/" + month + "/" + year

            this.popolate_reservationData_SelectedDay() //potrei usare anche una listen su this.request day

            this.propChanged = !this.propChanged

            this.popolate_giorniDellaSettimanaArray()
        },

        /* watch: {
            reservationData(newValue, oldValue) {
                console.log("rimontando la lista")
                //this.$forceUpdate()
                
            }
        }, */


        methods:{
            handle_azioneRichiesta(code, uuid){
                console.log("code: ", code)

                /* const parentUl = event.target.closest('ul');   //bastava usare "event"... assurdo
                console.log(parentUl);
                
                const parentEntryUuid = parentUl.dataset.entryUuid;
                console.log("parentEntryUuid: ", parentEntryUuid) */
                console.log("uuid: ", uuid)
                
                this.$emit("eseguiAzioneSuEntry", code, uuid)
            },

            changeGiornoLook(){
                if(this.giornoLook == "giorno"){
                    this.giornoLook = "data"
                }
                else if(this.giornoLook == "data"){
                    this.giornoLook = "giorno"
                    this.popolate_giorniDellaSettimanaArray()
                }
            },

            popolate_giorniDellaSettimanaArray(){
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
                });
            },
            findDayOfWeek(weekDay){
                if(weekDay == 0)
                    return "domenica"
                else if(weekDay == 1)
                    return "lunedi"
                else if(weekDay == 2)
                    return "martedi"
                else if(weekDay == 3)
                    return "mercoledi"
                else if(weekDay == 4)
                    return "giovedi"
                else if(weekDay == 5)
                    return "venerdi"
                else if(weekDay == 6)
                    return "sabato"
            },

            changeDay(strReq){
                
                //pulisco la lista attuale
                this.reservationData_SelectedDay = []

                //identifico giorno selezionato attualmente
                let dayNum = parseInt(this.requestedDay.match(/\d+/g)[0])
                let monthNum = parseInt(this.requestedDay.match(/\d+/g)[1])
                let yearNum = parseInt(this.requestedDay.match(/\d+/g)[2])
                console.log("giorno regen: ", dayNum)
                console.log("mese regen: ", monthNum)
                console.log("anno regen: ", yearNum)

                let currentDaySelected = new Date(yearNum, monthNum-1, dayNum) //-1 per l'indicizzazione dei mesi
                console.log("data completa oggetto post regen: ", currentDaySelected)


                if(strReq == "up"){
                    console.log("up")

                    //giorno successivo
                    let dayAfter = new Date(yearNum, monthNum-1, dayNum);
                    dayAfter.setDate(currentDaySelected.getDate()+1);
                    console.log("dayAfter: ", dayAfter)

                    //cambio variabili per giorno successivo
                    let m = (dayAfter.getMonth() + 1) % 12 || 12;
                    this.requestedDay = dayAfter.getDate() + "/" + m + "/" + dayAfter.getFullYear()

                    //cambio nome giorno settimana
                    this.requestedWeekDay = this.findDayOfWeek(dayAfter.getDay())

                    this.popolate_reservationData_SelectedDay()

                }
                else if(strReq == "down"){
                    console.log("down")

                    //giorno precedente
                    let dayBefore = new Date(yearNum, monthNum-1, dayNum);
                    dayBefore.setDate(currentDaySelected.getDate()-1);
                    console.log("dayBefore: ", dayBefore)

                    //cambio variabili per giorno successivo
                    let m = dayBefore.getMonth()+1
                    this.requestedDay = dayBefore.getDate() + "/" + m + "/" + dayBefore.getFullYear()

                    //cambio nome giorno settimana
                    this.requestedWeekDay = this.findDayOfWeek(dayBefore.getDay())

                    this.popolate_reservationData_SelectedDay()
                }     
            },

            popolate_reservationData_SelectedDay(){ //sarebbe meglio farla asincrona poi e non caricare tutte le prenotazioni in mounted
                console.log("popolamento dati del giorno selezionato")
                for(let i=0; i < this.reservationData.length; i++){
                   console.log("array reservation data.giorno: ",this.reservationData[i].giorno )
                   console.log("array reservation data.giorno match day: ",this.reservationData[i].giorno.match(/\d+/g)[0])

                   //se giorno della prenot. in this.reservationData == selectedDay allora push in reservationData_SelectedDay
                    if(this.reservationData[i].giorno.match(/\d+/g)[0] == this.requestedDay.match(/\d+/g)[0]
                        && this.reservationData[i].giorno.match(/\d+/g)[1] == this.requestedDay.match(/\d+/g)[1]
                        && this.reservationData[i].giorno.match(/\d+/g)[2] == this.requestedDay.match(/\d+/g)[2]
                        ){
                            this.reservationData_SelectedDay.push(this.reservationData[i])
                        }
                    else{}
                    
                }
            },
            
        },
    }
</script>

<style>
</style>