//dependencies
import express from 'express'
import bodyParser from 'body-parser';
import cors from 'cors'
import urlRoutes from './routes/urlRouter.js'

//usage
var app = express()
app.use(cors())
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true | true, parameterLimit: 1000000 }));

//routes and logic
app.use('/shortner',urlRoutes);

app.get("/",(req,res,next) => {
    res.status(200).json({"health":"services is up and running."})
});


var port = process.env.PORT || 8000
app.listen(port, () => { console.log(`App started at port ${port}`) })

