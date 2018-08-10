package ch.aaap.admin.time.model;

import java.time.YearMonth;

public class LoggedTimeYearMonth {

	/**
	 * Target time in seconds
	 */
	private double targetTime;

	/**
	 * Actual time in seconds
	 */
	private double actualTime;
	private final YearMonth loggedYearMonth;

	public LoggedTimeYearMonth(YearMonth yearMonth) {
		loggedYearMonth = yearMonth;

	}

	public double getTargetTime() {
		return targetTime;
	}

	public void setTargetTime(double targetTime) {
		this.targetTime = targetTime;
	}

	public double getActualTime() {
		return actualTime;
	}

	public void setActualTime(double actualTime) {
		this.actualTime = actualTime;
	}

	public YearMonth getLoggedYearMonth() {
		return loggedYearMonth;
	}

	public void addActualTime(double hours) {
		actualTime += hours;
	}

}
