import express from 'express';
import cors from 'cors';
import sesion from 'express-session';
import dotenv from 'dotenv';
import  SequelizStore  from 'connect-session-sequelize';
import db from "./config/database.js"
import session from 'express-session';
import UserRoute from "./routes/UserRoute.js";
import ProductRoute from "./routes/ProductRoute.js";
import AuthRoute from "./routes/AuthRoute.js"

dotenv .config();

const app = express();

const sessionStore = SequelizStore(sesion.Store);

const Store= new sessionStore({
    db:db
})

app.use(session({
    secret: process.env.SESS_SECRET,
    resave: false,
    saveUninitialized: false,
    store: Store,
    cookie:{
        secure: 'auto'
    }
}))

app.use(express.json())
app.use(UserRoute);
app.use(ProductRoute);
app.use(AuthRoute);

// Store.sync();

app.use(cors({
    credentials:true,
    origin: 'http://localhost:3000'
}))

app.listen(process.env.APP_PORT,()=>{
    console.log('server running ')
})
