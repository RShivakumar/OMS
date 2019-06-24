var exp = require('express');
var app=exp();
//creating a express mini application
var mc=require('mongodb').MongoClient;

var url='mongodb://shiva:shiva@cluster0-shard-00-00-ybrkq.mongodb.net:27017,cluster0-shard-00-01-ybrkq.mongodb.net:27017,cluster0-shard-00-02-ybrkq.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=truemongodb://shiva:shiva@cluster0-shard-00-00-ybrkq.mongodb.net:27017,cluster0-shard-00-01-ybrkq.mongodb.net:27017,cluster0-shard-00-02-ybrkq.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true';
var dbo;
var aco;


mc.connect(url,{useNewUrlParser:true},(err,client)=>{
    if (err){
        console.log('problem in db connection');
        console.log(err);
    }
    else{
        dbo=client.db('oms');

        aco=dbo.collection('omsc');
        console.log('connected with db successfully');


    }
});


var path=require('path')

// var cart='/assets/orders.json';

app.use(exp.json())
app.use(exp.static(path.join(__dirname,'dist/navtech')));

//while reload the page you won't get any error
app.get('*',(req,res,next)=>{
    res.sendFile(path.join(__dirname,'dist/navtech/index.html'));
})




app.post('/navbar/login',(req,res)=>{
    console.log('in login server')
    
  
  if(req.body.username=="navtech" && req.body.password=="navtech")
  {
      res.send({msg:'you have logged in successfully'})
  }
  else{
      if(req.body.username!="raj"){
          res.send({msg:'invalid user name'})
      }
      else if(req.body.password!="sony")
      {
          res.send({msg:'invalid password'})
      }
  }
})






app.get('/navbar/orders',(req,res)=>{
    console.log('in orders')
    aco.find().toArray((err,Aarray)=>{
        if(err){
            console.log(err)
        }
        //check for size of Array
        if(Aarray.length===0){
            res.json({msg:'no orders'});
        }
        else{
            console.log(Aarray)
            res.json({msg:Aarray});
        }
    })
})

// app.use((err,req,res,next)=>{
//     res.json(next(err));
// });

app.post('/navbar/orders',(req,res)=>{
    console.log('in addorders');
    console.log(req.body);
    //sid=req.body.studentid;



    //checking of existing username in db

    aco.find({ordernumber:req.body.ordernumber}).toArray((err,userArray)=>{
        if(err){
            return next(new Error('error in ordernumber'));
        }
        if(userArray.length==0){
            aco.insertOne(req.body,(err,success)=>{
                if(err){
                    return next(new Error('error in inserting'));

                }

                res.json({msg:'order added successfully'})
            })

            // //if user not existed hash the password and save it to db
            // bcrypt.hash(req.body.password,8,(err,hashedpassword)=>{
            //     // if(err){
            //     //     return next(new Error('error in password'));
            //     // }
            //     // req.body.password=hashedpassword;
            //     // console.log(req.body);

              

            // })
        }

        else{
            res.json({msg:'order already existed'})
        }
    })
})



var portno=process.env.PORT||2000;
app.listen(portno,()=>console.log(`server running on ${portno}`));