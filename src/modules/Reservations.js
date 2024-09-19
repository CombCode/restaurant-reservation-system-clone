import { reservations as DB_Reservation } from "../DB_reservation.js";
import { toRaw } from "vue";

export class Reservation{
    constructor(name, date, hour, seats){
        this.setName(name) 
        this.setDate(date)
        this.setHour(hour) 
        this.setSeats(seats) 
        this.uid = Symbol()
    }

    //setters
    setName(name){
        if(stringExistAndNotEmpty(name) && name.length >= 2 && name.length <= 20){
            this.name = name
        }
        else{
            throw new Error("name must be beetween 2 and 20 letters")
        }
    }
    setDate(date){
        if(stringExistAndNotEmpty(date)){
            this.date = date.toISOString()
        }
        else{
            throw new Error("date not valid")
        }
    }
    setHour(hourObj){
        if(stringExistAndNotEmpty(hourObj)){
            let hh = hourObj.hours
            let mm = hourObj.minutes
            this.hour = hh + ":" + mm
        }
        else{
            throw new Error("hour not valid")   //TODO specificare poi perchè non valida
        }
    }
    setSeats(seats){
        if(isNaN(seats) || parseInt(seats) < 0 || parseInt(seats) > 99){
            throw new Error("seats number must be a number from 0 to 99") //TODO mby a better english lol
        }
        else{
            this.seats = seats
        }
    }

    //static metods
    static pushToDB(obj){
        DB_Reservation.push(obj)   //the db is an array of objects
    }
    static getReservationFromDB(reservationObj){   //TODO see if better to pass obj or uid
        for(let reservation of DB_Reservation){
            if(reservation == reservationObj){
                return reservation
            }
        }
    }
    static deleteFromDB(reservationObj){
        DB_Reservation.splice(DB_Reservation.indexOf(toRaw(reservationObj)), 1) 
    }
    static getReservationsSortedBy(value){
        if(value == "hour"){

        }
        else if(value == "seats"){

        }
        else{

        }
    }
    static getSpecificDateReservations(dateObj){
        //empty array to return
        let specificDateReservations = []

        //input obj converted into only date string
        dateObj = dateObj.toISOString().split('T')[0]

        //loop in the DB array to find reservation objects with our date
        for(let reservation of DB_Reservation){
             //DB iso string date converted into only date string
            let reservationDate = reservation.date.split('T')[0]

            if(reservationDate == dateObj){  
                specificDateReservations.push(reservation)
            }
        }
        return specificDateReservations
    }
    static getAllReservations(){    //only for debugging purpose
        return DB_Reservation
    }
}

/* ---------- end of class ---------- */

function stringExistAndNotEmpty(string) {   //hoisted right?
    if(string == "" || string == null || string == " " ){
        return false
    }
    else{
        return true
    }
}

