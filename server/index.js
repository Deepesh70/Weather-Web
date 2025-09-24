const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

//Middleware
app.use(cors());
app.use(express.json());

app.get('/api/weather', async function(req, res){
    try{
        const {city} = req.query;

        if(!city){
            return res.status(400).json({message: 'City name is required '});

        }

        const apiKey = process.env.OPENWEATHER_API_KEY;
        const apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

        const response = await axios.get(apiURL);

        res.json(response.data);

    } catch(error){
        console.error('Error fetching weather data:', error);

        if(error.response){
            res.status(error.response.status).json({message: error.responser.data.message});
        }else{
            res.status(500).json({message: 'Error fetching weather data'});
        }
    }
});

app.listen(PORT, () => {
    console.log(`Server is runnning on port http://localhost:${PORT}`);
});