const express = require('express')
const app = express();

const data = require('./data.json')
const config = require('./config.json')
const jwt = require('jsonwebtoken');

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

app.post('/api/login/', (req,res) => {
  
   if(req.body.email != null && req.body.password != null){
        const token = jwt.sign({ sub: '7' }, config.secret, { expiresIn: '7d' });
        res.cookie("SESSIONID", token, {httpOnly:false}).json({
            message: 'User found',
            token:token
          });

  }
})

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`listening on ${port}`));