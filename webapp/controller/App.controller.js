const defaultUpdateModel = {
	book : {
		book_id : "",
		title : "",
		subtitle : "",
		description : "",
		printdate : "",
		editorial: "",
		img : "",
		categories : "",
		authors: ""
	},
	inputStatus : false
}

sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/UIComponent",
], (Controller) => {
	"use strict";
	return Controller.extend("root.App", {
		onInit: function(){
			this.getView().addStyleClass(this.getOwnerComponent().getContentDensityClass());

			this._oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			this._oRouter.attachRouteMatched(this.handleRouteMatched, this);
		},

		handleRouteMatched: function(e){
			let routeName = e.getParameter("name");
			if ( routeName == "update" || routeName == "create"){
				let model = this.getView().getModel();
        model.setData({...model.getData(), ...defaultUpdateModel})
				
			}
		}

	}); 
})