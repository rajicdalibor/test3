package ch.aaap.admin.harvest.time.model;

import java.time.LocalDate;
import java.time.YearMonth;
import java.util.HashMap;
import java.util.Map;

public class UserHours {

	private Long userId;

	private long harvestUserId;
	private String firstName;
	private String lastName;
	private double weeklyCapacity;
	private Map<YearMonth, LoggedTimeYearMonth> loggedTimesYearMonth;

	private LocalDate startDate;

	public Long getUserId() {
		return userId;
	}

	public void setUserId(Long userId) {
		this.userId = userId;
	}

	public long getHarvestUserId() {
		return harvestUserId;
	}

	public void setHarvestUserId(long harvestUserId) {
		this.harvestUserId = harvestUserId;
	}

	public double getWeeklyCapacity() {
		return weeklyCapacity;
	}

	public void setWeeklyCapacity(double weeklyCapacity) {
		this.weeklyCapacity = weeklyCapacity;
	}

	public Map<YearMonth, LoggedTimeYearMonth> getLoggedTimesYearMonth() {
		if (loggedTimesYearMonth == null) {
			loggedTimesYearMonth = new HashMap<>();
		}

		return loggedTimesYearMonth;
	}

	public void setLoggedTimesYearMonth(Map<YearMonth, LoggedTimeYearMonth> loggedTimesYearMonth) {
		this.loggedTimesYearMonth = loggedTimesYearMonth;
	}

	public String getFirstName() {
		return firstName;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	public String getLastName() {
		return lastName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

	public LocalDate getStartDate() {
		return startDate;
	}

	public void setStartDate(LocalDate startDate) {
		this.startDate = startDate;
	}

}
