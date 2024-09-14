import DB_Reservation from "../DB_reservation.json"

export class Reservation{
    constructor(name, date, hour, seats){
        this.nome = this.setName(name) 
        this.date = this.setDate(date) 
        this.hour = this.setHour(hour) 
        this.seats = this.setSeats(seats) 
        this.uid = Symbol()
        //pushToDB(this)
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
            this.date = date
        }
        else{
            throw new Error("date not valid")
        }
    }
    setHour(hour){
        if(stringExistAndNotEmpty(hour)){
            this.hour = hour
        }
        else{
            throw new Error("hour not valid")   //TODO specificare poi perchè non valida
        }
    }
    setSeats(seats){
        if(isNaN(seats) || parseInt(seats) < 0 || parseInt(seats) > 99){
            throw new Error("seats number must be a number from 0 to 99") //TODO mby a better englich
        }
        else{
            this.seats = seats
        }
    }

    //getters
    getNome(uid){

    }
    getDate(uid){

    }
    getHour(uid){

    }
    getSeats(uid){

    }
    
    //static metods
    static pushToDB(obj){
        DB_Reservation.push(obj)   //the db is an array of objects
    }
    static getReservationFromDB(uid){   //TODO see if better to pass obj or uid
        for(reservation of DB_Reservation){
            if(reservation.uid == uid){
                return DB_Reservation
            }
        }
    }
    static deleteFromDB(uid){
        for(reservation of DB_Reservation){
            if(reservation.uid == uid){
                DB_Reservation.splice(DB_Reservation.indexOf(reservation), 1)
            }
        }
    }
    static getAllReservations(){

    }
    static getReservationsSortedBy(value){
        if(value == "hour"){

        }
        else if(value == "seats"){

        }
        else{
            
        }
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