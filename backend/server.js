
const express = require('express');
const app = express();
const cors = require('cors');
const userRouter = require('./route/userRoutes');

app.use(express.json());

var corOptions = {
    origin: true
}
app.use(cors(corOptions));

app.use('/user', userRouter)

app.use(express.urlencoded({ extended: true }))
app.listen(8080, () => {
    console.log('server running on port 8080');
})