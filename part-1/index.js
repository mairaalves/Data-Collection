const express = require("express");
const bodyParser = require('body-parser');
const app = express();
const mongoose = require('mongoose');
app.use(bodyParser.json());
const productsRouter = require("./src/products");


mongoose
.connect(`mongodb://${process.env.DATA_BASE}:${process.env.MONGO_DB_PORT}/platform`, {
    useNewUrlParser: true
})
.then(result => {
    console.log('MongoDB Conectado');
})
.catch(error => {
    console.log(error);
});


app.use("/products", productsRouter);

app.listen(3000, ()=>{console.log("iniciando na porta 3000")});
