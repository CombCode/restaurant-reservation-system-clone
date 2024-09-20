//popolate with some examples the reservations DB
import { Reservation } from "./Reservations";

export function createExamples(){
    let today = new Date()
    let tomorrow = new Date();      tomorrow.setDate(today.getDate() + 1)
    let yesterday = new Date();     yesterday.setDate(today.getDate() - 1)

    let names = ["Marco", "Emily", "Luca", "Sarah", "Giulia", "James", "Elena", "Michael", "Sara", "John", "Alessandro"]
    let hours = ["12:15", "13:30", "14:45", "15:00", "16:20", "17:35", "18:50", "19:05", "20:10", "21:25", "22:00"]
    let seats = [2, 5, 3, 8, 1, 4, 6, 10, 7, 25, 3]
    
    //5 examples for today
    for(let i=0; i < 5; i ++){
        let newReservation = new Reservation(names[i], today, hours[i], seats[i])
        Reservation.pushToDB(newReservation)
    }
    //3 examples for yesterday
    for(let i=5; i < 8; i ++){
        let newReservation = new Reservation(names[i], yesterday, hours[i], seats[i])
        Reservation.pushToDB(newReservation)
    }
    //3 examples for tomorrow
    for(let i=8; i < 11; i ++){
        let newReservation = new Reservation(names[i], tomorrow, hours[i], seats[i])
        Reservation.pushToDB(newReservation)
    }

    console.log("reservatios DB: ", Reservation.getAllReservations())
}
