package ch.aaap.admin.user;

import static org.mockito.Mockito.when;

import java.awt.List;
import java.util.ArrayList;
import java.util.Arrays;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mock;
import org.mockito.junit.MockitoJUnitRunner;
import org.springframework.boot.test.context.SpringBootTest;

@RunWith(MockitoJUnitRunner.class)
@SpringBootTest
public class UserServiceImplTest {

	@Mock
	UserService userService;

	@Test
	public void testGetUsers() {
		when(userService.getAllUsers()).thenReturn(Arrays.asList( new User() ));
		assert(userService.getAllUsers().size() == 1);
	}

	@Test
	public void testGetUser() {
		when(userService.getUser((long) 1)).thenReturn(new User());
		assert (userService.getUser((long) 1) != null);
	}
}
