sap.ui.define([
  'sap/ui/core/mvc/Controller',
  "sap/m/MessageToast",
  "sap/ui/core/routing/History",
  "sap/ui/core/UIComponent",
], function(Controller, MessageToast, History, UIComponent) {
  "use strict";

  let PageController = Controller.extend("root.controller.crud.Delete", {

    onDelete: function ( e){
      let book_id = e.getParameter("value");

      const url = "/api/remove?" + new URLSearchParams({book_id});
      fetch(url, { method: "DELETE" })
      .then(r => r.json()
      .then(data => {
        MessageToast.show(`book with id of ${data.book_id} was deleted from the collection`);

      }))
      .catch(err => {
        MessageToast.show(`Error, no that Id doesn't exist`);
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
    },

    truncate: function(){
      fetch("/api/truncate", {
        method: "DELETE"
      }).then(r => {
        MessageToast.show("all books were deleted");
        const model = this.getView().getModel();
        model.setData({...model.getData(), books : []})
      })
    }
  });

  return PageController;

});