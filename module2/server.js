const http = require("http");



// create a server


const server = http.createServer((req, res)=>{
// send response


let url = req.url;

if(url == "/login"){
    res.end("Login page")
}
else if(url == "/register"){
    res.end("Registration Page")
}
else if(url == "/"){
res.end("Hope page")

}

else{
    res.end("404, page does not exist.")
}
})

// listen to http requests
server.listen( 5000, ()=>{
    console.log("server started")
})
