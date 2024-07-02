const express= require('express');
const app= express();
require('dotenv').config();
const cors= require('cors');
app.use(cors({
    origin:['http://localhost:5173']
}))



PORT= process.env.PORT || 3001


app.use(express.json());

const authRouter= require('./routes/authRoute')
const doctor= require('./routes/doctorRoute');
const quick= require('./routes/quickRoute');

app.use('/api/auth', authRouter);
app.use('/api/doctor', doctor);
app.use('/api/doctor', quick);


console.log(new Date().toLocaleString().slice(0, 21));

app.get('', (req, res)=>{
    res.json("Server Running");
})



app.listen(PORT, ()=>{
    console.log(`Running on ${PORT}`);
})