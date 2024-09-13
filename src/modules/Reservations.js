import DB_Reservation from "../DB_reservation.json"

export class Reservation{
    constructor(name, day, hour, seats){
        this.nome = this.setName(name)
        this.day = this.setDay(day)
        this.hour = this.setHour(hour)
        this.seats = this.setSeats(seats)
        this.uid = Symbol()
        pushToDB(this)
    }

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

    setName(uid, name){

    }
    setDay(uid, day){

    }
    setHour(uid, hour){

    }
    setSeats(uid, seta){

    }

    getNome(uid){

    }
    getDay(uid){

    }
    getHour(uid){

    }
    getSeats(uid){

    }
}