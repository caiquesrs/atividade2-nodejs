const express = require("express");
const body = require("body-parser");
const app = express();
app.use(body.json())


const knexConfig = require('./knexfile')
const knex = require('knex')(knexConfig.development)

app.post("/produtos", function (req, res) {
    const dados = req.body;
    knex("produtos")
        .insert(dados)
        .then((dados) => {
            res.status(201).json({ id: dados[0] });
        })
        .catch((err) => {
            res.status(400).json({ message: err.message });
        });
});


app.get("/produtos", function (req, res) {
    knex('produtos').then((dados) => {
        res.json(dados)
    }).catch((err) => {
        res.json({ message: `erro ao selecionar os produtos ${err.message}` })
    });
});


app.get("/produtos/:id", function (req, res) {
    const id = req.params.id;
    knex('produtos').where('id', id).then((dados) => {
        res.json(dados)
    }).catch((err) => {
        res.json({ message: `erro ao selecionar os produtos ${err.message}` })
    })
});

app.put("/produtos/:id", function (req, res) {
    const id = req.params.id;
    const novoProduto = req.body
    knex('produtos').where('id', id).update(novoProduto).then((dados) => {
        res.send("Produto alterado com sucesso")
    }).catch((err) => {
        res.status(500).send({ message: `erro ao selecionar os produtos ${err.message}` })
})
});

app.delete("/produtos/:id", function (req, res) {
    const id = req.params.id;
    knex('produtos').where('id', id).del().then((dados) => {
        res.send("produto deletado com sucesso")
    }).catch((err) => {
        res.send({ message: `erro ao selecionar os produtos ${err.message}` })
         })
});

app.listen(3000, "0.0.0.0", function () {
    console.log("Servidor rodando na porta 3000");
});

