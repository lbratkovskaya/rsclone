const express = require('express');
const cors = require('cors');
const https = require('https');


const app = express();
app.use(cors());

app.get('/api', async (req, res) => {
    
    await https.get(`https://data-live.flightradar24.com/zones/fcgi/feed.js?bounds=${req.query.bounds}&faa=1&satellite=1&mlat=1&flarm=1&adsb=1&gnd=0&air=1&vehicles=1&estimated=1&maxage=14400`, (resp) => {
        let data = '';
    
        // A chunk of data has been received.
        resp.on('data', (chunk) => {
            data += chunk;
        });
    
        // The whole response has been received. Print out the result.
        resp.on('end', () => {
            res.send(data);
        });
  
    })
});

app.listen(3000, () => {
    console.log('used 3000 port for server');
})