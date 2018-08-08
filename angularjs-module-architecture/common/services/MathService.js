'use strict';

angular.module("MyApp.services").factory('MathService',function() {

	var objToReturn = {};

	/*
	* Private
	*/
	var DEFAULT_PRECISION = 6;

	/*
	* Public
	*/
	var getFixedValue = function(number, precision) {
		return number.toFixed(precision) * 1;
	}
	var getFixedValueWithDefaultPrecision = function(number) {
		return getFixedValue(number, DEFAULT_PRECISION);
	}
	var _getMaxSignedInteger = function(){
		return (-1 >>> 1);
	}

	objToReturn.getFixedValue = getFixedValue;
	objToReturn.getFixedValueWithDefaultPrecision = getFixedValueWithDefaultPrecision;
	objToReturn.getMaxSignedInteger = _getMaxSignedInteger;
	return objToReturn;
});
