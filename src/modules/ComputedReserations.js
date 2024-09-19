//child class of reservations

    import { Reservation } from "./Reservations";
    import { computedReservations as DB_computedReservation } from "../DB_computedReservation.js";

    const acceptedTags = ['arrived', 'noShow', 'edit', 'delete']

    export class ComputedReservation extends Reservation{
        constructor(name, date, hour, seats, tag){
            super(name, date, hour, seats)
            this.setTag(tag)
        }

        setTag(tag) {
            if(acceptedTags.includes(tag)){
                this.tag = tag
            }
            else{
                throw new Error("tag not valid")
            }
        }

         //static metods
    static pushToDB(obj){
        DB_computedReservation.push(obj) //the db is an array of objects
    }
    static getReservationFromDB(reservationObj){   //TODO see if better to pass obj or uid
        for(let reservation of DB_ComputedReservation){
            if(reservation == reservationObj){
                return reservation
            }
        }
    }
}


