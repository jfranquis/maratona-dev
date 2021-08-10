//configurando servidor
const express = require('express');
const server = express();

//configurar servidor para apresentar arquivos estaticos
server.use(express.static('public'))


//configurando a template engines
const nunjucks = require('nunjucks');
nunjucks.configure('./', {
    express: server
})


//configurar a apresentaçãoda página
server.get("/", function (req, res) {
    return res.render("index.html")
})

// criar, ligar o servidor e permitir acesso na porta 3000
server.listen(3000, function (req, res) {
    console.log("Iniciei o servidor!")
})



