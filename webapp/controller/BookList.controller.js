sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"../model/formatter",
	"sap/m/MessageToast",
], function(Controller, formatter, MessageToast){
	"use strict";

	return Controller.extend("root.controller.BookList", {
		formatter: formatter,
		onInit: function() {
		
		},
		onFilterBooks: function(oEvent){
			let model = this.getView().getModel();
			let search = oEvent.getParameter("query");
			if(!search){
				model.setData({...model.getData(), books: []})
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
					if(data){
						model.setData({
							...model.getData(),
						books : data
						})	
					}else{
						const googleUrl = "https://www.googleapis.com/books/v1/volumes?" + new URLSearchParams({
							q: search
						})
						fetch(googleUrl, {method: "GET"})
						.then(r => r.json()
						.then(data => {
							model.setData({
								...model.getData(),
								books: googleBooksFilter(data)
							})
							MessageToast.show("click an element to add it to the collection")
						}))
					}
				}))

			}
		},
		onPress: function(oEvent) {
			// console.log("click")
			let oItem = oEvent.getSource();
			let oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			// oRouter.navTo("create", {
			// 	bookPath: window.encodeURIComponent(oItem.getBindingContext().getPath().substr(1))
			// })
		}
	})
})


function googleBooksFilter(data){
	let books = data.items.slice(0,50);
	return books.map(book => {
		let info = book.volumeInfo;
		let thumbnail = null;
		if(info.imageLinks && info.imageLinks.hasOwnProperty("thumbnail")){
			thumbnail = info.imageLinks.thumbnail;
		}
		return {
			title: info.title,
			description: info.description,
			authors: info.authors,
			categories: info.categories,
			img: thumbnail,
			printdate: info.publishedDate,
			editorial: info.publisher	,
			source: "google ebooks"
		}
	})

}