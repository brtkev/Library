 sap.ui.define([
 	"../localService/mockserver"
	], function(mockserver){
		"use strict";

		//  INIT THE MOCK SERVER
		mockserver.init();

		// INIT THE EMBEDDED COMPONENT ON THE HTML PAGE
		sap.ui.require(["sap/ui/core/ComponentSupport"])
	});