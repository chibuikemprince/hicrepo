/*  var add = function(a, b, c, d){
    return a+b+c+d;
} */
  
/* 

var add = (a, b, c, d) => {
    return a+b+c+d;
}
 */

function addSum(a, b){

var sum = a+ b;

return function(c){
    return sum *c;
}

}


var add = addSum(20,40)

var prod = add(2)

console.log({add, prod})
/* 
var fourNumbersSum = add(10, 20, 30, 40);  

console.log({ fourNumbersSum})  
  */