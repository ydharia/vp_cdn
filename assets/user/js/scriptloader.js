function loadStyle(url, callback){
	var style = document.createElement("link")
	style.rel="stylesheet";
	if (style.readyState){
		style.onreadystatechange = function(){
			if (style.readyState == "loaded" || style.readyState == "complete"){
				style.onreadystatechange = null;
				callback();
			}
		};
	} else {
		style.onload = function(){
			callback();
		};
	}
	style.href = url;
	document.getElementsByTagName("head")[0].appendChild(style);
}
	
function loadScript(url, callback, googleads=false){
    var script = document.createElement("script")
    script.type = "text/javascript";
    if (googleads) {
        script.setAttribute('data', "ad-client: 'ca-pub-0269151885496000'");
    }
    script.setAttribute('defer', '');
    if (script.readyState){
        script.onreadystatechange = function(){
            if (script.readyState == "loaded" || script.readyState == "complete"){
                script.onreadystatechange = null;
                callback();
            }
        };
    } else {
        script.onload = function(){
            callback();
        };
    }
    script.src = url;
	document.body.appendChild(script);
}
// setTimeout(function(){
//     loadStyle(userbase_url+"css/bootstrap.min.css", function(){
//         loadStyle(userbase_url+"css/app.css", function(){});
//     });
// },100);
setTimeout(function(){
    loadScript("https://www.googletagmanager.com/gtag/js?id=UA-133433063-2", function(){});
    loadScript("https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js", function(){}, true);   
},5000);
// setTimeout(function(){
    // loadStyle(userbase_url+"libs/datatables.net-responsive-bs4/css/responsive.bootstrap4.min.css", function(){});
        // loadStyle(userbase_url+"css/bootstrap.min.css", function(){
            loadStyle(userbase_url+"css/icons.min.css", function(){
                // loadStyle(userbase_url+"css/app.css", function(){
            	    document.getElementById("init-style").outerHTML=''; /* Remove initial styles from your page */
                // });	
            });	
        // });
    // });	
    
    // loadScript("https://www.googletagmanager.com/gtag/js?id=UA-133433063-2", function(){});
        // loadScript(userbase_url+"libs/jquery/jquery.min.js", function(){
        // loadScript("https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js", function(){
        //     // loadScript(userbase_url+"libs/bootstrap/js/bootstrap.bundle.min.js", function(){});
        //     loadScript("https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js", function(){
        //         loadScript(userbase_url+"libs/metismenu/metisMenu.min.js", function(){
        //             loadScript(userbase_url+"libs/simplebar/simplebar.min.js", function(){
        //                 loadScript(userbase_url+"libs/node-waves/waves.min.js", function(){
        //                     loadScript(userbase_url+"js/app.js", function(){
        //                         // loadScript("https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js", function(){}, true);
                                if (typeof numberpage !== 'undefined') {
                                    if (numberpage) {
                                        loadScript("https://cdn.jsdelivr.net/npm/jquery-validation@1.19.2/dist/jquery.validate.min.js", function(){
                                            loadScript(userbase_url+"js/number-page.js?v=1", function(){});
                                        });
                                    }
                                }
        //                     });
        //                 });
        //             });
        //         });
        //     });
        // });
    // });
// },500);
