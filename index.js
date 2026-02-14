const express = require("express");
const app = express();
const port = 8080;
const path = require("path")

app.use(express.urlencoded({extended:true}))  //For Parsing
app.set("view engine", "ejs") //For setting view engine
app.set("views",path.join(__dirname,"views")) //For conecting views folder
app.use(express.static(path.join(__dirname,"public"))) // For connecting Public Folder


let posts = [
    {
        username: "Aazmeer",
        content : "I love JS",
        id: "1a"
    },
    {
        username: "Ruhab",
        content : "I love MBBS",
        id:"2b"
    },
    {
        username: "Shaheer",
        content : "I love Cricket"
    },
    {
        username: "Shahmeer",
        content : "I love YT Shorts"
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
   posts.push({username,content})
   res.redirect("/posts")
})

app.get("/posts/:id",(req,res)=>{
    let {id} = req.params
    console.log(id)
    res.send("Request Working")

})

app.listen(port,()=>{
    console.log("server is listening...")
})
    
