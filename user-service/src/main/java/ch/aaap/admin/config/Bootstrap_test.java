package ch.aaap.admin.config;

import javax.net.ssl.HttpsURLConnection;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationListener;
import org.springframework.context.annotation.Profile;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.stereotype.Component;

import ch.aaap.admin.user.Role;
import ch.aaap.admin.user.RoleRepository;

@Component
@Profile("test")
public class Bootstrap_test implements ApplicationListener<ContextRefreshedEvent> {

	@Autowired
	RoleRepository roleRepository;

	@Override
	public void onApplicationEvent(final ContextRefreshedEvent event) {
		// do whatever you need here
		disableSSL();
		roleRepository.save(Role.builder().authority("ROLE_ADMIN").build());
		roleRepository.save(Role.builder().authority("ROLE_USER").build());
	}

	public void disableSSL() {
		HttpsURLConnection.setDefaultHostnameVerifier(
				new javax.net.ssl.HostnameVerifier() {

					@Override
					public boolean verify(String hostname, javax.net.ssl.SSLSession sslSession) {
						return hostname.equals("localhost");
					}
				});
	}
}
