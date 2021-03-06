const express = require('express')
const app = express();

const data = require('./data.json')
const users = require('./users.json')
const config = require('./config.json')
const jwt = require('jsonwebtoken');

let middlewareObj = require('./middleware');
let bodyParser     = require('body-parser');
const bcrypt = require('bcrypt');
const saltRounds = 10;

let cors = require('cors')

app.use(cors())
let corsOptions = {
    origin: '',
  }


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

app.post('/api/login/', (req,response) => {
  


    users.forEach(user=>{
        if(user.email == req.body.email){
            bcrypt.compare(req.body.password, user.password, function(err, res) {
                
                if(res == true){
                    const token = jwt.sign({ sub: '7' }, config.secret, { expiresIn: '7d' });
                    response.json({
                                message: 'User found',
                                token:token
                              });
                }
                else{
                    response.json({
                        message: 'Password Wrong'
                    })
                }
              });
        }
        
    })

})

app.post('/api/signup/', (req,res) => {
  
    if(req.body.username != null && req.body.email != null && req.body.password != null){

        bcrypt.hash(req.body.password, saltRounds, (err, hash) => {
            if(err){
                res.json({message:'Hashing is not working'})
            }
            else{
         let password = hash
         let user = {
            username : req.body.username,
            email : req.body.email,
            password : password
        }
        users.push(user)
        const token = jwt.sign({ sub: '7' }, config.secret, { expiresIn: '7d' });
        res.json({
            message: 'User signed in',
            token:token,
            user: user.username
          });
        }
          });
          
           }
 })

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`listening on ${port}`));