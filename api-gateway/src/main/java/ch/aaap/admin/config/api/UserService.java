package ch.aaap.admin.config.api;

import java.util.List;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import feign.Headers;

@FeignClient(name="user-service", url="#{'${user-service-url}'}")
public interface UserService {
	@RequestMapping(method = RequestMethod.POST, value = "/api/users/handleAuthUser")
	@Headers("Content-Type: application/json")
	void handleAuthUser(@RequestBody String auth);
}
