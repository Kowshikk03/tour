const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const beachlist = require('./routes/beachlistrout');
const userRoutes = require('./routes/profileuser');



dotenv.config();


const app = express();
app.use(express.json());
app.use(cors());

const dbConnect = require('./config/db');
dbConnect();

const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);



const beachRoutes = require('./routes/beachRoutes');
app.use('/api/beaches', beachRoutes);


app.use('/api', beachlist);

app.use('/api/user', userRoutes);




const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


