const express = require('express');
const app = express();
const mysql = require('mysql');
port = 4000;

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'node_test'
})

//get all users
app.get("/users", (req, res)=> {
    const sql = 'select * from users';
    db.query(sql, (err, result)=> {
        if(err){
            res.send(err);
        }else{
            res.send(result);
        }
    })
})

//get user by id
app.get("/users/:id", (req, res)=> {
    const sql = 'select * from users where id = ?';
    const params = [req.params.id];
    db.query(sql, params, (err, result)=> {
        if(err){
            res.send(err);
        }else{
            res.send(result);
        }
    })
})

//add new user
app.post("/users", (req, res)=> {
    const reqBody = req.query;
    const sql = 'insert into users values(null, ?, ?, ?)';
    const params = [reqBody.fName, reqBody.lName, reqBody.age];
    db.query(sql, params, (err, result)=> {
        if(err){
            res.send(err);
        }else{
            res.send(
                {
                    status: '200',
                    messagde: 'user added'
                }
            )
        }
    })
})

//update
app.put("/users", (req, res)=>{
    const reqBody = req.query;
    const sql = 'update users set fName = ? where id = ?';
    const params = [reqBody.fName, reqBody.id];
    db.query(sql, params, (err, result)=> {
        if(err){
            res.send(err);
        }else{
            res.send({
                status: '200',
                message: 'success updated'
            })
        }
    })
})

//delete
app.delete("/users", (req, res)=> {
    const reqBody = req.query;
    const sql = 'Delete from users where id = ?';
    const params = [reqBody.id];
    db.query(sql, params, (err, result)=> {
        if(err){
            res.send(err);
        }else{
            res.send({
                status: '200',
                message: 'success deleted'
            })
        }
    })
})
app.listen(port, ()=> {
    console.log(`Connection success to ${port} Port`);
})