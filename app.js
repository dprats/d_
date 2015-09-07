var d_underscore = d_;

//testing the d_.each method
var arrayExample = [1,2,3,4,5];

console.log('Testing the d_.each() method...');
d_underscore.forEach(arrayExample,function(item){
	console.log(item*2);
});

//Testing the d_.map() function

//testing with an array as argument
console.log('Testing the d_.map() method with an array...');
var newArray = d_underscore.map(arrayExample,function(item){
	return item*3;
});

console.log(newArray);

//testing with an object as argument
console.log('Testing the d_.map() method with an non-array...');
var objExample = {1: '1', 2: '2', 3: '3', 4: '4', 100:'100'};
var newObj = d_underscore.map(objExample,function(item){
	return item*3;
});
console.log(newObj);
