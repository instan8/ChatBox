let moongoes=require("mongoose");

let uri=process.env.URI;

moongoes.connect(uri ).then(()=>{console.log("okkk")}).catch((err)=>{console.log(err,"error")})
