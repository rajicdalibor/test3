package ch.aaap.admin.harvest;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.context.annotation.ComponentScan;

@EnableDiscoveryClient
@SpringBootApplication(exclude = { SecurityAutoConfiguration.class })
@ComponentScan({ "ch.aaap.admin", "ch.aaap.harvestclient.core" })
public class HarvestApplication {

	public static void main(String[] args) {
		SpringApplication.run(HarvestApplication.class, args);
	}
}
