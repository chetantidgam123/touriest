const express = require('express')
const port = 5000;
const app = express()
const moongoose = require('mongoose')
const cors = require('cors')
const morgan = require('morgan');
const userRouter = require('./routes/user');

app.use(morgan('dev'))
app.use(express.json({ limit: "30mb", extended: true }))
app.use(express.urlencoded({ limit: "30mb", extended: true }))
app.use(cors())


const MONGODB_URL = "mongodb://chetantidgam1997:Chetan7756@ac-co12sa3-shard-00-00.3owxokz.mongodb.net:27017,ac-co12sa3-shard-00-01.3owxokz.mongodb.net:27017,ac-co12sa3-shard-00-02.3owxokz.mongodb.net:27017/touriest?ssl=true&replicaSet=atlas-xzsavh-shard-0&authSource=admin&retryWrites=true&w=majority"


app.use('/users', userRouter)

moongoose.connect(MONGODB_URL).then(() => {
    app.listen(port, () => {
        console.log('server on 500');
    })
}).catch((err) => console.log(`${err} db not connected`))