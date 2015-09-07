//My reconstruction of underscore.js for learning purposes
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

	d_.forEach = function(obj, iteratee, context){
		var i;
		var length;

		if (isArrayLike(obj)) {
			for (i = 0, length = obj.length; i < length; i++){
				iteratee(obj[i], i, obj);
			}
		}
		else {

		}
		return obj;
	}
	








}).call(this);