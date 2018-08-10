package ch.aaap.admin.time.model;

import java.time.LocalDate;

public class TimeEntry {

	private LocalDate spentDate;
	private double hours;
	private long taskId;
	private long projectId;
	/**
	 * Can be null. If set, identifies which service created this entry. Used to
	 * override an entry in case of a second upload.
	 */
	private String creationId;

	/**
	 * An id from the implementation of the TimeService (for us the Harvest ID)
	 */
	private long internalId;

	public LocalDate getSpentDate() {
		return spentDate;
	}

	public void setSpentDate(LocalDate spentDate) {
		this.spentDate = spentDate;
	}

	public double getHours() {
		return hours;
	}

	public void setHours(double hours) {
		this.hours = hours;
	}

	public long getTaskId() {
		return taskId;
	}

	public void setTaskId(long taskId) {
		this.taskId = taskId;
	}

	public long getProjectId() {
		return projectId;
	}

	public void setProjectId(long projectId) {
		this.projectId = projectId;
	}

	public String getCreationId() {
		return creationId;
	}

	public void setCreationId(String creationId) {
		this.creationId = creationId;
	}

	public long getInternalId() {
		return internalId;
	}

	public void setInternalId(long internalId) {
		this.internalId = internalId;
	}
}
