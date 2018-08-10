package ch.aaap.admin.harvest.config;

import java.io.IOException;
import java.net.URI;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.oauth2.client.OAuth2RestTemplate;
import org.springframework.security.oauth2.client.resource.UserRedirectRequiredException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.util.UriComponentsBuilder;

import ch.aaap.admin.harvest.config.HarvestOAuth2TokenAcquiredException;
import ch.aaap.admin.harvest.model.ServiceError;
import ch.aaap.harvestclient.exception.HarvestHttpException;
import ch.aaap.harvestclient.exception.InvalidAuthorizationException;

@ControllerAdvice
public class ExceptionController {

	private static final Logger log = LoggerFactory.getLogger(ExceptionController.class);

	private static final int PROCESSING_ERROR_CODE = 422;

	@Value("${application.frontendUrl}")
	private String frontEndUrl;

	@Autowired
	private OAuth2RestTemplate oAuth2RestTemplate;

	/**
	 * If the user has to accept a OAuth form e.g. on Harvest an
	 * UserRedirectRequiredException is thrown We want to redirect from the browser
	 * and not from the backend
	 * 
	 * @param request
	 * @param response
	 * @param e
	 * @return
	 */
	@ExceptionHandler({ UserRedirectRequiredException.class })
	public ResponseEntity<Object> handleUserRedirectRequiredException(HttpServletRequest request,
			HttpServletResponse response, UserRedirectRequiredException e) {

		// Implementation from OAuth2ClientContextFilter.java
		String redirectUri = e.getRedirectUri();
		UriComponentsBuilder builder = UriComponentsBuilder.fromHttpUrl(redirectUri);
		Map<String, String> requestParams = e.getRequestParams();
		for (Map.Entry<String, String> param : requestParams.entrySet()) {
			builder.queryParam(param.getKey(), param.getValue());
		}

		if (e.getStateKey() != null) {
			builder.queryParam("state", e.getStateKey());
		}

		return new ResponseEntity<Object>(builder.build().encode().toUriString(), HttpStatus.UNAUTHORIZED);
	}

	/**
	 * If a token was successfully acquired we need to redirect the user to the
	 * correct page in the frontend
	 * 
	 * @param request
	 * @param response
	 * @param e
	 * @throws IOException
	 */
	@ExceptionHandler({ HarvestOAuth2TokenAcquiredException.class })
	public void handleSmoex(HttpServletRequest request, HttpServletResponse response,
			HarvestOAuth2TokenAcquiredException e)
			throws IOException {

		response.sendRedirect(frontEndUrl + "/time");
	}

	@ExceptionHandler({ InvalidAuthorizationException.class })
	public ResponseEntity<Object> handleInvalidHarvestAuth(HttpServletRequest request, HttpServletResponse response,
			InvalidAuthorizationException e) {
		try {
			// trigger UserRedirect
			log.debug("Handling Exception {}", e.getMessage());
			oAuth2RestTemplate.getAccessToken();
		} catch (UserRedirectRequiredException e1) {
			return handleUserRedirectRequiredException(request, response, e1);
		}
		return ResponseEntity.created(URI.create(request.getRequestURL().toString())).body("Should not end up here");
	}

	@ExceptionHandler({ HarvestHttpException.class })
	public ResponseEntity<Object> handleHarvestHttpException(HarvestHttpException e) {
		return ResponseEntity.status(PROCESSING_ERROR_CODE)
				.body(ServiceError.harvestError(e.getHttpCode(), e.getMessage()));
	}

}
