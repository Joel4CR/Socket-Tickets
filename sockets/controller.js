const TicketControl = require("../models/control.ticket");


const ticketControl= new TicketControl()


const socketController = (socket) => {

    console.log(ticketControl.lastFour);
    
    socket.emit('load-public',(
        [ticket1 ,ticket2, ticket3, ticket4 ]=ticketControl.lastFour
        ))
    
    socket.emit('load-ticket',ticketControl.lastOne)

    socket.emit('desktop-listen',ticketControl.tickets.length)
    

    socket.on('next-ticket', (payload,callback) => {
        
     const ticket= ticketControl.ticketNew()
     socket.broadcast.emit('desktop-listen',ticketControl.tickets.length)
     
     callback(ticket) 
     
    })


    socket.on('listen-ticket',({desktop},callback)=>{

        if (!desktop) {
            return callback({
                ok:false,
                msg:"El escritorio es obligatorio"
            })            
        }

        const ticket=  ticketControl.listenTicket(desktop)

        socket.emit('desktop-listen',ticketControl.tickets.length)
        socket.broadcast.emit('desktop-listen',ticketControl.tickets.length)
      
      if(!ticket){
        callback({
            ok:false,
            msg:"Ya no hay tickets disponibles"})
        }
      else{
        callback({
            ok:true,
            ticket})
        }
            
        })
}



module.exports = {
    socketController
}

