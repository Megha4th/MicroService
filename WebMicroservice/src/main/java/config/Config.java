package config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.PropertySource;
import org.springframework.stereotype.Component;


@Component
@PropertySource("application.properties")

public class Config {
 
    private static String s3ServiceURl;
    private static  String registrationServiceUrl;
    
    
    @Value("${registration.url}")
    public void setRegistrationServiceUrl(String url) {
    	
    	registrationServiceUrl = url;
    	
    }
    @Value("${s3.url}") 
    public void setS3ServiceURl(String url) {
    	
    	s3ServiceURl = url;
    }
  
    public String getRegistrationServiceUrl() {
   
    	
    	System.out.println(registrationServiceUrl);
    	return registrationServiceUrl;
    	
    }
    
    public String getS3ServiceURl() {
    	return s3ServiceURl;
    }
 
  
}
