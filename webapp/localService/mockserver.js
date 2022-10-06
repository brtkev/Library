sap.ui.define([
	"sap/ui/core/util/MockServer",
	"sap/base/util/UriParameters"
], function(MockServer, UriParameters){
	"use strict";
	return{
		init: function(){
			// CREATE 
			let oMockServer = new MockServer({
				rootUri: "https://services.odata.org/V2/Northwind/Northwind.svc/"
			});

			let oUriParameters = new UriParameters(window.location.href);

			// CONFIGURE MOCK SERVER WITH A DELAY
			MockServer.config({
				 autoRespond: true,
				 autoRespondAfter: oUriParameters.get("serverDelay") || 500
			});

			//SIMULATE
			let sPath = sap.ui.require.toUrl("root/localService");
			oMockServer.simulate(sPath + "/metadata.xml", sPath + "/mockdata");

			//START
			oMockServer.start();
		}
	}
})