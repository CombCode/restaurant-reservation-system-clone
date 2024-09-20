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
        for(let reservation of DB_computedReservation){
            if(reservation == reservationObj){
                return reservation
            }
        }
    }
    static getSpecificDateReservations(dateObj){
        //empty array to return
        let specificDateReservations = []

        //input obj converted into only date string
        dateObj = dateObj.toISOString().split('T')[0]

        //loop in the DB array to find reservation objects with our date
        for(let reservation of DB_computedReservation){
             //DB iso string date converted into only date string
            let reservationDate = reservation.date.split('T')[0]

            if(reservationDate == dateObj){  
                specificDateReservations.push(reservation)
            }
        }
        return specificDateReservations
    }
}


