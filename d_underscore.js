//My reconstruction of underscore.js for learning purposes:
//http://underscorejs.org/docs/underscore.htm
console.log('D set up');

(function(global){


	//1. BASELINE SETUP

	//1.1 creating the initial variabes
	//this is based on underscore
	//establish the root object (this = window if we are in the browser or 'exports' in the server)
	var root = this;


	var d_ = function(obj){
		//if the object passed is already an instance of _d, then just return the object
		if (obj instanceof _d ){
			return obj;
		} 
		//if the function is NOT called as a constructor, then call it as a constructor
		//and return the new object created
		if (!(this instanceof _d)){
			return new d_(obj);
		}

		//wrap the argument in the current instance
		this._wrapped = obj;
	}

	//1.2 
	//export the d_ object for NODE. Else if we are in the browser, add d_ as the global object
	if (typeof exports !== 'undefined'){
		if (typeof module !== 'undefined' && module.exports){
			exports = module.exports;
		}
		exports.d_ = d_;
	} else {
		//set the global variable
		root.d_ = d_;
	}

	//1.3 Helper functions


	//Internal function that returns an efficient version of the passed-in callback.
	var optimizeCb = function(func, context, argCount){
		if (context === void 0) return func; //note: void 0 returns 'undefined' 
		switch (argCount == null? 3 : argCount){
			//case where there is only one argument
			case 1: return function(value){
				return func.call(context, value);
			};
			//return a function which accepts two arguments
			case 2: return function(value, other){
				return func.call(context, value, other);
			};
			//return a function which accepts three arguments
			case 3: return function(value, index, collection){
				return func.call(context, value, index, collection);
			};
			case 4: return function(accumulator, value, index, collection){
				return func.call(context, accumulator, value, index, collection);
			}

		}
		return function(){
			return func.apply(context, arguments);
		};
	};


	//maker function returns a function which can look for the specific property 
	var property = function(key){
		return function(obj){
			return obj == null ? void 0 : obj[key] ;
		};
	};
	var MAX_ARRAY_INDEX = Math.pow(2, 53) - 1;
	var getLength = property('length');
	var isArrayLike = function(collection){
		var length = getLength(collection);
		return typeof length === 'number' && length >= 0 && length <= MAX_ARRAY_INDEX;
	}

	//2. COLLECTING FUNCTIONS

	//2.1 Each(object, iteratee, context)

	//Iterates over a list of elements, yielding each in turn to an iteratee function.
	//the iterate is bound to the context object (if one passed)
	//Each invocation of iteratee is called with three args: (element, index, list)
	//if LIST is a JS object, iteratee's arguments will be (value, key, list)
	//this returns the list for chaining

	d_.each = d_.forEach = function(obj, iteratee, context){
		var i;
		var length;
		iteratee = optimizeCb(iteratee, context);

		//if the object passed is like an array
		if (isArrayLike(obj)) {
			for (i = 0, length = obj.length; i < length; i++){
				iteratee(obj[i], i, obj);
			}
		}
		//if the object passed does not have array characteristics
		else {
			//get the keys from the object
			var keys = d_.keys(obj);
			//iterate over every key in the object
			for (i = 0, length = keys.length; i < length; i++){
				iteratee(obj[keys[i]],keys[i], obj);
			}

		}
		return obj;
	}

	//2.2 map(list, iteratee, context)

	//produces new array of values by performing iteratee on each item in the object
	
	d_.map = function(obj, iteratee, context){
		
		//iteratee will be passed the following:
		//a) the value
		//b) currentKey
		//c) the object itself
		iteratee = optimizeCb(iteratee,context);

		//get the keys from the list
		//if the list is NOT like an array, then keys = [all the enumerabe keys in the object]
		var keys = !(isArrayLike(obj)) && d_.keys(obj);

		//get the length of the list (we will use this to intialize an empty array)
		var length = (keys || obj).length;
		//create an empty array as long as the length of the list
		var results = Array(length); 

		//we loop over the array and add the functionality
		for (var index = 0; index < length; index++){
			//if the list has keys, we loop over the keys array to get the name of the property, 
			//otherwise we just use a number
			var currentKey = keys ? keys[index] : index;
			results[index] = iteratee(obj[currentKey], currentKey, obj)
		}
		return results;

	// }

	// d_.find = d_.select = function(list,predicate, context){

	// 	//if the list is an array

	// 	if(isArrayLike(obj)){

	// 		var length = list.length;
	// 		for(var index = 0; index < length; index++){
	// 			if predicate(list[index]) return true;
	// 		}

	// 	}

		

		//if the list is NOT an array

	}

	//3. ARRAY FUNCTIONS

	//4. FUNCTION (AHEM) FUNCTIONS

	//5. OBJECT FUNCTIONS

	d_.isObject = function(obj){
		var type = typeof obj;
		// this returns TRUE if either one of the following holds:
		//a) the argument OBJ is a function
		//b) the argument has type 'object' AND the object is NOT falsy 
		return type === 'function' || type === 'object' && !!obj;
	}

	//5.2 keys(object) returns an array with all the names of the enumerable properties
	//in the object
	//this is used by multiple functions, including d_.map in 2.1
	d_.keys = function(obj){

		//if the argument is not an object, return an empty array
		if (!(d_.isObject(obj))) return [];

		//use the native keys object if possible
		if (Object.keys) return Object.keys(obj);

		//add all the keys to an array

		throw 'argument does not have Object.keys() native method';

	};




}).call(this);