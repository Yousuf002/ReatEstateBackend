const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const app = express();
const port = process.env.PORT || 5000;
const cors = require('cors'); 

app.use(cors());
app.use(express.json());

const projectRouter = require('./routes/Project');
const fileRouter = require('./routes/File');
const fileverificationRouter = require('./routes/FileVerification')
//import formouter
const formRouter = require('./routes/Form');
app.use('/projects', projectRouter);
app.use('/files', fileRouter);
app.use('/file-verification', fileverificationRouter);
//use formrouter
app.use('/form', formRouter);
mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('Error connecting to MongoDB:', err));
app.listen(port, () => {
    console.log(`Server started at port ${port}`);
});
