const path = require('path');
const fs = require('fs');

class Ticket{
    constructor(number,desktop){
    this.number=number
    this.desktop=desktop
}
}

class TicketControl{

    constructor(){
        this.lastOne=0
        this.day=new Date().getDate()
        this.tickets=[]
        this.lastFour=[]

        this.init()
    }
     get toJson() {
        return{
        day:this.day,
        lastOne:this.lastOne,
        tickets:this.tickets,
        lastFour:this.lastFour
        }
    }

    init(){
        const {day,lastOne,tickets,lastFour} = require('../db/database.json');

        if (day==this.day) {
            this.lastOne=lastOne
            this.tickets=tickets
            this.lastFour=lastFour
        }
        else{
        this.saveDB()
    }
    }
    
    saveDB(){
        const data = path.join(__dirname,"../db/database.json")
         fs.writeFileSync(data,JSON.stringify(this.toJson))
    }

    ticketNew(){
        this.lastOne += 1
        const ticket =new Ticket(this.lastOne,null)
        this.tickets.push(ticket)
        this.saveDB()
        return 'Ticket '+ticket.number
    }
    
    listenTicket(desktop){

        if (this.tickets.length===0) {
            return null
        }
        const ticket= this.tickets.shift() // this.tickets[0]
        ticket.desktop=desktop

        this.lastFour.unshift(ticket)
        if (this.lastFour.length>4) {
            this.lastFour.splice(-1,1)
        }
        this.saveDB()
        return ticket
    }


}

module.exports=TicketControl