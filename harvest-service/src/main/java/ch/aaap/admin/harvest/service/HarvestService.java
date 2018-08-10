package ch.aaap.admin.harvest.service;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.YearMonth;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import ch.aaap.admin.harvest.HarvestAPIClient;
import ch.aaap.admin.harvest.time.model.LoggedTimeYearMonth;
import ch.aaap.admin.harvest.time.model.UserHours;
import ch.aaap.admin.harvest.time.service.EmploymentService;
import ch.aaap.admin.harvest.time.TimeService;
import ch.aaap.harvestclient.api.filter.TimeEntryFilter;
import ch.aaap.harvestclient.domain.*;
import ch.aaap.harvestclient.domain.param.ImmutableTimeEntryCreationInfoDuration;
import ch.aaap.harvestclient.domain.reference.GenericReference;
import ch.aaap.harvestclient.domain.reference.Reference;

@Service
public class HarvestService implements TimeService {

	private interface Service {
		/**
		 * Harvest does not seem to care about which id we pick here
		 */
		long ID = 1337;
		long GROUP_ID = 22;
		String PERMALINK = "https://" + TimeService.SERVICE_DOMAIN + "/harvest/permalink";
		String ICON_URL = "https://cache.harvestapp.com/assets/timesheets/missing-external-service-cb87975ea511c1e1faa9bd3d70bbc5f0f50081bcc20c1428a28fb3c9500d1daf.png";
	}

	private final HarvestAPIClient harvestAPIClient;
	private final EmploymentService employmentService;
	private static final Logger log = LoggerFactory.getLogger(HarvestService.class);

	public HarvestService(HarvestAPIClient harvestAPIClient, EmploymentService employmentService) {
		this.harvestAPIClient = harvestAPIClient;
		this.employmentService = employmentService;
	}

	@Override
	public UserHours calculateOvertimeForUser(User user) {

        TimeEntryFilter timeEntryFilter = new TimeEntryFilter();
		timeEntryFilter.setUserReference(user);
		List<TimeEntry> timeEntries = harvestAPIClient.getHarvest().timesheets().list(timeEntryFilter);

		UserHours userHours = new UserHours();
		userHours.setHarvestUserId(user.getId());
		userHours.setFirstName(user.getFirstName());
		userHours.setLastName(user.getLastName());
		userHours.setWeeklyCapacity(user.getWeeklyCapacity());

		try {
			LocalDate startDate = employmentService.getStartDate(user.getEmail());
			userHours.setStartDate(startDate);
			timeEntries.forEach(it -> addTime(userHours, it));
		} catch (Exception e){
			log.warn("Cannot find user start date into csv file");
			userHours.setStartDate(null);
		}

		return userHours;
	}

	private void addTime(UserHours user, TimeEntry harvestTimeEntry) {
		YearMonth yearMonth = YearMonth.from(harvestTimeEntry.getSpentDate());
		LoggedTimeYearMonth loggedTimeYearMonth = user.getLoggedTimesYearMonth().get(yearMonth);

		// no time logged yet for this month
		if (loggedTimeYearMonth == null) {
			loggedTimeYearMonth = initLoggedTimeYearMonth(user, yearMonth);
			user.getLoggedTimesYearMonth().put(yearMonth, loggedTimeYearMonth);
		}

		// don't count today's entry
		if (!harvestTimeEntry.getSpentDate().isEqual(LocalDate.now())) {
			// time is reported in seconds
			loggedTimeYearMonth.addActualTime(harvestTimeEntry.getHours() * 60 * 60);
		}
	}

	private LoggedTimeYearMonth initLoggedTimeYearMonth(UserHours user, YearMonth yearMonth) {

		LoggedTimeYearMonth loggedTimeYearMonth = new LoggedTimeYearMonth(yearMonth);

		int targetDays = calcTargetDays(yearMonth, user.getStartDate());
		log.debug("Target days for {} is {}", yearMonth, targetDays);
		double targetTime = targetDays / 5. * user.getWeeklyCapacity();
		loggedTimeYearMonth.setTargetTime(targetTime);

		return loggedTimeYearMonth;
	}

	/**
	 * Return the number of days that the user should have worked for this
	 * yearMonth. StartDate is the date of start of employment
	 * 
	 * @param yearMonth
	 * @param startDate
	 */
	public static int calcTargetDays(YearMonth yearMonth, LocalDate startDate) {
		LocalDate start = yearMonth.atDay(1);
		LocalDate end = yearMonth.atEndOfMonth();

		// adjust start day if this is the month when the user started working
		if (startDate.isBefore(end.plusDays(1)) && startDate.isAfter(start)) {
			start = startDate;
		}
		// count target days only up to yesterday
		LocalDate today = LocalDate.now();
		if (!end.isBefore(today)) {
			end = today.minusDays(1);
		}
		return calcWeekDays(start, end);
	}

	/**
	 * Return the number of business days between start and end (inclusive)
	 * 
	 * @param start
	 * @param end
	 */
	public static int calcWeekDays(LocalDate start, LocalDate end) {
		LocalDate current = start;
		int weekDays = 0;
		while (!current.isAfter(end)) {
			DayOfWeek dayOfWeek = current.getDayOfWeek();
			if (dayOfWeek != DayOfWeek.SATURDAY && dayOfWeek != DayOfWeek.SUNDAY) {
				weekDays++;
			}
			current = current.plusDays(1);
		}
		return weekDays;
	}

	@Override
	public List<User> getUsers() {
		return harvestAPIClient.getHarvest().users().list();
	}

	@Override
	public User getUser(long userId) {
		return harvestAPIClient.getHarvest().users().get(GenericReference.of(userId));
	}

	@Override
	public User getAuthenticatedUser() {
		return harvestAPIClient.getHarvest().users().getSelf();
	}

	@Override
	public List<ProjectAssignment> getProjectAssignmentSelf() {
		return harvestAPIClient.getHarvest().projectAssignments().listSelf();
	}

	@Override
	public void createTimeEntry(Reference<User> userReference, ch.aaap.admin.harvest.time.model.TimeEntry timeEntry) {
		ExternalService harvestServiceReference = ImmutableExternalService.builder()
				.id(Service.ID)
				.groupId(Service.GROUP_ID)
				.service(TimeService.SERVICE_DOMAIN)
				.serviceIconUrl(Service.ICON_URL)
				.permalink(Service.PERMALINK)
				.build();
		ImmutableTimeEntryCreationInfoDuration creationInfo = ImmutableTimeEntryCreationInfoDuration.builder()
				.hours(timeEntry.getHours())
				.spentDate(timeEntry.getSpentDate())
				.userReference(userReference)
				.taskReference(GenericReference.of(timeEntry.getTaskId()))
				.projectReference(GenericReference.of(timeEntry.getProjectId()))
				.externalReference(harvestServiceReference)
				.build();
		harvestAPIClient.getHarvest().timesheets().create(creationInfo);
	}

	@Override
	public List<ch.aaap.admin.harvest.time.model.TimeEntry> getTimeEntries(Reference<User> userReference,
			LocalDate from, LocalDate to) {

		TimeEntryFilter filter = new TimeEntryFilter();
		filter.setUserReference(userReference);
		filter.setFrom(from);
		filter.setTo(to);

		List<TimeEntry> harvestEntries = harvestAPIClient.getHarvest().timesheets().list(filter);

		return HarvestMapper.toTimeEntries(harvestEntries);

	}

	@Override
	public void deleteTimeEntry(Reference<User> userReference, ch.aaap.admin.harvest.time.model.TimeEntry timeEntry) {
		log.debug("Deleting time entry {} for user {}", timeEntry, userReference);
		harvestAPIClient.getHarvest().timesheets().delete(GenericReference.of(timeEntry.getInternalId()));
	}

}
