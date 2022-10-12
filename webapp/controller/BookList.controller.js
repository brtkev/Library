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
					model.setData({books : data})
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



// "books": {
// 	"type" : "sap.ui.model.json.JSONModel",
// 	"uri": "Books.json"
// }

// <!--
// 	<Table
// 			id="bookList"
// 			class="sapUiResponsiveMargin"
// 			width="auto"
// 			items="{/books/rows}">
// 			<!-- <headerToolbar>
// 				<Toolbar>
// 					<Title text="{i18n>invoiceListTitle}"/>
// 					<ToolbarSpacer/>
// 					<SearchField width="50%" search=".onFilterInvoices"/>
// 				</Toolbar>
// 			</headerToolbar> -->
// 			<columns>
// 				<Column
// 					hAlign="End"
// 					minScreenWidth="Small"
// 					demandPopin="true"
// 					width="4em">
// 					<Text text="{i18n>columnId}"/>
// 				</Column>
// 				<Column>
// 					<Text text="{i18n>columnTitle}"/>
// 				</Column>
// 				<Column>
// 					<Text text="{i18n>columnSubtitle}"/>
// 				</Column>
// 				<Column
// 					minScreenWidth="Small"
// 					demandPopin="true">
// 					<Text text="{i18n>columnAuthor}"/>
// 				</Column>
// 				<Column
// 					minScreenWidth="Tablet"
// 					demandPopin="false">
// 					<Text text="{i18n>columnCategory}"/>
// 				</Column>
// 				<Column
// 					hAlign="End">
// 					<Text text="{i18n>columnPrintDate}"/>
// 				</Column>
// 				<Column
// 					hAlign="End">
// 					<Text text="{i18n>columnEditor}"/>
// 				</Column>
// 			</columns>
// 			<items>
// 				<ColumnListItem
// 					type="Navigation"
// 					press=".onPress">
// 					<cells>
// 						<ObjectNumber number="{/books/rows>/book_id}" emphasized="false"/>
// 						<ObjectIdentifier title="{rows>title}"/>
// 						<!-- <Text text="{books>subtitle}"/>
// 						<Text text="{books>author}"/>
// 						<Text text="{books>category}"/>
// 						<Text text="{books>print_date}"/>
// 						<Text text="{books>editor}"/> -->
// 						<!-- <ObjectNumber
// 							number="{
// 								parts: [{path: 'invoice>ExtendedPrice'}, {path: 'view>/currency'}],
// 								type: 'sap.ui.model.type.Currency',
// 								formatOptions: {
// 									showMeasure: false
// 								}
// 							}"
// 							unit="{view>/currency}"
// 							state="{= ${invoice>ExtendedPrice} > 50 ? 'Error' : 'Success' }"/> -->
// 					</cells>
// 				</ColumnListItem>
// 			</items>
// 		</Table> 
// -->