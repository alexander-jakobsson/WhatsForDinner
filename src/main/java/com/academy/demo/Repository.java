package com.academy.demo;

import com.academy.demo.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.RequestParam;

import java.sql.*;
import javax.sql.DataSource;

@Component
public class Repository {
    @Autowired
    private DataSource dataSource;

    public User logIn(@RequestParam String username, @RequestParam String password) {
        Connection dbconn = null;

        try {
            Connection conn = dataSource.getConnection();
            boolean login;
            PreparedStatement ps = conn.prepareStatement("SELECT * FROM UserLogin WHERE email = ? AND password=?");
            ps.setString(1, username);
            ps.setString(2, password);
            try (ResultSet rs = ps.executeQuery()) {
                if (!rs.next()) {
                    login = false;
                } else {
                    return getUser(rs);
                }
            }
        } catch (SQLException e) {
            e.printStackTrace();
        } finally {
            if (dbconn != null) {
                try {
                    dbconn.close();
                } catch (SQLException e) {
                    e.printStackTrace();
                    e.getErrorCode();
                    System.out.println("Could not close the DB");
                }
            }
        }
        return null;
    }

    private User getUser(ResultSet rs) throws SQLException {
        return new User(
                rs.getInt("id"),
                rs.getString("username"),
                rs.getString("password"),
                rs.getString("email"));
    }

}
