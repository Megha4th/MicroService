/**
 * 
document.writeln('<script src="aws-sdk-2.7.19.min.js"></script>');
document.writeln('<script src="aws-cognito-sdk.min.js"></script>');

document.writeln('<script src="aws-cognito-sdk.js"></script>');
document.writeln('<script src="sjcl.js"></script>');
document.writeln('<script src="jsbn.js"></script>');
document.writeln('<script src="jsbn2.js"></script>');
document.writeln('<script src="amazon-cognito-identity.min.js"></script>');

*/
AWSCognito.config.region = 'ap-southeast-2'; // Region
var poolData = {
	       UserPoolId : 'ap-southeast-2_7zQSp7X3w', // Your user pool id here
	       ClientId : '2oj313podtinrq8pdmpcmh9t3f' // Your client id here
	};

function SignupUsers(){
	var email = document.getElementById("email").value;
	var password = document.getElementById("Password").value;
	
	
	AWS.config.credentials   = new AWS.CognitoIdentityCredentials({
	    IdentityPoolId: "ap-southeast-2:473de425-12e5-442b-8322-16f657562d7e ",
	  });
	
	
	console.log("Email"+email);
	console.log("Password"+password);
	
	var username=email;
	

	 var userPool = new AWSCognito.CognitoIdentityServiceProvider.CognitoUserPool(poolData);
	// var cognitoUser = null;

	   var attributeList = [];
	   var dataEmail = {
	       Name : 'email',
	       Value : email
	   };
	   
	   var attributeEmail = new AWSCognito.CognitoIdentityServiceProvider.CognitoUserAttribute(dataEmail);
	
	   attributeList.push(attributeEmail);
	 
	   userPool.signUp(username, password, attributeList, null, function(err, result){
	       if (err) {
	           alert(err);
	           return;
	       }
	       cognitoUser = result.user;
	       var userName = cognitoUser.getUsername();
	       window.localStorage.setItem('userName',userName);
	      
	       console.log('Signup successful for user ' + userName);
	       window.location.assign("verify.jsp");
	       
	   });
	}

function confirmRegistration(){
    var verificationCode = document.getElementById("verification-code").value;	
    
var userPool = new AWSCognito.CognitoIdentityServiceProvider.CognitoUserPool(poolData);

   var userName = window.localStorage.getItem('userName');
   alert('userName in Verify page'+userName);
   var userData = {
       Username : userName,
       Pool : userPool
   };
   var cognitoUser = new AWSCognito.CognitoIdentityServiceProvider.CognitoUser(userData);

   cognitoUser.confirmRegistration(verificationCode, true, function(err, result) {
       if (err) {
           alert(err);
           return;
       }
       console.log('call result: ' + result);
       window.location.assign("signin.jsp")
   }); 
}


function login()
{
		var username = document.getElementById('email').value;
		var password = document.getElementById('password').value;

		

		var userPool = new AWSCognito.CognitoIdentityServiceProvider.CognitoUserPool(poolData);

	    var authenticationData = {
	        Username : username,
	        Password : password
	    };
	    var authenticationDetails = new AWSCognito.CognitoIdentityServiceProvider.AuthenticationDetails(authenticationData);  
	    console.log("About to call authenticateUser...");

	    window.localStorage.setItem('userName',username);
	    var userData = {
	        Username : username,
	        Pool : userPool
	    };
	    var cognitoUser = new AWSCognito.CognitoIdentityServiceProvider.CognitoUser(userData);
	  
	    
	 
	 cognitoUser.authenticateUser(authenticationDetails, {

      onSuccess: function(result) {
     	 console.log('access token + ' + result.getAccessToken().getJwtToken());
          console.log("Login success for : " + username);
          AWS.config.credentials = new AWS.CognitoIdentityCredentials({
	                IdentityPoolId:'ap-southeast-2:473de425-12e5-442b-8322-16f657562d7e',
	                Logins:{
	                    'cognito-idp.ap-southeast-2.amazonaws.com/ap-southeast-2_7zQSp7X3w' : result.getIdToken().getJwtToken()
	    
	                }

	            });
          
         // console.log("Logins successful");
          alert("Login Successfull");
          window.location.assign("index.jsp");
      },

      onFailure: function(err) {
         // console.log(err);
         alert(err);
    	  window.location.assign("signin.jsp");
      }

  });

	 
	 
}





