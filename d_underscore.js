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

	//COLLECTING FUNCTIONS

	//Iterates over a list of elements, yielding each in turn to an iteratee function.
	//the iterate is bound to the context object (if one passed)
	//Each invocation of iteratee is called with three args: (element, index, list)
	//if LIST is a JS object, iteratee's arguments will be (value, key, list)
	//this returns the list for chaining

	d_.forEach = function(obj, iteratee, context){
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
	




}).call(this);