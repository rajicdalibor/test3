package ch.aaap.admin.harvest.service;

import java.util.List;
import java.util.stream.Collectors;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import ch.aaap.admin.harvest.time.model.TimeEntry;
import ch.aaap.harvestclient.domain.ExternalService;
import ch.aaap.harvestclient.domain.Project;
import ch.aaap.harvestclient.domain.reference.Reference;
import ch.aaap.harvestclient.domain.reference.dto.TaskReferenceDto;

public class HarvestMapper {

	private static final Logger log = LoggerFactory.getLogger(HarvestMapper.class);

	public static TimeEntry toTimeEntry(ch.aaap.harvestclient.domain.TimeEntry timeEntry) {
		TimeEntry entry = new TimeEntry();
		Double hours = timeEntry.getHours();
		if (hours != null) {
			entry.setHours(timeEntry.getHours());
		}
		entry.setSpentDate(timeEntry.getSpentDate());
		TaskReferenceDto task = timeEntry.getTask();
		if (task != null) {
			entry.setTaskId(task.getId());
		}
		Reference<Project> project = timeEntry.getProject();
		if (project != null) {
			entry.setProjectId(project.getId());
		}
		ExternalService externalService = timeEntry.getExternalService();
		if (externalService != null) {
			entry.setCreationId(externalService.getService());
		}

		if (timeEntry.getId() != null) {
			entry.setInternalId(timeEntry.getId());
		}

		return entry;
	}

	public static List<TimeEntry> toTimeEntries(List<ch.aaap.harvestclient.domain.TimeEntry> timeEntries) {
		return timeEntries.stream()
				.map(HarvestMapper::toTimeEntry)
				.collect(Collectors.toList());
	}
}
