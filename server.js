const express=require('express');
const app=express();
const PORT=3000;
const client=require('./config/db');
const bodyParser=require("body-parser");
app.use(bodyParser.json());
const bcrypt = require('bcrypt');
const saltRounds=10;
// const plaintextPassword=req.body.password;
// bcrypt.hash(plaintextPassword,saltRounds,(err,hash)=>{
//   if(err){
//     console.error('error hashing password:',err);
//   }
//   else{
//     console.log('Hashed password:',hash);
//   }
// });










app.get('/data', (req, res) => {
    client.query(`SELECT * FROM  users`,(err,result)=>{
      if(!err){
        res.json(result.rows)
      }
    });
   
    
    // client.end();
  })
  // client.connect();// Replace your_table_name with the actual table name
      // .then(data => {
      //   res.json(data);
      // })
      // .catch(error => {
      //   console.error(error);
      //   res.json({ error: 'Error fetching data' });
      // });
  //  });
  app.post('/data',(req,res)=>{
    const user=req.body;
    const plaintextPassword=user.password;
    let encryptedPassword="";
    bcrypt.hash(plaintextPassword,saltRounds,(err,hash)=>{
      if(err){
        console.error('error hashing password:',err);
      }
      else{
       encryptedPassword=hash;
       console.log(encryptedPassword)
       
       const insertQuery=`insert into users (id,"firstName","lastName",email,password) values(${user.id},'${user.firstName}','${user.lastName}','${user.email}','${encryptedPassword}')`
     console.log(insertQuery);
    client.query(insertQuery,(err,result)=>{
      if(!err){
        res.send('insertion was successfull')
      }
      else{
        console.log(err)
      }
    })

      }
    });
    

    // bcrypt.hash(plaintextPassword,saltRounds,(err,hash)=>{
    //   if(err){
    //     console.error('error hashing password:',err);
    //   }
    //   else{
    //     console.log('Hashed password:',hash);
    //   }
    // });

 })

  app.get('/data/:id',(req,res)=>{
    client.query(`select * from users where id=${req.params.id}`,(err,result)=>{
      if(!err){
        res.send(result.rows);
      }
    })
  })



  app.patch('/data/:id',(req,res)=>{
    let user=req.body;
    const plaintextPassword=user.password;
    let encryptedPassword="";

    bcrypt.hash(plaintextPassword,saltRounds,(err,hash)=>{
      if(err){
        console.error('error hashing password:',err);
      }
      else{
       encryptedPassword=hash;
      

  

    let updateQuery=`UPDATE users
    SET   "firstName"='${user.firstName}',"lastName"='${user.lastName}',email='${user.email}',password='${encryptedPassword}' where id=${user.id}`
    console.log(updateQuery)
    client.query(updateQuery,(err,result)=>{
      if(!err){
        res.send('update done')
      }
      else{
        console.log(err)
      }
    })

  }

})
});

 app.delete('/data/:id',(req,res)=>{
  let deleteQuery=`delete from users where id=${req.params.id}`

  client.query(deleteQuery,(err,result)=>{
    if(!err){
      res.send('deletion done')
    }
    else{
      console.log(err)
    }
  })
 })

  
  
  
  
  
  
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });