package ch.aaap.admin.user;

import java.util.List;

import org.springframework.security.core.userdetails.UserDetailsService;

import com.google.gson.JsonObject;

public interface UserService extends UserDetailsService {

	public User getUser(Long id);
	public List<User> getAllUsers();
	public User saveUser(User user);
	public User updateUser(User user, Long userId);
	public void handleAuthUser(JsonObject authentication, List<String> userRoles);
}
