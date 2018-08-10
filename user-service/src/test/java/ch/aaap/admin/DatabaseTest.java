package ch.aaap.admin;

import java.sql.Connection;
import java.sql.SQLException;

import javax.sql.DataSource;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.context.annotation.PropertySource;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.junit4.SpringRunner;
@ActiveProfiles ("test")
@RunWith(SpringRunner.class)
@SpringBootTest
public class DatabaseTest {
	@Autowired
	private DataSource ds;
	public Connection conn;

	@Test 
	public void testConnection() {
		try {
			this.conn = ds.getConnection();
			this.conn.isValid(0);
		} catch (SQLException e) {
			System.err.println("Bad connection: " + e.getMessage());
			e.printStackTrace();
		}
	}
	
	@Test
	public void closeConnection() {
		try {
			this.conn = ds.getConnection();
			this.conn.close();
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
}
