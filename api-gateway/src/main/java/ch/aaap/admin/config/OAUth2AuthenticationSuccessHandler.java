package ch.aaap.admin.config;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.DefaultRedirectStrategy;
import org.springframework.security.web.RedirectStrategy;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;
import org.springframework.util.Assert;

import com.google.gson.Gson;

import ch.aaap.admin.config.api.UserService;


@Component
public class OAUth2AuthenticationSuccessHandler implements AuthenticationSuccessHandler {

	@Autowired
	UserService userService;

	private RedirectStrategy redirectStrategy = new DefaultRedirectStrategy();

	private String frontendUrl;

	public OAUth2AuthenticationSuccessHandler(@Value("${application.frontendUrl}") String frontendUrl) {
		Assert.notNull(frontendUrl, "frontendurl is required");
		this.frontendUrl = frontendUrl;
	}

	/**
	 * After successful login with the Google Account the user should be redirect to
	 * his profile page
	 */
	@Override
	public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
			Authentication authentication) throws IOException, ServletException {

		Gson gson = new Gson();

		AuthWrapper auth = new AuthWrapper();
		List<String> roles = new ArrayList<String>();
		authentication.getAuthorities().stream().forEach(role -> roles.add(role.toString()));

		auth.principal = authentication.getPrincipal();
		auth.roles = roles;

		String json = gson.toJson(auth);

		redirectStrategy.sendRedirect(request, response, frontendUrl + "/");
		userService.handleAuthUser(json);
	}

	private class AuthWrapper {
		Object principal;
		List<String> roles;
	}
}
