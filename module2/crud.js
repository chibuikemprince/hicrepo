// create
// read
// update
// delete

const fs   = require("fs");

const wrtingDone = function(err){
    
    if(err){
        console.log(err)
    }
    else{
        console.log("done");
    }



}

const reading = function(err, data){
    
    if(err){
        console.log(err)
    }
    else{
        console.log("This is the content of our file ", data);
    }



}


// encoding
// create
 //fs.writeFile("database/read.txt", "hello Class", 'utf8', wrtingDone);

//append
 fs.appendFile("database/read.txt", " \n hello Class", 'utf8', wrtingDone);

// console.log("done")

//read

 //fs.readFile("database/read.txt",  'utf8', reading);

// fs.unlink("database/read.txt", wrtingDone);
