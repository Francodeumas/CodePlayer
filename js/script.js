(function(){
	'use strict';

	var logics = {

		toggleButtonStyle : function(element){
            var id = element.id,
            button = document.getElementsByTagName('button');
			if(id === "index" || id === "style" || id === "script"){
				element.setAttribute('class','highLight');
				for(var i=0; i<button.length; i++){
					if(button[i].id !== id){
					  if(button[i].hasAttribute('class'))
						button[i].removeAttribute('class');
					}
				}
			}
		},

		ajaxGetRequest : function(Elemvalue){
			var xhttp = new XMLHttpRequest();
			xhttp.onreadystatechange = function(){
				if(this.readyState === 4 && this.status === 200){
					document.getElementById('codeEditor').value = this.responseText;
				}
			}
			xhttp.open('GET','files/'+Elemvalue.toLowerCase(),true);
			xhttp.send();
		},

		ajaxPostRequest : function(element,editorValue){
		   	// var xhttp = new XMLHttpRequest();
		   	// var url = encodeURIComponent("files/"+element);
		    // var value = "value="+editorValue;
		   	// xhttp.open('POST',url,true);
		   	// xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		   	// xhttp.send(value);
		},

		getFiles : function(Elemvalue){
           this.ajaxGetRequest(Elemvalue);
		},

		execute : function(){
			var codeEditorValue = document.getElementById('codeEditor').value,
			    result = document.getElementById('result');
			    result.innerHTML = codeEditorValue;
		},

		pushDataToFiles : function(){
				    var button = document.getElementsByTagName('button'),
				        codeEditorValue = document.getElementById('codeEditor').value;
				    for(var i=0; i<button.length; i++){
				    	if(button[i].hasAttribute('class')){
				    		this.ajaxPostRequest(button[i].innerHTML.toLowerCase(),codeEditorValue);
				    	}
				    }
		}
	}

	 var events = {
	 		filesViewEvent : function(){
	 			var filesView = document.getElementById('filesView'),
	 			     button = document.getElementsByTagName('button'),
	 			     codeEditor = document.getElementById('codeEditor');
	 				filesView.addEventListener('click',function(event){
	 					logics.toggleButtonStyle(event.target);
	 					logics.getFiles(event.target.innerHTML);
	 				})
	 				codeEditor.addEventListener('keyup',function(){
	 					logics.pushDataToFiles();
	 					var buttons = document.getElementsByTagName('button');
	 					   for(var i=0; i<buttons.length; i++){
	 					   	 if(button[i].id === "index" && button[i].hasAttribute('class')){
	 							logics.execute();   	 	
	 					   	 }
	 					   }
	 					
	 				})

	 		}
	 }

	 events.filesViewEvent();
	 logics.ajaxGetRequest('Index.html');

})();