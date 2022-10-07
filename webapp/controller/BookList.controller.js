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
			
			
		},
		onFilterBooks: function(oEvent){

			//build filter arr
			let aFilter = [];
			let sQuery = oEvent.getParameter("query");

			//get attribute to filter
			let attribute = this.byId("bookListSelect").getSelectedItem().getText();
			
			//if query push filter
			if(sQuery){
				//if attribute id the filter must be equal
				if(attribute == "id"){
					aFilter.push(new Filter(attribute, FilterOperator.EQ, sQuery));
				}else{
					//else the filter must be contains
					aFilter.push(new Filter(attribute, FilterOperator.Contains, sQuery));
				}
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
				bookPath: window.encodeURIComponent(oItem.getBindingContext("books").getPath().substr(1))
			})
		}
	})
})