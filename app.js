const express = require('express')
const app = express();

const data = require('./data.json')
let middlewareObj = require('./middleware');
let bodyParser     = require('body-parser');
let cors = require('cors')

app.use(cors())



app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(bodyParser.json()); 
app.get('/api/members', (req,res)=>{
    res.send(data)
})

app.get('/api/members/:name', (req,res)=>{
    const item = data.filter(item=>{
        if(item.name == req.params.name ){ 
            return item
        }
    })
    if(item == ''){
        res.send('Item NotFound')
    }
    res.send(item)

})

app.post('/api/members/',middlewareObj.checkdataisvalid,(req,res) => {
    
    
    let d = req.body
  

    

    console.log(d)
    data.push(d)
	res.status('200').send('Successfully added');
})

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`listening on ${port}`));