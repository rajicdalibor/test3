package ch.aaap.admin.user;

import java.security.Principal;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.google.gson.Gson;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;

@RestController
@RequestMapping("/api/users")
public class UserController {

	@Autowired
	UserService userService;

	@GetMapping("")
	public ResponseEntity<List<User>> getUsers() {
		return new ResponseEntity<List<User>>(userService.getAllUsers(), HttpStatus.OK);
	}

	@GetMapping("/{userId}")
	public ResponseEntity<User> getUser(@PathVariable(value = "userId") Long userId) {
		return new ResponseEntity<User>(userService.getUser(userId), HttpStatus.OK);
	}

	@PostMapping("")
	public ResponseEntity<User> saveUser(@RequestBody User user) {
		return new ResponseEntity<User>(userService.saveUser(user), HttpStatus.OK);
	}

	@PutMapping("/{userId}")
	public ResponseEntity<User> updateUser(@PathVariable(value = "userId") Long userId, @RequestBody User user) {
		return new ResponseEntity<User>(userService.updateUser(user, userId), HttpStatus.OK);
	}

	@PostMapping("/handleAuthUser")
	public ResponseEntity<String> handleUser(@RequestBody String auth) {
		Gson gson = new Gson();
		JsonObject data = gson.fromJson(auth, JsonObject.class);

		List<String> roles = new ArrayList<>();
		data.getAsJsonArray("roles").forEach(role -> roles.add(role.toString()));

		userService.handleAuthUser(data.getAsJsonObject("principal").getAsJsonObject("attributes"), roles);

		return new ResponseEntity<String>(HttpStatus.OK);
	}

}
