const express = require('express')
const app = express()
const fetch = require('node-fetch');


app.set('view engine', 'ejs')

// Async function med 3 requests, alla hämtar data från olika städer
let cities = async () => {
  // try gör så att man försöker koden och sen ifall något gör fel avslutar man try och catch kör istället där man får error
    try{
      //request 1, jag hämtar stockholms data och sen extraherar temperaturen från .main.temp ifrån API
      let Response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=stockholm&units=metric&appid=10b4612fbea7aa55e920f65dafaca399`);
      const StockholmResponse = await Response.json();
      let StockholmTemp =  StockholmResponse.main.temp

      let Response2 = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=madrid&units=metric&appid=10b4612fbea7aa55e920f65dafaca399`);
      const MadridResponse = await Response2.json();
      let MadridTemp =  MadridResponse.main.temp

      let Response3 = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=frankfurt&units=metric&appid=10b4612fbea7aa55e920f65dafaca399`);
      const FrankfurtResponse = await Response3.json();
      let FrankfurtTemp =  FrankfurtResponse.main.temp

      //jag skapar en array som jag lägger all data i som jag sen return för att använda längre ner i koden
      let temperatures = []
      temperatures.push(StockholmTemp)
      temperatures.push(MadridTemp)
      temperatures.push(FrankfurtTemp)
      console.log(temperatures)
      return temperatures
    } catch(err){
      console.log('Something went wrong')
    }
  }

  // jag avrundar all min data till närmsta heltal så ifall värdet är 3.4 blir det 3 ifall det värdet är 3.5 blir det 4.
  app.get('/', async (req,res) => {
    const data = await cities();
    let StockholmTemperatur = Math.round(data[0])
    let MadridTemperatur = Math.round(data[1])
    let FrankfurtTemperatur = Math.round(data[2])
// jag render index.ejs och ger den värdena nedanför som jag sedan använder i EJS filen för att visa värdena.
    res.render('index',{StockholmTemperatur,MadridTemperatur,FrankfurtTemperatur})

    
  
})

// det här använde jag innan jag använde EJS för att skriva ut data direkt från app.js

  // res.write('<h1>Stockholm: ' + Math.round(data[0]) +' grader</h1>')
    // res.write('<h1>Madrid: ' + Math.round(data[1])+' grader</h1>')
    // res.write('<h1>Frankfurt: ' + Math.round(data[2]) +' grader</h1>')
    // res.send()


app.listen(3000, () => {
    console.log('Up And Running')
    })



// app.get('/cities', async (req,res) => {
//     const data = await cities();
//      return res.json(data)
     
// }) 




// Det här var en annan metod jag testade som funkade men fick lite problem med att ibland laddade inte all data in, när jag refreshade sidan
// så fick jag bara 1/3 requests eller 2/3 requests så jag valde att ta en annan metod framåt

//  const https = require('https')

// app.get('/', (req,res) => {
//     const stockholm = "https://api.openweathermap.org/data/2.5/weather?q=Stockholm&units=metric&appid=10b4612fbea7aa55e920f65dafaca399"
//     const madrid = "https://api.openweathermap.org/data/2.5/weather?q=madrid&units=metric&appid=10b4612fbea7aa55e920f65dafaca399"
//     const frankfurt = "https://api.openweathermap.org/data/2.5/weather?q=frankfurt&units=metric&appid=10b4612fbea7aa55e920f65dafaca399"
//     https.get(stockholm,(response) =>{
//     response.on("data",(data) => {
//         const weatherData = JSON.parse(data)
//         const temp = weatherData.main.temp
//         res.write('<h1>the temperature is ' + temp +'C ' +'in Stockholm.</h1>')
//     })
//     })
//     https.get(madrid,(response) =>{
//     response.on("data",(data) => {
//         const weatherData = JSON.parse(data)
//         const temp = weatherData.main.temp
//         res.write('<h1>the temperature is ' + temp +'C ' +'in Madrid.</h1>')
//     })
//     })
//     https.get(frankfurt,(response) =>{
//     response.on("data",(data) => {
//         const weatherData = JSON.parse(data)
//         const temp = weatherData.main.temp
//         res.write('<h1>the temperature is ' + temp +'C ' +'in Frankfurt.</h1>')
//          res.send()
//     })
//     })
   
// } )

