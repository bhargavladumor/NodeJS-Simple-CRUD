const express = require('express');
const port = 8001;
const path = require('path');
const app = express();

// Set ejs engine to views directory
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"))
app.use(express.urlencoded());

var students = [];

app.get('/',(req,res)=>{
    res.render("home",{
        students : students
    });
});

//To add new student
app.post('/addStudent',(req,res)=>{
    var newStudent = {
        name : req.body.name,
        age : req.body.age
    };
    students.push(newStudent);
    res.redirect('/');
});

//To delete student
app.get('/deleteStudent',(req,res)=>{

    //Using queryString
    var pos = students.findIndex(v => v.age == req.query.age);

    // Using Params
    // var pos = students.findIndex(v => v.age == req.params.age);

    students.splice(pos,1);
    return res.redirect('/');
})

//To update student
app.get('/updateStudent',(req,res)=>{
    var pos = students.findIndex(v => v.age == req.query.age);
    res.render("update",{
        name : students[pos].name,
        age : students[pos].age,
    })
});
app.post('/editInfo',(req,res)=>{
    var pos = students.findIndex(v => v.age == req.body.oldAge);
    students[pos].name = req.body.name;
    students[pos].age = req.body.age;
    return res.redirect('/');
})

app.listen(port,(err)=>{
    if(err){
        console.log("something wrong");
    }
    console.log(`App is running on port ${port}`);
});