sap.ui.define([
	"sap/ui/core/mvc/Controller",
], (Controller) => {
	"use strict";
	return Controller.extend("root.App", {
		onInit: function(){
			this.getView().addStyleClass(this.getOwnerComponent().getContentDensityClass());
		},

	}); 
})