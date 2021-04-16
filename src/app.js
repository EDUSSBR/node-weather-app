const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require("./utils/geocode")
const weather = require("./utils/weather")
const request = require("postman-request");
const app = express();

//Define path for express config
const publicDirName = path.join(__dirname,"../public");
const viewsPath = path.join(__dirname, "../templates/views")
const partialsPath = path.join(__dirname, "../templates/partials")
//setup handlebars engine and views location
app.set("view engine", "hbs")
app.set("views", viewsPath)
hbs.registerPartials(partialsPath)
//setup static directory to serve
app.use(express.static(publicDirName));

app.get("", (req,res)=>{
    res.render("index", {
     nome: "Eduardo",
      idade: 20,
      title: "PREVISÃO"})
})
app.get("/about", (req,res)=>{
    res.render("about", {
      nome: "Eduardo",
      idade: 20,
      title: "ABOUT"})
})
app.get("/help", (req,res)=>{
    res.render("help", {
      nome: "Eduardo",
      idade: 20,
      title: "HELP"})
})
app.get("/weather", (req,res)=>{
    adress = req.query.localizacao;
    if(!adress){
      return res.send({error: "Você precisa fornecer uma localização (cidade,endereço..etc.)"})
    }

    geocode(adress,(error,{latitude, longitude, cidade} = {})=> {
      if (error){
          return res.send({error});
      } 
      weather(latitude, longitude, cidade, (error,weatherDados)=> {
          if(error) {
              return res.send({error})
          }
          res.send({weatherDados});
      });
  })

    })
     
   // res.send({ Location: adress})
  
app.get("/help/*", (req,res)=>{
  res.render("help404", {
    nome:'Eduardo',
    title:"HELP 404",
    errorMessage: "Help article not found.."
  })
})

app.get("*", (req,res) =>{
  res.render("404", { 
    nome:"Eduardo",
    title:"404",
    errorMessage: "Page not found."
  })
})

app.listen(3000,()=> console.log("Server listening at port 3000.."))