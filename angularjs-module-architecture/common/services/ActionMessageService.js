'use strict';

angular.module("MyApp.services").factory('ActionMessageService', function() {

	var objToReturn = {};

	var _MESSAGE_DETAIL = {
		ERROR: {
			type: "ERROR",
			bootstrapClass: "alert alert-danger"
		},
		OK: {
			type: "OK",
			bootstrapClass: "alert alert-success"
		},
		INFO: {
			type: "INFO",
			bootstrapClass: "alert alert-info"
		},
		WARNING: {
			type: "INFO",
			bootstrapClass: "alert alert-warning"
		}
	};
	var _MESSAGE_STATUS = {
		400: _MESSAGE_DETAIL.ERROR,
		200: _MESSAGE_DETAIL.OK
	};

	var _getActionMessage = function(response) {
		var actionMessage = "<strong>" + response.data.message + "</strong>";
		var textMessage = response.data.message;
		if(response.data.modelState) {
			_.forEach(_.flatMap(response.data.modelState), function(value) {
				actionMessage += ("<br>" + value);
				textMessage += ("\n" + value);
			});
		}
		return {
			message: actionMessage,
			textMessage: textMessage,
			isShow: true,
			detail:  _MESSAGE_STATUS[response.status]
		};
	}

	objToReturn.getActionMessage = _getActionMessage;
	return objToReturn;
});
