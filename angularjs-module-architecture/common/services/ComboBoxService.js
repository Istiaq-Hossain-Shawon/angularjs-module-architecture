'use strict';

angular.module("MyApp.services").factory('ComboBoxService', function() {

	var objToReturn = {};

	/*
	* Private
	*/
	var getRelationalComboBoxes = function(responseRelationalComboBoxes) {
		var relationalComboBoxes = [];
		if (responseRelationalComboBoxes) {
			angular.forEach(responseRelationalComboBoxes, function(responseRelationalComboBox) {
				relationalComboBoxes.push({
					parent : responseRelationalComboBox.parent,
					selectedOption : null,
					options : getComboBox(responseRelationalComboBox.options)
				});
			});
		}
		return relationalComboBoxes;
	}

	/*
	* Public
	*/
	var getComboBoxItem = function(optionData) {
		if (optionData) {
			return {
				text : optionData.text,
				value : optionData.value,
				selected : optionData.selected
			}
		}
		return {
			text : null,
			value : null,
			selected : null
		}
	}
	var getComboBox = function(responseComboBox) {
		var comboBox = [];
		if (responseComboBox) {
			angular.forEach(responseComboBox, function(option) {
				comboBox.push(getComboBoxItem(option));
			});
		}
		return comboBox;
	}
	var getRelationalComboBox = function(responseRelationalComboBoxes) {
		var selectedParents = [];
		var unsetPreviouslySelectedOption = function(relationalComboBoxes){
			angular.forEach(relationalComboBoxes, function(relationalComboBox) {
				if (relationalComboBox.selectedOption && selectedParents.indexOf(relationalComboBox.selectedOption.value) < 0) {
					relationalComboBox.selectedOption = null;
				}
			});
		}
		return {
			relationalComboBoxes : getRelationalComboBoxes(responseRelationalComboBoxes),
			addParent : function(value, parent) {
				selectedParents.splice(selectedParents.indexOf(parent) + 1);
				selectedParents.push(value);
				unsetPreviouslySelectedOption(this.relationalComboBoxes);
			},
			isParentExist : function(parent) {
				return selectedParents.indexOf(parent) >= 0;
			},
			getLastSelectedValue : function() {
				return selectedParents.length > 1 ? selectedParents[selectedParents.length - 1]
				: null;
			}
		}
	}
	objToReturn.getComboBoxItem = getComboBoxItem;
	objToReturn.getComboBox = getComboBox;
	objToReturn.getRelationalComboBox = getRelationalComboBox;
	return objToReturn;
});
