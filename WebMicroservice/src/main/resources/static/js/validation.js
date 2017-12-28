
      
		function CheckPassword(inputtxt,mail)   
		{   	
		 
      		 var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
					 if (re.test(mail))  
					  {  
						 if(inputtxt.length<7)
							{
								alert("password must between 7 to 14 charchters");
								document.getElementById('pass').value="";
								  return (true)
								
							}
					  
					    
					  }  
					  else{
					    alert("You have entered an invalid email address!");
					    document.getElementById('ema').value="";  

					    return (false)  
			}          }

