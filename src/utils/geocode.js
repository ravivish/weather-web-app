const request = require('request')


//     const gedocodeURL = 'https://api.mapbox.com/geocoding/v5/mapbox.places/India.json?access_token=pk.eyJ1IjoicmF2aXZpc2giLCJhIjoiY2p0ZmExNWgxMGJ4ZzRhcnIxN3Z5cndnbiJ9.F6RHX0CH6vxVbAXg-NOkdg'

//     request({ url:gedocodeURL , json:true }, (error,response) => {
            
//         if(error){
//             console.log('Unable to connect to wheather app')
//         }else if(response.body.features.length === 0){
//             console.log('Unable to location services! Try another Search')
//         }else{

//             const longitude = response.body.features[0].center[0]
//             const latitude = response.body.features[0].center[1]

//             // console.log('Lattitude: ',latitude)
//             // console.log('Longitude: ',longitude)
//             console.log(latitude,longitude)
//         }
//     })



const geocode = (address,callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1IjoicmF2aXZpc2giLCJhIjoiY2p0ZmExNWgxMGJ4ZzRhcnIxN3Z5cndnbiJ9.F6RHX0CH6vxVbAXg-NOkdg'

    request({url:url , json:true}, (error,response) => {
        if(error){
            callback('Unable to connect location services!',undefined)
        }else if(response.body.features.length == 0){
            callback('Unable to find location. Try another search ',undefined)
        }else{
            callback(undefined, {
                longitude : response.body.features[0].center[0],
                lattitude : response.body.features[0].center[1],
                location : response.body.features[0].place_name
            })
        }
    })
}

module.exports = geocode