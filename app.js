const express = require('express')
const app = express();

const data = require('./data.json')
let middlewareObj = require('./middleware');
let bodyParser     = require('body-parser');
let cors = require('cors')

app.use(cors())

// app.use(bodyParser.urlencoded({extended: false}));
// app.use(express.json())

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

app.post('/api/members/',(req,res) => {
    
    // const d = (JSON.stringify(req.body))

    // console.log(req.body)
    let d = req.body
    // let name = req.body.name
    // let gender = req.body.gender
    // let email = req.body.email
    // let mobile = req.body.mobile
    // let message = req.body?.message
    // let newmember={
    //     name:name,
    //     gender:gender,
    //     email:email,
    //     mobile:mobile,
    //     message:message
    // }

    

    console.log(d)
    data.push(d)
	res.status('200').send('Successfully added');
})

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`listening on ${port}`));