package ch.aaap.admin.harvest.time.service;

import java.io.IOException;
import java.io.InputStream;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.*;

import org.apache.poi.openxml4j.exceptions.InvalidFormatException;
import org.apache.poi.ss.usermodel.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import ch.aaap.admin.harvest.time.model.TimeEntry;

@Service
public class SwisscardService {

	private static final Logger log = LoggerFactory.getLogger(SwisscardService.class);

	/**
	 * map column name to 0-based index
	 */
	private Map<String, Integer> headerColumns = new HashMap<>();

	public List<TimeEntry> parse(InputStream inputStream) throws IOException, InvalidFormatException {

		Workbook workbook = WorkbookFactory.create(inputStream);
		Sheet sheet = workbook.getSheetAt(0);

		List<TimeEntry> entries = new ArrayList<>();
		Iterator<Row> it = sheet.rowIterator();

		parseFirstRow(it.next());

		while (it.hasNext()) {
			Row row = it.next();
			parseRow(row).ifPresent(entries::add);
		}

		log.debug("Parsed {} entries", entries.size());

		return entries;
	}

	private Optional<TimeEntry> parseRow(Row row) {
		TimeEntry timeEntry = new TimeEntry();

		String issueKey = getCell(row, "Issue Key").getStringCellValue();
		String issueSummary = getCell(row, "Issue summary").getStringCellValue();

		double hours = getCell(row, "Hours").getNumericCellValue();
		timeEntry.setHours(hours);

		Date workDate = getCell(row, "Work date").getDateCellValue();
		// Apache POI uses the default timezone to parse the date into a java.util.Date
		if (workDate == null && hours == 0) {
			// row does not have a work date, and hours is also empty
			// row numbers are 0-based
			log.debug("Found empty row number {}", row.getRowNum() + 1);
			return Optional.empty();
		}
		LocalDate spentDate = workDate.toInstant().atZone(ZoneId.systemDefault()).toLocalDate();
		timeEntry.setSpentDate(LocalDate.from(spentDate));
		String username = getCell(row, "Username").getStringCellValue();
		String fullName = getCell(row, "Full name").getStringCellValue();
		String period = getCell(row, "Period").getStringCellValue();
		double billedHours = getCell(row, "Billed Hours").getNumericCellValue();
		if (billedHours != hours) {
			log.warn("Billed hours are {} and hours are {}", billedHours, hours);
		}

		String notBillable = getCell(row, "Not Billable").getStringCellValue();
		return Optional.of(timeEntry);
	}

	private void parseFirstRow(Row row) {
		for (Cell cell : row) {
			headerColumns.put(cell.getStringCellValue(), cell.getColumnIndex());
		}
	}

	private Cell getCell(Row row, String headerName) {
		return row.getCell(getRowNumber(headerName));
	}

	private int getRowNumber(String headerName) {
		return headerColumns.get(headerName);
	}

}
