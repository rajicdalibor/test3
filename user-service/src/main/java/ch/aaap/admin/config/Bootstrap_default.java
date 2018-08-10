package ch.aaap.admin.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationListener;
import org.springframework.context.annotation.Profile;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.stereotype.Component;

import ch.aaap.admin.user.Role;
import ch.aaap.admin.user.RoleRepository;

@Component
@Profile("default")
public class Bootstrap_default implements ApplicationListener<ContextRefreshedEvent> {

	@Autowired
	RoleRepository roleRepository;

	@Override
	public void onApplicationEvent(final ContextRefreshedEvent event) {
		// do whatever you need here
		roleRepository.save(Role.builder().authority("ROLE_ADMIN").build());
		roleRepository.save(Role.builder().authority("ROLE_USER").build());
	}
}
