package ch.aaap.admin.harvest.config;

import java.util.Arrays;

import javax.sql.DataSource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.oauth2.client.OAuth2ClientContext;
import org.springframework.security.oauth2.client.OAuth2RestTemplate;
import org.springframework.security.oauth2.client.resource.OAuth2ProtectedResourceDetails;
import org.springframework.security.oauth2.client.token.AccessTokenProviderChain;
import org.springframework.security.oauth2.client.token.ClientTokenServices;
import org.springframework.security.oauth2.client.token.JdbcClientTokenServices;
import org.springframework.security.oauth2.client.token.grant.code.AuthorizationCodeAccessTokenProvider;
import org.springframework.security.oauth2.client.token.grant.code.AuthorizationCodeResourceDetails;
import org.springframework.security.oauth2.config.annotation.web.configuration.EnableOAuth2Client;

@Configuration
public class HarvestConfig {

	@Bean
	public HarvestOAuthProperties harvestOAuthProperties() {
		return new HarvestOAuthProperties();
	}

	@Configuration
	@EnableOAuth2Client
	protected static class ResourceConfiguration {

		@Autowired
		private HarvestOAuthProperties harvestOAuthProperties;

		@Value("${harvest.headers.accountId}")
		private String accountId;

		@Autowired
		private DataSource dataSource;

		@Bean
		public OAuth2ProtectedResourceDetails harvest() {
			final AuthorizationCodeResourceDetails details = new AuthorizationCodeResourceDetails();
			details.setId("harvest");
			details.setClientId(harvestOAuthProperties.getClientID());
			details.setClientSecret(harvestOAuthProperties.getClientSecret());
			details.setAccessTokenUri(harvestOAuthProperties.getAccessTokenUri());
			details.setUserAuthorizationUri(harvestOAuthProperties.getUserAuthorizationUri());
			details.setScope(Arrays.asList("all"));
			details.setGrantType("authorization_code");

			return details;
		}

		@Bean
		public ClientTokenServices clientTokenServices() {
			return new JdbcClientTokenServices(dataSource);
		}

		@Bean
		public OAuth2RestTemplate harvestRestTemplate(OAuth2ClientContext clientContext,
				CustomTokenEnhancer customTokenEnhancer) {
			OAuth2RestTemplate template = new OAuth2RestTemplate(harvest(), clientContext);

			AuthorizationCodeAccessTokenProvider authorizationCodeAccessTokenProvider = new AuthorizationCodeAccessTokenProvider();
			authorizationCodeAccessTokenProvider.setTokenRequestEnhancer(customTokenEnhancer);

			AccessTokenProviderChain provider = new AccessTokenProviderChain(
					Arrays.asList(authorizationCodeAccessTokenProvider));
			provider.setClientTokenServices(clientTokenServices());

			template.setAccessTokenProvider(provider);

			return template;
		}

	}
}
