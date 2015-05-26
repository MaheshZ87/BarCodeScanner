sap.ui.controller("barcodescannercc.CreateComplaint", {

/**
* Called when a controller is instantiated and its View controls (if available) are already created.
* Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
* @memberOf barcodescannercc.CreateComplaint
*/
	onInit: function() {

		gThat = this;
	},
	
	addItems:function(oEvent){
		
		if (!this.__addItemsDialog) {
			
			this.__addItemsDialog = sap.ui.xmlfragment("barcodescannercc.fragments.AddItem",this);
		}			
		sap.ui.getCore().byId("barcodeNumber").setValue('');
		sap.ui.getCore().byId("prodDescrId").setValue('');
		sap.ui.getCore().byId("quantityID").setValue('');
		sap.ui.getCore().byId("unitId").setValue('');
		sap.ui.getCore().byId("categoryId").setValue('');
		this.__addItemsDialog.open();	
	},
	
	closeDialog:function(oEvent){
		
		if (this.__addItemsDialog) {		
			this.__addItemsDialog.close();		
			}			
	},
	
	addItemstoItemsTable:function(oEvent){
		
		var soMaterialsTable = this.getView().byId('idItemsTable');
		var oItem = new sap.m.ColumnListItem({
			cells : [ 
			        new sap.m.ObjectIdentifier({
			        	title : sap.ui.getCore().byId('barcodeNumber').getValue()
					}),
					new sap.m.Text({
						text : sap.ui.getCore().byId('quantityID').getValue()
					}),
					new sap.m.Text({
						text : sap.ui.getCore().byId('unitId').getValue()
					}),
					new sap.m.Text({
						text : sap.ui.getCore().byId('categoryId').getValue()
					})]
		});
		soMaterialsTable.addItem(oItem);
		this.closeDialog(oEvent);	
	},

/**
* Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
* (NOT before the first rendering! onInit() is used for that one!).
* @memberOf barcodescannercc.CreateComplaint
*/
//	onBeforeRendering: function() {
//
//	},

/**
* Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
* This hook is the same one that SAPUI5 controls get after being rendered.
* @memberOf barcodescannercc.CreateComplaint
*/
//	onAfterRendering: function() {
//
//	},

/**
* Called when the Controller is destroyed. Use this one to free resources and finalize activities.
* @memberOf barcodescannercc.CreateComplaint
*/
//	onExit: function() {
//
//	}

});