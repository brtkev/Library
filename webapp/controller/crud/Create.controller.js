sap.ui.define([
  'sap/ui/core/mvc/Controller',
  "sap/ui/model/json/JSONModel",
  "sap/m/MessageToast",
  "sap/ui/core/routing/History",
  "sap/ui/core/UIComponent",
], function(Controller, JSONModel, MessageToast, History, UIComponent) {
  "use strict";

  let PageController = Controller.extend("root.controller.crud.Update", {

    onSubmit: function ( ){
      let data = this.getView().getModel().getData();
      const url = "/api/create?" + new URLSearchParams(data.book);
      fetch(url, { method: "POST" })
      .then(r => r.json()
      .then(data => {
        console.log(data)
        MessageToast.show(`book was added to the collection with the id ${data.book_id}`);
      }))
      .catch(err => {
        MessageToast.show(`Error happened`);
      })
    },

    onNavBack: function(){
      let oHistory = History.getInstance();
			let sPreviousHash = oHistory.getPreviousHash();

			if(sPreviousHash !== undefined){
				window.history.go(-1)
			}else{
				let oRouter = UIComponent.getRouterFor(this);
				oRouter.navTo("overview", {}, true)
			}
    }
  });

  return PageController;

});