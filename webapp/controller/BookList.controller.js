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
		onInit: function() {
		
		},
		onFilterBooks: function(oEvent){
			let search = oEvent.getParameter("query");
			if(!search){
				this.getView().getModel().setData({books: []})
			}else{
				//get attribute to filter
				let attribute = this.byId("bookListSelect").getSelectedItem().getKey();
				const url = "/api/search?" + new URLSearchParams({
					search,
					attribute
				})
				fetch(url, { method: "GET" })
				.then(r => r.json()
				.then(data => {
					let model = this.getView().getModel();
					model.setData({
						...model.getData(),
					books : data
					})
				}))

			}
		},
		onPress: function(oEvent) {
			console.log("click")
			// let oItem = oEvent.getSource();
			// let oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			// oRouter.navTo("detail", {
			// 	bookPath: window.encodeURIComponent(oItem.getBindingContext("books").getPath().substr(1))
			// })
		}
	})
})


