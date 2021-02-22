const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors');
const FoodModel = require('./models/Food')

const app = express()

app.use(express.json())

var allowedOrigins = ['http://localhost:3000'];
app.use(cors({
    origin: function (origin, callback) {
        // allow requests with no origin 
        // (like mobile apps or curl requests)
        if (!origin) return callback(null, true);
        if (allowedOrigins.indexOf(origin) === -1) {
            var msg = 'The CORS policy for this site does not ' +
                'allow access from the specified Origin.';
            return callback(new Error(msg), false);
        }
        return callback(null, true);
    }
}));

mongoose.connect("mongodb://localhost:27017", {
    dbName: 'food',
    useNewUrlParser: true,
}, err => err ? console.log(err) : console.log('Connected to database'));

app.post('/insert', async (req, res) => {
    const { foodName, days } = req.body
    const food = new FoodModel({ foodName: foodName, lastAte: days });

    try {

        await food.save()
        res.send("Inserted data")

    } catch (error) {
        console.log(error)
        res.send(error)
    }
})

app.listen(3001, () => {
    console.log('Server running')
})


//await