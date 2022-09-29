// Referencias del HTML
const desktopNum = document.querySelector('h1');
const btnNext= document.querySelector('button');
const ticketListen= document.querySelector('small');
const msgTextNoTicket= document.querySelector('.alert');
const lblPendientes=document.querySelector('#lblPendientes')

console.log('Escritorio HTML');


const searchParams=new URLSearchParams(window.location.search)

if (!searchParams.has('escritorio')) {
    window.location="index.html"
    throw new Error("Debe insertar algun escritorio")
}

 const desktop= searchParams.get("escritorio")
 desktopNum.innerText=desktop

 msgTextNoTicket.style.display="none"


const socket = io();



socket.on('connect', () => {
    // console.log('Conectado');

    btnNext.disabled=false
    
});

socket.on('disconnect', () => {
    // console.log('Desconectado del servidor');

    btnNext.disabled=true
});


socket.on('desktop-listen', (ticketsNum) => {
    lblPendientes.innerText=ticketsNum
})



btnNext.addEventListener( 'click', () => {


    socket.emit('listen-ticket', {desktop},({ok,ticket,msg})=>{

        console.log(ok);
        if (!ok) {
            ticketListen.innerText="Empty"
          return  (
            msgTextNoTicket.style.display=""
            )
        }
            
        ticketListen.innerText="Ticket "+ ticket.number
    
    })
   console.log("Hi Joe");

});