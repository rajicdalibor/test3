package ch.aaap.admin.harvest.time.service;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.time.LocalDate;
import java.time.format.DateTimeParseException;
import java.util.HashMap;
import java.util.Map;

import org.apache.commons.csv.CSVFormat;
import org.apache.commons.csv.CSVRecord;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

@Service
public class EmploymentService {

	private static final Logger log = LoggerFactory.getLogger(EmploymentService.class);

	/**
	 * map emails to start dates
	 */
	private final Map<String, LocalDate> startDates;

	public EmploymentService() {
		try {
			startDates = loadDates();
		} catch (IOException e) {
			log.error("Failed to load start dates csv file");
			throw new RuntimeException(e);
		}
	}

	/**
	 * Read a CSV file into memory
	 * 
	 * @return a map associating email addresses to start dates
	 * @throws IOException
	 *             if the file is not readable
	 */
	private Map<String, LocalDate> loadDates() throws IOException {

		Map<String, LocalDate> map = new HashMap<>();

		try (InputStream in = EmploymentService.class.getResourceAsStream("/start_dates.csv")) {
			BufferedReader bufferedReader = new BufferedReader(new InputStreamReader(in));

			Iterable<CSVRecord> records = CSVFormat.EXCEL.withFirstRecordAsHeader().parse(bufferedReader);
			for (CSVRecord record : records) {
				// headers:
				// FirstName,LastName,Email,PayrollNo,ContinuousStartDate,StartDate,EndDate,Status,Team,VirtualTeam,LeaveProfile
				String email = record.get("Email");
				if (email == null || email.isEmpty()) {
					log.warn("Parsed empty or null email!");
				}
				String startDateString = record.get("StartDate");
				try {
					LocalDate startDate = LocalDate.parse(startDateString);
					map.put(email, startDate);
				} catch (DateTimeParseException e) {
					log.warn("StartDate is invalid");
				}
			}
			return map;
		}
	}

	public LocalDate getStartDate(String email) {
		return startDates.get(email);
	}
}
