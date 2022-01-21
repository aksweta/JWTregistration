const express = require('express')
const cors = require('cors');
const bodyParser = require('body-parser');
const fs=require('fs');
const { json } = require('body-parser');
const app = express()
const port = 8080


app.use(cors());
app.use(bodyParser.json());


app.post("/registartion", (req, res) => {
  try {
    console.log("reuqest...", req.body);
    fs.writeFileSync("./input.txt", JSON.stringify(req.body));
    res.send(JSON.stringify({ message: "registered successfully" }));
  } catch (ex) {
    res.send(JSON.stringify({ message: "registration failed" }));
  }
});


app.post("/login", (req,res) => {
      const output= fs.readFileSync("./input.txt")
      const regiuser = output.toString();
      const loginuser = JSON.stringify(req.body);
      const regiinput = JSON.parse(regiuser);
      const logininput = JSON.parse(loginuser);

      if (logininput.username === regiinput.regiusername
         &&  logininput.password === regiinput.regipassword){
            res.send(JSON.stringify({ message: "Login successfully" })); 
         }
      else{
         res.send(JSON.stringify({ message: "Login failed" }));
      }
});



app.listen(port, () => {
   console.log(`server start at http://localhost:${port}`)
})


