const express= require('express');
const app= express();
require('dotenv').config();
const cors= require('cors');
app.use(cors({
    origin:['http://localhost:5173','https://mychamber.vercel.app']
}))



PORT= process.env.PORT || 3001


app.use(express.json());

const authRouter= require('./routes/authRoute')
const doctorRouter= require('./routes/doctorRoute');
const quickRouter= require('./routes/quickRoute');
const emailVerifier= require('./utils/emailVerify')

app.use('/api/auth', authRouter);
app.use('/api/doctor', doctorRouter);
app.use('/api/doctor', quickRouter);
app.use('/api', emailVerifier)



app.get('', (req, res)=>{
    res.json("Server Running");
})


app.listen(PORT, ()=>{
    console.log(`Running on ${PORT}`);
})