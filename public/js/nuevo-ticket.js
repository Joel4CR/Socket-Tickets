

console.log('Nuevo Ticket HTML');


// Referencias del HTML
const lblNewTicket  = document.querySelector('#lblNuevoTicket');
const btnGen = document.querySelector('button');



const socket = io();



socket.on('connect', () => {
   
    btnGen.disabled=false
 
});

socket.on('disconnect', () => {
     
    btnGen.disabled=true

});


socket.on('load-ticket', (ticket) => {
    lblNewTicket.innerText="Ticket "+ ticket
})



btnGen.addEventListener( 'click', () => {

    socket.emit('next-ticket',null,(ticket)=>{
        
        lblNewTicket.innerText=ticket
    })
});