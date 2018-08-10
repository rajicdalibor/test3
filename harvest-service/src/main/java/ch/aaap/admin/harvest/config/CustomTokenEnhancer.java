package ch.aaap.admin.harvest.config;

import org.springframework.http.HttpHeaders;
import org.springframework.security.oauth2.client.resource.OAuth2ProtectedResourceDetails;
import org.springframework.security.oauth2.client.token.AccessTokenRequest;
import org.springframework.security.oauth2.client.token.RequestEnhancer;
import org.springframework.stereotype.Component;
import org.springframework.util.MultiValueMap;

@Component
public class CustomTokenEnhancer implements RequestEnhancer {

	@Override
	public void enhance(AccessTokenRequest request, OAuth2ProtectedResourceDetails resource,
			MultiValueMap<String, String> form, HttpHeaders headers) {
		form.set("client_id", resource.getClientId());
		form.set("client_secret", resource.getClientSecret());
	}
}
