sap.ui.define([
  'sap/ui/core/mvc/Controller',
  "sap/ui/model/json/JSONModel",
  "sap/m/MessageToast",
  "sap/ui/core/routing/History",
  "sap/ui/core/UIComponent",
], function(Controller, JSONModel, MessageToast, History, UIComponent) {
  "use strict";

  let PageController = Controller.extend("root.controller.crud.Update", {


    onSearchId: function (oEvent){
      let search = oEvent.getParameter("query");
      
      const url = "/api/search?" + new URLSearchParams({
        search,
        attribute : 'book_id'
      });
      fetch(url, { method: "GET" })
      .then(r => r.json()
      .then(data => {
        console.log(data)
        if(data){
          let model = this.getView().getModel();
          model.setData({...model.getData(), ...{book : data[0], inputStatus : true}})
        }else{
          MessageToast.show(`id ${search} not found!`)
        }
      }))
    },

    onSubmit: function ( ){
      let data = this.getView().getModel().getData();
      const url = "/api/update?" + new URLSearchParams(data.book);
      fetch(url, { method: "PUT" })
      .then(r => r.json()
      .then(data => {
        MessageToast.show(`book ${data.book_id} updated`);
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