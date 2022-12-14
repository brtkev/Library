sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/m/MessageToast",
], function(Controller, MessageToast){
	"use strict";

	return Controller.extend("root.controller.BookList", {
		onInit: function() {
		
		},
		onSearchBooks: function(oEvent){
			let model = this.getView().getModel();
			let search = oEvent.getParameter("query");
			model.setData({...model.getData(), books: []})
			if(!search){
				this.byId("createHint").setVisible(false)
				this.byId("googleSearchButton").setVisible(false)
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
					if(data.length > 0){
						model.setData({
							...model.getData(),
						books : data.map(book => {
								book.source = "database";
								return book;
							})
						})	
						this.byId("createHint").setVisible(false)
						this.byId("googleSearchButton").setVisible(true)
						
					}else{
						modelFromGoogle(search, model).then(() =>{
							this.byId("createHint").setVisible(true)
							this.byId("googleSearchButton").setVisible(false)
							MessageToast.show("click an element to add it to the collection")
						})
						.catch((err) => MessageToast.show(err))
					}
				}))

			}
		},
		onPress: function(oEvent) {
			let oItem = oEvent.getSource();
			let oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.navTo("create", {
				bookPath: window.encodeURIComponent(oItem.getBindingContext().getPath().substr(1))
			})
		},

		onGoogleSearchButtonPress: function(){
			let model = this.getView().getModel();
			modelFromGoogle(this.byId("searchField").getValue(), model).then(() => {
				MessageToast.show("click an element to add it to the collection")
				this.byId("createHint").setVisible(true)
				this.byId("googleSearchButton").setVisible(false)
			})
			.catch((err) => MessageToast.show(err))
		}
	})
})

async function modelFromGoogle(query, model){
	const googleUrl = "https://www.googleapis.com/books/v1/volumes?" + new URLSearchParams({
		q: query
	})
	fetch(googleUrl, {method: "GET"})
	.then(r => r.json()
	.then(data => {
		model.setData({
			...model.getData(),
			books: [...model.getData().books, ...googleBooksFilter(data) ]
		})
	}))
}

function googleBooksFilter(data){
	let books = data.items.slice(0,50);
	return books.map(book => {
		let info = book.volumeInfo;
		let thumbnail = "";
		if(info.imageLinks && info.imageLinks.hasOwnProperty("thumbnail")){
			thumbnail = info.imageLinks.thumbnail;
		}
		return {
			title: info.title,
			subtitle: info.subtitle,
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