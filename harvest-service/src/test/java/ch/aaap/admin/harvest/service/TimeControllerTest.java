package ch.aaap.admin.harvest.service;

import java.io.InputStream;
import java.time.LocalDate;
import java.util.Arrays;
import java.util.List;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Answers;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.mock.web.MockPart;
import org.springframework.security.oauth2.client.OAuth2RestTemplate;
//import org.springframework.security.oauth2.client.OAuth2RestTemplate;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.RequestBuilder;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.multipart;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import ch.aaap.admin.harvest.time.TimeService;
import ch.aaap.admin.harvest.time.model.TimeEntry;
import ch.aaap.admin.harvest.time.service.SwisscardService;
import ch.aaap.admin.harvest.time.service.TimeController;
import ch.aaap.harvestclient.domain.ImmutableUser;
import ch.aaap.harvestclient.domain.User;

/**
 * Test the TimeController with a mocked timeService. We need to load the full
 * mvc context so we get the jackson configuration for the ObjectMapper
 * (LocalDate serialization)
 */
@RunWith(SpringRunner.class)
@SpringBootTest
@WithMockUser
@DirtiesContext // see applicationTests
public class TimeControllerTest {

	@Autowired
	private WebApplicationContext webAppConfiguration;

	private MockMvc mockMvc;
	@MockBean
	private TimeService timeService;
	@MockBean(answer = Answers.RETURNS_DEEP_STUBS)
	private OAuth2RestTemplate oAuth2RestTemplate;
	private TimeController timeController;
	@MockBean
	private SwisscardService swisscardService;

	@Before
	public void before() {
		mockMvc = MockMvcBuilders.webAppContextSetup(webAppConfiguration)
				.build();
	}

	@Test
	public void authenticatedUser() throws Exception {

		User user = ImmutableUser.builder()
				.firstName("test first")
				.lastName("test last")
				.email("test@test.com")
				.build();
		when(timeService.getAuthenticatedUser()).thenReturn(user);

		mockMvc.perform(get("/api/time/users/me"))
				.andExpect(status().isOk())
				.andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8))
				.andExpect(jsonPath("$.firstName").value(user.getFirstName()))
				.andExpect(jsonPath("$.email").value(user.getEmail()))
				.andDo(print());
	}

	@Test
	public void users() throws Exception {
		// TODO fill out

		mockMvc.perform(get("/api/time/users"))
				.andExpect(status().isOk());

	}

	@Test
	public void overtime() {
		// TODO fill out
	}

	@Test
	public void overtimeUser() {
		// TODO fill out
	}

	@Test
	public void handleFileUpload() throws Exception {

		TimeEntry first = new TimeEntry();
		first.setSpentDate(LocalDate.of(2013, 2, 3));
		first.setHours(2.3);
		TimeEntry second = new TimeEntry();
		second.setSpentDate(LocalDate.of(2018, 1, 1));
		second.setHours(5.4);
		List<TimeEntry> entries = Arrays.asList(first, second);
		String taskId = "54";
		String projectId = "23";

		when(swisscardService.parse(any())).thenReturn(entries);

		try (InputStream in = TimeControllerTest.class.getResourceAsStream("/swisscard.xls")) {

			MockMultipartFile multipartFile = new MockMultipartFile("file", "originalFileName", null, in);

			RequestBuilder request = multipart("/api/time/upload/swisscard")
					.file(multipartFile)
					.part(new MockPart("project_id", projectId.getBytes()))
					.part(new MockPart("task_id", taskId.getBytes()))
					.characterEncoding("utf-8");

			mockMvc.perform(request)
					.andDo(print())
					.andExpect(status().isOk())
					.andExpect(content().string("[{\"spentDate\":\""
							+ first.getSpentDate()
							+ "\",\"hours\":" + first.getHours()
							+ ",\"taskId\":" + taskId
							+ ",\"projectId\":" + projectId
							+ ",\"creationId\":null,\"internalId\":0},{\"spentDate\":\"" + second.getSpentDate()
							+ "\",\"hours\":" + second.getHours() + ",\"taskId\":" + taskId + ",\"projectId\":"
							+ projectId + ",\"creationId\":null,\"internalId\":0}]"));

		}
	}
}
