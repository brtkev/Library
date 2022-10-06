sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
	"../model/formatter",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator",
], function(Controller, JSONModel, formatter, Filter, FilterOperator){
	"use strict";

	return Controller.extend("root.controller.BookList", {
		formatter: formatter,
		onInit: function(){
			// let oViewModel = new JSONModel({
			// 	currency: "EUR"
			// });
			// this.getView().setModel(oViewModel, "view")
		},
		onFilterBooks: function(oEvent){
			//build filter arr
			let aFilter = [];
			let sQuery = oEvent.getParameter("query");
	
			if(sQuery){
				aFilter.push(new Filter("title", FilterOperator.Contains, sQuery));
			}

			//FILTER BINDING
			let oList = this.byId("bookList");
			let oBinding = oList.getBinding("items");
			oBinding.filter(aFilter);
		},
		onPress: function(oEvent) {
			let oItem = oEvent.getSource();
			let oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.navTo("detail", {
				invoicePath: window.encodeURIComponent(oItem.getBindingContext("books").getPath().substr(1))
			})
		}
	})
})