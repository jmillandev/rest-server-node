// Esto es un ejemplo de un server en Nodejs, sin paquetes de 3ros

const http = require('http')

http.createServer( (req, res) => {
    res.writeHead(200, {'Content-Type': 'application/json'})

    data = {
        'success': true,
        'message': "Hello Word!",
        'url': req.url
    }

    res.write(JSON.stringify(data))
    res.end()
})
.listen(8080)

console.log("Escuchando el puerto 8080!")