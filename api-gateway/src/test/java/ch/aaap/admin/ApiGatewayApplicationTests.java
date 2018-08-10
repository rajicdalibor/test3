package ch.aaap.admin;

import static org.junit.Assert.assertEquals;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.context.SpringBootTest.WebEnvironment;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.boot.web.server.LocalServerPort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.context.junit4.SpringRunner;

import com.netflix.discovery.DiscoveryClient;

@RunWith(SpringRunner.class)
@SpringBootTest(webEnvironment=WebEnvironment.RANDOM_PORT)
@DirtiesContext
public class ApiGatewayApplicationTests {

	@LocalServerPort
	int port;

	private TestRestTemplate restTemplate = new TestRestTemplate();

	@Test
	public void ignoredPatternMissing() {
		ResponseEntity<String> result = this.restTemplate.getForEntity("http://localhost:"+this.port +"/error", String.class);
		assertEquals(HttpStatus.FORBIDDEN, result.getStatusCode());
	}

	@Test
	public void forwardedPatternGood() {
		ResponseEntity<String> result = this.restTemplate.getForEntity("http://localhost:"+this.port +"/api/users", String.class);
		assertEquals(HttpStatus.FORBIDDEN, result.getStatusCode());
	}

	@Test
	public void forwardedPatternGoodWithPath() {
		ResponseEntity<String> result = this.restTemplate.getForEntity("http://localhost:"+this.port +"/api/time", String.class);
		assertEquals(HttpStatus.FORBIDDEN, result.getStatusCode());
	}
}
