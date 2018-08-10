package ch.aaap.admin.harvest.service;

import java.io.IOException;
import java.io.InputStream;
import java.time.LocalDate;
import java.util.List;

import org.apache.poi.openxml4j.exceptions.InvalidFormatException;
import org.junit.Test;

import static org.assertj.core.api.Assertions.assertThat;

import ch.aaap.admin.harvest.time.model.TimeEntry;
import ch.aaap.admin.harvest.time.service.SwisscardService;

public class SwisscardServiceTest {

	private SwisscardService swisscardService;

	@Test
	public void parse() throws IOException, InvalidFormatException {

		swisscardService = new SwisscardService();

		try (InputStream in = SwisscardServiceTest.class.getResourceAsStream("/swisscard.xls")) {
			List<TimeEntry> entries = swisscardService.parse(in);
			assertThat(entries).hasSize(2);
			TimeEntry first = entries.get(0);
			assertThat(first.getHours()).isEqualTo(5.75);
			assertThat(first.getSpentDate()).isEqualTo(LocalDate.of(2018, 3, 16));
			assertThat(first.getProjectId()).isEqualTo(0);
			assertThat(first.getTaskId()).isEqualTo(0);

			TimeEntry second = entries.get(1);
			assertThat(second.getHours()).isEqualTo(1);
			assertThat(second.getSpentDate()).isEqualTo(LocalDate.of(2018, 3, 19));
			assertThat(second.getProjectId()).isEqualTo(0);
			assertThat(second.getTaskId()).isEqualTo(0);
		}

	}

}
