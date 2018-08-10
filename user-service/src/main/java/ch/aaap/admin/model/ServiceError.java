package ch.aaap.admin.model;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class ServiceError {

	private static final Logger log = LoggerFactory.getLogger(ServiceError.class);

	/**
	 * The HTTP status code returned by the service
	 */
	private final int error;

	/**
	 * An error message for the final user
	 */
	private final String message;

	/**
	 * The name of the service that return this error
	 */
	private final String service;

	public static ServiceError harvestError(int error, String message) {
		return new ServiceError(error, message, "harvest-api");
	}

	public ServiceError(int error, String message, String service) {
		this.error = error;
		this.message = message;
		this.service = service;
	}

	public int getError() {
		return error;
	}

	public String getMessage() {
		return message;
	}

	public String getService() {
		return service;
	}
}
