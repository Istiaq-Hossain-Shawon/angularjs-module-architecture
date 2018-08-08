'use strict';

angular.module("MyApp.services").factory('CheckBoxService', function() {

	var objToReturn = {};
	var selectedItems = [];

	/*
	* Private
	*/

	/*
	* Public
	*/

	var isItemSelected = function(itemId) {
		var idx = selectedItems.indexOf(itemId);
		return idx > -1;
	}
	var toggleSelection = function(itemId) {
		var idx = selectedItems.indexOf(itemId);
		idx > -1 ? selectedItems.splice(idx, 1) : selectedItems.push(itemId);
	}
	var toggleAllSelection = function($event, items) {
		angular.forEach(items, function(item) {
			var idx = selectedItems.indexOf(item.id);
			if (idx > -1) {
				selectedItems.splice(idx, 1)
			}
		});

		if ($event.target.checked === false) {
			return;
		}

		angular.forEach(items, function(item) {
			selectedItems.push(item.id);
		});
	}
	var hasSelectedItem = function() {
		return selectedItems.length > 0;
	}
	var isAllSelected = function(pagination, items) {
		if (!pagination) {
			return false;
		}
		var count = 0;
		angular.forEach(items, function(item) {
			var idx = selectedItems.indexOf(item.id);
			count += idx > -1;
		});
		return count === pagination.getTotalContentInPage();
	}
	var getSelectedItems = function() {
		return selectedItems;
	}
	var clearAllSelection = function() {
		selectedItems = [];
	}

	objToReturn.isItemSelected = isItemSelected;
	objToReturn.toggleSelection = toggleSelection;
	objToReturn.toggleAllSelection = toggleAllSelection;
	objToReturn.hasSelectedItem = hasSelectedItem;
	objToReturn.isAllSelected = isAllSelected;
	objToReturn.getSelectedItems = getSelectedItems;
	objToReturn.clearAllSelection = clearAllSelection;
	return objToReturn;
});
