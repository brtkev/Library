sap.ui.define([
  "sap/ui/core/mvc/Controller",
  "sap/m/MessageToast"
], function(Controller, MessageToast){
  "use strict";
  return Controller.extend("root.controller.Tiles", {
    onSearchPress: function(){
      MessageToast.show("search tile pressed");
    }
  });
});