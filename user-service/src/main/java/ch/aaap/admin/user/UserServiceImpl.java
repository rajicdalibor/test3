package ch.aaap.admin.user;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.google.gson.JsonElement;
import com.google.gson.JsonObject;

@Service
public class UserServiceImpl implements UserService {

	static Logger LOGGER = LoggerFactory.getLogger(UserServiceImpl.class);

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private RoleRepository roleRepository;

	public User getUser(Long id) {
		return userRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException());
	}

	public List<User> getAllUsers() {
		return userRepository.findAll();
	}

	public User saveUser(User user) {
		userRepository.save(user);
		return user;
	}

	public User updateUser(User newUser, Long userId) {

		User userToUpdate = userRepository.findById(userId)
				.orElseThrow(() -> new ResourceNotFoundException());

		userToUpdate.setFirstName(newUser.getFirstName());
		userToUpdate.setLastName(newUser.getLastName());
		userToUpdate.setUsername(newUser.getUsername());
		userToUpdate.setHashCode(newUser.getHashCode());
		userToUpdate.setImage(newUser.getImage());
		userToUpdate.setBirthDate(newUser.getBirthDate());
		userToUpdate.setDescription(newUser.getDescription());
		userToUpdate.setSkypeName(newUser.getSkypeName());
		userToUpdate.setEnabled(newUser.getEnabled());
		userToUpdate.setPhone(newUser.getPhone());
		userRepository.save(userToUpdate);

		return userToUpdate;
	}

	
	public void handleAuthUser(JsonObject authentication, List<String> userRoles) {
		
		User user = userRepository.findByUsername(authentication.get("email").toString());
		List<Role> roles = roleRepository.findAll();

		roles.stream().forEach(role -> {
			LOGGER.debug(role.getAuthority() + roles.contains(role));
		});

		if (user == null) {
			user = fillUserWithData(user, authentication, roles);
			saveUser(user);
		} else {
			// something has been changed on user -> update
			if (user.getHashCode() != authentication.hashCode()) {
				long userId = user.getId();
				updateUser(fillUserWithData(user, authentication), userId);
			}
		}
	}
	
	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		return userRepository.findByUsername(username);
	}

	private User fillUserWithData(User user, JsonObject auth2User) {
		return fillUserWithData(user, auth2User, null);
	}

	private User fillUserWithData(User user, JsonObject auth2User, List<Role> roles) {

		user = new User();
		user.setFirstName(auth2User.get("given_name").getAsString());
		user.setLastName(auth2User.get("family_name").getAsString());
		user.setUsername(auth2User.get("email").getAsString());
		user.setHashCode(auth2User.hashCode());
		user.setImage(auth2User.get("picture").getAsString());
		
		if (roles != null) {
			user.setAuthorities(roles);
		}

		return user;
	}
}
