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

		ajaxRequest : function(Elemvalue){
			var xhttp = new XMLHttpRequest();
			xhttp.onreadystatechange = function(){
				if(this.readyState === 4 && this.status === 200){
					document.getElementById('codeEditor').innerHTML = this.responseText;
				}
			}
			xhttp.open('GET','files/'+Elemvalue.toLowerCase(),false);
			xhttp.send();
		},

		getFiles : function(Elemvalue){
           this.ajaxRequest(Elemvalue);
		}
	}

	 var events = {
	 		filesViewEvent : function(){
	 			var filesView = document.getElementById('filesView'),
	 			     button = document.getElementsByTagName('button');
	 				filesView.addEventListener('click',function(event){
	 					logics.toggleButtonStyle(event.target);
	 					logics.getFiles(event.target.innerHTML);
	 				})
	 		}
	 }

	 events.filesViewEvent();

})();