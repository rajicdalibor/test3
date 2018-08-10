package ch.aaap.admin.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpStatus;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.oauth2.client.InMemoryOAuth2AuthorizedClientService;
import org.springframework.security.oauth2.client.OAuth2AuthorizedClientService;
import org.springframework.security.oauth2.client.registration.ClientRegistrationRepository;
import org.springframework.security.web.authentication.HttpStatusEntryPoint;
import org.springframework.util.Assert;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;

@Configuration
public class OAuth2LoginSecurityConfig extends WebSecurityConfigurerAdapter {

	private final ClientRegistrationRepository clientRegistrationRepository;

	@Autowired
	private OAUth2AuthenticationSuccessHandler successHandler;

	@Value("${application.frontendUrl}")
	private String frontendUrl;

	public OAuth2LoginSecurityConfig(ClientRegistrationRepository clientRegistrationRepository) {
		Assert.notNull(clientRegistrationRepository, "ClientRegistrationRepository is required");
		this.clientRegistrationRepository = clientRegistrationRepository;
	}

	@Override
	protected void configure(HttpSecurity http) throws Exception {
		http//
				.cors().and()// make spring security aware of CORS
				.authorizeRequests() //
				.anyRequest().authenticated() //
				.and().authorizeRequests()
				.antMatchers("/h2-console/**").permitAll()
				.antMatchers("/harvest/admin").hasRole("ADMIN")
                .antMatchers("/harvest/user").hasRole("USER")
                .antMatchers("/harvest/users/me").permitAll()
				.and() //
				.exceptionHandling().authenticationEntryPoint(new HttpStatusEntryPoint(HttpStatus.FORBIDDEN)).and() //
				.oauth2Login() //
				.clientRegistrationRepository(this.clientRegistrationRepository) //
				.authorizedClientService(this.authorizedClientService()) //
				.successHandler(successHandler);
		;//

		http.csrf().disable();
		http.headers().frameOptions().disable();
	}

	@Bean
	public WebMvcConfigurer corsConfigurer() {
		return new WebMvcConfigurerAdapter() {
			@Override
			public void addCorsMappings(CorsRegistry registry) {
				registry.addMapping("/**")
						.allowedOrigins(frontendUrl)
						.allowCredentials(true);
			}
		};
	}

	@Bean
	public OAuth2AuthorizedClientService authorizedClientService() {
		return new InMemoryOAuth2AuthorizedClientService(this.clientRegistrationRepository);
	}
}