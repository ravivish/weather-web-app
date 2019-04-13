// console.log('client side javascript is loaded')

// fetch('http://puzzle.mead.io/puzzle').then( (response) => {
//     response.json().then( (data) => {
//         console.log(data)
//     })
// })


// Fetching API to receive the forecast for our localhost

// fetch('http://localhost:3000/weather?address=Bangalore').then( (Response) => {
//     Response.json().then( (data) => {
//         if(data.error){
//             console.log(data.error)
//         }else{
//             console.log(data.location)
//             console.log(data.forecast)            
//         }
//     })
// })

const weatherForm = document.querySelector('form') //querySelector matches the first element that you provided in case of we have two <p> tag it will always select the first <p> tag
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

// messageOne.textContent = 'From Javascript'

weatherForm.addEventListener('submit', (eventObject) => {
    eventObject.preventDefault() // To prevent the page from refreshing automaticallu(Postback)
    // console.log('Testing')

    const location = search.value
    // console.log(location)

    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''

    fetch('http://localhost:3000/weather?address='+location).then( (Response) => {
    Response.json().then( (data) => {
        if(data.error){
            messageOne.textContent = data.error
            // console.log(data.error)
        }else{
            messageOne.textContent = data.location
            messageTwo.textContent = data.forecast
            // console.log(data.location)        
            // console.log(data.forecast)            
        }
    })


})

})