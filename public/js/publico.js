

console.log('Público HTML')



// Referencias del HTML
const  ticket1 = document.querySelector('#lblTicket1')
const desktop1= document.querySelector("#lblEscritorio1")

const  ticket2 = document.querySelector('#lblTicket2')
const desktop2= document.querySelector("#lblEscritorio2")

const  ticket3 = document.querySelector('#lblTicket3')
const desktop3= document.querySelector("#lblEscritorio3")

const  ticket4 = document.querySelector('#lblTicket4')
const desktop4= document.querySelector("#lblEscritorio4")

const socket = io();




socket.on('load-public', ([ tickets1 ,tickets2, tickets3, tickets4 ]) => {
    
    if (!tickets1) {
        return null
    }
    ticket1.innerText= "Ticket "+ tickets1.number
    desktop1.innerText= tickets1.desktop
    
    if (!tickets2) {
        return null
    }
    ticket2.innerText= "Ticket "+ tickets2.number
    desktop2.innerText= tickets2.desktop
    
    if (!tickets3) {
        return null
    }
    ticket3.innerText= "Ticket "+ tickets3.number
    desktop3.innerText= tickets3.desktop

    if (!tickets4) {
        return null
    }
    ticket4.innerText= "Ticket "+ tickets4.number
    desktop4.innerText= tickets4.desktop

    
})


