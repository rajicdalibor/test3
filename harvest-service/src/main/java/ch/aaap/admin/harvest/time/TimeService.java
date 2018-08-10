package ch.aaap.admin.harvest.time;

import java.time.LocalDate;
import java.util.List;

import ch.aaap.admin.harvest.time.model.TimeEntry;
import ch.aaap.admin.harvest.time.model.UserHours;
import ch.aaap.harvestclient.domain.ProjectAssignment;
import ch.aaap.harvestclient.domain.User;
import ch.aaap.harvestclient.domain.reference.Reference;

public interface TimeService {
	String SERVICE_DOMAIN = "3ap.ch";

	// TODO make more generic remove Harvest out of Interface
	UserHours calculateOvertimeForUser(User user);

	List<User> getUsers();

	User getUser(long userId);

	User getAuthenticatedUser();

	List<ProjectAssignment> getProjectAssignmentSelf();

	void createTimeEntry(Reference<User> userReference, TimeEntry timeEntry);

	List<TimeEntry> getTimeEntries(Reference<User> userReference, LocalDate from, LocalDate to);

	void deleteTimeEntry(Reference<User> userReference, TimeEntry timeEntry);
}
