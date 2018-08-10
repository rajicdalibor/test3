package ch.aaap.admin.harvest.service;

import java.time.LocalDate;

import org.junit.Test;

import ch.aaap.admin.harvest.time.service.EmploymentService;

import static org.assertj.core.api.Assertions.assertThat;

public class EmploymentServiceTest {

	@Test
	public void testGetStartDate() {

		EmploymentService employmentService = new EmploymentService();

		LocalDate startDate = employmentService.getStartDate("marco@3ap.ch");
		assertThat(startDate).isEqualTo(LocalDate.of(2018, 1, 15));

		startDate = employmentService.getStartDate("dani@3ap.ch");
		assertThat(startDate).isEqualTo(LocalDate.of(2015, 1, 1));

		LocalDate nonExistant = employmentService.getStartDate("non_existant");
		assertThat(nonExistant).isNull();
	}

}
