package ch.aaap.admin.harvest.service;

import java.time.LocalDate;
import java.time.YearMonth;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.TimeUnit;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Answers;
import org.mockito.Mock;
import org.mockito.junit.MockitoJUnitRunner;
import org.springframework.boot.test.context.SpringBootTest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

import ch.aaap.admin.harvest.HarvestAPIClient;
import ch.aaap.admin.harvest.time.model.LoggedTimeYearMonth;
import ch.aaap.admin.harvest.time.model.UserHours;
import ch.aaap.admin.harvest.time.service.EmploymentService;
import ch.aaap.harvestclient.domain.ImmutableTimeEntry;
import ch.aaap.harvestclient.domain.ImmutableUser;
import ch.aaap.harvestclient.domain.TimeEntry;
import ch.aaap.harvestclient.domain.User;
import ch.aaap.harvestclient.domain.reference.GenericReference;
import ch.aaap.harvestclient.domain.reference.dto.ImmutableTaskReferenceDto;

@RunWith(MockitoJUnitRunner.class)
@SpringBootTest
public class HarvestServiceTest {

	private static final YearMonth yearMonth = YearMonth.of(2018, 1);
	private List<TimeEntry> entries;
	private HarvestService service;
	@Mock(answer = Answers.RETURNS_DEEP_STUBS)
	private HarvestAPIClient client;

	@Mock
	private EmploymentService employmentService;

	@Before
	public void before() {
		service = new HarvestService(client, employmentService);

		entries = new ArrayList<>();

		// start date on the second
		addEntry(4., yearMonth.atDay(2));
		addEntry(6., yearMonth.atDay(3));
		addEntry(8., yearMonth.atDay(4));
		addEntry(1., yearMonth.atDay(5));
		addEntry(10., yearMonth.atDay(15));
		addEntry(2., yearMonth.atEndOfMonth());
		// extra entries, should not be counted
		addEntry(2., yearMonth.plusMonths(1).atDay(1));
		addEntry(2., yearMonth.plusMonths(1).atDay(2));

		when(client.getHarvest().timesheets().list(any())).thenReturn(entries);

		when(employmentService.getStartDate("test@test.com")).thenReturn(yearMonth.atDay(2));
	}

	private void addEntry(double hours, LocalDate date) {
		entries.add(ImmutableTimeEntry.builder()
				.hours(hours)
				.spentDate(date)
				.project(GenericReference.of(1))
				.task(ImmutableTaskReferenceDto.builder()
						.id(2L)
						.name("some task")
						.build())
				.build());
	}

	@Test
	public void calculateOvertimeForUser() {

		double workedHours = 31;

		long weeklyCapacity = TimeUnit.HOURS.toSeconds(42);

		User user = ImmutableUser.builder()
				.firstName("test first")
				.lastName("test last")
				.email("test@test.com")
				.id(3L)
				.weeklyCapacity(weeklyCapacity)
				.build();
		UserHours userHours = service.calculateOvertimeForUser(user);

		assertThat(userHours.getFirstName()).isEqualTo(user.getFirstName());
		LoggedTimeYearMonth loggedTimeYearMonth = userHours.getLoggedTimesYearMonth().get(yearMonth);

		assertThat(loggedTimeYearMonth).isNotNull();

		assertThat(loggedTimeYearMonth.getActualTime()).isEqualTo(workedHours * 60 * 60);
		assertThat(loggedTimeYearMonth.getLoggedYearMonth()).isEqualTo(yearMonth);
		// manually counted days in 2018-01 minus the first day
		int daysInYearMonth = 22;
		assertThat(loggedTimeYearMonth.getTargetTime()).isEqualTo(weeklyCapacity / 5. * daysInYearMonth);
	}

	@Test
	public void calcTargetDays() {
		YearMonth january = YearMonth.of(2018, 1);
		YearMonth february = YearMonth.of(2018, 2);
		assertThat(HarvestService.calcTargetDays(february, february.atDay(1))).isEqualTo(20);
		assertThat(HarvestService.calcTargetDays(february, february.atDay(15))).isEqualTo(10);
		assertThat(HarvestService.calcTargetDays(february, february.atDay(28))).isEqualTo(1);

		// start earlier
		assertThat(HarvestService.calcTargetDays(february, january.atDay(1))).isEqualTo(20);
		assertThat(HarvestService.calcTargetDays(february, january.atDay(15))).isEqualTo(20);

		// start at end of month
		assertThat(HarvestService.calcTargetDays(february, february.atEndOfMonth())).isEqualTo(1);

		// only go up to yesterday
		YearMonth currentMonth = YearMonth.now();
		int daysInCurrentMonth = HarvestService.calcWeekDays(currentMonth.atDay(1), LocalDate.now());
		assertThat(HarvestService.calcTargetDays(currentMonth, february.atDay(1))).isEqualTo(daysInCurrentMonth - 1);

	}

	@Test
	public void calcWeekDays() {
		YearMonth yearMonth = YearMonth.of(2018, 3);

		assertWeekDays(yearMonth, 1, 1, 1);
		assertWeekDays(yearMonth, 1, 2, 2);

		// 3-4 is weekend
		assertWeekDays(yearMonth, 1, 3, 2);
		assertWeekDays(yearMonth, 1, 4, 2);

		// 5 is Monday
		assertWeekDays(yearMonth, 1, 5, 3);
		assertWeekDays(yearMonth, 1, 6, 4);

		assertWeekDays(yearMonth, 1, 31, 22);

		LocalDate start = LocalDate.of(2018, 2, 5);
		LocalDate end = LocalDate.of(2018, 3, 4);
		assertThat(HarvestService.calcWeekDays(start, end)).isEqualTo(20);

	}

	private void assertWeekDays(YearMonth yearMonth, int startDay, int endDay, int expected) {
		LocalDate start = yearMonth.atDay(startDay);
		LocalDate end = yearMonth.atDay(endDay);
		assertThat(HarvestService.calcWeekDays(start, end)).isEqualTo(expected);
	}

	
/*
	@Autowired
	private HarvestService harvestService;

	@Test
	public void testAuth() {

		User user = harvestService.getAuthenticatedUser();
		assertThat(user.getEmail()).isNotNull();

	}

	@Configuration
	@Import(Application.class)
	public static class TestConfig {

		@Value("${harvest.headers.token}")
		private String token;

		// TODO why do we need this?
		@Bean
		ClientRegistrationRepository clientRegistrationRepository() {
			return new ClientRegistrationRepository() {
				@Override
				public ClientRegistration findByRegistrationId(String registrationId) {
					return null;
				}
			};
		}

		// mocking OAuth2 token with a personal token
		// -> Application think we have logged in
		@Bean
		public OAuth2ClientContext clientContext() {
			DefaultOAuth2ClientContext context = new DefaultOAuth2ClientContext();
			OAuth2AccessToken token = new DefaultOAuth2AccessToken(this.token);
			context.setAccessToken(token);
			return context;
		}
	}
*/
	
}
