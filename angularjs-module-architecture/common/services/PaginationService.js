'use strict';

angular.module("MyApp.services").factory('PaginationService', function() {
	
	var objToReturn = {};

	/*
	* Private
	*/

	/*
	* Public
	*/
	var getPagination = function(responseData) {
		var pagination = {
			displayStart : responseData.pagination.displayStart,
			displaySize : responseData.pagination.displaySize,
			sortBy : responseData.sortBy,
			totalItem : responseData.totalItem,
			totalPage : Math.ceil(responseData.totalItem / responseData.pagination.displaySize),
			currentPageNumber : (responseData.pagination.displayStart / responseData.pagination.displaySize) + 1,

			getPageNumber : function(num) {
				return new Array(num);
			},
			isCurrentPage : function(pageNumber) {
				return pageNumber === this.currentPageNumber;
			},
			getTotalContentInPage : function() {
				var nextNumberOfContent = responseData.totalItem - responseData.pagination.displayStart;
				return nextNumberOfContent > responseData.pagination.displaySize ? responseData.pagination.displaySize : nextNumberOfContent;
			},
			hasSingleRecordInPage : function() {
				return this.getTotalContentInPage() === 1;
			}
		};
		return pagination;
	}

	objToReturn.getPagination = getPagination;
	return objToReturn;
});
