const mysql = require('mysql');

//configurando servidor
const express = require('express');
const app = express();
const bodyparser = require('body-parser');
app.use(bodyparser.json())

//configurar servidor para apresentar arquivos estaticos
app.use(express.static('public'))
app.engine('html', require('ejs').renderFile);


//habilitar body do formulário
app.use(express.urlencoded({ extended: true })) 


//configurando a template engines
const nunjucks = require('nunjucks');
nunjucks.configure('./', {
    express: app,
    noCache: true,
})

// conexão com bd mysql
const mysqlConnection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'doadores'
});

mysqlConnection.connect((err) => {
    if (!err)
        console.log('BD Conectado com sucesso.')
    else
    console.log('Falha ao conectar no BD \n Erro:' + JSON.stringify(err, undefined, 2));
})


// criar, ligar o servidor e permitir acesso na porta 3000
app.listen(3000) 
    console.log("Iniciei o servidor!")

//configurar a apresentaçãoda página
app.get("/", function (req, res) {
    const doadores = []
    return res.render('index.html', {doadores: doadores});
})

//
app.get ('/doadores', (req, res) => {
    mysqlConnection.query('SELECT * FROM doadores', (err, rows, fildes) =>{
        if(!err)
        res.send(rows)
        else
        console.log(err)
    })
})

// receber dados do formulário
app.post("/", function (req, res) {
    //pegar dados do formulário
    const name = req.body.name
    const email = req.body.email
    const sangue = req.body.sangue

    //SE o name igual vazio 
    //OU o email igual vazio
    //OU o sangue  igual vazio
    if(name == "" || email == "" || sangue == "" ) {
        res.send("Todos os campos são obrigatórios.")

    }
}) 