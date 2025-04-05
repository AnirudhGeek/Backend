//callbacks are the function that are passed as arguments in another function
const fs = require('fs')

function person(name,callbackFn){
    console.log(`Hello ${name}`)
    callbackFn()
}

function address(){
    console.log("India")
}

person("Anirudh Raturi",address)


fs.readFile('input.txt',"utf-8",(err,data)=>{
    if(err){
        console.log("Error reading file ",err)  
    }  
    console.log(data)    
}) 