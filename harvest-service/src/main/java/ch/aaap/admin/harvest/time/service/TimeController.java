package ch.aaap.admin.harvest.time.service;

import java.io.IOException;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.http.HttpSession;
import javax.servlet.http.Part;

import org.apache.poi.openxml4j.exceptions.InvalidFormatException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.security.oauth2.client.OAuth2RestTemplate;
import org.springframework.security.oauth2.common.OAuth2AccessToken;
import org.springframework.util.Assert;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import org.springframework.web.util.UriComponents;

import ch.aaap.admin.harvest.config.HarvestOAuth2TokenAcquiredException;
import ch.aaap.admin.harvest.time.model.TimeEntry;
import ch.aaap.admin.harvest.time.model.UserHours;
import ch.aaap.admin.harvest.time.TimeService;
import ch.aaap.harvestclient.domain.ProjectAssignment;
import ch.aaap.harvestclient.domain.User;

@RestController()
@RequestMapping("/api/time")
public class TimeController {

	private static final Logger log = LoggerFactory.getLogger(TimeController.class);

	private String backendUrl;

	private final SwisscardService swisscardService;

	private final TimeService timeService;
	private final OAuth2RestTemplate oAuth2RestTemplate;

	public TimeController(TimeService timeService, OAuth2RestTemplate oAuth2RestTemplate,
			@Value("${application.selfUrl}") String backendUrl, SwisscardService swisscardService) {
		this.timeService = timeService;
		this.oAuth2RestTemplate = oAuth2RestTemplate;
		this.swisscardService = swisscardService;
		Assert.notNull(backendUrl, "backendUrl is required");
		this.backendUrl = backendUrl;
	}

	@GetMapping("/users/me")
	public ResponseEntity<User> authenticatedUser(HttpSession session) throws HarvestOAuth2TokenAcquiredException {

		log.info("Calling /users/me, session is {}", session.getId());

		OAuth2AccessToken accessToken = oAuth2RestTemplate.getOAuth2ClientContext().getAccessToken();
		log.debug("Current access token is {}", accessToken);

		// TODO move this refresh token
		oAuth2RestTemplate.getAccessToken();

		User me = timeService.getAuthenticatedUser();
		redirectIfComingFromOauth();

		return ResponseEntity.ok(me);
	}

	@GetMapping("/users")
	public ResponseEntity<List<User>> users() throws HarvestOAuth2TokenAcquiredException {

		List<User> users = timeService.getUsers();

		redirectIfComingFromOauth();

		return ResponseEntity.ok(users);
	}

	/**
	 * Return all projects assigned to the currently authenticated user
	 * 
	 * @return return a list of project assignments for the authenticated user
	 */
	@GetMapping("projects/me")
	public ResponseEntity<List<ProjectAssignment>> projects() {

		List<ProjectAssignment> projectAssignments = timeService.getProjectAssignmentSelf();

		return ResponseEntity.ok(projectAssignments);
	}

	@GetMapping("/overtime")
	public ResponseEntity<List<UserHours>> overtime() {

		List<User> users = timeService.getUsers();
		List<UserHours> hours = new ArrayList<>();

		users.forEach(it -> hours.add(timeService.calculateOvertimeForUser(it)));

		return ResponseEntity.ok(hours);
	}

	@GetMapping("/overtime/{userId}")
	public ResponseEntity<UserHours> overtime(@PathVariable("userId") int userId) {

		User user = timeService.getUser(userId);

		return ResponseEntity.ok(timeService.calculateOvertimeForUser(user));
	}

	/**
	 * Parse the uploaded file for timeentries and returns them
	 * 
	 * @param file
	 * @param redirectAttributes
	 * @param request
	 * @return
	 * @throws IOException
	 * @throws ServletException
	 */
	@PostMapping("/upload/swisscard")
	public ResponseEntity<?> handleFileUpload(@RequestParam("file") MultipartFile file,
			RedirectAttributes redirectAttributes, MultipartHttpServletRequest request)
			throws IOException, ServletException {

		// TODO here we assume UTF-8
		// Should use the Multipartresolver from Spring
		long projectId = parsePartId(request, "project_id");
		long taskId = parsePartId(request, "task_id");

		log.debug("Called /upload/swisscard with {}, {} ,{}", file.getOriginalFilename(), projectId, taskId);
		List<TimeEntry> entries = null;
		try {
			entries = swisscardService.parse(file.getInputStream());
			redirectAttributes.addFlashAttribute("message",
					"You successfully uploaded " + file.getOriginalFilename() + "!");
			for (TimeEntry entry : entries) {
				entry.setProjectId(projectId);
				entry.setTaskId(taskId);
			}
			return ResponseEntity.ok(entries);
		} catch (InvalidFormatException e) {
			log.error("", e);
			return ResponseEntity.unprocessableEntity().body(Collections.emptyList());
		}
	}

	/**
	 * Create all entries given to it
	 * 
	 * @param timeEntries
	 *            the entries to be created
	 * @return the created timeentries
	 */
	@PostMapping("/entry")
	public ResponseEntity<?> createTimeEntries(@RequestBody List<TimeEntry> timeEntries) {
		log.debug("Creating {} entries", timeEntries.size());
		User authenticatedUser = timeService.getAuthenticatedUser();

		if (!timeEntries.isEmpty()) {
			LocalDate maxDate = timeEntries.stream().map(TimeEntry::getSpentDate).max(LocalDate::compareTo).get();
			LocalDate minDate = timeEntries.stream().map(TimeEntry::getSpentDate).min(LocalDate::compareTo).get();

			// delete all entries that were created by us
			List<TimeEntry> presentEntries = timeService.getTimeEntries(authenticatedUser, minDate, maxDate);
			presentEntries.stream()
					.filter(it -> TimeService.SERVICE_DOMAIN.equals(it.getCreationId()))
					.forEach(it -> timeService.deleteTimeEntry(authenticatedUser, it));

			for (TimeEntry timeEntry : timeEntries) {
				timeService.createTimeEntry(authenticatedUser, timeEntry);
			}
		}
		return ResponseEntity.ok(timeEntries);
	}

	private long parsePartId(MultipartHttpServletRequest request, String partName)
			throws IOException, ServletException {
		Part part = request.getPart(partName);
		String value = IOUtils.readIntoString(part.getInputStream());
		return Long.valueOf(value);

	}

	private void redirectIfComingFromOauth() throws HarvestOAuth2TokenAcquiredException {
		// Check if we are coming from the backend. This means that we have aquired a
		// token from Harvest
		// We need to redirect to the correct frontend page
		String currentUri = ServletUriComponentsBuilder.fromCurrentRequestUri().toUriString();
		UriComponents request = ServletUriComponentsBuilder.fromCurrentRequest().build();
		MultiValueMap<String, String> params = request.getQueryParams();

		if (currentUri.startsWith(backendUrl)) {
			if (params.get("code") != null & params.get("state") != null) {
				throw new HarvestOAuth2TokenAcquiredException();
			}
		}
	}
}
