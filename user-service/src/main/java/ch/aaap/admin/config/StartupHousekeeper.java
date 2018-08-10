package ch.aaap.admin.config;

import javax.net.ssl.HttpsURLConnection;

import org.springframework.context.ApplicationListener;
import org.springframework.context.annotation.Profile;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.stereotype.Component;

@Component
@Profile("test")
public class StartupHousekeeper implements ApplicationListener<ContextRefreshedEvent> {

  @Override
  public void onApplicationEvent(final ContextRefreshedEvent event) {
    // do whatever you need here
    disableSSL();
  }

  public void disableSSL() {
    HttpsURLConnection.setDefaultHostnameVerifier(
        new javax.net.ssl.HostnameVerifier() {

          @Override
          public boolean verify(String hostname, javax.net.ssl.SSLSession sslSession) {
            return hostname.equals("localhost");
          }
        });
  }
}
