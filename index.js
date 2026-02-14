const express = require("express");
const app = express();
const port = 8080;
const path = require("path")
const {v4 : uuidv4} = require("uuid")
const methodOverride = require('method-override')

app.use(express.urlencoded({extended:true}))  //For Parsing
app.set("view engine", "ejs") //For setting view engine
app.set("views",path.join(__dirname,"views")) //For conecting views folder
app.use(express.static(path.join(__dirname,"public"))) // For connecting Public Folder
app.use(methodOverride('_method'))

let posts = [
    {
        username: "Aazmeer",
        content : "I love JS",
        id: uuidv4()
    },
    {
        username: "Ruhab",
        content : "I love MBBS",
        id:uuidv4()
    },
    {
        username: "Shaheer",
        content : "I love Cricket",
        id:uuidv4()
    },
    {
        username: "Shahmeer",
        content : "I love YT Shorts",
        id:uuidv4()
    },
]



app.get("/posts",(req,res)=>{
    res.render("index",{posts});
});

app.get("/posts/new",(req,res)=>{
    res.render("new.ejs")
})

app.post("/posts",(req,res)=>{
   let {username,content} = req.body
   let id = uuidv4();
   posts.push({username,content,id})
   res.redirect("/posts")
})

app.get("/posts/:id",(req,res)=>{
    let {id} = req.params
    let post = posts.find((p)=> id === p.id)
    res.render("show.ejs",{post})
})

app.patch("/posts/:id",(req,res)=>{
    let {id} = req.params;
    let newContent = req.body.content
    let post = posts.find((p)=> id === p.id)
    post.content = newContent;
    // console.log(post)
    res.redirect("/posts")

})

app.delete("/posts/:id",(req,res)=>{
    let {id} = req.params;
    let post = posts.find((p)=> id === p.id)
    let idx = posts.indexOf(post)
    posts.splice(idx,1)
    // post = posts.filter((p)=> id != p.id) // Mam's Logic
    res.redirect("/posts")
})

app.get("/posts/:id/edit",(req,res)=>{
    let {id} = req.params;
    let post = posts.find((p)=> id === p.id)
    res.render("edit.ejs",{post})
})



app.listen(port,()=>{
    console.log("server is listening...")
})



    
