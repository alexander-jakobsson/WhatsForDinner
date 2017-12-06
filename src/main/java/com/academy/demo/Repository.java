package com.academy.demo;

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
            PreparedStatement ps = conn.prepareStatement("SELECT * FROM UserFood WHERE username = ? AND password = ?");
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
                rs.getString("username"),
                rs.getString("password"),
                rs.getString("email"));
    }

    public boolean registration(String username, String password, String email, String confirmPassword) {
        Connection dbconn = null;

        if (password.equals(confirmPassword)) {

            try {
                Connection conn = dataSource.getConnection();
                boolean exists = true;
                PreparedStatement ps = conn.prepareStatement("SELECT username FROM UserFood WHERE username = ?");
                ps.setString(1, username);
                try (ResultSet rs = ps.executeQuery()) {
                    if (!rs.next()) exists = false;
                    else return true;
                }
                if (!exists) {
                    ps = conn.prepareStatement("INSERT INTO UserFood (username, password, email) VALUES (?,?,?)");
                    ps.setString(1, username);
                    ps.setString(2, password);
                    ps.setString(3, email);
                    ps.executeUpdate();
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
        } else {
            System.out.println("Passwords doesn't match");
        }
        return false;
    }
}
