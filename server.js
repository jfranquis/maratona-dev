


//configurando servidor
const express = require('express');
const server = express();


//configurar servidor para apresentar arquivos estaticos
server.use(express.static('public'))


//habilitar body do formulário
server.use(express.urlencoded({ extended: true })) 


//configurar conexão com bando de dados.
const Pool = require('pg').Pool
const db = new Pool({
    host: process.env.DB_HOST,
    port: 3306,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
  });


//configurando a template engines
const nunjucks = require('nunjucks');
nunjucks.configure('./', {
    express: server,
    noCache: true,
})


//configurar a apresentaçãoda página
server.get("/", function (req, res) {
    const doadores = []
    return res.render("index.html",{ doadores })
})


// receber dados do formulário
server.post("/", function (req, res) {
    //pegar dados do formulário
    const name = req.body.name
    const email = req.body.email
    const sangue = req.body.sangue

    if (name == "" || email == "" || sangue == "" ) {
        return res ("Todos os campos são obrigatórios.")
    }


// colocar valor dentro do banco de dados
    const query = 
    `INSERT INTO doadores ("id", "name", "email", "sangue")
     VALUES ($1, $2, $3, $4)`

     const values = [ "name", "email", "sangue"]
    
     db.query(query, values, function (err) {
         if (err) return res.send("Erro no banco de dados.")


         return res.redirect("/")
     })
    
})


// criar, ligar o servidor e permitir acesso na porta 3000
server.listen(3000, function (req, res) {
    console.log("Iniciei o servidor!")
})



