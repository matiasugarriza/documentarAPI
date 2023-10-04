


 module.exports = {
    io.on('connection', (socket)=>{
        console.log('User conectado')
        socket.emit('wellcome', 'Usuario conectado con servidor')
    
        socket.on('newMessage', (data)=>{
            messages.push(data)
            io.sockets.emit('allMessages', messages)
        })
        socket.on('addToCart', (pid) =>{
            let managerMongo = new ManagerMongo
            let Schema = CartManager
            if (cart == 0){
               managerMongo
            }
        }
         )
     }) 
 }