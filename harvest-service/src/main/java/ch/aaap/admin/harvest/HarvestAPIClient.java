package ch.aaap.admin.harvest;

import org.slf4j.Logger;

import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Lazy;
import org.springframework.security.oauth2.client.OAuth2ClientContext;
import org.springframework.security.oauth2.common.OAuth2AccessToken;
import org.springframework.stereotype.Component;
import org.springframework.web.context.annotation.SessionScope;

import com.typesafe.config.Config;
import com.typesafe.config.ConfigFactory;
import com.typesafe.config.ConfigValueFactory;

import ch.aaap.harvestclient.core.Harvest;
import ch.aaap.harvestclient.exception.InvalidAuthorizationException;

@Component
@Lazy
@SessionScope
public class HarvestAPIClient {

	private static final Logger log = LoggerFactory.getLogger(HarvestAPIClient.class);

	private Harvest harvest;

	private OAuth2ClientContext clientContext;

	@Value("${harvest.headers.accountId}")
	private String accountId;

	@Value("${harvest.baseUrl}")
	private String baseUrl;

	public HarvestAPIClient(OAuth2ClientContext clientContext) {
		this.clientContext = clientContext;
	}

	public OAuth2AccessToken getToken() {

		return clientContext.getAccessToken();
	}

	/**
	 * Updates the Harvest client with a new access token
	 *
	 * @param token 
	 */
	public void setToken(OAuth2AccessToken token) {
		harvest = createHarvest(token);
	}

	// TODO needs synchronization
	public Harvest getHarvest() {
		log.debug("Get Harvest called with harvest = {}, id = {}", harvest, System.identityHashCode(harvest));
		log.debug("Client context is {} with class {}", System.identityHashCode(clientContext),
				clientContext.getClass());
		if (harvest == null) {
			setToken(clientContext.getAccessToken());
			return harvest;
		}
		if (tokenHasChanged()) {
			log.debug("Token has changed to {}", clientContext.getAccessToken());
			setToken(clientContext.getAccessToken());
		}
		return harvest;
	}

	private boolean tokenHasChanged() {
		String currentToken = clientContext.getAccessToken().getValue();
		return !currentToken.equals(harvest.getAuthToken());
	}

	private Harvest createHarvest(OAuth2AccessToken oAuth2AccessToken) {
		if (oAuth2AccessToken == null) {
			return createHarvest("");
		}
		return createHarvest(oAuth2AccessToken.getValue());
	}

	private Harvest createHarvest(String accessToken) throws InvalidAuthorizationException {
		log.debug("Creating harvest with token [{}]", accessToken);
		Config config = ConfigFactory.defaultReference();
		config = config.withValue("harvest.auth.token", ConfigValueFactory.fromAnyRef(accessToken));
		config = config.withValue("harvest.auth.accountId", ConfigValueFactory.fromAnyRef(accountId));
		config = config.withValue("harvest.baseUrl", ConfigValueFactory.fromAnyRef(baseUrl));
		return new Harvest(config);
	}

}