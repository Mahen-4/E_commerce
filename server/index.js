const express = require('express')
const app = express()

const port = 3001
const cors = require("cors")
const axios = require("axios")
const mysql = require("mysql")
const bcrypt = require("bcrypt")
const bodyParser = require("body-parser")
const cookieParser = require("cookie-parser")
const session = require("express-session")
const jwt = require("jsonwebtoken")

// const https = require("https")
// const fs = require("fs");
require('dotenv').config()
// const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY)


app.use(express.json())
app.use(cors({
    origin:["http://localhost:3000"],
    methods: ["GET", "POST"],
    credentials: true,
}))

app.use(cookieParser())
app.use(bodyParser.urlencoded({extended:true}));

app.use(session({
    key: "userID",
    secret: process.env.SESSION_SECRET_KEY,//Normaly Very long random secret string but here we don't care about that
    resave: false,
    saveUninitialized: false,
    cookie:{
        expires: 60*60*24 //24h
    }
     
}))

app.get("/", (req,res) => {
    res.send("oKAY")
})

// get product from the API
const getProducts = async()=>{
    try {
        return await axios.get('https://dummyjson.com/products')
    } catch (error) {
        console.log(error)
    }
}

// send product details to front
app.get('/products', async(req,res)=>{
    const products = await getProducts()
    console.log(products.data)
    res.send(products.data)
});

// connect to mysql
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "ecommerce_react_node"
});


// test connection with mysql
db.connect((err)=>{
    if(err){
        console.log(err)
    }
   else{
    console.log("connected !")
   }
})

//insert into db
app.post("/registering", async(req,res)=>{

    const username = req.body.username;
    const password = await bcrypt.hash(req.body.password,10);

    db.query(
        "SELECT * FROM users WHERE username = ?",
        [username],
        (err,result)=>{
            if(err) throw err;
            if(result.length > 0){
                res.send({message: "username already exist !"})
            }
            else{
                db.query(
                    "INSERT INTO users (username, password) VALUES (?,?)",
                    [username, password],
                    (err, result) => {
                        console.log(err)
                    }
                )
            }
        })

    
})

//login
app.post("/log_IN", async(req,res)=>{
    const username = req.body.username;
    const password =req.body.password;

    db.query(
        "SELECT * FROM users WHERE username = ?",
        [username],
        async(err,result) =>{
            if(err){
                res.send({err: err})
            }
            if(result.length > 0){
                const passwordTRUE = await bcrypt.compare(password, result[0].password)
                if(passwordTRUE){
                    
                    const id = result[0].id
                    const token = jwt.sign({id},process.env.JWT_SECRET_KEY,{
                        expiresIn: 300, //5min
                    })
                    req.session.user = result
                    res.json({auth:true, token: token, result: result[0].username})
                }
                else{
                    res.json({auth:false, message: "Wrong Password"})
                }
               
            }else{
                res.json({auth:false, message: "Wrong Username"})
            }
        }
    )
})

// is there a session active ?
app.get("/log_IN", (req,res)=>{
    if(req.session.user){
        res.send({loggedIN: true, user: req.session.user[0].username})
    }
    else{
        res.send({loggedIN: false})
    }
})

const verifyJWT = (req,res,next) => {
    const token =  req.headers["x-access-token"] //grab the token

    if(!token){
        res.send("Need a token to go there ! ")
    }else{
        jwt.verify(token,process.env.JWT_SECRET_KEY, (err,decoded)=>{
            if(err){
                res.json({auth: false, message: "Authentication failed"})
            }else{
                req.userId = decoded.id;
                next()
            }
        })
    }
}

// auth test
app.get('/getProfil', verifyJWT, (req,res)=>{
    res.send("you are authenticated : your info ")
})

//-------------------------- STRIPE CODE -------------------------------------
// app.get('/config', (req, res) => {
//     res.send({
//         secretKey: process.env.STRIPE_PUBLISHABLE_KEY,
//     })
// })

// app.post("/create-payment-intent", async(req,res)=>{
//     const paymentIntent = await stripe.paymentIntents.create({
//         amount: 100,
//         currency: "eur",
//         payment_method_types: ['card']
//     });
//     res.send({ clientSecret: paymentIntent.client_secret})
// })
// // https.createServer(
// //     {
// //         key: fs.readFileSync("./key.pem"),
// //         cert: fs.readFileSync("./cert.pem"),
// //     },
// //     app
// // ).listen(port, ()=>{
// //     console.log("serv running https")
// // })


app.listen(port,()=>{
    console.log("server running")
});

