package controller;

import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.FormHttpMessageConverter;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.client.RestTemplate;

import config.Config;
import model.RegisterModel;

@Controller
public class DynamoDBController {
	
	
	@RequestMapping("/")
	public String person(Model model)
	{
		
		return "Login-Signup";	
	}
	
	@RequestMapping(value="/registerform",method = RequestMethod.POST)
	public String registerUser(@RequestParam("Email") String Email,@RequestParam("Password") String password)
	{
		
		RegisterModel data = new RegisterModel();
		data.setEmail(Email);
		data.setPassword(password);
		
		//set your headers
		HttpHeaders headers = new HttpHeaders();
		headers.setContentType(MediaType.APPLICATION_JSON);

		RestTemplate restTemplate = new RestTemplate();
	    restTemplate.getMessageConverters().add(new FormHttpMessageConverter());
	    restTemplate.getMessageConverters().add(new MappingJackson2HttpMessageConverter());
	   
	    HttpEntity<?> entity = new HttpEntity<Object>(data,headers);
	    
	    Config configObject = new Config();	    
	    String url = configObject.getRegistrationServiceUrl()+"dynamodbregisterform";
	    
	    restTemplate.postForObject(url, entity, String.class);
	    
		return "S3upload";
	}
	@RequestMapping(value="/loginForm",method = RequestMethod.POST)
	public String login(@RequestParam("Email") String Email,@RequestParam("Password") String password)
	{
		
		RegisterModel data = new RegisterModel();
		data.setEmail(Email);
		data.setPassword(password);
		//set your headers
		HttpHeaders headers = new HttpHeaders();
		headers.setContentType(MediaType.APPLICATION_JSON);

		RestTemplate restTemplate = new RestTemplate();
	    restTemplate.getMessageConverters().add(new FormHttpMessageConverter());
	    restTemplate.getMessageConverters().add(new MappingJackson2HttpMessageConverter());
	    
	    HttpEntity<?> entity = new HttpEntity<Object>(data,headers);
	    
	    Config configObject = new Config();
	    String url = configObject.getRegistrationServiceUrl()+"dynamodbloginform";
	    
	    String reponse = restTemplate.postForObject(url, entity, String.class);
	    System.out.println(reponse);
	    if(reponse.equals("successfull"))
	    {
	    	return "S3upload";
	    }else{
	    	return "LoginError";
	    }
	    
		
	}

	

}

