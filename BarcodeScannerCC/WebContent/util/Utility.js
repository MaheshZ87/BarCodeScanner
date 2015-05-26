function handleProductIDScan(){
	sap.ui.getCore().byId("canvasHbox1").setVisible(true);
	var takePicture = document.querySelector("#Take-Picture1"),
//	var takePicture = document.getElementById("Take-Picture"),
	showPicture = document.createElement("img");
	Result = document.getElementById("textbit");
	var canvas = document.getElementById("picture1");
	var ctx = canvas.getContext("2d");
	JOB.Init();
	JOB.SetImageCallback(function(result) {
		if(result.length > 0){
			var tempArray = [];
			for(var i = 0; i < result.length; i++) {
				tempArray.push(result[i].Format+" : "+result[i].Value);
			}
			var barCodeNumberArray = tempArray[0].split(':');
			var barCode = barCodeNumberArray[1];
//			gThat.getView().byId("barcodeNumber").setValue(barCode);
			sap.ui.getCore().byId("barcodeNumber").setValue(barCode);
			sap.ui.getCore().byId("canvasHbox1").setVisible(false);
//			Result.innerHTML=tempArray.join("<br />");
		}else{
			if(result.length === 0) {
//				gThat.getView().byId("barcodeNumber").setValue('');
				sap.ui.getCore().byId("barcodeNumber").setValue('');
				var errorDialog = new sap.m.Dialog({
					title : "Decoding Error",
					content : [ new sap.m.Text({
								text :"Decoding Not Supported, Please enter Product ID",
							})],
					contentWidth : "auto",
					rightButton : new sap.m.Button({
						text : "Ok",
						press : function () {
							sap.ui.getCore().byId("canvasHbox1").setVisible(false);
							errorDialog.close();						
						}
					}),				
				});
				errorDialog.open();
			}
		}
	});
	JOB.PostOrientation = true;
	JOB.OrientationCallback = function(result) {
		canvas.width = result.width;
		canvas.height = result.height;
		var data = ctx.getImageData(0,0,canvas.width,canvas.height);
		for(var i = 0; i < data.data.length; i++) {
			data.data[i] = result.data[i];
		}
		ctx.putImageData(data,0,0);
	};
	JOB.SwitchLocalizationFeedback(true);
	JOB.SetLocalizationCallback(function(result) {
		ctx.beginPath();
		ctx.lineWIdth = "2";
		ctx.strokeStyle="red";
		for(var i = 0; i < result.length; i++) {
			ctx.rect(result[i].x,result[i].y,result[i].width,result[i].height); 
		}
		ctx.stroke();
	});
	if(takePicture && showPicture) {
		takePicture.onchange = function (event) {
			var files = event.target.files;
			if (files && files.length > 0) {
				file = files[0];
				try {
					var URL = window.URL || window.webkitURL;
					showPicture.onload = function(event) {
						Result.innerHTML="";
						JOB.DecodeImage(showPicture);
						URL.revokeObjectURL(showPicture.src);
					};
					showPicture.src = URL.createObjectURL(file);
				}
				catch (e) {
					try {
						var fileReader = new FileReader();
						fileReader.onload = function (event) {
							showPicture.onload = function(event) {
								Result.innerHTML="";
								console.log("filereader");
								JOB.DecodeImage(showPicture);
							};
							showPicture.src = event.target.result;
						};
						fileReader.readAsDataURL(file);
					}
					catch (e) {
						Result.innerHTML = "Neither createObjectURL or FileReader are supported";
					}
				}
			}
		};
	}
	
}