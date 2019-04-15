const request = require('request')

// const url = 'https://api.darksky.net/forecast/150d57a07eb94dfc3e013a1d8ea8ac0a/37.8267,-122.4233?unit=si'

// request({ url:url , json:true }, (error,response) => {
    
//     if(error){
//         console.log('Unable to connect location services!')
//     }else if(response.body.error){
//         console.log('Unable to find location!')
//     }else{
//     // console.log(response)

//         //Befor 'json' property becomes true
//     // const data = JSON.parse(response.body)
//     // console.log(data.currently)

//         //After 'json' property is true 
//     // console.log(response.body.currently)

//     console.log(response.body.daily.data[0].summary)
//     console.log('It is currently '+response.body.currently.temperature+' degree out today!')
//     console.log('There is '+response.body.currently.precipProbability+"% chance of rain today!")
//         }
//     })


const forcast = (longitude,lattitude,callback) => {

    const url = 'https://api.darksky.net/forecast/150d57a07eb94dfc3e013a1d8ea8ac0a/'+lattitude+','+longitude+'?unit=si'

    request( {url:url , json:true}, (error, { body } ) => {
        if(error){
            callback('Unable to connect wheather services!', undefined)
        }else if(body.error){
            callback('Unable to find location!',undefined)
        }else{
            
            // fohrenheit = response.body.currently.temperature
            // celsius = ((fohrenheit - 32) * 5 / 9).toFixed(2)            
            celsius = ((body.currently.temperature - 32) * 5 / 9).toFixed(2) //tofixed(2) for 2 digit after decimal
            maxTemp = ((body.daily.data[0].temperatureHigh - 32) * 5 / 9).toFixed(2)
            minTemp = ((body.daily.data[0].temperatureLow - 32) * 5 / 9).toFixed(2)
            callback(undefined , body.daily.data[0].summary+' It is currently '+celsius+' degree out today! Max temparature is '+ maxTemp +' and Min temprature is '+ minTemp +' There is '+body.currently.precipProbability+"% chance of rain today!")
        }

    })
}

module.exports = forcast