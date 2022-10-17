sap.ui.define([
	"sap/ui/core/UIComponent",
	"sap/ui/model/json/JSONModel",
	"sap/ui/model/resource/ResourceModel",
	"sap/ui/core/routing/History",
	"sap/ui/Device"
], function(UIComponent, JSONModel, ResourceModel, History, Device) {
	"use strict";

	return UIComponent.extend("root.component", {
		metadata: {
			manifest: "json"
		},
		init: function(){
			// call the init function of the parent
			UIComponent.prototype.init.apply(this, arguments);  
			//set data models
			let oData = {
				books : [
				],
				book : {
          book_id : "",
          title : "",
          subtitle : "",
          description : "",
          printdate : "",
          editorial: "",
          img : "",
          categories : "",
          authors: ""
        },
				inputStatus : false
				
			};
      
			let oModel = new JSONModel(oData);
			this.setModel(oModel);	

			//SET DEVICE MODEL
			 let oDeviceModel = new JSONModel(Device);
			 oDeviceModel.setDefaultBindingMode("OneWay");
			 this.setModel(oDeviceModel, "devide"); 
 			
				

 			// CREATE THE VIEWS BASED ON THE URL/HASH
 			 this.getRouter().initialize();
		},
		getContentDensityClass: function(){
			if(!this._sContentDensityClass){
				if(!Device.support.touch){
					this._sContentDensityClass = "sapUiSizeCompact";
				}else{
					this._sContentDensityClass = "sapUiSizeCozy";
				}
			}
			return this._sContentDensityClass;
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

	})
})