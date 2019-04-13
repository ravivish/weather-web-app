const path = require('path')
const express = require('express')
const hbs = require('hbs') // for partials(header&footer)
const geocode = require('./utils/geocode')
const forecast = require('./utils/forcast')

// console.log(__dirname)
// console.log(path.join(__dirname,'../..'))
// console.log(path.join(__dirname,'../public'))
// console.log(__filename)


const app = express()

//Define path for express config
const publicDirectoryPath = path.join(__dirname,'../public')
const viewPath = path.join(__dirname,'../templates/views')
const partialPath = path.join(__dirname,'../templates/partials')


//Setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views',viewPath)
hbs.registerPartials(partialPath)


//Setup static directory to serve
app.use(express.static(publicDirectoryPath)) //By using this we can access all the html page inside this folder using "localhost:3000/help.html" or "localhost:3000/about.html" etc

app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather App',
        name:'Ravi Vishwakarma'
    })
})

app.get('/about',(req,res) =>{
    res.render('about',{
        title:'About Me',
        name:'Ravi Vishwakarma'
    })
})

app.get('/help',(req,res) => {
    res.render('help',{
        title:'Help',
        name:'Ravi Vishwakarma',
        msg:'This is some helpful text'
    })
})

app.get('/Weather', (req,res) => {
  
    if(!req.query.address){
        return res.send({
            error:'You must provide an address'
        })
    }
    geocode(req.query.address, (error, { longitude, lattitude, location } = {}) => {
        if(error){
            return res.send({ error })
            // return res.send('geocode error') //Unable to find the location Try another search
        }

        forecast(longitude,lattitude, (error, forcastData) => {
            if(error){
                // return res.send({ error })
                return res.send('f error')
            }
            
            res.send({
                forecast:forcastData,
                location, //location:location,
                address:req.query.address
            })

        })

    })
    // res.send([{
    //     forcast:'It is hot',
    //     location:'Noida',
    //     address:req.query.address
    // }])
})

app.get('/product',(req,res) => {
    if(!req.query.search){
        return res.send({
            error:'You must provide a search term'
        })
    }
    console.log(req.query.search)
    res.send({
        products:[]
    })
})


// This file is in views directory 
app.get('/me',(req,res) => {
    res.render('me',{
        title:'me',
        msg:'Note:'
    })
})


// Below these files in templates/partials directory
app.get('/help/*',(req,res)=>{
    res.render('404',{
        title:'404',
        name:'Ravi Vishwakarma',
        errorMessage:'Help artical not found'
    })
})

app.get('*',(req,res) => {
    res.render('404',{
        title:'404',
        name:'Ravi Vishwakarma',
        errorMessage:'Page not found'
    })
})

// app.get('',(req,res) => {           // This is called routes and this will display in pages using "localhost:3000/"
//     res.send('<h1>Weather</h1>')
// })

// app.get('/help', (req,res) => {      // This is called routes and this will display in pages using "localhost:3000/help"
//     res.send([
//         {name:'Cara'},
//         {name2:'Miles'}
//     ])
// })

// app.get('/about', (req,res) => {
//     res.send('<title>My title</title>')
// })


// app.com
// app.com/help //this is called routes
// app/com/about

app.listen(3000, () => {
    console.log('Server is running on port 3000')
})
